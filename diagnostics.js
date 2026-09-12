(() => {
  'use strict';

  const EXPECTED_DIAGNOSTIC_VERSION = 'multi-student-diagnostics-v1';
  const CURRENT_LESSON_ID = '';
  const config = window.APP_CONFIG || {};
  const student = config.student || {};
  const studentId = String(student.id || 'nikita').trim().toLowerCase();
  const checksEl = document.getElementById('checks');
  const summaryEl = document.getElementById('main-summary');
  const rawEl = document.getElementById('raw-output');
  const configInfoEl = document.getElementById('config-info');
  const telegramInfoEl = document.getElementById('telegram-info');
  const dbWriteResultEl = document.getElementById('db-write-result');
  const sendResultEl = document.getElementById('send-result');
  const runAllBtn = document.getElementById('run-all');
  const dbWriteBtn = document.getElementById('test-db-write');
  const sendBtn = document.getElementById('send-test-report');
  let supabaseClient = null;
  let lastReport = { startedAt: null, checks: [], health: null, directRows: [], errors: [] };

  const esc = (value) => String(value ?? '')
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');

  function addKV(target, key, value, mono = false) {
    target.insertAdjacentHTML('beforeend', `<div class="kv"><span>${esc(key)}</span><strong class="${mono ? 'mono' : ''}">${esc(value)}</strong></div>`);
  }

  function renderConfig() {
    configInfoEl.innerHTML = '';
    addKV(configInfoEl, 'student_id', studentId || '—', true);
    addKV(configInfoEl, 'Name', student.nameRu || student.nameEn || '—');
    addKV(configInfoEl, 'Supabase URL', config.supabase?.url || 'not set', true);
    addKV(configInfoEl, 'Anon key', config.supabase?.anonKey ? 'present' : 'NO');
    addKV(configInfoEl, 'cloudSync', String(config.features?.cloudSync !== false));
    addKV(configInfoEl, 'telegramNotifications', String(config.features?.telegramNotifications !== false));
    addKV(configInfoEl, 'Origin', window.location.origin, true);
  }

  function resetChecks() {
    checksEl.innerHTML = '';
    lastReport = { startedAt: new Date().toISOString(), checks: [], health: null, directRows: [], errors: [] };
  }

  function addCheck(name, status, detail) {
    const icon = status === 'ok' ? '✓' : status === 'bad' ? '!' : status === 'warn' ? '!' : '…';
    checksEl.insertAdjacentHTML('beforeend', `<div class="check ${status}"><div class="ico">${icon}</div><div><div class="name">${esc(name)}</div><div class="detail">${esc(detail || '')}</div></div></div>`);
    lastReport.checks.push({ name, status, detail: detail || '' });
  }

  function setSummary(status, text) {
    summaryEl.className = `summary ${status || ''}`.trim();
    summaryEl.textContent = text;
  }

  function getClient() {
    if (supabaseClient) return supabaseClient;
    if (!window.supabase?.createClient) throw new Error('Supabase JS SDK did not load');
    const url = String(config.supabase?.url || '').trim();
    const anonKey = String(config.supabase?.anonKey || '').trim();
    if (!url || !anonKey) throw new Error('config.js is missing supabase.url or supabase.anonKey');
    supabaseClient = window.supabase.createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
    });
    return supabaseClient;
  }

  function functionUrl() {
    const base = String(config.supabase?.url || '').replace(/\/+$/, '');
    return `${base}/functions/v1/notify-telegram`;
  }

  async function invokeDiagnostic(body) {
    const anonKey = String(config.supabase?.anonKey || '').trim();
    const response = await fetch(functionUrl(), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'apikey': anonKey
      },
      body: JSON.stringify(body)
    });
    const text = await response.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch { data = { raw: text }; }
    return { ok: response.ok, status: response.status, data };
  }

  function explainFunctionFailure(result) {
    const message = String(result?.data?.error || result?.data?.message || result?.data?.raw || '').trim();
    if (result?.status === 404) return 'Edge Function notify-telegram was not found or has not been deployed.';
    if (result?.status === 401 && /Unauthorized diagnostics request/i.test(message)) {
      const version = result?.data?.diagnosticVersion ? ` Function version: ${result.data.diagnosticVersion}.` : '';
      return `The Edge Function responds, but does not accept the public key from config.js.${version} Deploy the current notify-telegram function from this project.`;
    }
    if (result?.status === 401 && /Unauthorized/i.test(message)) return 'The Edge Function rejected the authorization request. Check that the current notify-telegram function is deployed and verify_jwt=false.';
    if (result?.status === 403) return message || 'Diagnostics are not allowed for this student_id.';
    if (/Failed to fetch/i.test(message)) return 'The browser could not call the Edge Function: check the network, project URL, and CORS.';
    return `HTTP ${result?.status || '—'}${message ? `: ${message}` : ''}`;
  }

  function formatError(error) {
    if (!error) return 'Unknown error';
    const code = error.code ? `${error.code}: ` : '';
    const message = error.message || error.error_description || String(error);
    if (/homework_progress_final_dates_check/i.test(message)) {
      return `${code}${message}. Final submission rule failed: Supabase requires submitted_at and locked_at for submitted homework.`;
    }
    if (/homework_progress_report_check/i.test(message)) {
      return `${code}${message}. Report state machine failed: draft/not_sent → submitted_pending_report/pending|failed → submitted/sent.`;
    }
    if (/Final homework submission is immutable|Submitted homework cannot be changed|Invalid homework status transition/i.test(message)) {
      return `${code}${message}. Protection against editing submitted homework was triggered.`;
    }
    if (/row-level security|permission denied|42501/i.test(message)) {
      return `${code}${message}. Supabase permissions / RLS error.`;
    }
    return `${code}${message}`;
  }

  async function runAll() {
    runAllBtn.disabled = true;
    resetChecks();
    setSummary('', 'Checking connections...');
    telegramInfoEl.innerHTML = '';

    try {
      const hasConfig = Boolean(config.supabase?.url && config.supabase?.anonKey && studentId);
      addCheck('1. config.js', hasConfig ? 'ok' : 'bad', hasConfig ? `Configuration loaded for ${studentId}.` : 'Missing student_id / Supabase URL / anon key.');
      if (!hasConfig) throw new Error('Invalid config.js');

      const sdkOk = Boolean(window.supabase?.createClient);
      addCheck('2. Supabase JS SDK', sdkOk ? 'ok' : 'bad', sdkOk ? '@supabase/supabase-js is loaded.' : 'Supabase JS CDN did not load.');
      if (!sdkOk) throw new Error('Supabase SDK did not load');

      const client = getClient();
      const homeworkTable = config.supabase?.tables?.homework || 'homework_progress';
      const readResponse = await client
        .from(homeworkTable)
        .select('student_id,lesson_id,lesson_title,status,checked_at,submitted_at,locked_at,report_status,report_sent_at,report_error,score_correct,score_total,score_percent,answers,legacy_answers,migrated_from_legacy')
        .eq('student_id', studentId)
        .order('lesson_id', { ascending: false })
        .limit(50);

      if (readResponse.error) {
        const detail = formatError(readResponse.error);
        addCheck('3. Supabase Database / read homework_progress', 'bad', detail);
        lastReport.errors.push({ stage: 'database_read', error: detail });
      } else {
        lastReport.directRows = readResponse.data || [];
        addCheck('3. Supabase Database / read homework_progress', 'ok', `Access works. Rows received: ${(readResponse.data || []).length}.`);

        if (CURRENT_LESSON_ID) {
          const currentLessonRow = (readResponse.data || []).find((row) => row.lesson_id === CURRENT_LESSON_ID);
          if (currentLessonRow?.migrated_from_legacy) {
            addCheck(`4. Current homework / ${CURRENT_LESSON_ID}`, 'bad', `${CURRENT_LESSON_ID} has a legacy flag. Do not overwrite the row; check it in Supabase first.`);
          } else if (currentLessonRow) {
            addCheck(`4. Current homework / ${CURRENT_LESSON_ID}`, 'ok', `${CURRENT_LESSON_ID} found (${currentLessonRow.status || 'without status'}), no legacy flag.`);
          } else {
            addCheck(`4. Current homework / ${CURRENT_LESSON_ID}`, 'ok', `Progress for ${CURRENT_LESSON_ID} is not in Supabase yet. This check only reads existing rows.`);
          }
        } else {
          addCheck('4. Current homework', 'ok', 'No active homework is published yet.');
        }
      }

      let edgeResult;
      try {
        edgeResult = await invokeDiagnostic({ kind: 'diagnostics_health', studentId });
      } catch (error) {
        edgeResult = { ok: false, status: 0, data: { error: error.message || String(error) } };
      }

      if (!edgeResult.ok || edgeResult.data?.diagnosticVersion !== EXPECTED_DIAGNOSTIC_VERSION) {
        const detail = edgeResult.ok
          ? `The function responds, but the diagnostics version is different: ${edgeResult.data?.diagnosticVersion || 'not specified'}. A new deploy is required.`
          : explainFunctionFailure(edgeResult);
        addCheck('5. Supabase Edge Function notify-telegram', 'bad', detail);
        lastReport.errors.push({ stage: 'edge_function', error: detail, response: edgeResult });
      } else {
        lastReport.health = edgeResult.data;
        addCheck('5. Supabase Edge Function notify-telegram', 'ok', `The required version is deployed: ${edgeResult.data.diagnosticVersion}.`);

        const h = edgeResult.data;
        const browserRows = Array.isArray(lastReport.directRows) ? lastReport.directRows.length : 0;
        const serviceRows = Number(h.database?.homeworkRows || 0);
        const removedProbes = Number(h.database?.staleDiagnosticProbesRemoved || 0);
        const browserRowsAfterCleanup = Math.max(0, browserRows - removedProbes);
        const visibilityOk = !readResponse.error && browserRowsAfterCleanup === serviceRows;
        addCheck(
          '6. RLS / same read in browser and service role',
          visibilityOk ? 'ok' : 'bad',
          visibilityOk
            ? `Browser and server see the same number of homework rows: ${serviceRows}${removedProbes ? ` (another ${removedProbes} technical probe rows removed by the server)` : ''}.`
            : `The browser sees ${browserRowsAfterCleanup} working rows after cleanup, while Edge Function sees ${serviceRows}. Check the SELECT policy for student_id=${studentId}.`
        );

        addCheck('7. Edge Function → Supabase (service role)', h.database?.ok ? 'ok' : 'bad', h.database?.ok ? `The server reads Supabase tables. Homework rows: ${h.database.homeworkRows}.` : (h.database?.error || 'The server cannot read Supabase.'));
        addCheck('8. Telegram recipient', h.recipient?.ok ? 'ok' : 'bad', h.recipient?.ok ? `Recipient found and enabled (${h.recipient.source || 'server'}).` : (h.recipient?.error || 'Recipient not found or disabled.'));
        addCheck('9. Telegram topic', h.recipient?.ok ? 'ok' : 'bad', h.recipient?.ok ? (h.recipient.threadId == null ? 'No separate topic is configured (message_thread_id=NULL).' : `message_thread_id=${h.recipient.threadId}.`) : 'Cannot check the topic without a configured recipient.');
        addCheck('10. Telegram Bot API / bot', h.telegram?.bot?.ok ? 'ok' : 'bad', h.telegram?.bot?.ok ? `Telegram sees the bot @${h.telegram.bot.username || 'no username'}.` : (h.telegram?.bot?.error || 'getMe failed.'));
        addCheck('11. Telegram Bot API / group', h.telegram?.chat?.ok ? 'ok' : 'bad', h.telegram?.chat?.ok ? `The bot has access to the target chat (${h.telegram.chat.type || 'chat'}).` : (h.telegram?.chat?.error || 'The bot does not have access to the target chat.'));

        if (Array.isArray(h.database?.suspiciousHomework) && h.database.suspiciousHomework.length) {
          addCheck('12. Saved homework state', 'warn', `Some rows do not match the current state machine: ${h.database.suspiciousHomework.join(', ')}. They should be checked.`);
        } else {
          const legacyCount = Array.isArray(h.database?.legacyHomework) ? h.database.legacyHomework.length : 0;
          addCheck(
            '12. Saved homework state',
            'ok',
            legacyCount
              ? `New rows match the state machine. Old migrated rows: ${legacyCount}; diagnostics does not change them.`
              : 'Rows match the draft → submitted_pending_report → submitted state machine.'
          );
        }

        const pendingHomework = Array.isArray(h.database?.pendingHomework) ? h.database.pendingHomework : [];
        if (pendingHomework.length) {
          addCheck(
            '13. Telegram homework reports',
            'warn',
            `Waiting to be sent or retried: ${pendingHomework.map((item) => `${item.lessonId} (${item.reportStatus || 'pending'})`).join(', ')}. The new site version will retry automatically after sync.`
          );
        } else {
          addCheck('13. Telegram homework reports', 'ok', 'There are no stuck submitted_pending_report rows.');
        }

        if (removedProbes > 0) {
          addCheck('14. Diagnostics cleanup', 'ok', `Old technical probe rows removed: ${removedProbes}.`);
        }

        telegramInfoEl.innerHTML = '';
        addKV(telegramInfoEl, 'Edge version', h.diagnosticVersion || '—', true);
        addKV(telegramInfoEl, 'Recipient', h.recipient?.ok ? 'found' : 'error');
        addKV(telegramInfoEl, 'Source', h.recipient?.source || '—', true);
        addKV(telegramInfoEl, 'Enabled', String(Boolean(h.recipient?.enabled)));
        addKV(telegramInfoEl, 'message_thread_id', h.recipient?.threadId ?? 'NULL', true);
        addKV(telegramInfoEl, 'Bot API', h.telegram?.bot?.ok ? 'OK' : 'ERROR');
        addKV(telegramInfoEl, 'Chat access', h.telegram?.chat?.ok ? 'OK' : 'ERROR');
      }

      const bad = lastReport.checks.filter((item) => item.status === 'bad');
      const warn = lastReport.checks.filter((item) => item.status === 'warn');
      if (bad.length) {
        setSummary('bad', `Problem found: ${bad[0].name}. See the first red row above.`);
      } else if (warn.length) {
        setSummary('warn', 'The main connections work, but there is a warning about saved data.');
      } else {
        setSummary('ok', 'All checked connections work. Now you can separately test Supabase write and the Telegram test report.');
      }
    } catch (error) {
      const detail = formatError(error);
      addCheck('Check stopped', 'bad', detail);
      lastReport.errors.push({ stage: 'fatal', error: detail });
      setSummary('bad', detail);
    } finally {
      lastReport.finishedAt = new Date().toISOString();
      rawEl.textContent = JSON.stringify(lastReport, null, 2);
      runAllBtn.disabled = false;
    }
  }

  async function bestEffortDeleteProbe(client, table, probeId) {
    try {
      await client.from(table).delete().eq('student_id', studentId).eq('lesson_id', probeId);
    } catch {}
  }

  async function testDatabaseWrite() {
    dbWriteBtn.disabled = true;
    dbWriteResultEl.innerHTML = '<div class="summary">Checking the full homework save path...</div>';

    const client = getClient();
    const table = config.supabase?.tables?.homework || 'homework_progress';
    const probeId = `__diagnostic_probe__${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    try {
      const { error: insertError } = await client.from(table).insert({
        student_id: studentId,
        student_name: student.nameRu || student.nameEn || studentId,
        lesson_id: probeId,
        lesson_title: 'Diagnostics homework write probe',
        status: 'draft',
        answers: {},
        legacy_answers: null,
        migrated_from_legacy: false,
        score_correct: null,
        score_total: null,
        score_percent: null,
        checked_at: null,
        submitted_at: null,
        locked_at: null,
        report_status: 'not_sent',
        report_sent_at: null,
        report_error: null
      });

      if (insertError) throw new Error(`browser_draft_insert: ${formatError(insertError)}`);

      const probe = await invokeDiagnostic({
        kind: 'diagnostics_homework_probe',
        studentId,
        lessonId: probeId
      });

      if (!probe.ok || !probe.data?.ok) {
        throw new Error(probe.data?.error || explainFunctionFailure(probe));
      }

      dbWriteResultEl.innerHTML = '<div class="summary ok">✓ The full homework_progress path works: browser draft → submitted_pending_report → submitted → cleanup. Real homework was not changed.</div>';
      lastReport.databaseWriteProbe = { ok: true, lessonId: probeId, stages: probe.data.stages || null };
    } catch (error) {
      const detail = formatError(error);
      dbWriteResultEl.innerHTML = `<div class="summary bad">✕ homework_progress path error: ${esc(detail)}</div>`;
      lastReport.errors.push({ stage: 'database_write_probe', error: detail, lessonId: probeId });
      try { await invokeDiagnostic({ kind: 'diagnostics_cleanup_probe', studentId, lessonId: probeId }); } catch {}
      await bestEffortDeleteProbe(client, table, probeId);
    } finally {
      rawEl.textContent = JSON.stringify(lastReport, null, 2);
      dbWriteBtn.disabled = false;
    }
  }

  async function sendTestReport() {
    sendBtn.disabled = true;
    sendResultEl.innerHTML = '<div class="summary">Sending a test report...</div>';
    try {
      const result = await invokeDiagnostic({ kind: 'diagnostics_send_report', studentId, pageUrl: window.location.href });
      if (!result.ok || !result.data?.ok) {
        const message = result.data?.error || explainFunctionFailure(result);
        const retry = result.data?.retryAfterSeconds ? ` Try again in ${result.data.retryAfterSeconds} sec.` : '';
        throw new Error(`${message}${retry}`);
      }
      if (result.data.skipped) {
        const retry = Number(result.data.retryAfterSeconds || 30);
        sendResultEl.innerHTML = `<div class="summary warn">A test was sent very recently. Try again in about ${retry} sec.</div>`;
      } else {
        sendResultEl.innerHTML = `<div class="summary ok">✓ Telegram accepted the test report. message_id=${esc(result.data.telegramMessageId)}; thread_id=${esc(result.data.threadId ?? 'NULL')}.</div>`;
      }
      lastReport.telegramSendProbe = result.data || null;
    } catch (error) {
      const detail = formatError(error);
      sendResultEl.innerHTML = `<div class="summary bad">✕ The test report was not sent: ${esc(detail)}</div>`;
      lastReport.errors.push({ stage: 'telegram_test_send', error: detail });
    } finally {
      rawEl.textContent = JSON.stringify(lastReport, null, 2);
      sendBtn.disabled = false;
    }
  }

  async function copyReport() {
    const text = rawEl.textContent || '';
    try {
      await navigator.clipboard.writeText(text);
      const button = document.getElementById('copy-report');
      const old = button.textContent;
      button.textContent = 'Copied ✓';
      setTimeout(() => { button.textContent = old; }, 1300);
    } catch {
      window.prompt('Copy the report manually:', text);
    }
  }

  document.getElementById('run-all').addEventListener('click', runAll);
  document.getElementById('test-db-write').addEventListener('click', testDatabaseWrite);
  document.getElementById('send-test-report').addEventListener('click', sendTestReport);
  document.getElementById('copy-report').addEventListener('click', copyReport);
  document.getElementById('reload-page').addEventListener('click', () => window.location.reload());
  renderConfig();
})();
