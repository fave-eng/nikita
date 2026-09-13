(() => {
  'use strict';

  const config = window.APP_CONFIG || {};
  const student = config.student || {};
  let HOMEWORK_DATA = [];
  const RAW_VOCABULARY_DATA = Array.isArray(window.VOCABULARY_DATA) ? window.VOCABULARY_DATA : [];
  const GRAMMAR_DATA = Array.isArray(window.GRAMMAR_DATA) ? window.GRAMMAR_DATA : [];
  const lessonCache = new Map();
  const lessonsPath = 'data/lessons';
  const maxLessonNumber = 200;
  const maxConsecutiveMissingLessons = 3;
  const MANUAL_LESSON_TYPES = ['family-tree', 'guided-writing', 'word-groups', 'mini-interview'];
  const LESSON_TASK_TYPES = ['text', 'textarea', 'single', 'multiple', 'select', 'match', 'reorder', 'translate', 'audio', 'exercise', 'reading-quiz', ...MANUAL_LESSON_TYPES];

  const safeText = (value, fallback = '') => value === undefined || value === null ? fallback : String(value);
  const escapeHtml = (value) => safeText(value)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
  const byId = (id) => document.getElementById(id);
  const queryParam = (name) => new URLSearchParams(window.location.search).get(name) || '';
  const unique = (items) => [...new Set(Array.isArray(items) ? items : [])];
  const safePercent = (value, total) => {
    const numerator = Number(value) || 0;
    const denominator = Number(total) || 0;
    if (denominator <= 0) return 0;
    return Math.max(0, Math.min(100, Math.round((numerator / denominator) * 100)));
  };
  const shuffled = (items) => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };
  const dateMs = (value) => {
    const time = Date.parse(value || '');
    return Number.isFinite(time) ? time : 0;
  };

  function normalizeLesson(rawLesson, requestedId = '') {
    if (!rawLesson || typeof rawLesson !== 'object') return null;
    const id = safeText(rawLesson.id || requestedId).trim();
    if (!/^lesson-\d+$/.test(id)) return null;
    const inferredNumber = Number(id.replace('lesson-', '')) || 0;
    return {
      ...rawLesson,
      id,
      number: Number(rawLesson.number || inferredNumber),
      title: safeText(rawLesson.title, `Lesson ${inferredNumber}`),
      subtitle: safeText(rawLesson.subtitle, 'Interactive homework'),
      status: safeText(rawLesson.status, 'available'),
      page: `lesson.html?id=${encodeURIComponent(id)}`,
      blocks: Array.isArray(rawLesson.blocks) ? rawLesson.blocks : []
    };
  }

  async function fetchLessonFile(id) {
    const cleanId = safeText(id).trim();
    if (!/^lesson-\d+$/.test(cleanId)) return null;
    if (lessonCache.has(cleanId)) return lessonCache.get(cleanId);

    const promise = (async () => {
      const url = new URL(`${lessonsPath}/${cleanId}.json`, document.baseURI);
      url.searchParams.set('_', Date.now().toString());
      const response = await fetch(url, { cache: 'no-store' });
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`Could not load ${cleanId}.json: ${response.status}`);
      const lesson = normalizeLesson(await response.json(), cleanId);
      if (!lesson) throw new Error(`File ${cleanId}.json has an invalid structure.`);
      return lesson;
    })();

    lessonCache.set(cleanId, promise);
    try {
      const lesson = await promise;
      // Do not cache a missing file forever: it may be published later.
      if (!lesson) lessonCache.delete(cleanId);
      return lesson;
    } catch (error) {
      lessonCache.delete(cleanId);
      throw error;
    }
  }

  async function discoverHomeworkData() {
    const lessonsById = new Map();
    let highestKnownLessonNumber = 0;

    try {
      const indexUrl = new URL(`${lessonsPath}/index.json`, document.baseURI);
      indexUrl.searchParams.set('_', Date.now().toString());
      const response = await fetch(indexUrl, { cache: 'no-store' });
      if (response.ok) {
        const payload = await response.json();
        const ids = Array.isArray(payload) ? payload : payload.lessons;
        if (Array.isArray(ids)) {
          const indexedLessons = (await Promise.all(ids.map((id) => fetchLessonFile(id)))).filter(Boolean);
          indexedLessons.forEach((lesson) => {
            lessonsById.set(lesson.id, lesson);
            highestKnownLessonNumber = Math.max(highestKnownLessonNumber, Number(lesson.number || 0));
          });
        }
      }
    } catch (error) {
      console.warn('Could not load the lesson index; automatic discovery is used:', error);
    }

    // Even if index.json is stale, automatically look for lesson-1.json, lesson-2.json, and so on.
    // Discovery stops after three missing files in a row after the last found lesson.
    let consecutiveMissing = 0;
    for (let number = 1; number <= maxLessonNumber; number += 1) {
      const lesson = await fetchLessonFile(`lesson-${number}`);
      if (lesson) {
        lessonsById.set(lesson.id, lesson);
        highestKnownLessonNumber = Math.max(highestKnownLessonNumber, Number(lesson.number || number));
        consecutiveMissing = 0;
      } else {
        consecutiveMissing += 1;
        if (number > highestKnownLessonNumber && consecutiveMissing >= maxConsecutiveMissingLessons) break;
      }
    }

    return [...lessonsById.values()]
      .sort((a, b) => Number(a.number || 0) - Number(b.number || 0));
  }

  async function loadHomeworkData() {
    const view = document.body?.dataset?.view || '';
    const requestedId = queryParam('id');

    if (view === 'lesson' && requestedId) {
      const lesson = await fetchLessonFile(requestedId);
      HOMEWORK_DATA = lesson ? [lesson] : [];
    } else {
      HOMEWORK_DATA = await discoverHomeworkData();
    }

    window.HOMEWORK_DATA = HOMEWORK_DATA;
    return HOMEWORK_DATA;
  }

  async function resolveLessonContent(lesson) {
    return lesson || null;
  }

  function normalizeWordKey(value) {
    return safeText(value)
      .normalize('NFKC')
      .toLocaleLowerCase('en')
      .replace(/[’‘`]/g, "'")
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/^[\s.,!?;:()[\]{}"“”]+|[\s.,!?;:()[\]{}"“”]+$/g, '');
  }

  function buildVocabularyCatalog(topics) {
    const seen = new Map();
    const byKey = new Map();
    const idToKey = new Map();
    const duplicates = [];
    const preparedTopics = topics.map((topic) => {
      const words = [];
      (Array.isArray(topic.words) ? topic.words : []).forEach((sourceWord) => {
        const wordKey = normalizeWordKey(sourceWord.uniqueKey || sourceWord.en);
        if (!wordKey) return;
        idToKey.set(safeText(sourceWord.id), wordKey);
        if (seen.has(wordKey)) {
          duplicates.push({ wordKey, skippedTopicId: topic.id, firstTopicId: seen.get(wordKey).topicId });
          return;
        }
        const word = { ...sourceWord, __wordKey: wordKey };
        const record = { word, topicId: topic.id };
        seen.set(wordKey, record);
        byKey.set(wordKey, record);
        words.push(word);
      });
      return { ...topic, words };
    });
    if (duplicates.length) {
      console.info('Duplicate words were excluded from the vocabulary:', duplicates);
    }
    return {
      topics: preparedTopics.filter((topic) => topic.words.length > 0),
      allTopics: preparedTopics,
      allWords: [...byKey.values()].map((item) => item.word),
      byKey,
      idToKey,
      duplicates
    };
  }

  const VOCABULARY_CATALOG = buildVocabularyCatalog(RAW_VOCABULARY_DATA);
  const VOCABULARY_DATA = VOCABULARY_CATALOG.topics;

  function showToast(message) {
    const toast = byId('app-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 3000);
  }

  const storage = {
    read(key, fallback) {
      try {
        const raw = window.localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch (error) {
        console.warn('Could not read local progress:', error);
        return fallback;
      }
    },
    write(key, value) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.warn('Could not save local progress:', error);
        return false;
      }
    }
  };

  const studentId = safeText(student.id, 'student').toLowerCase().trim().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '') || 'student';
  const key = (section) => `english_space_${studentId}_${section}`;
  const tables = {
    homework: config.supabase?.tables?.homework || 'homework_progress',
    vocabulary: config.supabase?.tables?.vocabulary || 'vocabulary_progress',
    vocabularyTopics: config.supabase?.tables?.vocabularyTopics || 'vocabulary_topic_progress',
    grammar: config.supabase?.tables?.grammar || 'grammar_progress'
  };

  const CloudService = {
    client: null,
    syncing: false,
    timers: {},
    isConfigured() {
      return Boolean(
        config.features?.cloudSync &&
        safeText(config.supabase?.url).trim() &&
        safeText(config.supabase?.anonKey).trim() &&
        window.supabase?.createClient
      );
    },
    async init() {
      if (!this.isConfigured()) return null;
      if (!this.client) {
        // Remove a saved session from an older site version.
        // Otherwise Supabase may send requests as authenticated,
        // although the new schema is designed for the anon role.
        try {
          const projectRef = new URL(config.supabase.url).hostname.split('.')[0];
          window.localStorage.removeItem(`sb-${projectRef}-auth-token`);
        } catch (error) {
          console.warn('Could not clear the old Supabase session:', error);
        }

        const emptyAuthStorage = {
          getItem() { return null; },
          setItem() {},
          removeItem() {}
        };

        this.client = window.supabase.createClient(
          config.supabase.url,
          config.supabase.anonKey,
          {
            auth: {
              persistSession: false,
              autoRefreshToken: false,
              detectSessionInUrl: false,
              storage: emptyAuthStorage
            }
          }
        );
      }
      return this.client;
    },
    async invokePublicFunction(payload) {
      const base = safeText(config.supabase?.url).replace(/\/+$/, '');
      const apiKey = safeText(config.supabase?.anonKey).trim();
      if (!base || !apiKey) throw new Error('Supabase function URL or public key is not configured');
      const response = await fetch(`${base}/functions/v1/notify-telegram`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': apiKey
        },
        body: JSON.stringify(payload || {})
      });
      const text = await response.text();
      let data = null;
      try { data = text ? JSON.parse(text) : null; } catch { data = { raw: text }; }
      if (!response.ok || !data?.ok) {
        const error = new Error(data?.error || data?.message || `Edge Function HTTP ${response.status}`);
        error.status = response.status;
        error.data = data;
        throw error;
      }
      return data;
    },
    async sendHomeworkReport(lessonId) {
      const normalizedLessonId = safeText(lessonId).trim();
      if (!/^lesson-\d+$/.test(normalizedLessonId)) return null;

      const lesson = HOMEWORK_DATA.find((item) => item.id === normalizedLessonId) || {};
      let homeworkUrl = '';
      let resultUrl = '';
      try {
        const target = new URL(
          lesson.page || `lesson.html?id=${encodeURIComponent(normalizedLessonId)}`,
          document.baseURI
        );
        target.hash = '';
        homeworkUrl = target.toString();
        target.hash = 'lesson-result';
        resultUrl = target.toString();
      } catch (error) {
        console.warn('Could not build homework and result links:', error);
      }

      const result = await this.invokePublicFunction({
        kind: 'homework_submit_report',
        studentId,
        lessonId: normalizedLessonId,
        lessonTitle: safeText(lesson.title, normalizedLessonId),
        homeworkUrl,
        resultUrl
      });

      if (result.sent || result.reason === 'already_sent') {
        const progress = window.ProgressService.loadHomeworkProgress();
        const submission = progress.submissions[normalizedLessonId];
        if (submission) {
          progress.submissions[normalizedLessonId] = {
            ...submission,
            status: 'cloud',
            cloudStatus: 'submitted',
            reportStatus: 'sent',
            reportSentAt: result.reportSentAt || submission.reportSentAt || new Date().toISOString(),
            reportError: null
          };
          storage.write(key('homework'), progress);
        }
      }
      return result;
    },
    async retryHomeworkReports(lessonIds) {
      for (const lessonId of unique(lessonIds)) {
        try {
          await this.sendHomeworkReport(lessonId);
        } catch (error) {
          console.warn(`Could not send the Telegram report for ${lessonId}:`, error);
          const progress = window.ProgressService.loadHomeworkProgress();
          const submission = progress.submissions[lessonId];
          if (submission) {
            progress.submissions[lessonId] = {
              ...submission,
              cloudStatus: 'submitted_pending_report',
              reportStatus: 'failed',
              reportError: error?.message || String(error)
            };
            storage.write(key('homework'), progress);
          }
        }
      }
    },
    queue(section) {
      if (!this.isConfigured() || !this.client || this.syncing) return;
      window.clearTimeout(this.timers[section]);
      this.timers[section] = window.setTimeout(() => {
        window.ProgressService.syncToCloud(section).catch((error) => {
          console.error('Cloud save error:', error);
          showToast('Could not save progress to Supabase');
        });
      }, 450);
    }
  };

  function migrateLegacyLocalProgress() {
    window.localStorage.setItem(key('legacy_migration_v2'), 'not-needed-for-nikita');
  }

  function archiveLegacyLesson8LocalProgress() {
    window.localStorage.setItem(key('lesson8_slot_archive_v1'), 'not-needed-for-nikita');
  }

  function findLegacyLessonTarget(lessonId, legacyKey) {
    const keyText = safeText(legacyKey);
    let match;
    if (lessonId === 'lesson-4') {
      if ((match = keyText.match(/^1\.(\d+)$/))) return ['l4-key-vocab', match[1]];
      if ((match = keyText.match(/^12\.1\.(\d+)$/))) return ['l4-12-1', String(Number(match[1]) - 1)];
      if ((match = keyText.match(/^12\.2\.(\d+)$/))) return ['l4-12-2', String(Number(match[1]) - 1)];
      if ((match = keyText.match(/^12\.4\.(\d+)$/))) return ['l4-12-4', String(Number(match[1]) - 1)];
      if ((match = keyText.match(/^free_(\d+)$/))) return ['l4-over-to-you', match[1]];
      if (keyText === 'matrix') return ['l4-collocations', 'matrix'];
    }
    if (lessonId === 'lesson-5') {
      if ((match = keyText.match(/^q1_(.+)$/))) return ['l5-ex1', match[1]];
      if ((match = keyText.match(/^q2_(\d+)$/))) return ['l5-ex2', match[1]];
      if ((match = keyText.match(/^q3_1_(\d+)$/))) return ['l5-ex31', match[1]];
      if ((match = keyText.match(/^q3_2_(\d+)$/))) return ['l5-ex32', match[1]];
      if ((match = keyText.match(/^q3_3_(\d+)$/))) return ['l5-ex33', match[1]];
    }
    if (lessonId === 'lesson-6') {
      if (keyText === 'q7') return ['l6-ex7', '1'];
      if ((match = keyText.match(/^q8_(\d+)$/))) return ['l6-ex8', match[1]];
      if ((match = keyText.match(/^q9_(\d+)$/))) return ['l6-ex9', match[1]];
    }
    if (lessonId === 'lesson-7') {
      if ((match = keyText.match(/^q1_(\d+)$/))) return ['l7-ex1', match[1]];
      if ((match = keyText.match(/^q2_(.+)$/))) return ['l7-ex2', match[1]];
      if ((match = keyText.match(/^q43_1_(\d+)$/))) return ['l7-ex431', match[1]];
      if ((match = keyText.match(/^q43_2_(\d+)$/))) return ['l7-ex432', String(Number(match[1]) - 1)];
    }
    if (lessonId === 'lesson-8') {
      if ((match = keyText.match(/^q3_(\d+)$/))) return ['l8-ex3', match[1]];
      if ((match = keyText.match(/^q99_(\d+)$/))) return ['l8-ex992', match[1]];
      if ((match = keyText.match(/^q4_(\d+)$/))) return ['l8-ex4', match[1]];
      if ((match = keyText.match(/^pred_(\d+)$/))) return ['l8-predictions', match[1]];
      if (keyText === 'q5') return ['l8-ex5', '1'];
      if ((match = keyText.match(/^listen_(\d+)$/))) return ['l8-listening', match[1]];
    }
    return null;
  }

  function convertLegacyChoiceValue(item, value) {
    if (!item || !['single', 'select'].includes(item.input)) return value;
    if (value === undefined || value === null || value === '') return '';
    const options = Array.isArray(item.options) ? item.options : [];
    if (Number.isInteger(value) && value >= 0 && value < options.length) return value;
    const raw = safeText(value).trim();
    if (/^[a-z]$/i.test(raw)) {
      const index = raw.toLowerCase().charCodeAt(0) - 97;
      if (index >= 0 && index < options.length) return index;
    }
    if (/^[tf]$/i.test(raw) && options.length === 2) return raw.toUpperCase() === 'T' ? 0 : 1;
    if (/^\d+$/.test(raw)) {
      const index = Number(raw);
      if (index >= 0 && index < options.length) return index;
    }
    const normalized = normalizeAnswer(raw);
    const index = options.findIndex((option) => {
      const optionNormalized = normalizeAnswer(option);
      return optionNormalized === normalized || optionNormalized.includes(normalized) || normalized.includes(optionNormalized);
    });
    return index >= 0 ? index : value;
  }

  function convertLegacyHomeworkAnswers(lessonId, legacyAnswers, lesson) {
    if (!legacyAnswers || typeof legacyAnswers !== 'object' || !lesson) return {};
    const converted = {};
    const blocks = Array.isArray(lesson.blocks) ? lesson.blocks : [];
    Object.entries(legacyAnswers).forEach(([legacyKey, rawValue]) => {
      const alreadyNewBlock = blocks.find((block) => block.id === legacyKey);
      if (alreadyNewBlock) {
        converted[legacyKey] = rawValue;
        return;
      }
      const target = findLegacyLessonTarget(lessonId, legacyKey);
      if (!target) return;
      const [blockId, itemId] = target;
      const block = blocks.find((item) => item.id === blockId);
      const item = block?.items?.find((entry) => safeText(entry.id) === safeText(itemId));
      if (!block || !item) return;
      if (!converted[blockId] || typeof converted[blockId] !== 'object') converted[blockId] = {};
      if (item.input === 'multiple' && !Array.isArray(rawValue)) return;
      converted[blockId][itemId] = convertLegacyChoiceValue(item, rawValue);
    });
    return converted;
  }

  function mergeLessonAnswers(legacyAnswers, currentAnswers) {
    const merged = { ...(legacyAnswers && typeof legacyAnswers === 'object' ? legacyAnswers : {}) };
    Object.entries(currentAnswers && typeof currentAnswers === 'object' ? currentAnswers : {}).forEach(([blockId, value]) => {
      if (value && typeof value === 'object' && !Array.isArray(value) && merged[blockId] && typeof merged[blockId] === 'object' && !Array.isArray(merged[blockId])) {
        merged[blockId] = { ...merged[blockId], ...value };
      } else {
        merged[blockId] = value;
      }
    });
    return merged;
  }

  function normalizeVocabularyProgress(value) {
    const words = value?.words && typeof value.words === 'object' ? { ...value.words } : {};
    const topics = {};
    Object.entries(value?.topics && typeof value.topics === 'object' ? value.topics : {}).forEach(([topicId, topic]) => {
      topics[topicId] = {
        tests: Array.isArray(topic?.tests) ? topic.tests : [],
        legacyLearnedCount: Math.max(0, Number(topic?.legacyLearnedCount || 0)),
        legacyTotal: Math.max(0, Number(topic?.legacyTotal || 0)),
        legacySource: safeText(topic?.legacySource),
        legacyUpdatedAt: topic?.legacyUpdatedAt || null
      };
      unique(topic?.known).forEach((legacyId) => {
        const wordKey = VOCABULARY_CATALOG.idToKey.get(safeText(legacyId));
        if (wordKey) words[wordKey] = { status: 'known', topicId, learnedAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      });
      unique(topic?.difficult).forEach((legacyId) => {
        const wordKey = VOCABULARY_CATALOG.idToKey.get(safeText(legacyId));
        if (wordKey && words[wordKey]?.status !== 'known') words[wordKey] = { status: 'difficult', topicId, updatedAt: new Date().toISOString() };
      });
    });
    Object.entries(words).forEach(([wordKey, item]) => {
      if (!['known', 'difficult'].includes(item?.status)) delete words[wordKey];
    });
    return { words, topics };
  }

  window.ProgressService = {
    loadHomeworkProgress() {
      const value = storage.read(key('homework'), {});
      return {
        completedIds: unique(value.completedIds),
        results: value.results && typeof value.results === 'object' ? value.results : {},
        submissions: value.submissions && typeof value.submissions === 'object' ? value.submissions : {}
      };
    },
    saveHomeworkProgress(progress) {
      const ok = storage.write(key('homework'), progress || {});
      CloudService.queue('homework');
      return ok;
    },
    loadVocabularyProgress() {
      return normalizeVocabularyProgress(storage.read(key('vocabulary'), {}));
    },
    saveVocabularyProgress(progress) {
      const normalized = normalizeVocabularyProgress(progress || {});
      const ok = storage.write(key('vocabulary'), normalized);
      const difficult = Object.entries(normalized.words)
        .filter(([, item]) => item.status === 'difficult')
        .map(([wordKey]) => wordKey);
      storage.write(key('difficult_words'), difficult);
      CloudService.queue('vocabulary');
      return ok;
    },
    loadGrammarProgress() {
      const value = storage.read(key('grammar'), {});
      return { topics: value.topics && typeof value.topics === 'object' ? value.topics : {} };
    },
    saveGrammarProgress(progress) {
      const ok = storage.write(key('grammar'), progress || {});
      CloudService.queue('grammar');
      return ok;
    },
    async syncFromCloud() {
      if (!CloudService.isConfigured()) return false;
      if (!CloudService.client) await CloudService.init();
      CloudService.syncing = true;
      try {
        const client = CloudService.client;
        const [homeworkResponse, vocabularyResponse, vocabularyTopicsResponse, grammarResponse] = await Promise.all([
          client.from(tables.homework).select('*').eq('student_id', studentId),
          client.from(tables.vocabulary).select('*').eq('student_id', studentId),
          client.from(tables.vocabularyTopics).select('*').eq('student_id', studentId),
          client.from(tables.grammar).select('*').eq('student_id', studentId)
        ]);
        [homeworkResponse, vocabularyResponse, vocabularyTopicsResponse, grammarResponse].forEach((response) => {
          if (response.error) throw response.error;
        });

        const homework = this.loadHomeworkProgress();
        (homeworkResponse.data || []).forEach((row) => {
          const localResult = homework.results[row.lesson_id] || {};
          const cloudLegacyAnswers = row.legacy_answers && typeof row.legacy_answers === 'object' ? row.legacy_answers : null;
          if (!Object.keys(localResult).length || dateMs(row.updated_at) >= dateMs(localResult.checkedAt)) {
            homework.results[row.lesson_id] = {
              ...localResult,
              correct: Number(row.score_correct || 0),
              total: Number(row.score_total || 0),
              percent: Number(row.score_percent || 0),
              answers: row.answers && typeof row.answers === 'object' ? row.answers : {},
              legacyAnswers: cloudLegacyAnswers || localResult.legacyAnswers || null,
              checkedAt: row.checked_at || row.updated_at,
              migratedAt: row.migrated_from_legacy ? (localResult.migratedAt || row.updated_at) : localResult.migratedAt
            };
          } else if (cloudLegacyAnswers && !localResult.legacyAnswers) {
            homework.results[row.lesson_id] = { ...localResult, legacyAnswers: cloudLegacyAnswers };
          }
          const cloudSubmitted = ['submitted_pending_report', 'submitted'].includes(row.status);
          if (cloudSubmitted || row.migrated_from_legacy) {
            homework.submissions[row.lesson_id] = {
              savedAt: row.submitted_at || row.updated_at,
              status: row.migrated_from_legacy
                ? 'migrated-cloud'
                : row.status === 'submitted'
                  ? 'cloud'
                  : 'cloud-pending-report',
              cloudStatus: row.status || null,
              reportStatus: row.report_status || null,
              reportSentAt: row.report_sent_at || null,
              reportError: row.report_error || null
            };
          }
          if (cloudSubmitted || row.migrated_from_legacy) {
            homework.completedIds.push(row.lesson_id);
          }
        });
        homework.completedIds = unique(homework.completedIds);
        storage.write(key('homework'), homework);

        const vocabulary = this.loadVocabularyProgress();
        (vocabularyResponse.data || []).forEach((row) => {
          const local = vocabulary.words[row.word_key];
          if (!local || dateMs(row.updated_at) >= dateMs(local.updatedAt)) {
            vocabulary.words[row.word_key] = {
              status: row.status,
              topicId: row.source_topic_id || '',
              learnedAt: row.learned_at || null,
              updatedAt: row.updated_at
            };
          }
        });
        (vocabularyTopicsResponse.data || []).forEach((row) => {
          const localTopic = vocabulary.topics[row.topic_id] || {};
          const localTests = localTopic.tests || [];
          const cloudTests = Array.isArray(row.tests) ? row.tests : [];
          const merged = new Map();
          [...localTests, ...cloudTests].forEach((test) => merged.set(test.completedAt || JSON.stringify(test), test));
          vocabulary.topics[row.topic_id] = {
            tests: [...merged.values()],
            legacyLearnedCount: Math.max(Number(localTopic.legacyLearnedCount || 0), Number(row.legacy_learned_count || 0)),
            legacyTotal: Math.max(Number(localTopic.legacyTotal || 0), Number(row.legacy_total || 0)),
            legacySource: localTopic.legacySource || row.legacy_source || '',
            legacyUpdatedAt: dateMs(row.legacy_updated_at) >= dateMs(localTopic.legacyUpdatedAt)
              ? row.legacy_updated_at
              : localTopic.legacyUpdatedAt
          };
        });
        storage.write(key('vocabulary'), normalizeVocabularyProgress(vocabulary));

        const grammar = this.loadGrammarProgress();
        (grammarResponse.data || []).forEach((row) => {
          const local = grammar.topics[row.topic_id] || {};
          grammar.topics[row.topic_id] = {
            passed: Boolean(local.passed || row.passed),
            passedAt: local.passedAt || row.passed_at || null,
            attempts: Math.max(Number(local.attempts || 0), Number(row.attempts || 0)),
            bestScore: Math.max(Number(local.bestScore || 0), Number(row.best_score || 0)),
            answers: Array.isArray(local.answers) ? local.answers : [],
            updatedAt: dateMs(row.updated_at) >= dateMs(local.updatedAt) ? row.updated_at : local.updatedAt
          };
        });
        storage.write(key('grammar'), grammar);
        await this.syncToCloud();
        return true;
      } finally {
        CloudService.syncing = false;
      }
    },
    async syncToCloud(section = 'all') {
      if (!CloudService.isConfigured()) return false;
      if (!CloudService.client) await CloudService.init();
      const client = CloudService.client;
      const sections = section === 'all' ? ['homework', 'vocabulary', 'grammar'] : [section];

      if (sections.includes('homework')) {
        const progress = this.loadHomeworkProgress();

        // Final submissions are maintained by the server-side Telegram function.
        // Do not send them back through a client-side upsert: PostgreSQL validates
        // the proposed INSERT row before resolving ON CONFLICT, which can reject
        // an otherwise existing final row when local report metadata is incomplete.
        const { data: cloudHomeworkRows, error: cloudHomeworkReadError } = await client
          .from(tables.homework)
          .select('lesson_id,status,report_status')
          .eq('student_id', studentId);
        if (cloudHomeworkReadError) throw cloudHomeworkReadError;

        const finalCloudLessonIds = new Set(
          (cloudHomeworkRows || [])
            .filter((row) => row.status === 'submitted' && row.report_status === 'sent')
            .map((row) => row.lesson_id)
        );

        const lessonIds = unique([...Object.keys(progress.results), ...Object.keys(progress.submissions)])
          .filter((lessonId) => !finalCloudLessonIds.has(lessonId));
        const rows = lessonIds.map((lessonId) => {
          const result = progress.results[lessonId] || {};
          const submission = progress.submissions[lessonId];
          const lesson = HOMEWORK_DATA.find((item) => item.id === lessonId) || {};
          const total = Number(result.total || 0);
          const correct = Number(result.correct || 0);
          const hasSubmission = Boolean(submission);
          const isFinalCloudSubmission = submission?.cloudStatus === 'submitted' && submission?.reportStatus === 'sent';
          const pendingReportStatus = ['pending', 'failed'].includes(submission?.reportStatus)
            ? submission.reportStatus
            : 'pending';
          return {
            student_id: studentId,
            student_name: safeText(student.nameRu || student.nameEn),
            lesson_id: lessonId,
            lesson_title: safeText(lesson.title, lessonId),
            status: hasSubmission
              ? (isFinalCloudSubmission ? 'submitted' : 'submitted_pending_report')
              : 'draft',
            answers: result.answers && typeof result.answers === 'object' ? result.answers : {},
            legacy_answers: result.legacyAnswers && typeof result.legacyAnswers === 'object' ? result.legacyAnswers : null,
            migrated_from_legacy: Boolean(result.migratedAt || result.legacyAnswers),
            score_correct: total > 0 ? correct : null,
            score_total: total > 0 ? total : null,
            score_percent: total > 0 ? safePercent(correct, total) : null,
            checked_at: result.checkedAt || null,
            submitted_at: submission?.savedAt || null,
            locked_at: submission?.savedAt || null,
            report_status: hasSubmission
              ? (isFinalCloudSubmission ? (submission.reportStatus || 'sent') : pendingReportStatus)
              : 'not_sent',
            report_sent_at: isFinalCloudSubmission
              ? (submission.reportSentAt || submission.savedAt || null)
              : null,
            report_error: isFinalCloudSubmission ? (submission.reportError || null) : (submission?.reportError || null)
          };
        });
        if (rows.length) {
          const { error } = await client.from(tables.homework).upsert(rows, { onConflict: 'student_id,lesson_id' });
          if (error) throw error;

          const pendingReportLessonIds = rows
            .filter((row) => row.status === 'submitted_pending_report' && ['pending', 'failed'].includes(row.report_status))
            .map((row) => row.lesson_id);
          if (pendingReportLessonIds.length) {
            await CloudService.retryHomeworkReports(pendingReportLessonIds);
          }
        }
      }

      if (sections.includes('vocabulary')) {
        const progress = this.loadVocabularyProgress();
        const wordRows = Object.entries(progress.words).filter(([wordKey]) => VOCABULARY_CATALOG.byKey.has(wordKey)).map(([wordKey, state]) => {
          const record = VOCABULARY_CATALOG.byKey.get(wordKey);
          return {
            student_id: studentId,
            word_key: wordKey,
            word_id: safeText(record?.word?.id, wordKey),
            en: safeText(record?.word?.en, wordKey),
            ru: safeText(record?.word?.ru),
            source_topic_id: state.topicId || record?.topicId || null,
            status: state.status,
            learned_at: state.status === 'known' ? (state.learnedAt || new Date().toISOString()) : null
          };
        });
        if (wordRows.length) {
          const { error } = await client.from(tables.vocabulary).upsert(wordRows, { onConflict: 'student_id,word_key' });
          if (error) throw error;
        }
        const topicRows = Object.entries(progress.topics)
          .filter(([, topic]) => (Array.isArray(topic.tests) && topic.tests.length) || Number(topic.legacyLearnedCount || 0) > 0)
          .map(([topicId, topic]) => ({
            student_id: studentId,
            topic_id: topicId,
            tests: Array.isArray(topic.tests) ? topic.tests : [],
            legacy_learned_count: Math.max(0, Number(topic.legacyLearnedCount || 0)),
            legacy_total: Math.max(0, Number(topic.legacyTotal || 0)),
            legacy_source: safeText(topic.legacySource) || null,
            legacy_updated_at: topic.legacyUpdatedAt || null
          }));
        if (topicRows.length) {
          const { error } = await client.from(tables.vocabularyTopics).upsert(topicRows, { onConflict: 'student_id,topic_id' });
          if (error) throw error;
        }
      }

      if (sections.includes('grammar')) {
        const progress = this.loadGrammarProgress();
        const rows = Object.entries(progress.topics).map(([topicId, state]) => ({
          student_id: studentId,
          topic_id: topicId,
          passed: Boolean(state.passed),
          attempts: Number(state.attempts || 0),
          best_score: Number(state.bestScore || 0),
          passed_at: state.passed ? (state.passedAt || state.updatedAt || new Date().toISOString()) : null
        }));
        if (rows.length) {
          const { error } = await client.from(tables.grammar).upsert(rows, { onConflict: 'student_id,topic_id' });
          if (error) throw error;
        }
      }
      return true;
    }
  };

  function fillConfig() {
    const values = {
      nameRu: student.nameRu,
      nameEn: student.nameEn,
      level: student.level,
      textbook: student.textbook,
      textbookEdition: student.textbookEdition
    };
    document.querySelectorAll('[data-config]').forEach((node) => {
      node.textContent = safeText(values[node.dataset.config]);
    });
    if (student.nameEn) document.title = `${document.title} · ${student.nameEn}`;
  }

  function markNavigation() {
    const page = document.body.dataset.page;
    document.querySelectorAll('[data-nav]').forEach((link) => {
      const active = link.dataset.nav === page;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
    });
  }

  function progressMarkup(label, value, total, tone = '') {
    const percent = safePercent(value, total);
    return `<div class="progress-row">
      <div class="progress-row-head"><strong>${escapeHtml(label)}</strong><span>${Number(value) || 0} of ${Number(total) || 0}</span></div>
      <div class="progress-track" role="progressbar" aria-label="${escapeHtml(label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}">
        <div class="progress-fill ${tone}" style="width:${percent}%"></div>
      </div>
    </div>`;
  }

  function exactKnownCountForTopic(progress, topic) {
    return (topic?.words || []).filter((word) => progress.words[word.__wordKey]?.status === 'known').length;
  }

  function effectiveKnownCountForTopic(progress, topic) {
    const exact = exactKnownCountForTopic(progress, topic);
    const legacy = Math.max(0, Number(progress.topics[topic?.id]?.legacyLearnedCount || 0));
    return Math.min(Number(topic?.words?.length || 0), Math.max(exact, legacy));
  }

  function effectiveKnownTotal(progress) {
    return VOCABULARY_DATA.reduce((sum, topic) => sum + effectiveKnownCountForTopic(progress, topic), 0);
  }

  function totals() {
    const hwProgress = window.ProgressService.loadHomeworkProgress();
    const vocabProgress = window.ProgressService.loadVocabularyProgress();
    const grammarProgress = window.ProgressService.loadGrammarProgress();
    const publishedHomework = HOMEWORK_DATA.filter((item) => ['available', 'completed', 'locked'].includes(item.status));
    const completedHomework = publishedHomework.filter((item) => hwProgress.completedIds.includes(item.id) || Boolean(hwProgress.submissions[item.id]) || item.status === 'completed').length;
    const knownWordCount = effectiveKnownTotal(vocabProgress);
    const passedGrammar = GRAMMAR_DATA.filter((topic) => grammarProgress.topics[topic.id]?.passed === true || topic.passed === true).length;
    return {
      homeworkTotal: publishedHomework.length,
      homeworkCompleted: completedHomework,
      vocabularyTotal: VOCABULARY_CATALOG.allWords.length,
      vocabularyKnown: knownWordCount,
      vocabularyTopics: VOCABULARY_DATA.length,
      grammarTotal: GRAMMAR_DATA.filter((topic) => topic.status !== 'draft').length,
      grammarPassed: passedGrammar
    };
  }

  function emptyState(icon, title, text) {
    return `<div class="card empty-state"><div class="empty-state-icon">${icon}</div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></div>`;
  }

  function renderHome() {
    const t = totals();
    if (byId('home-stat-completed')) byId('home-stat-completed').textContent = t.homeworkCompleted;
    if (byId('vocab-stat-known')) byId('vocab-stat-known').textContent = t.vocabularyKnown;
    if (byId('grammar-stat-passed')) byId('grammar-stat-passed').textContent = t.grammarPassed;
    const list = byId('home-progress-list');
    if (list) list.innerHTML = [
      progressMarkup('Homework', t.homeworkCompleted, t.homeworkTotal),
      progressMarkup('Vocabulary', t.vocabularyKnown, t.vocabularyTotal, 'rose'),
      progressMarkup('Grammar', t.grammarPassed, t.grammarTotal, 'green')
    ].join('');
    const current = byId('current-material');
    if (current) {
      const homeworkProgress = window.ProgressService.loadHomeworkProgress();
      const currentHomework = HOMEWORK_DATA
        .filter((item) => item.status === 'available' && !homeworkProgress.completedIds.includes(item.id) && !homeworkProgress.submissions[item.id])
        .sort((a, b) => Number(b.number || 0) - Number(a.number || 0) || dateMs(b.publishedAt) - dateMs(a.publishedAt))[0];

      if (currentHomework) {
        const href = currentHomework.page || `lesson.html?id=${encodeURIComponent(currentHomework.id)}`;
        current.innerHTML = `<a class="card interactive item-card current-material-card" href="${escapeHtml(href)}">
          <div class="item-icon">✨</div>
          <div class="item-main"><h3>${escapeHtml(safeText(currentHomework.title, 'Current homework'))}</h3><p>${escapeHtml(safeText(currentHomework.subtitle, 'Continue working with the published material.'))}</p></div>
          <span class="status-badge status-available">Continue</span>
        </a>`;
      } else {
        const publishedHomework = HOMEWORK_DATA.filter((item) => ['available', 'completed'].includes(item.status));
        const everythingCompleted = publishedHomework.length > 0 && publishedHomework.every((item) => item.status === 'completed' || homeworkProgress.completedIds.includes(item.id) || Boolean(homeworkProgress.submissions[item.id]));
        current.innerHTML = everythingCompleted
          ? '<a class="card interactive item-card current-material-card" href="homework.html"><div class="item-icon">✅</div><div class="item-main"><h3>All published materials are completed</h3><p>New material will appear after the teacher publishes it.</p></div><span class="arrow" aria-hidden="true">→</span></a>'
          : '<div class="card disabled empty-state"><div class="empty-state-icon">✨</div><h3>No current material has been published yet</h3><p>The latest available homework will appear here automatically.</p></div>';
      }
    }
  }

  function renderHomework() {
    const progress = window.ProgressService.loadHomeworkProgress();
    const published = HOMEWORK_DATA.filter((item) => item.status !== 'draft');

    const isComplete = (item) => progress.completedIds.includes(item.id)
      || Boolean(progress.submissions[item.id])
      || item.status === 'completed';

    const completionTime = (item) => {
      const submission = progress.submissions[item.id] || {};
      const result = progress.results[item.id] || {};
      const candidates = [
        submission.savedAt,
        submission.submittedAt,
        result.submittedAt,
        result.updatedAt,
        item.completedAt
      ];
      for (const value of candidates) {
        const timestamp = dateMs(value);
        if (timestamp) return timestamp;
      }
      return 0;
    };

    const newestLessonFirst = (a, b) => Number(b.number || 0) - Number(a.number || 0)
      || dateMs(b.publishedAt) - dateMs(a.publishedAt);

    const completedNewestFirst = (a, b) => completionTime(b) - completionTime(a)
      || Number(b.number || 0) - Number(a.number || 0);

    const completed = published.filter(isComplete).length;
    const percent = safePercent(completed, published.length);
    byId('hw-completed').textContent = completed;
    byId('hw-total').textContent = published.length;
    byId('hw-percent').textContent = `${percent}%`;
    byId('hw-overall-progress').innerHTML = progressMarkup('Overall progress', completed, published.length);

    const root = byId('homework-list');
    if (!published.length) {
      root.innerHTML = emptyState('📝', 'No homework has been published yet', 'After the first lesson, the teacher will add an interactive task here.');
      return;
    }

    const renderCard = (item) => {
      const locked = item.status === 'locked';
      const complete = isComplete(item);
      const lessonNumber = Number(item.number || 0);
      const numberPrefix = lessonNumber > 0 ? `Lesson ${lessonNumber} · ` : '';
      const title = locked
        ? `🔒 ${numberPrefix}Coming soon`
        : `${numberPrefix}${safeText(item.title, 'Homework')}`;
      const savedResult = progress.results[item.id];
      const scoreSuffix = savedResult && Number(savedResult.total || 0) > 0
        ? ` · Result ${Number(savedResult.correct || 0)}/${Number(savedResult.total || 0)}`
        : '';
      const subtitle = locked
        ? 'The material will open after the teacher publishes it.'
        : `${safeText(item.subtitle, 'Interactive task')}${scoreSuffix}`;
      const status = complete ? 'completed' : safeText(item.status, 'available');
      const label = complete ? 'Completed' : status === 'available' ? 'Available' : status === 'locked' ? 'Locked' : 'Draft';
      const tag = locked ? 'div' : 'a';
      const href = locked ? '' : ` href="${escapeHtml(item.page || `lesson.html?id=${encodeURIComponent(item.id)}`)}"`;
      return `<${tag} class="card item-card ${locked ? 'disabled' : 'interactive'}"${href}>
        <div class="item-icon">${complete ? '✅' : locked ? '🔒' : '📝'}</div>
        <div class="item-main"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(subtitle)}</p></div>
        <span class="status-badge status-${escapeHtml(status)}">${escapeHtml(label)}</span>
      </${tag}>`;
    };

    const renderGroup = (title, items, tone = '') => {
      if (!items.length) return '';
      return `<section class="homework-group ${tone}" aria-label="${escapeHtml(title)}">
        <div class="homework-group-heading">
          <h3>${escapeHtml(title)}</h3>
          <span>${items.length}</span>
        </div>
        <div class="homework-group-list">${items.map(renderCard).join('')}</div>
      </section>`;
    };

    const toDo = published
      .filter((item) => !isComplete(item) && item.status !== 'locked')
      .sort(newestLessonFirst);
    const done = published
      .filter(isComplete)
      .sort(completedNewestFirst);
    const comingSoon = published
      .filter((item) => !isComplete(item) && item.status === 'locked')
      .sort((a, b) => Number(a.number || 0) - Number(b.number || 0));

    root.innerHTML = [
      renderGroup('To do', toDo, 'homework-group-todo'),
      renderGroup('Completed', done, 'homework-group-done'),
      renderGroup('Soon', comingSoon, 'homework-group-locked')
    ].join('');
  }

  function renderGrammar() {
    const progress = window.ProgressService.loadGrammarProgress();
    const published = GRAMMAR_DATA.filter((topic) => topic.status !== 'draft');
    const passed = published.filter((topic) => progress.topics[topic.id]?.passed || topic.passed).length;
    byId('grammar-passed').textContent = passed;
    byId('grammar-total').textContent = published.length;
    byId('grammar-overall-progress').innerHTML = progressMarkup('Overall progress', passed, published.length, 'green');
    const root = byId('grammar-list');
    if (!published.length) {
      root.innerHTML = emptyState('📐', 'No grammar topics have been published yet', `Materials will be added according to the lessons and the coursebook «${safeText(student.textbook)}».`);
      return;
    }
    root.innerHTML = [...published].sort((a,b) => Number(b.order || 0) - Number(a.order || 0)).map((topic) => {
      const locked = topic.status === 'locked';
      const isPassed = progress.topics[topic.id]?.passed || topic.passed;
      const title = locked ? '🔒 Coming soon' : safeText(topic.title, 'Grammar topic');
      const tag = locked ? 'div' : 'a';
      const href = locked ? '' : ` href="${escapeHtml(topic.page || `grammar-topic.html?id=${encodeURIComponent(topic.id)}`)}"`;
      return `<${tag} class="card item-card ${locked ? 'disabled' : 'interactive'}"${href}>
        <div class="item-icon">${isPassed ? '✅' : locked ? '🔒' : '📐'}</div>
        <div class="item-main"><h3>${escapeHtml(title)}</h3><p>${locked ? 'The material has not been published yet.' : `${escapeHtml(topic.level || student.level)} · ${Number(progress.topics[topic.id]?.attempts || topic.attempts || 0)} attempts`}</p></div>
        <span class="status-badge status-${isPassed ? 'completed' : locked ? 'locked' : 'available'}">${isPassed ? 'Passed' : locked ? 'Locked' : 'Open'}</span>
      </${tag}>`;
    }).join('');
  }

  function renderVocabularyHub() {
    const progress = window.ProgressService.loadVocabularyProgress();
    const totalWords = VOCABULARY_CATALOG.allWords.length;
    const knownCount = effectiveKnownTotal(progress);
    byId('vocab-known').textContent = knownCount;
    byId('vocab-total').textContent = totalWords;
    byId('vocab-topics').textContent = VOCABULARY_DATA.length;
    byId('vocab-percent').textContent = `${safePercent(knownCount, totalWords)}%`;
    byId('vocab-overall-progress').innerHTML = progressMarkup('Overall progress', knownCount, totalWords, 'rose');
    const root = byId('vocabulary-list');
    const filters = byId('vocab-filters');

    const draw = (filter = 'all') => {
      const filtered = VOCABULARY_DATA.filter((topic) => {
        const topicKnown = effectiveKnownCountForTopic(progress, topic);
        const complete = topic.words.length > 0 && topicKnown >= topic.words.length;
        if (filter === 'completed') return complete;
        if (filter === 'lesson') return topic.type === 'lesson';
        if (filter === 'extra') return topic.type === 'extra';
        return true;
      });
      if (!filtered.length) {
        root.innerHTML = emptyState('💥', 'No vocabulary trainers have been published yet', 'New topics will appear after lessons. Duplicate words are skipped automatically.');
        return;
      }
      const newestTopics = [...filtered].sort((a, b) => {
        const lessonNumber = (topic) => Number(String(topic.linkedLessonId || '').match(/(\d+)(?!.*\d)/)?.[1] || topic.order || 0);
        return lessonNumber(b) - lessonNumber(a);
      });
      root.innerHTML = newestTopics.map((topic) => {
        const wordCount = topic.words.length;
        const topicKnown = effectiveKnownCountForTopic(progress, topic);
        const complete = wordCount > 0 && topicKnown >= wordCount;
        return `<a class="card item-card interactive" href="${escapeHtml(topic.page || `vocabulary.html?id=${encodeURIComponent(topic.id)}`)}">
          <div class="item-icon">${escapeHtml(topic.icon || '💬')}</div>
          <div class="item-main"><h3>${escapeHtml(topic.title || 'Vocabulary topic')}</h3><p>${escapeHtml(topic.label || '')} · ${topicKnown} of ${wordCount} words</p></div>
          <span class="status-badge status-${complete ? 'completed' : 'available'}">${complete ? 'Completed' : 'Open'}</span>
        </a>`;
      }).join('');
    };
    if (filters) {
      filters.onclick = (event) => {
        const button = event.target.closest('[data-filter]');
        if (!button) return;
        filters.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('active', item === button));
        draw(button.dataset.filter);
      };
    }
    draw();
  }

  function renderReadingSections(block) {
    const sections = Array.isArray(block.sections) ? block.sections : [];
    if (!sections.length) {
      const text = escapeHtml(block.text || '').replaceAll('\n', '<br>');
      return `<div class="reading-copy-wrap"><p class="reading-copy">${text}</p></div>`;
    }
    return `<div class="reading-sections">${sections.map((section) => `<section class="reading-section">
      <div class="reading-section-heading"><span class="reading-number">${escapeHtml(section.number || '')}</span><h4>${escapeHtml(section.heading || '')}</h4></div>
      <p class="reading-section-copy">${escapeHtml(section.text || '')}</p>
    </section>`).join('')}</div>`;
  }


  function renderMarkedDialogueLine(value) {
    const text = safeText(value);
    const pattern = /\[\[(\d+)\|([^\]]+)\]\]/g;
    let cursor = 0;
    let markup = '';
    let match;
    while ((match = pattern.exec(text))) {
      markup += escapeHtml(text.slice(cursor, match.index));
      markup += `<span class="dialogue-mistake"><sup>${escapeHtml(match[1])}</sup><u>${escapeHtml(match[2])}</u></span>`;
      cursor = pattern.lastIndex;
    }
    return markup + escapeHtml(text.slice(cursor));
  }

  function renderExerciseDialogue(block) {
    const lines = Array.isArray(block.dialogue) ? block.dialogue : [];
    if (!lines.length) return '';
    const dialogue = `<div class="exercise-dialogue" aria-label="Conversation">${lines.map((line) => `<p>${renderMarkedDialogueLine(line)}</p>`).join('')}</div>`;
    if (!block.dialogueCollapsible) return dialogue;
    const summary = safeText(block.dialogueSummary, 'Show transcript');
    return `<details class="exercise-transcript"><summary>${escapeHtml(summary)}</summary>${dialogue}</details>`;
  }

  function renderExerciseContentCards(block) {
    const cards = Array.isArray(block.contentCards) ? block.contentCards : [];
    if (!cards.length) return '';
    return `<section class="social-reading" aria-label="${escapeHtml(block.contentTitle || 'Reading text')}">
      ${block.contentTitle ? `<h4>${escapeHtml(block.contentTitle)}</h4>` : ''}
      <div class="social-reading-list">${cards.map((card) => {
        const image = card?.image || {};
        const source = typeof image === 'string' ? image : image.src;
        const alt = typeof image === 'string' ? '' : image.alt;
        return `<article class="social-reading-card">
          ${source ? `<img src="${escapeHtml(source)}" alt="${escapeHtml(alt || '')}" loading="lazy">` : ''}
          <p>${escapeHtml(card.text || '')}</p>
          ${card.author ? `<strong>${escapeHtml(card.author)}</strong>` : ''}
        </article>`;
      }).join('')}</div>
    </section>`;
  }

  function renderExerciseItem(item, blockId, index) {
    const itemId = safeText(item.id, `${index + 1}`);
    const number = item.number === undefined ? index + 1 : item.number;
    const prompt = escapeHtml(item.prompt || '').replaceAll('\n', '<br>');
    const inputId = `exercise-${blockId}-${itemId}`.replace(/[^a-zA-Z0-9_-]/g, '-');
    const numberMarkup = number === '' || number === null ? '' : `<span class="exercise-number">${escapeHtml(number)}</span>`;

    if (item.example) {
      return `<div class="exercise-item exercise-example" data-exercise-item="${escapeHtml(itemId)}">
        <div class="exercise-item-header">${numberMarkup}<div class="exercise-prompt">${prompt}</div></div>
        <div class="example-answer"><span>Example</span><strong>${escapeHtml(item.exampleAnswer || '')}</strong></div>
      </div>`;
    }

    let control = '';
    if (item.input === 'multiple' || item.input === 'single') {
      const inputType = item.input === 'multiple' ? 'checkbox' : 'radio';
      control = `<div class="option-list compact-options">${(item.options || []).map((option, optionIndex) => `<label class="option"><input type="${inputType}" name="${escapeHtml(inputId)}" value="${optionIndex}"><span>${escapeHtml(option)}</span></label>`).join('')}</div>`;
    } else if (item.input === 'select') {
      control = `<select id="${escapeHtml(inputId)}"><option value="">Choose an answer</option>${(item.options || []).map((option, optionIndex) => `<option value="${optionIndex}">${escapeHtml(option)}</option>`).join('')}</select>`;
    } else if (item.input === 'textarea') {
      control = `<textarea id="${escapeHtml(inputId)}" placeholder="${escapeHtml(item.placeholder || '')}"></textarea>`;
    } else if (item.input === 'inline-single') {
      const choices = Array.isArray(item.choices) ? item.choices : [];
      const segments = Array.isArray(item.segments) ? item.segments : [];
      const segmentMarkup = (segment) => escapeHtml(segment).replaceAll('\n', '<br>');
      control = `<div class="inline-choice-text">${choices.map((choice, choiceIndex) => `${choiceIndex < segments.length ? `<span>${segmentMarkup(segments[choiceIndex])}</span>` : ''}<span class="inline-choice-group" role="group" aria-label="Choice ${choice.number || choiceIndex + 1}">${choice.number ? `<sup>${escapeHtml(choice.number)}</sup>` : ''}${(choice.options || []).map((option, optionIndex) => `${optionIndex ? '<span class="inline-choice-slash">/</span>' : ''}<label><input type="radio" data-inline-choice="${choiceIndex}" name="${escapeHtml(inputId)}-choice-${choiceIndex}" value="${optionIndex}"><span>${escapeHtml(option)}</span></label>`).join('')}</span>`).join('')}${segments.length > choices.length ? `<span>${segmentMarkup(segments[segments.length - 1])}</span>` : ''}</div>`;
    } else if (item.input === 'gaps') {
      const answers = Array.isArray(item.answers) ? item.answers : [];
      const segments = Array.isArray(item.segments) ? item.segments : [];
      const gapClass = `${item.layout === 'dialogue' ? 'sentence-gaps is-dialogue' : 'sentence-gaps'}${item.wideGaps ? ' has-wide-gaps' : ''}`;
      const segmentMarkup = (segment) => escapeHtml(segment).replaceAll('\n', '<br>');
      control = `<div class="${gapClass}" aria-label="${prompt}">${answers.map((answer, gapIndex) => `${gapIndex < segments.length ? `<span>${segmentMarkup(segments[gapIndex])}</span>` : ''}<input class="gap-input" data-gap-index="${gapIndex}" aria-label="Gap ${gapIndex + 1}" autocomplete="off">`).join('')}${segments.length > answers.length ? `<span>${segmentMarkup(segments[segments.length - 1])}</span>` : ''}</div>`;
    } else if (item.input === 'select-gaps') {
      const answers = Array.isArray(item.answers) ? item.answers : [];
      const segments = Array.isArray(item.segments) ? item.segments : [];
      const options = Array.isArray(item.options) ? item.options : [];
      const gapClass = item.layout === 'dialogue' ? 'sentence-gaps is-dialogue has-select-gaps' : 'sentence-gaps has-select-gaps';
      const segmentMarkup = (segment) => escapeHtml(segment).replaceAll('\n', '<br>');
      const optionMarkup = options.map((option, optionIndex) => `<option value="${optionIndex}">${escapeHtml(option)}</option>`).join('');
      control = `<div class="${gapClass}" aria-label="${prompt}">${answers.map((answer, gapIndex) => `${gapIndex < segments.length ? `<span>${segmentMarkup(segments[gapIndex])}</span>` : ''}<select class="dialogue-answer-select" data-gap-index="${gapIndex}" aria-label="Response ${gapIndex + 1}"><option value="">Choose the full answer</option>${optionMarkup}</select>`).join('')}${segments.length > answers.length ? `<span>${segmentMarkup(segments[segments.length - 1])}</span>` : ''}</div>`;
    } else if (item.input === 'mark') {
      let markIndex = 0;
      const paragraphs = Array.isArray(item.paragraphs) ? item.paragraphs : [];
      control = `<div class="mark-text">${paragraphs.map((paragraph) => {
        const segments = Array.isArray(paragraph) ? paragraph : [paragraph];
        return `<p>${segments.map((segment) => {
          if (segment && typeof segment === 'object' && segment.word) {
            const currentIndex = markIndex;
            markIndex += 1;
            return `<button class="mark-word" type="button" data-mark-index="${currentIndex}" aria-pressed="false">${escapeHtml(segment.word)}</button>`;
          }
          return escapeHtml(segment || '');
        }).join('')}</p>`;
      }).join('')}</div>`;
    } else {
      control = `<input class="text-field" id="${escapeHtml(inputId)}" autocomplete="off" placeholder="${escapeHtml(item.placeholder || '')}">`;
    }

    return `<div class="exercise-item" data-exercise-item="${escapeHtml(itemId)}" data-input-type="${escapeHtml(item.input || 'text')}">
      <div class="exercise-item-header">${numberMarkup}<label class="exercise-prompt" for="${escapeHtml(inputId)}">${prompt}</label></div>
      <div class="exercise-control">${control}</div>
      <div class="feedback" aria-live="polite"></div>
    </div>`;
  }


  function clientGeneratedId(prefix = 'item') {
    if (window.crypto?.randomUUID) return `${prefix}-${window.crypto.randomUUID()}`;
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  const FAMILY_RELATIONS = {
    extended: ['grandmother', 'grandfather', 'grandparent', 'aunt', 'uncle', 'cousin', 'nephew', 'niece', 'grandson', 'granddaughter', 'relative'],
    parents: ['mother', 'father', 'parent', 'stepmother', 'stepfather', 'guardian'],
    siblings: ['me', 'brother', 'sister', 'sibling', 'son', 'daughter', 'child', 'partner', 'husband', 'wife']
  };

  function familyRelationOptions(group, selected = '') {
    const values = [...(FAMILY_RELATIONS[group] || FAMILY_RELATIONS.extended)];
    if (selected && !values.includes(selected)) values.push(selected);
    return values.map((value) => `<option value="${escapeHtml(value)}" ${value === selected ? 'selected' : ''}>${escapeHtml(value)}</option>`).join('');
  }

  function renderFamilyMemberCard(member = {}, group = 'extended') {
    const memberId = safeText(member.id, clientGeneratedId('family'));
    const removable = member.removable !== false;
    const showDetails = group !== 'extended' || member.showDetails === true;
    const compactClass = showDetails ? '' : ' is-compact';
    return `<article class="family-member-card${compactClass}" data-family-member data-member-id="${escapeHtml(memberId)}" data-family-group="${escapeHtml(group)}" data-member-fixed="${removable ? 'false' : 'true'}">
      <div class="family-member-topline">
        <label class="family-relation-field"><span>Relationship</span><select data-family-field="relation">${familyRelationOptions(group, safeText(member.relation, group === 'parents' ? 'parent' : group === 'siblings' ? 'sibling' : 'relative'))}</select></label>
        ${removable ? '<button class="family-icon-button" type="button" data-family-remove aria-label="Remove card" title="Remove card">×</button>' : '<span class="family-fixed-badge">You</span>'}
      </div>
      <label class="family-field"><span>Name</span><input type="text" data-family-field="name" value="${escapeHtml(member.name || '')}" placeholder="Name or initials" autocomplete="off"></label>
      <div class="family-extra-fields">
        <label class="family-field"><span>Age <small>optional</small></span><input type="text" inputmode="numeric" data-family-field="age" value="${escapeHtml(member.age || '')}" placeholder="Age" autocomplete="off"></label>
        <label class="family-field"><span>City <small>optional</small></span><input type="text" data-family-field="city" value="${escapeHtml(member.city || '')}" placeholder="City" autocomplete="off"></label>
        <label class="family-field family-field-wide"><span>Work or study <small>optional</small></span><input type="text" data-family-field="occupation" value="${escapeHtml(member.occupation || '')}" placeholder="She works ... / He studies ..." autocomplete="off"></label>
        <label class="family-field family-field-wide"><span>Hobby <small>optional</small></span><input type="text" data-family-field="hobby" value="${escapeHtml(member.hobby || '')}" placeholder="She likes ... / He likes ..." autocomplete="off"></label>
      </div>
      ${group === 'extended' ? `<button class="family-details-toggle" type="button" data-family-details aria-expanded="${showDetails ? 'true' : 'false'}">${showDetails ? 'Hide details' : 'Add details'}</button>` : ''}
    </article>`;
  }

  function renderFamilyTier(group, title, subtitle, members) {
    return `<section class="family-tree-tier" data-family-tier="${escapeHtml(group)}">
      <div class="family-tier-heading"><div><strong>${escapeHtml(title)}</strong><span>${escapeHtml(subtitle)}</span></div></div>
      <div class="family-tier-cards" data-family-cards="${escapeHtml(group)}">${members.map((member) => renderFamilyMemberCard(member, group)).join('')}</div>
    </section>`;
  }

  function renderFamilyTreeBlock(block, id, title) {
    const members = Array.isArray(block.initialMembers) ? block.initialMembers : [];
    const byGroup = (group) => members.filter((member) => safeText(member.group) === group);
    return `<article class="card lesson-block family-tree-card" data-task="${escapeHtml(id)}" data-type="family-tree">
      <div class="manual-task-heading"><span class="eyebrow">Personal project</span><h3>${title}</h3>${block.instructions ? `<p class="muted">${escapeHtml(block.instructions)}</p>` : ''}</div>
      <div class="family-tree-editor" data-family-tree>
        ${renderFamilyTier('extended', 'Grandparents and other relatives', 'Name and relationship are optional', byGroup('extended'))}
        <div class="family-tree-connector" aria-hidden="true"></div>
        ${renderFamilyTier('parents', 'Parents or guardians', 'You can add more details here', byGroup('parents'))}
        <div class="family-tree-connector" aria-hidden="true"></div>
        ${renderFamilyTier('siblings', 'You, brothers and sisters', 'The You card cannot be removed; the others can be changed', byGroup('siblings'))}
        <div class="family-tree-add-row" aria-label="Add card">
          <button class="btn btn-secondary btn-small" type="button" data-family-add="parents">+ Parent</button>
          <button class="btn btn-secondary btn-small" type="button" data-family-add="siblings">+ Brother / sister</button>
          <button class="btn btn-secondary btn-small" type="button" data-family-add="extended">+ Other relative</button>
        </div>
        <p class="family-tree-privacy">🔒 You do not have to give surnames, exact ages, or addresses. Initials and invented details are fine.</p>
      </div>
      <div class="feedback" aria-live="polite"></div>
    </article>`;
  }

  function renderGuidedWritingBlock(block, id, title) {
    const starters = Array.isArray(block.starters) ? block.starters : [];
    return `<article class="card lesson-block guided-writing-card" data-task="${escapeHtml(id)}" data-type="guided-writing" data-min-sentences="${Number(block.minSentences || 0)}" data-max-sentences="${Number(block.maxSentences || 0)}">
      <div class="manual-task-heading"><span class="eyebrow">Writing</span><h3>${title}</h3>${block.instructions ? `<p class="muted">${escapeHtml(block.instructions)}</p>` : ''}</div>
      ${starters.length ? `<div class="sentence-starters" aria-label="Sentence starters"><span>Click to add:</span>${starters.map((starter) => `<button type="button" data-writing-starter="${escapeHtml(starter)}">${escapeHtml(starter)}</button>`).join('')}</div>` : ''}
      <textarea data-guided-writing placeholder="${escapeHtml(block.placeholder || '')}"></textarea>
      <div class="writing-counter"><span data-sentence-counter>0 sentences</span><span>Recommended length: ${Number(block.minSentences || 6)}–${Number(block.maxSentences || 8)}</span></div>
      <div class="feedback" aria-live="polite"></div>
    </article>`;
  }

  function renderWordGroupsBlock(block, id, title) {
    return `<article class="card lesson-block optional-task-card" data-task="${escapeHtml(id)}" data-type="word-groups">
      <details>
        <summary><span><strong>${title}</strong><small>Optional · optional task</small></span><span class="optional-chevron" aria-hidden="true">⌄</span></summary>
        <div class="optional-task-body">
          ${block.instructions ? `<p class="muted">${escapeHtml(block.instructions)}</p>` : ''}
          <div class="family-word-groups">
            <label><span>Female</span><textarea data-word-group="female" placeholder="mother, sister, ..."></textarea></label>
            <label><span>Male</span><textarea data-word-group="male" placeholder="father, brother, ..."></textarea></label>
            <label><span>Both</span><textarea data-word-group="both" placeholder="parent, cousin, ..."></textarea></label>
          </div>
        </div>
      </details>
      <div class="feedback" aria-live="polite"></div>
    </article>`;
  }

  function renderMiniInterviewBlock(block, id, title) {
    const questions = Array.isArray(block.questions) ? block.questions : [];
    return `<article class="card lesson-block optional-task-card" data-task="${escapeHtml(id)}" data-type="mini-interview">
      <details>
        <summary><span><strong>${title}</strong><small>Optional · you can do a real or imaginary interview</small></span><span class="optional-chevron" aria-hidden="true">⌄</span></summary>
        <div class="optional-task-body">
          ${block.instructions ? `<p class="muted">${escapeHtml(block.instructions)}</p>` : ''}
          <div class="interview-person-row">
            <label class="family-field"><span>Person</span><input type="text" data-interview-person placeholder="my mother / my cousin" autocomplete="off"></label>
          </div>
          <div class="interview-questions">${questions.map((question, index) => `<label class="interview-question"><span><strong>${index + 1}</strong>${escapeHtml(question)}</span><input type="text" data-interview-answer="${index}" placeholder="Short answer" autocomplete="off"></label>`).join('')}</div>
          <label class="interview-summary"><span>Optional mini-story</span><textarea data-interview-summary placeholder="I interviewed my ... Her/His name is ..."></textarea></label>
        </div>
      </details>
      <div class="feedback" aria-live="polite"></div>
    </article>`;
  }

  function collectFamilyTree(node) {
    return {
      members: [...node.querySelectorAll('[data-family-member]')].map((card) => ({
        id: safeText(card.dataset.memberId, clientGeneratedId('family')),
        group: safeText(card.dataset.familyGroup, 'extended'),
        relation: card.querySelector('[data-family-field="relation"]')?.value || '',
        name: card.querySelector('[data-family-field="name"]')?.value || '',
        age: card.querySelector('[data-family-field="age"]')?.value || '',
        city: card.querySelector('[data-family-field="city"]')?.value || '',
        occupation: card.querySelector('[data-family-field="occupation"]')?.value || '',
        hobby: card.querySelector('[data-family-field="hobby"]')?.value || '',
        showDetails: !card.classList.contains('is-compact'),
        removable: card.dataset.memberFixed !== 'true'
      }))
    };
  }

  function collectWordGroups(node) {
    return {
      female: node.querySelector('[data-word-group="female"]')?.value || '',
      male: node.querySelector('[data-word-group="male"]')?.value || '',
      both: node.querySelector('[data-word-group="both"]')?.value || ''
    };
  }

  function collectMiniInterview(node) {
    return {
      person: node.querySelector('[data-interview-person]')?.value || '',
      answers: [...node.querySelectorAll('[data-interview-answer]')].map((input) => input.value || ''),
      summary: node.querySelector('[data-interview-summary]')?.value || ''
    };
  }

  function restoreFamilyTree(node, saved) {
    const members = Array.isArray(saved?.members) ? saved.members : null;
    if (!members) return;
    ['extended', 'parents', 'siblings'].forEach((group) => {
      const container = node.querySelector(`[data-family-cards="${group}"]`);
      if (!container) return;
      container.innerHTML = members.filter((member) => safeText(member.group) === group).map((member) => renderFamilyMemberCard(member, group)).join('');
    });
  }

  function updateSentenceCounter(node) {
    const textarea = node.querySelector('[data-guided-writing]');
    const counter = node.querySelector('[data-sentence-counter]');
    if (!textarea || !counter) return;
    const text = textarea.value.trim();
    const count = text ? text.split(/[.!?]+|\n+/).map((part) => part.trim()).filter(Boolean).length : 0;
    const min = Number(node.dataset.minSentences || 0);
    const max = Number(node.dataset.maxSentences || 0);
    counter.textContent = `${count} ${count === 1 ? 'sentence' : count > 1 && count < 5 ? 'sentences' : 'sentences'}`;
    counter.classList.toggle('is-ready', min > 0 && count >= min && (!max || count <= max));
  }

  function setupManualLessonWidgets(root) {
    root.querySelectorAll('[data-type="guided-writing"]').forEach(updateSentenceCounter);

    root.addEventListener('input', (event) => {
      const writing = event.target.closest('[data-type="guided-writing"]');
      if (writing) updateSentenceCounter(writing);
    });

    root.addEventListener('click', (event) => {
      const addButton = event.target.closest('[data-family-add]');
      if (addButton) {
        const task = addButton.closest('[data-type="family-tree"]');
        const group = safeText(addButton.dataset.familyAdd, 'extended');
        const container = task?.querySelector(`[data-family-cards="${CSS.escape(group)}"]`);
        if (!container) return;
        const count = task.querySelectorAll('[data-family-member]').length;
        if (count >= 24) {
          showToast('There are already 24 cards in the tree; that should be enough even for a very large family.');
          return;
        }
        const relation = group === 'parents' ? 'parent' : group === 'siblings' ? 'sibling' : 'relative';
        container.insertAdjacentHTML('beforeend', renderFamilyMemberCard({ id: clientGeneratedId('family'), relation, showDetails: group !== 'extended', removable: true }, group));
        container.lastElementChild?.querySelector('[data-family-field="name"]')?.focus();
        task.dispatchEvent(new Event('input', { bubbles: true }));
        return;
      }

      const removeButton = event.target.closest('[data-family-remove]');
      if (removeButton) {
        const card = removeButton.closest('[data-family-member]');
        const hasText = [...card.querySelectorAll('input')].some((input) => input.value.trim());
        if (hasText && !window.confirm('Remove this filled-in card?')) return;
        const task = card.closest('[data-type="family-tree"]');
        card.remove();
        task?.dispatchEvent(new Event('input', { bubbles: true }));
        return;
      }

      const detailsButton = event.target.closest('[data-family-details]');
      if (detailsButton) {
        const card = detailsButton.closest('[data-family-member]');
        const willShow = card.classList.contains('is-compact');
        card.classList.toggle('is-compact', !willShow);
        detailsButton.setAttribute('aria-expanded', willShow ? 'true' : 'false');
        detailsButton.textContent = willShow ? 'Hide details' : 'Add details';
        card.closest('[data-type="family-tree"]')?.dispatchEvent(new Event('input', { bubbles: true }));
        return;
      }

      const starterButton = event.target.closest('[data-writing-starter]');
      if (starterButton) {
        const task = starterButton.closest('[data-type="guided-writing"]');
        const textarea = task?.querySelector('[data-guided-writing]');
        if (!textarea) return;
        const starter = safeText(starterButton.dataset.writingStarter);
        const separator = textarea.value.trim() ? (textarea.value.endsWith('\n') ? '' : '\n') : '';
        const start = textarea.selectionStart ?? textarea.value.length;
        const before = textarea.value.slice(0, start);
        const after = textarea.value.slice(textarea.selectionEnd ?? start);
        textarea.value = `${before}${separator}${starter}${after}`;
        textarea.focus();
        textarea.setSelectionRange((before + separator + starter).length, (before + separator + starter).length);
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  }

  function renderLessonAudio(block) {
    const speech = block?.speech && typeof block.speech === 'object' ? block.speech : null;
    if (!speech) return block.audio ? `<audio class="audio-player" controls preload="none" src="${escapeHtml(block.audio)}"></audio>` : '';

    const lines = Array.isArray(speech.lines) ? speech.lines.map((line) => {
      if (line && typeof line === 'object') {
        return { text: safeText(line.text), voice: safeText(line.voice) };
      }
      return { text: safeText(line), voice: '' };
    }).filter((line) => line.text) : [];
    const speechText = lines.map((line) => line.text).join(' ');
    if (!speechText) return block.audio ? `<audio class="audio-player" controls preload="none" src="${escapeHtml(block.audio)}"></audio>` : '';

    const lang = safeText(speech.lang, 'en-GB');
    const rate = Math.min(1.35, Math.max(0.7, Number(speech.rate || 1)));
    const label = safeText(speech.label, 'Natural voice · conversational speed');
    const fallback = block.audio ? `<audio class="audio-player" controls preload="none" src="${escapeHtml(block.audio)}" data-speech-fallback hidden></audio>` : '';
    return `<div class="speech-player" data-speech-player data-speech-text="${escapeHtml(speechText)}" data-speech-lines="${escapeHtml(JSON.stringify(lines))}" data-speech-lang="${escapeHtml(lang)}" data-speech-rate="${rate}">
      <div class="button-row">
        <button class="btn btn-secondary" type="button" data-speech-play>▶ Listen</button>
        <button class="btn btn-secondary" type="button" data-speech-stop hidden>■ Stop</button>
      </div>
      <p class="muted">${escapeHtml(label)}</p>
      ${fallback}
    </div>`;
  }

  function setupSpeechPlayers(root) {
    const players = [...root.querySelectorAll('[data-speech-player]')];
    if (!players.length) return;

    const synthesisAvailable = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    if (!synthesisAvailable) {
      players.forEach((player) => {
        player.querySelector('[data-speech-play]')?.setAttribute('hidden', '');
        player.querySelector('[data-speech-stop]')?.setAttribute('hidden', '');
        player.querySelector('[data-speech-fallback]')?.removeAttribute('hidden');
      });
      return;
    }

    let activePlayer = null;
    const resetPlayer = (player) => {
      if (!player) return;
      const play = player.querySelector('[data-speech-play]');
      const stop = player.querySelector('[data-speech-stop]');
      if (play) {
        play.removeAttribute('hidden');
        play.textContent = '▶ Listen';
      }
      if (stop) stop.setAttribute('hidden', '');
      player.classList.remove('is-speaking');
    };

    const stopSpeech = () => {
      window.speechSynthesis.cancel();
      resetPlayer(activePlayer);
      activePlayer = null;
    };

    players.forEach((player) => {
      const playButton = player.querySelector('[data-speech-play]');
      const stopButton = player.querySelector('[data-speech-stop]');
      if (!playButton) return;

      playButton.addEventListener('click', () => {
        stopSpeech();
        let lines = [];
        try {
          const storedLines = JSON.parse(player.dataset.speechLines || '[]');
          if (Array.isArray(storedLines)) {
            lines = storedLines.map((line) => {
              if (line && typeof line === 'object') return { text: safeText(line.text), voice: safeText(line.voice) };
              return { text: safeText(line), voice: '' };
            }).filter((line) => line.text);
          }
        } catch (error) {
          lines = [];
        }
        if (!lines.length) {
          const text = safeText(player.dataset.speechText);
          if (text) lines = [{ text, voice: '' }];
        }
        if (!lines.length) return;
        const lang = safeText(player.dataset.speechLang, 'en-GB');
        const rate = Math.min(1.35, Math.max(0.7, Number(player.dataset.speechRate || 1)));
        const languagePrefix = lang.toLowerCase().split('-')[0];
        const matchingVoices = window.speechSynthesis.getVoices().filter((voice) => voice.lang.toLowerCase().startsWith(languagePrefix));
        // The waiter deliberately uses the device's standard en-GB voice,
        // exactly like the pronunciation buttons in Vocabulary.
        const vocabularyVoice = matchingVoices.find((item) => item.default)
          || matchingVoices.find((item) => item.lang.toLowerCase() === lang.toLowerCase())
          || matchingVoices[0]
          || null;
        const customerVoice = matchingVoices.find((item) => /samantha/i.test(item.name))
          || matchingVoices.find((item) => /serena|sonia|kate|google uk english female/i.test(item.name))
          || vocabularyVoice;

        activePlayer = player;
        player.classList.add('is-speaking');
        playButton.setAttribute('hidden', '');
        stopButton?.removeAttribute('hidden');

        const speakLine = (lineIndex) => {
          if (activePlayer !== player) return;
          if (lineIndex >= lines.length) {
            activePlayer = null;
            resetPlayer(player);
            return;
          }
          const line = lines[lineIndex];
          const utterance = new SpeechSynthesisUtterance(line.text);
          utterance.lang = lang;
          utterance.rate = rate;
          utterance.pitch = 1;
          utterance.volume = 1;
          const voice = line.voice === 'customer' ? customerVoice : null;
          if (voice) utterance.voice = voice;
          utterance.onend = () => {
            if (activePlayer !== player) return;
            window.setTimeout(() => speakLine(lineIndex + 1), 220);
          };
          utterance.onerror = () => {
            if (activePlayer === player) activePlayer = null;
            resetPlayer(player);
            const fallback = player.querySelector('[data-speech-fallback]');
            if (fallback) fallback.removeAttribute('hidden');
          };
          window.speechSynthesis.speak(utterance);
        };
        speakLine(0);
      });

      stopButton?.addEventListener('click', stopSpeech);
    });

    window.addEventListener('pagehide', stopSpeech, { once: true });
  }

  function readingQuizPartsMarkup(parts, mode = 'fill') {
    const values = Array.isArray(parts) ? parts : [parts];
    return values.map((part) => {
      if (part && typeof part === 'object' && part.gap) {
        const gapId = safeText(part.gap);
        if (mode === 'inject') return `<span class="reading-injected-gap" data-inject-gap="${escapeHtml(gapId)}"></span>`;
        const options = (window.__readingQuizWordBank || []).map((word) => `<option value="${escapeHtml(word)}">${escapeHtml(word)}</option>`).join('');
        return `<span class="reading-gap-wrap" data-reading-gap-wrap="${escapeHtml(gapId)}"><sup>${escapeHtml(gapId)}</sup><select class="reading-gap-select" data-quiz-gap="${escapeHtml(gapId)}" aria-label="Gap ${escapeHtml(gapId)}"><option value="">Choose</option>${options}</select><span class="reading-gap-feedback" aria-live="polite"></span></span>`;
      }
      return escapeHtml(part || '');
    }).join('');
  }

  function readingQuizQuestionsMarkup(block, mode = 'fill', taskId = '') {
    const questions = Array.isArray(block?.quiz?.questions) ? block.quiz.questions : [];
    const personal = mode === 'personal';
    return `<div class="reading-quiz-questions ${personal ? 'is-personal' : 'is-fill'}">${questions.map((question) => {
      const number = safeText(question.number);
      const questionText = readingQuizPartsMarkup(question.question, personal ? 'inject' : 'fill');
      const options = (Array.isArray(question.options) ? question.options : []).map((option) => {
        const letter = safeText(option.letter);
        const optionText = readingQuizPartsMarkup(option.text, personal ? 'inject' : 'fill');
        const control = personal
          ? `<input type="radio" name="${escapeHtml(taskId)}-personal-${escapeHtml(number)}" value="${escapeHtml(letter)}" data-personal-question="${escapeHtml(number)}">`
          : '';
        const tag = personal ? 'label' : 'div';
        return `<${tag} class="reading-quiz-option${personal ? ' is-selectable' : ''}">${control}<strong>${escapeHtml(letter)}</strong><span>${optionText}</span></${tag}>`;
      }).join('');
      return `<section class="reading-quiz-question" data-reading-question="${escapeHtml(number)}"><h4><span>${escapeHtml(number)}</span>${questionText}</h4><div class="reading-quiz-options">${options}</div></section>`;
    }).join('')}</div>`;
  }

  function readingQuizKeyMarkup(block) {
    const entries = Array.isArray(block?.partB?.key) ? block.partB.key : [];
    return `<aside class="reading-key-card"><strong class="reading-key-label">Key</strong>${entries.map((entry) => `<p><b>${escapeHtml(entry.title || `Mostly ${entry.letter}:`)}</b> ${escapeHtml(entry.text || '')}</p>`).join('')}</aside>`;
  }

  function renderReadingQuizBlock(block, id, title) {
    const partA = block.partA || {};
    const partB = block.partB || {};
    const partC = block.partC || {};
    const wordBank = Array.isArray(partA.wordBank) ? partA.wordBank : [];
    const people = Array.isArray(partC.people) ? partC.people : [];
    const matchOptions = ['a', 'b', 'c'];
    const quiz = block.quiz || {};
    window.__readingQuizWordBank = wordBank;
    return `<article class="card lesson-block reading-quiz-block" data-task="${escapeHtml(id)}" data-type="reading-quiz">
      <div class="reading-quiz-section-head"><span class="eyebrow">${escapeHtml(title || 'READING')}</span></div>
      <section class="reading-part reading-part-a">
        <div class="reading-part-heading"><strong>${escapeHtml(partA.label || '4A')}</strong><p>${escapeHtml(partA.instructions || '')}</p></div>
        ${wordBank.length ? `<div class="reading-word-bank" aria-label="Words in the box">${wordBank.map((word) => `<span>${escapeHtml(word)}</span>`).join('')}</div>` : ''}
        <div class="reading-quiz-layout">
          <div class="reading-quiz-reference">
            <div class="reading-quiz-banner" aria-label="Alone or together quiz illustration">
              <div class="reading-banner-copy"><span>${escapeHtml(quiz.title || 'QUIZ')}</span><h3>${escapeHtml(quiz.headline || '')}</h3><p>${escapeHtml(quiz.intro || '')}</p></div>
              <div class="reading-cafe-illustration" aria-hidden="true"><span class="person p1"></span><span class="person p2"></span><span class="person p3"></span><span class="person p4"></span><span class="cafe-table"></span><span class="cup c1"></span><span class="cup c2"></span></div>
            </div>
          </div>
          <div class="reading-quiz-work">${readingQuizQuestionsMarkup(block, 'fill', id)}</div>
        </div>
      </section>
      <section class="reading-bc-grid">
        <div class="reading-key-sticky">${readingQuizKeyMarkup(block)}</div>
        <div class="reading-bc-work">
          <section class="reading-part reading-part-b">
            <div class="reading-part-heading"><strong>${escapeHtml(partB.label || 'B')}</strong><p>${escapeHtml(partB.instructions || '')}</p></div>
            <div class="reading-personal-lock" data-personal-lock>Complete all gaps in 4A first.</div>
            <div class="reading-personal-quiz" data-personal-quiz hidden>${readingQuizQuestionsMarkup(block, 'personal', id)}</div>
          </section>
          <section class="reading-part reading-part-c">
            <div class="reading-part-heading"><strong>${escapeHtml(partC.label || 'C')}</strong><p>${escapeHtml(partC.instructions || '')}</p></div>
            <div class="reading-person-list">${people.map((person) => `<article class="reading-person-row" data-reading-person="${escapeHtml(person.number)}"><div class="reading-person-copy"><strong>${escapeHtml(person.number)}</strong><p>${escapeHtml(person.text || '')}</p></div><div class="reading-match-control"><select data-reading-match="${escapeHtml(person.number)}" aria-label="Match person ${escapeHtml(person.number)}"><option value="">Choose</option>${matchOptions.map((option) => `<option value="${option}">${option}</option>`).join('')}</select><span class="reading-match-feedback feedback" aria-live="polite"></span></div></article>`).join('')}</div>
          </section>
        </div>
      </section>
      <div class="reading-quiz-summary feedback" aria-live="polite"></div>
    </article>`;
  }

  function collectReadingQuizAnswers(node) {
    const gaps = {};
    node.querySelectorAll('[data-quiz-gap]').forEach((input) => { gaps[safeText(input.dataset.quizGap)] = input.value; });
    const personal = {};
    node.querySelectorAll('[data-personal-question]:checked').forEach((input) => { personal[safeText(input.dataset.personalQuestion)] = safeText(input.value); });
    const matches = {};
    node.querySelectorAll('[data-reading-match]').forEach((select) => { matches[safeText(select.dataset.readingMatch)] = safeText(select.value); });
    return { gaps, personal, matches };
  }

  function updateReadingQuizDependency(node, block) {
    const answers = block?.partA?.answers && typeof block.partA.answers === 'object' ? block.partA.answers : {};
    const gapIds = Object.keys(answers);
    const inputs = gapIds.map((gapId) => node.querySelector(`[data-quiz-gap="${CSS.escape(gapId)}"]`));
    const complete = inputs.length === gapIds.length && inputs.every((input) => safeText(input?.value).trim() !== '');
    const personalQuiz = node.querySelector('[data-personal-quiz]');
    const lock = node.querySelector('[data-personal-lock]');
    if (personalQuiz) personalQuiz.hidden = !complete;
    if (lock) lock.hidden = complete;
    node.querySelectorAll('[data-personal-question]').forEach((input) => { input.disabled = !complete; });
    if (!complete) return;
    gapIds.forEach((gapId) => {
      const value = safeText(node.querySelector(`[data-quiz-gap="${CSS.escape(gapId)}"]`)?.value).trim();
      node.querySelectorAll(`[data-inject-gap="${CSS.escape(gapId)}"]`).forEach((target) => { target.textContent = value; });
    });
  }

  function restoreReadingQuizAnswers(node, block, value) {
    const gaps = value?.gaps && typeof value.gaps === 'object' ? value.gaps : {};
    Object.entries(gaps).forEach(([gapId, answer]) => {
      const input = node.querySelector(`[data-quiz-gap="${CSS.escape(safeText(gapId))}"]`);
      if (input) input.value = safeText(answer);
    });
    const personal = value?.personal && typeof value.personal === 'object' ? value.personal : {};
    Object.entries(personal).forEach(([questionId, answer]) => {
      const input = node.querySelector(`[data-personal-question="${CSS.escape(safeText(questionId))}"][value="${CSS.escape(safeText(answer))}"]`);
      if (input) input.checked = true;
    });
    const matches = value?.matches && typeof value.matches === 'object' ? value.matches : {};
    Object.entries(matches).forEach(([personId, answer]) => {
      const select = node.querySelector(`[data-reading-match="${CSS.escape(safeText(personId))}"]`);
      if (select) select.value = safeText(answer);
    });
    updateReadingQuizDependency(node, block);
  }

  function setupReadingQuizBlocks(root, blocks) {
    blocks.filter((block) => block.type === 'reading-quiz').forEach((block, index) => {
      const taskId = safeText(block.id, `task-${index}`);
      const node = root.querySelector(`[data-task="${CSS.escape(taskId)}"]`);
      if (!node) return;
      node.querySelectorAll('[data-quiz-gap]').forEach((input) => input.addEventListener('input', () => updateReadingQuizDependency(node, block)));
      updateReadingQuizDependency(node, block);
    });
  }

  function setupExerciseDependencies(root, blocks) {
    blocks.filter((block) => block.type === 'exercise' && safeText(block.dependsOn)).forEach((block, index) => {
      const targetId = safeText(block.id, `task-${index}`);
      const target = root.querySelector(`[data-task="${CSS.escape(targetId)}"]`);
      const source = blocks.find((candidate) => safeText(candidate.id) === safeText(block.dependsOn));
      const sourceNode = source ? root.querySelector(`[data-task="${CSS.escape(safeText(source.id))}"]`) : null;
      if (!target || !source || !sourceNode) return;

      const status = target.querySelector('[data-exercise-dependency]');
      const controls = [...target.querySelectorAll('input, select, textarea')];
      const update = () => {
        const sourceItems = Array.isArray(source.items) ? source.items.filter((item) => !item.example) : [];
        const selected = sourceItems.map((item, itemIndex) => {
          const itemNode = sourceNode.querySelector(`[data-exercise-item="${CSS.escape(safeText(item.id, `${itemIndex + 1}`))}"]`);
          if (!itemNode) return '';
          if (item.input === 'single') return itemNode.querySelector('input:checked')?.value ?? '';
          if (item.input === 'select') return itemNode.querySelector('select')?.value ?? '';
          return itemNode.querySelector('input, textarea')?.value?.trim() || '';
        });
        const ready = sourceItems.length > 0 && selected.every((value) => value !== '');
        controls.forEach((control) => { control.disabled = !ready; });
        if (!status) return;
        if (!ready) {
          status.textContent = safeText(block.dependencyWaitingText, 'Complete the previous exercise first.');
          status.classList.remove('is-ready');
          return;
        }
        const sourceOptions = sourceItems.flatMap((item) => Array.isArray(item.options) ? item.options : []);
        const chosen = new Set(sourceItems.map((item, itemIndex) => item.options?.[Number(selected[itemIndex])]).filter(Boolean));
        const remaining = unique(sourceOptions.filter((option) => !chosen.has(option)));
        status.textContent = `${safeText(block.dependencyReadyText, 'Use these answers from the previous exercise:')} ${remaining.join(' · ')}`;
        status.classList.add('is-ready');
      };
      sourceNode.addEventListener('input', update);
      sourceNode.addEventListener('change', update);
      update();
    });
  }

  function renderLessonBlock(block, index) {
    const id = safeText(block.id, `task-${index}`);
    const title = escapeHtml(block.title || block.prompt || `Homework ${index + 1}`);
    const text = escapeHtml(block.text || '').replaceAll('\n', '<br>');

    if (block.type === 'section') {
      return `<header id="lesson-section-${index}" class="lesson-section-title lesson-block" data-lesson-section><span class="lesson-section-step">${escapeHtml(block.__sectionNumber || index + 1)}</span><div><span class="eyebrow">${escapeHtml(block.eyebrow || 'Material')}</span><h2>${title}</h2>${text ? `<p class="muted">${text}</p>` : ''}</div></header>`;
    }
    if (block.type === 'info') return `<article class="card info-card lesson-block"><h3>${title}</h3><p>${text}</p></article>`;
    if (block.type === 'tip') return `<article class="card tip-card lesson-block"><h3>${title}</h3><p>${text}</p></article>`;
    if (block.type === 'grammar-link') {
      const grammarId = safeText(block.grammarId);
      const href = grammarId ? `grammar-topic.html?id=${encodeURIComponent(grammarId)}` : 'grammar.html';
      return `<article class="card lesson-block grammar-link-card"><div class="grammar-link-icon" aria-hidden="true">∑</div><div><span class="eyebrow">Grammar</span><h3>${title}</h3>${text ? `<p>${text}</p>` : ''}</div><a class="btn btn-primary" href="${escapeHtml(href)}">${escapeHtml(block.buttonLabel || 'Open topic')}</a></article>`;
    }
    if (block.type === 'reading') {
      const sectionCount = Array.isArray(block.sections) ? block.sections.length : 0;
      return `<article class="card lesson-block reading-card"><div class="reading-title"><div><span class="eyebrow">Reading</span><h3>${title}</h3></div>${sectionCount ? `<span class="reading-count">${sectionCount} sections</span>` : ''}</div>${renderReadingSections(block)}</article>`;
    }
    if (block.type === 'reading-quiz') return renderReadingQuizBlock(block, id, title);
    if (block.type === 'exercise') {
      const items = Array.isArray(block.items) ? block.items : [];
      const wordBank = Array.isArray(block.wordBank) && block.wordBank.length
        ? `<div class="word-bank" aria-label="Word bank"><strong class="word-bank-label">Word bank</strong>${block.wordBank.map((word) => `<span>${escapeHtml(word)}</span>`).join('')}</div>`
        : '';
      const player = renderLessonAudio(block);
      const mediaItems = Array.isArray(block.images) ? block.images : block.image ? [block.image] : [];
      const media = mediaItems.length ? `<div class="exercise-media-grid">${mediaItems.map((image) => {
        const source = typeof image === 'string' ? image : image?.src;
        const alt = typeof image === 'string' ? '' : image?.alt;
        const caption = typeof image === 'string' ? '' : image?.caption;
        const compact = typeof image === 'string' ? false : Boolean(image?.compact);
        if (!source) return '';
        return `<figure class="exercise-media${compact ? ' is-compact' : ''}"><img src="${escapeHtml(source)}" alt="${escapeHtml(alt || '')}" loading="lazy">${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ''}</figure>`;
      }).join('')}</div>` : '';
      const dialogue = renderExerciseDialogue(block);
      const contentCards = renderExerciseContentCards(block);
      const stickyImage = block.stickyImage && typeof block.stickyImage === 'object' && block.stickyImage.src
        ? `<figure class="exercise-sticky-media"><img src="${escapeHtml(block.stickyImage.src)}" alt="${escapeHtml(block.stickyImage.alt || '')}" loading="lazy">${block.stickyImage.caption ? `<figcaption>${escapeHtml(block.stickyImage.caption)}</figcaption>` : ''}</figure>`
        : '';
      const exerciseItems = `<div class="exercise-items">${items.map((item, itemIndex) => renderExerciseItem(item, id, itemIndex)).join('')}</div>`;
      const dependency = block.dependsOn ? `<p class="exercise-dependency" data-exercise-dependency></p>` : '';
      return `<article class="card lesson-block exercise-card${stickyImage ? ' has-sticky-media' : ''}" data-task="${escapeHtml(id)}" data-type="exercise">
        <div class="exercise-heading"><span class="eyebrow">Exercise</span><h3>${title}</h3>${block.instructions ? `<p class="muted exercise-instructions">${escapeHtml(block.instructions)}</p>` : ''}${player}${wordBank}${media}${dialogue}${contentCards}</div>
        ${dependency}${stickyImage ? `<div class="exercise-sticky-layout">${stickyImage}${exerciseItems}</div>` : exerciseItems}
      </article>`;
    }
    if (block.type === 'family-tree') return renderFamilyTreeBlock(block, id, title);
    if (block.type === 'guided-writing') return renderGuidedWritingBlock(block, id, title);
    if (block.type === 'word-groups') return renderWordGroupsBlock(block, id, title);
    if (block.type === 'mini-interview') return renderMiniInterviewBlock(block, id, title);
    if (block.type === 'text' || block.type === 'translate') return `<article class="card lesson-block" data-task="${escapeHtml(id)}" data-type="${escapeHtml(block.type)}"><label class="field-label" for="${escapeHtml(id)}">${title}</label>${block.source ? `<p class="muted">${escapeHtml(block.source)}</p>` : ''}<input class="text-field" id="${escapeHtml(id)}" name="${escapeHtml(id)}" autocomplete="off"><div class="feedback"></div></article>`;
    if (block.type === 'textarea') return `<article class="card lesson-block" data-task="${escapeHtml(id)}" data-type="textarea"><label class="field-label" for="${escapeHtml(id)}">${title}</label><textarea id="${escapeHtml(id)}" name="${escapeHtml(id)}"></textarea><div class="feedback"></div></article>`;
    if (block.type === 'single' || block.type === 'multiple') {
      const inputType = block.type === 'single' ? 'radio' : 'checkbox';
      const options = (block.options || []).map((option, optionIndex) => `<label class="option"><input type="${inputType}" name="${escapeHtml(id)}" value="${optionIndex}"><span>${escapeHtml(option)}</span></label>`).join('');
      return `<article class="card lesson-block" data-task="${escapeHtml(id)}" data-type="${escapeHtml(block.type)}"><h3>${title}</h3><div class="option-list">${options}</div><div class="feedback"></div></article>`;
    }
    if (block.type === 'select') {
      const options = (block.options || []).map((option, optionIndex) => `<option value="${optionIndex}">${escapeHtml(option)}</option>`).join('');
      return `<article class="card lesson-block" data-task="${escapeHtml(id)}" data-type="select"><label class="field-label" for="${escapeHtml(id)}">${title}</label><select id="${escapeHtml(id)}"><option value="">Choose an answer</option>${options}</select><div class="feedback"></div></article>`;
    }
    if (block.type === 'match') {
      const rights = (block.pairs || []).map((pair) => pair.right);
      const rows = (block.pairs || []).map((pair, pairIndex) => `<div>${escapeHtml(pair.left)}</div><select data-match-index="${pairIndex}"><option value="">Choose a match</option>${rights.map((right, rightIndex) => `<option value="${rightIndex}">${escapeHtml(right)}</option>`).join('')}</select>`).join('');
      return `<article class="card lesson-block" data-task="${escapeHtml(id)}" data-type="match"><h3>${title}</h3><div class="match-grid">${rows}</div><div class="feedback"></div></article>`;
    }
    if (block.type === 'reorder') {
      const chips = shuffled(block.words || []).map((word) => `<button class="word-chip" type="button" data-word="${escapeHtml(word)}">${escapeHtml(word)}</button>`).join('');
      return `<article class="card lesson-block" data-task="${escapeHtml(id)}" data-type="reorder"><h3>${title}</h3><div class="word-chips" data-reorder-source>${chips}</div><label class="field-label" for="${escapeHtml(id)}">Built answer</label><input class="text-field" id="${escapeHtml(id)}" readonly><div class="feedback"></div></article>`;
    }
    if (block.type === 'audio') {
      const player = renderLessonAudio(block) || '<p class="muted">No audio file has been attached yet.</p>';
      const response = block.response === false ? '' : `<input class="text-field" id="${escapeHtml(id)}" aria-label="Answer to the audio task"><div class="feedback"></div>`;
      const taskAttrs = block.response === false ? '' : ` data-task="${escapeHtml(id)}" data-type="audio"`;
      return `<article class="card lesson-block audio-card"${taskAttrs}><div class="audio-icon" aria-hidden="true">🎧</div><div class="audio-content"><h3>${title}</h3>${text ? `<p class="muted">${text}</p>` : ''}${player}${response}</div></article>`;
    }
    return '';
  }

  function normalizeAnswer(value) {
    return safeText(value)
      .normalize('NFKC')
      .replace(/[’‘`]/g, "'")
      .trim()
      .toLocaleLowerCase('en')
      .replace(/[.!?,;:]+$/g, '')
      .replace(/\s+/g, ' ');
  }

  function textAnswerMatches(item, actual) {
    const accepted = Array.isArray(item.acceptedAnswers) && item.acceptedAnswers.length
      ? item.acceptedAnswers
      : Array.isArray(item.answer) ? item.answer : [item.answer];
    return accepted.some((answer) => normalizeAnswer(answer) !== '' && normalizeAnswer(answer) === normalizeAnswer(actual));
  }

  function checkExerciseItem(item, itemNode) {
    const inputType = item.input || 'text';
    let actual;
    let correct = false;

    if (inputType === 'multiple') {
      actual = [...itemNode.querySelectorAll('input:checked')].map((input) => Number(input.value)).sort((a, b) => a - b);
      const expected = [...(item.answer || [])].map(Number).sort((a, b) => a - b);
      correct = JSON.stringify(actual) === JSON.stringify(expected);
    } else if (inputType === 'single') {
      actual = itemNode.querySelector('input:checked')?.value ?? '';
      correct = Number(actual) === Number(item.answer);
    } else if (inputType === 'select') {
      actual = itemNode.querySelector('select')?.value ?? '';
      correct = actual !== '' && Number(actual) === Number(item.answer);
    } else if (inputType === 'inline-single') {
      const choices = Array.isArray(item.choices) ? item.choices : [];
      actual = choices.map((_, choiceIndex) => itemNode.querySelector(`input[data-inline-choice="${choiceIndex}"]:checked`)?.value ?? '');
      const choiceResults = choices.map((choice, choiceIndex) => actual[choiceIndex] !== '' && Number(actual[choiceIndex]) === Number(choice.answer));
      correct = choices.length > 0 && choiceResults.every(Boolean);
      return { actual, correct, scoreCorrect: choiceResults.filter(Boolean).length, scoreTotal: choices.length };
    } else if (inputType === 'gaps') {
      actual = [...itemNode.querySelectorAll('[data-gap-index]')].map((input) => input.value);
      const expected = Array.isArray(item.answers) ? item.answers : [];
      const gapResults = expected.map((answer, index) => {
        const accepted = Array.isArray(answer) ? answer : [answer];
        return accepted.some((variant) => normalizeAnswer(variant) === normalizeAnswer(actual[index]));
      });
      correct = expected.length > 0 && gapResults.every(Boolean);
      return { actual, correct, scoreCorrect: gapResults.filter(Boolean).length, scoreTotal: expected.length };
    } else if (inputType === 'select-gaps') {
      actual = [...itemNode.querySelectorAll('[data-gap-index]')].map((select) => select.value);
      const expected = Array.isArray(item.answers) ? item.answers : [];
      const gapResults = expected.map((answer, index) => actual[index] !== '' && Number(actual[index]) === Number(answer));
      correct = expected.length > 0 && gapResults.every(Boolean);
      return { actual, correct, scoreCorrect: gapResults.filter(Boolean).length, scoreTotal: expected.length };
    } else if (inputType === 'mark') {
      actual = [...itemNode.querySelectorAll('[data-mark-index].is-selected')].map((button) => Number(button.dataset.markIndex)).sort((a, b) => a - b);
      const expected = [...(item.answer || [])].map(Number).sort((a, b) => a - b);
      const expectedSet = new Set(expected);
      const selectedSet = new Set(actual);
      const scoreCorrect = expected.filter((value) => selectedSet.has(value)).length;
      correct = actual.length === expected.length && actual.every((value) => expectedSet.has(value));
      return { actual, correct, scoreCorrect, scoreTotal: expected.length };
    } else {
      actual = itemNode.querySelector('input, textarea')?.value || '';
      correct = textAnswerMatches(item, actual);
    }

    return { actual, correct };
  }

  function checkExerciseBlock(block, node) {
    const actual = {};
    let correctCount = 0;
    let total = 0;

    (Array.isArray(block.items) ? block.items : []).forEach((item, index) => {
      if (item.example) return;
      const itemId = safeText(item.id, `${index + 1}`);
      const itemNode = node.querySelector(`[data-exercise-item="${CSS.escape(itemId)}"]`);
      if (!itemNode) return;
      const result = checkExerciseItem(item, itemNode);
      actual[itemId] = result.actual;
      const feedback = itemNode.querySelector('.feedback');

      if (item.scored === false) {
        itemNode.classList.remove('is-correct', 'is-wrong');
        itemNode.classList.add('is-saved');
        if (feedback) {
          feedback.className = 'feedback show neutral';
          feedback.textContent = 'The answer has been saved for the teacher.';
        }
        return;
      }

      const itemTotal = Number.isFinite(Number(result.scoreTotal)) && Number(result.scoreTotal) > 0 ? Number(result.scoreTotal) : 1;
      const itemCorrect = Number.isFinite(Number(result.scoreCorrect)) ? Number(result.scoreCorrect) : result.correct ? 1 : 0;
      total += itemTotal;
      correctCount += itemCorrect;
      itemNode.classList.toggle('is-correct', result.correct);
      itemNode.classList.toggle('is-wrong', !result.correct);
      itemNode.classList.remove('is-saved');
      if (feedback) {
        feedback.className = `feedback show ${result.correct ? 'good' : 'bad'}`;
        feedback.textContent = result.correct ? 'Correct!' : safeText(item.explanation, 'Check your answer and try again.');
      }
    });

    return { actual, correctCount, total };
  }

  function checkReadingQuizBlock(block, node) {
    const actual = collectReadingQuizAnswers(node);
    const gapAnswers = block?.partA?.answers && typeof block.partA.answers === 'object' ? block.partA.answers : {};
    const matchAnswers = block?.partC?.answers && typeof block.partC.answers === 'object' ? block.partC.answers : {};
    let correctCount = 0;
    let total = 0;

    Object.entries(gapAnswers).forEach(([gapId, expected]) => {
      total += 1;
      const input = node.querySelector(`[data-quiz-gap="${CSS.escape(safeText(gapId))}"]`);
      const wrap = node.querySelector(`[data-reading-gap-wrap="${CSS.escape(safeText(gapId))}"]`);
      const feedback = wrap?.querySelector('.reading-gap-feedback');
      const correct = normalizeAnswer(input?.value) === normalizeAnswer(expected);
      if (correct) correctCount += 1;
      wrap?.classList.toggle('is-correct', correct);
      wrap?.classList.toggle('is-wrong', !correct);
      if (feedback) feedback.textContent = '';
    });

    Object.entries(matchAnswers).forEach(([personId, expected]) => {
      total += 1;
      const row = node.querySelector(`[data-reading-person="${CSS.escape(safeText(personId))}"]`);
      const select = node.querySelector(`[data-reading-match="${CSS.escape(safeText(personId))}"]`);
      const feedback = row?.querySelector('.reading-match-feedback');
      const correct = safeText(select?.value) === safeText(expected);
      if (correct) correctCount += 1;
      row?.classList.toggle('is-correct', correct);
      row?.classList.toggle('is-wrong', !correct);
      if (feedback) {
        feedback.className = 'reading-match-feedback feedback';
        feedback.textContent = '';
      }
    });

    const personalCount = Object.keys(actual.personal || {}).length;
    const requiredPersonalCount = Array.isArray(block?.quiz?.questions) ? block.quiz.questions.length : 0;
    const requiredComplete = requiredPersonalCount === 0 || personalCount >= requiredPersonalCount;
    const summary = node.querySelector('.reading-quiz-summary');
    if (summary) {
      summary.className = 'reading-quiz-summary feedback show neutral';
      summary.textContent = requiredComplete
        ? 'Personal answers from Part B are saved and are not included in the score.'
        : 'Complete all personal answers in Part B. They are not included in the score.';
    }
    return { actual, correctCount, total, requiredComplete };
  }

  function checkLessonTask(block, node) {
    if (block.type === 'reading-quiz') return checkReadingQuizBlock(block, node);
    if (block.type === 'exercise') return checkExerciseBlock(block, node);
    if (block.type === 'family-tree') return { actual: collectFamilyTree(node), correctCount: 0, total: 0, manual: true };
    if (block.type === 'guided-writing') return { actual: node.querySelector('[data-guided-writing]')?.value || '', correctCount: 0, total: 0, manual: true };
    if (block.type === 'word-groups') return { actual: collectWordGroups(node), correctCount: 0, total: 0, manual: true };
    if (block.type === 'mini-interview') return { actual: collectMiniInterview(node), correctCount: 0, total: 0, manual: true };
    let actual;
    let correct = false;
    if (block.type === 'single') {
      actual = node.querySelector('input:checked')?.value;
      correct = Number(actual) === Number(block.answer);
    } else if (block.type === 'multiple') {
      actual = [...node.querySelectorAll('input:checked')].map((input) => Number(input.value)).sort((a,b) => a-b);
      const expected = [...(block.answer || [])].map(Number).sort((a,b) => a-b);
      correct = JSON.stringify(actual) === JSON.stringify(expected);
    } else if (block.type === 'select') {
      actual = node.querySelector('select')?.value;
      correct = Number(actual) === Number(block.answer);
    } else if (block.type === 'match') {
      actual = [...node.querySelectorAll('[data-match-index]')].map((select) => Number(select.value));
      correct = actual.length > 0 && actual.every((value, index) => value === index);
    } else {
      actual = node.querySelector('input, textarea')?.value || '';
      if (Array.isArray(block.answer)) correct = block.answer.some((answer) => normalizeAnswer(answer) === normalizeAnswer(actual));
      else correct = normalizeAnswer(block.answer) !== '' && normalizeAnswer(block.answer) === normalizeAnswer(actual);
    }
    return { correctCount: correct ? 1 : 0, total: 1, actual };
  }

  function restoreExerciseAnswers(block, node, saved) {
    if (!saved || typeof saved !== 'object') return;
    (Array.isArray(block.items) ? block.items : []).forEach((item, index) => {
      if (item.example) return;
      const itemId = safeText(item.id, `${index + 1}`);
      const value = saved[itemId];
      if (value === undefined) return;
      const itemNode = node.querySelector(`[data-exercise-item="${CSS.escape(itemId)}"]`);
      if (!itemNode) return;
      const inputType = item.input || 'text';
      if (inputType === 'multiple') {
        const selected = new Set(Array.isArray(value) ? value.map(Number) : []);
        itemNode.querySelectorAll('input[type="checkbox"]').forEach((input) => { input.checked = selected.has(Number(input.value)); });
      } else if (inputType === 'single') {
        const input = itemNode.querySelector(`input[value="${CSS.escape(safeText(value))}"]`);
        if (input) input.checked = true;
      } else if (inputType === 'select') {
        const select = itemNode.querySelector('select');
        if (select) select.value = safeText(value);
      } else if (inputType === 'inline-single') {
        const values = Array.isArray(value) ? value : [];
        itemNode.querySelectorAll('[data-inline-choice]').forEach((input) => {
          const choiceIndex = Number(input.dataset.inlineChoice);
          input.checked = safeText(values[choiceIndex]) === input.value;
        });
      } else if (inputType === 'gaps' || inputType === 'select-gaps') {
        const values = Array.isArray(value) ? value : [];
        itemNode.querySelectorAll('[data-gap-index]').forEach((input, gapIndex) => { input.value = safeText(values[gapIndex]); });
      } else if (inputType === 'mark') {
        const selected = new Set(Array.isArray(value) ? value.map(Number) : []);
        itemNode.querySelectorAll('[data-mark-index]').forEach((button) => {
          const active = selected.has(Number(button.dataset.markIndex));
          button.classList.toggle('is-selected', active);
          button.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
      } else {
        const input = itemNode.querySelector('input, textarea');
        if (input) input.value = safeText(value);
      }
    });
  }

  function restoreLessonAnswers(root, blocks, savedAnswers) {
    if (!savedAnswers || typeof savedAnswers !== 'object') return;
    blocks.forEach((block, index) => {
      const taskId = safeText(block.id, `task-${index}`);
      const value = savedAnswers[taskId];
      if (value === undefined) return;
      const node = root.querySelector(`[data-task="${CSS.escape(taskId)}"]`);
      if (!node) return;
      if (block.type === 'reading-quiz') {
        restoreReadingQuizAnswers(node, block, value);
      } else if (block.type === 'exercise') {
        restoreExerciseAnswers(block, node, value);
      } else if (block.type === 'family-tree') {
        restoreFamilyTree(node, value);
      } else if (block.type === 'guided-writing') {
        const textarea = node.querySelector('[data-guided-writing]');
        if (textarea) textarea.value = safeText(value);
        updateSentenceCounter(node);
      } else if (block.type === 'word-groups') {
        ['female', 'male', 'both'].forEach((group) => {
          const textarea = node.querySelector(`[data-word-group="${group}"]`);
          if (textarea) textarea.value = safeText(value?.[group]);
        });
        if (Object.values(value || {}).some((item) => safeText(item).trim())) node.querySelector('details')?.setAttribute('open', '');
      } else if (block.type === 'mini-interview') {
        const person = node.querySelector('[data-interview-person]');
        if (person) person.value = safeText(value?.person);
        const answers = Array.isArray(value?.answers) ? value.answers : [];
        node.querySelectorAll('[data-interview-answer]').forEach((input, answerIndex) => { input.value = safeText(answers[answerIndex]); });
        const summary = node.querySelector('[data-interview-summary]');
        if (summary) summary.value = safeText(value?.summary);
        if (safeText(value?.person).trim() || answers.some((item) => safeText(item).trim()) || safeText(value?.summary).trim()) node.querySelector('details')?.setAttribute('open', '');
      } else if (block.type === 'single') {
        const input = node.querySelector(`input[value="${CSS.escape(safeText(value))}"]`);
        if (input) input.checked = true;
      } else if (block.type === 'multiple') {
        const selected = new Set(Array.isArray(value) ? value.map(Number) : []);
        node.querySelectorAll('input[type="checkbox"]').forEach((input) => { input.checked = selected.has(Number(input.value)); });
      } else if (block.type === 'select') {
        const select = node.querySelector('select');
        if (select) select.value = safeText(value);
      } else if (block.type === 'match') {
        const values = Array.isArray(value) ? value : [];
        node.querySelectorAll('[data-match-index]').forEach((select, matchIndex) => { select.value = safeText(values[matchIndex]); });
      } else {
        const input = node.querySelector('input, textarea');
        if (input) input.value = safeText(value);
      }
    });
  }

  function showLessonTaskResult(block, node, result) {
    if (block.type === 'exercise' || block.type === 'reading-quiz') return;
    const total = Number(result.total || 0);
    const correctCount = Number(result.correctCount || 0);
    if (result.manual || MANUAL_LESSON_TYPES.includes(block.type) || total === 0) {
      node.classList.remove('is-correct', 'is-wrong');
      node.classList.add('is-saved');
      const feedback = node.querySelector('.feedback');
      if (feedback) {
        feedback.className = 'feedback show neutral';
        feedback.textContent = 'The answer has been saved for teacher review.';
      }
      return;
    }
    const isCorrect = total > 0 && correctCount === total;
    node.classList.toggle('is-correct', isCorrect);
    node.classList.toggle('is-wrong', !isCorrect);
    const feedback = node.querySelector('.feedback');
    if (feedback) {
      feedback.className = `feedback show ${isCorrect ? 'good' : 'bad'}`;
      feedback.textContent = isCorrect ? 'Correct!' : safeText(block.explanation, 'There is a mistake in the answer.');
    }
  }

  function reviewRestoredLesson(root, blocks) {
    const checkableTypes = LESSON_TASK_TYPES;
    blocks
      .filter((block) => checkableTypes.includes(block.type) && !(block.type === 'audio' && block.response === false))
      .forEach((block, index) => {
        const taskId = safeText(block.id, `task-${index}`);
        const node = root.querySelector(`[data-task="${CSS.escape(taskId)}"]`);
        if (!node) return;
        const result = checkLessonTask(block, node);
        showLessonTaskResult(block, node, result);
      });
  }

  function lockCompletedLesson(root) {
    root.classList.add('lesson-is-locked');
    root.querySelectorAll('input, textarea').forEach((control) => {
      if (control.type === 'radio' || control.type === 'checkbox') {
        control.disabled = true;
      } else {
        control.readOnly = true;
        control.setAttribute('aria-readonly', 'true');
      }
    });
    root.querySelectorAll('select, button[data-word], [data-task] button').forEach((control) => {
      control.disabled = true;
    });
  }

  async function renderLesson() {
    const id = queryParam('id');
    const lessonRecord = HOMEWORK_DATA.find((item) => item.id === id && item.status !== 'draft');
    const root = byId('lesson-root');
    if (!lessonRecord || lessonRecord.status === 'locked') {
      root.innerHTML = emptyState('📝', 'This homework has not been published yet', 'The teacher will add the material after the lesson.');
      return;
    }

    byId('lesson-hero-title').textContent = safeText(lessonRecord.title, 'Homework');
    byId('lesson-hero-subtitle').textContent = safeText(lessonRecord.subtitle, 'Interactive practice');
    root.innerHTML = '<div class="card empty-state compact-empty"><div class="empty-state-icon">⏳</div><h3>Loading homework...</h3></div>';

    let lesson;
    try {
      lesson = await resolveLessonContent(lessonRecord);
    } catch (error) {
      console.error('Lesson content loading error:', error);
      root.innerHTML = emptyState('⚠️', 'Could not load the homework', 'Check that the lesson JSON file exists in data/lessons and has the correct structure.');
      return;
    }

    const blocks = Array.isArray(lesson?.blocks) ? lesson.blocks : [];
    if (!blocks.length) {
      root.innerHTML = emptyState('📝', 'This homework has not been published yet', 'The content will appear after the teacher prepares it.');
      return;
    }

    const progress = window.ProgressService.loadHomeworkProgress();
    const savedResult = progress.results[lesson.id];
    const savedRequiredComplete = blocks.every((block) => {
      if (block.type !== 'reading-quiz' || block.manualResponses !== true) return true;
      const personal = savedResult?.answers?.[safeText(block.id)]?.personal;
      const required = Array.isArray(block?.quiz?.questions) ? block.quiz.questions.length : 0;
      return required === 0 || Object.keys(personal && typeof personal === 'object' ? personal : {}).length >= required;
    });
    const hasCheckedResult = Boolean(savedResult && Number(savedResult.total || 0) > 0 && savedRequiredComplete);
    const isCompleted = progress.completedIds.includes(lesson.id)
      || Boolean(progress.submissions[lesson.id])
      || lessonRecord.status === 'completed';
    const isManualOnly = Number(lesson.totalPoints || 0) <= 0;
    const pointsLabel = isManualOnly ? 'Teacher review' : `${escapeHtml(lesson.totalPoints)} checked answers`;
    const hasManualResponses = isManualOnly || blocks.some((block) => block.manualResponses === true || MANUAL_LESSON_TYPES.includes(block.type) || (block.type === 'exercise' && (block.items || []).some((item) => item.scored === false)));
    const lessonSections = blocks
      .map((block, blockIndex) => block.type === 'section' ? { block, blockIndex } : null)
      .filter(Boolean);
    const roadmap = lessonSections.length
      ? `<nav class="card lesson-roadmap" aria-label="Homework plan"><div class="lesson-roadmap-heading"><span class="eyebrow">Task plan</span><p>${isManualOnly ? 'Work through the blocks at your own pace; the draft is saved automatically.' : 'Work through the blocks in order; answers are saved after checking.'}</p></div><ol>${lessonSections.map(({ block, blockIndex }, sectionIndex) => `<li><a href="#lesson-section-${blockIndex}"><span>${sectionIndex + 1}</span><strong>${escapeHtml(block.title || `Part ${sectionIndex + 1}`)}</strong></a></li>`).join('')}</ol></nav>`
      : '';
    let sectionNumber = 0;
    const renderedBlocks = blocks.map((block, blockIndex) => {
      if (block.type === 'section') sectionNumber += 1;
      return renderLessonBlock(block.type === 'section' ? { ...block, __sectionNumber: sectionNumber } : block, blockIndex);
    }).join('');
    const actionsMarkup = isCompleted
      ? `<div class="card section lesson-actions lesson-completed-panel"><div id="lesson-result" aria-live="polite"></div><div class="completed-lock-message"><span class="completed-lock-icon" aria-hidden="true">🔒</span><div><h3>Homework submitted</h3><p class="muted">The answers have been saved and sent to the teacher. You cannot change them after submission.</p></div></div></div>`
      : isManualOnly
        ? `<div class="card section lesson-actions manual-lesson-actions"><div id="lesson-result" aria-live="polite"><p class="muted" data-draft-status>The draft is saved automatically on this device and synced with Supabase.</p></div><div class="button-row"><button class="btn btn-secondary" id="check-lesson" type="button">Save draft</button><button class="btn btn-primary" id="submit-lesson" type="button">Send to the teacher</button></div><p class="muted save-note">The site does not grade this task. Before sending it, check the family tree and the 6-8 sentence text; extra tasks can be left empty.</p></div>`
        : `<div class="card section lesson-actions"><div id="lesson-result" aria-live="polite"></div><div class="button-row"><button class="btn btn-primary" id="check-lesson" type="button">Check answers</button><button class="btn btn-secondary" id="submit-lesson" type="button" ${hasCheckedResult ? '' : 'disabled'}>Send to the teacher</button></div><p class="muted save-note">After checking, answers are saved on the device and synced with Supabase.</p></div>`;
    root.innerHTML = `<div class="card lesson-intro"><div><span class="eyebrow">Homework</span><p>${escapeHtml(lesson.subtitle || '')}</p></div><span class="lesson-points">${pointsLabel}</span></div>
      ${roadmap}
      <div id="lesson-blocks">${renderedBlocks}</div>
      ${actionsMarkup}`;

    const restoredAnswers = mergeLessonAnswers(
      convertLegacyHomeworkAnswers(lesson.id, savedResult?.legacyAnswers, lesson),
      savedResult?.answers
    );
    restoreLessonAnswers(root, blocks, restoredAnswers);
    setupReadingQuizBlocks(root, blocks);
    setupExerciseDependencies(root, blocks);
    setupManualLessonWidgets(root);
    setupSpeechPlayers(root);
    root.querySelectorAll('[data-mark-index]').forEach((button) => {
      button.addEventListener('click', () => {
        const active = !button.classList.contains('is-selected');
        button.classList.toggle('is-selected', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    });
    if (savedResult && Number(savedResult.total) > 0) {
      byId('lesson-result').innerHTML = `<h3>Saved result: ${Number(savedResult.correct || 0)} of ${Number(savedResult.total || 0)}</h3><p class="muted">${Number(savedResult.percent || 0)}% correct answers</p>`;
    } else if (savedResult && isManualOnly && !isCompleted) {
      byId('lesson-result').innerHTML = '<p class="muted" data-draft-status>Saved draft restored. You can continue from the same place.</p>';
    }
    if (savedResult && (isManualOnly || Number(savedResult.total || 0) > 0)) reviewRestoredLesson(root, blocks);
    if (isCompleted) lockCompletedLesson(root);
    if (window.location.hash === '#lesson-result') {
      window.requestAnimationFrame(() => {
        byId('lesson-result')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
    }

    root.querySelectorAll('[data-reorder-source]').forEach((source) => {
      source.addEventListener('click', (event) => {
        const chip = event.target.closest('[data-word]');
        if (!chip) return;
        chip.classList.toggle('selected');
        const parent = source.closest('[data-task]');
        const input = parent.querySelector('input');
        const selected = [...source.querySelectorAll('.selected')].map((item) => item.dataset.word);
        input.value = selected.join(' ');
      });
    });

    const collectCurrentLessonAnswers = () => {
      const answers = {};
      const checkable = blocks.filter((block) => LESSON_TASK_TYPES.includes(block.type) && !(block.type === 'audio' && block.response === false));
      checkable.forEach((block, index) => {
        const taskId = safeText(block.id, `task-${index}`);
        const node = root.querySelector(`[data-task="${CSS.escape(taskId)}"]`);
        if (!node) return;
        answers[taskId] = block.type === 'reading-quiz'
          ? collectReadingQuizAnswers(node)
          : checkLessonTask(block, node).actual;
      });
      return answers;
    };

    const hasInteractiveAutosave = !isManualOnly && blocks.some((block) => block.autosaveDraft === true);
    const saveInteractiveDraft = () => {
      const updatedProgress = window.ProgressService.loadHomeworkProgress();
      const previous = updatedProgress.results[lesson.id] || {};
      updatedProgress.results[lesson.id] = {
        ...previous,
        correct: 0,
        total: 0,
        percent: 0,
        answers: collectCurrentLessonAnswers(),
        checkedAt: null,
        draftUpdatedAt: new Date().toISOString()
      };
      window.ProgressService.saveHomeworkProgress(updatedProgress);
      const submit = byId('submit-lesson');
      if (submit) submit.disabled = true;
    };

    let interactiveDraftTimer = 0;
    if (hasInteractiveAutosave && !isCompleted) {
      const queueInteractiveDraftSave = () => {
        window.clearTimeout(interactiveDraftTimer);
        interactiveDraftTimer = window.setTimeout(saveInteractiveDraft, 500);
      };
      const lessonBlocksRoot = byId('lesson-blocks');
      lessonBlocksRoot?.addEventListener('input', queueInteractiveDraftSave);
      lessonBlocksRoot?.addEventListener('change', queueInteractiveDraftSave);
    }

    const saveManualDraft = (announce = false) => {
      const updatedProgress = window.ProgressService.loadHomeworkProgress();
      updatedProgress.results[lesson.id] = {
        correct: 0,
        total: 0,
        percent: 0,
        answers: collectCurrentLessonAnswers(),
        legacyAnswers: savedResult?.legacyAnswers || null,
        migratedAt: savedResult?.migratedAt || null,
        checkedAt: new Date().toISOString()
      };
      window.ProgressService.saveHomeworkProgress(updatedProgress);
      const status = root.querySelector('[data-draft-status]');
      if (status) status.textContent = announce ? 'Draft saved. There is no automatic grade; the teacher will check the work.' : 'Draft saved automatically.';
      if (announce) showToast('Draft saved.');
      return updatedProgress.results[lesson.id].answers;
    };

    if (isManualOnly && !isCompleted) {
      let draftTimer = 0;
      const queueDraftSave = () => {
        const status = root.querySelector('[data-draft-status]');
        if (status) status.textContent = 'Saving changes...';
        window.clearTimeout(draftTimer);
        draftTimer = window.setTimeout(() => saveManualDraft(false), 700);
      };
      const lessonBlocksRoot = byId('lesson-blocks');
      lessonBlocksRoot?.addEventListener('input', queueDraftSave);
      lessonBlocksRoot?.addEventListener('change', queueDraftSave);
    }

    const checkLessonButton = byId('check-lesson');
    if (checkLessonButton) checkLessonButton.addEventListener('click', () => {
      window.clearTimeout(interactiveDraftTimer);
      if (isManualOnly) {
        saveManualDraft(true);
        return;
      }
      const checkableTypes = LESSON_TASK_TYPES;
      const checkable = blocks.filter((block) => checkableTypes.includes(block.type) && !(block.type === 'audio' && block.response === false));
      let correct = 0;
      let total = 0;
      let requiredComplete = true;
      const answers = {};
      checkable.forEach((block, index) => {
        const taskId = safeText(block.id, `task-${index}`);
        const node = root.querySelector(`[data-task="${CSS.escape(taskId)}"]`);
        if (!node) return;
        const result = checkLessonTask(block, node);
        answers[taskId] = result.actual;
        correct += Number(result.correctCount || 0);
        total += Number(result.total || 0);
        if (result.requiredComplete === false) requiredComplete = false;
        if (block.type !== 'exercise') {
          showLessonTaskResult(block, node, result);
        }
      });
      const percent = safePercent(correct, total);
      const hasPersonalResponses = blocks.some((block) => block.manualResponses === true);
      const manualNote = hasManualResponses
        ? (hasPersonalResponses ? ' · personal answers are saved and not included in the score' : ' · extended answer is saved separately and not included in the score')
        : '';
      const completionNote = requiredComplete ? '' : ' · complete Part B before sending';
      byId('lesson-result').innerHTML = `<h3>Result: ${correct} of ${total}</h3><p class="muted">${percent}% correct answers${manualNote}${completionNote}</p>`;
      const updatedProgress = window.ProgressService.loadHomeworkProgress();
      updatedProgress.results[lesson.id] = {
        correct,
        total,
        percent,
        answers,
        legacyAnswers: savedResult?.legacyAnswers || null,
        migratedAt: savedResult?.migratedAt || null,
        checkedAt: new Date().toISOString()
      };
      window.ProgressService.saveHomeworkProgress(updatedProgress);
      byId('submit-lesson').disabled = !requiredComplete;
    });
    const submitLessonButton = byId('submit-lesson');
    if (submitLessonButton) submitLessonButton.addEventListener('click', () => {
      window.clearTimeout(interactiveDraftTimer);
      if (isManualOnly) {
        saveManualDraft(false);
        const confirmed = window.confirm('Send the homework to the teacher? After sending, the answers will be locked.');
        if (!confirmed) return;
      }
      const updatedProgress = window.ProgressService.loadHomeworkProgress();
      updatedProgress.submissions[lesson.id] = { savedAt: new Date().toISOString(), status: CloudService.isConfigured() ? 'pending-cloud' : 'local' };
      if (!updatedProgress.completedIds.includes(lesson.id)) updatedProgress.completedIds.push(lesson.id);
      window.ProgressService.saveHomeworkProgress(updatedProgress);
      showToast(CloudService.isConfigured() ? 'Answers saved. After syncing, the report will be sent to the teacher automatically.' : 'Answers saved on this device.');
      lockCompletedLesson(root);
      const actions = root.querySelector('.lesson-actions');
      if (actions) {
        actions.classList.add('lesson-completed-panel');
        actions.innerHTML = `<div id="lesson-result" aria-live="polite"><h3>Homework submitted</h3><p class="muted">Answers saved and sent to the teacher for personal review.</p></div><div class="completed-lock-message"><span class="completed-lock-icon" aria-hidden="true">🔒</span><div><h3>Done</h3><p class="muted">After submission, answers are locked. The teacher will review the work without automatic grading.</p></div></div>`;
      }
    });
  }

  function grammarTable(table) {
    if (!table || !Array.isArray(table.headers) || !Array.isArray(table.rows)) return '';
    return `<div class="table-wrap"><table><thead><tr>${table.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join('')}</tr></thead><tbody>${table.rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }

  function grammarProgressState(topic) {
    const progress = window.ProgressService.loadGrammarProgress();
    return {
      progress,
      state: progress.topics[topic.id] || {}
    };
  }

  function grammarTaskCount(topic) {
    const exercises = Array.isArray(topic.quizExercises) ? topic.quizExercises : [];
    if (exercises.length) return exercises.reduce((total, exercise) => total + (Array.isArray(exercise.items) ? exercise.items.length : 0), 0);
    return Array.isArray(topic.quiz) ? topic.quiz.length : 0;
  }

  function grammarStatusMarkup(topic, state) {
    const passed = Boolean(state.passed || topic.passed);
    const attempts = Math.max(0, Number(state.attempts || 0));
    const bestScore = Math.max(0, Number(state.bestScore || 0));
    const taskCount = grammarTaskCount(topic);

    return `<div class="grammar-status-card ${passed ? 'is-passed' : ''}" id="grammar-topic-status">
      <div class="grammar-status-icon" aria-hidden="true">${passed ? '✓' : '◎'}</div>
      <div class="grammar-status-copy">
        <strong>${passed ? 'Topic passed' : 'Topic not passed yet'}</strong>
        <span>${passed
          ? `Best result: ${bestScore}% · attempts: ${attempts}`
          : attempts
            ? `Best result: ${bestScore}% · attempts: ${attempts}`
            : `Study the guide and complete the mini-test of ${taskCount} tasks.`}</span>
      </div>
      <span class="grammar-status-badge">${passed ? 'Passed' : `Need ${taskCount} / ${taskCount}`}</span>
    </div>`;
  }

  function renderGrammarTopic() {
    const id = queryParam('id');
    const topic = GRAMMAR_DATA.find((item) => item.id === id && item.status !== 'draft');
    const root = byId('grammar-topic-root');

    if (!topic || topic.status === 'locked') {
      root.innerHTML = emptyState('📐', 'This grammar topic has not been published yet', 'The material will appear after the teacher publishes it.');
      return;
    }

    byId('grammar-hero-title').textContent = safeText(topic.title, 'Grammar');
    byId('grammar-hero-subtitle').textContent = `${safeText(topic.level, student.level)} Level · clear guide and mini-test`;

    const overview = topic.overview || {};
    const uses = Array.isArray(topic.uses) ? topic.uses : [];
    const forms = Array.isArray(topic.forms) ? topic.forms : [];
    const mistakes = Array.isArray(topic.commonMistakes) ? topic.commonMistakes : [];
    const quizExercises = Array.isArray(topic.quizExercises)
      ? topic.quizExercises.filter((exercise) => Array.isArray(exercise.items) && exercise.items.length)
      : [];
    let flatQuizIndex = 0;
    const quiz = quizExercises.length
      ? quizExercises.flatMap((exercise, exerciseIndex) => exercise.items.map((question, itemIndex) => ({
          ...question,
          __exerciseIndex: exerciseIndex,
          __itemIndex: itemIndex,
          __flatIndex: flatQuizIndex++
        })))
      : (Array.isArray(topic.quiz) ? topic.quiz : []);
    const contrast = topic.contrast || {};
    const builder = topic.questionBuilder || {};
    const memoryRule = topic.memoryRule || {};
    const { state } = grammarProgressState(topic);

    const subjects = Array.isArray(overview.subjects) ? overview.subjects : [];
    const pattern = Array.isArray(builder.pattern) ? builder.pattern : [];
    const memorySteps = Array.isArray(memoryRule.steps) ? memoryRule.steps : [];

    root.innerHTML = `<div class="grammar-topic-shell">
      ${grammarStatusMarkup(topic, state)}

      <article class="card grammar-lead-card">
        <div class="grammar-lead-head">
          <div>
            <span class="eyebrow">Main idea</span>
            <h2>${escapeHtml(topic.title)}</h2>
          </div>
          <span class="grammar-level-badge">${escapeHtml(topic.level || student.level)}</span>
        </div>
        <p class="grammar-lead-text">${escapeHtml(overview.lead || '')}</p>
        <div class="grammar-core-rule">
          <div class="grammar-core-rule-icon" aria-hidden="true">!</div>
          <div>
            <strong>${escapeHtml(overview.keyRule || '')}</strong>
            ${overview.example ? `<span>${escapeHtml(overview.example)}</span>` : ''}
          </div>
        </div>
        ${subjects.length ? `<div class="grammar-subject-row" aria-label="Subjects">${subjects.map((subject) => `<span>${escapeHtml(subject)}</span>`).join('')}</div>` : ''}
      </article>

      ${uses.length ? `<section class="grammar-content-section" aria-labelledby="grammar-use-title">
        <div class="grammar-section-heading">
          <span class="grammar-section-number">1</span>
          <div><h2 id="grammar-use-title">When we use it</h2><p>Main uses for B2.1</p></div>
        </div>
        <div class="grammar-use-grid">${uses.map((item) => `<article class="grammar-use-card">
          <span class="grammar-use-icon" aria-hidden="true">${escapeHtml(item.icon || '•')}</span>
          <h3>${escapeHtml(item.title || '')}</h3>
          <p>${escapeHtml(item.text || '')}</p>
          <code>${escapeHtml(item.example || '')}</code>
        </article>`).join('')}</div>
      </section>` : ''}

      ${forms.length ? `<section class="grammar-content-section" aria-labelledby="grammar-forms-title">
        <div class="grammar-section-heading">
          <span class="grammar-section-number">2</span>
          <div><h2 id="grammar-forms-title">Four forms</h2><p>First learn the structure, then look at the example</p></div>
        </div>
        <div class="grammar-form-grid">${forms.map((form) => `<article class="grammar-form-card grammar-form-${escapeHtml(form.id || 'default')}">
          <div class="grammar-form-head">
            <span class="grammar-form-icon" aria-hidden="true">${escapeHtml(form.icon || '•')}</span>
            <h3>${escapeHtml(form.title || '')}</h3>
          </div>
          <div class="grammar-formula">${escapeHtml(form.formula || '')}</div>
          <div class="grammar-example">
            <strong>${escapeHtml(form.example || '')}</strong>
            <span>${escapeHtml(form.translation || '')}</span>
          </div>
          <p>${escapeHtml(form.note || '')}</p>
        </article>`).join('')}</div>
      </section>` : ''}

      ${contrast.ordinary && contrast.be ? `<section class="grammar-content-section" aria-labelledby="grammar-contrast-title">
        <div class="grammar-section-heading">
          <span class="grammar-section-number">3</span>
          <div><h2 id="grammar-contrast-title">${escapeHtml(contrast.title || 'Ordinary verb or be?')}</h2><p>${escapeHtml(contrast.intro || '')}</p></div>
        </div>
        <div class="grammar-contrast-grid">
          <article class="grammar-contrast-card ordinary">
            <span class="grammar-contrast-label">A</span>
            <h3>${escapeHtml(contrast.ordinary.label || '')}</h3>
            <p class="grammar-verb-list">${escapeHtml(contrast.ordinary.verbs || '')}</p>
            <div class="grammar-pattern-list">
              <span><b>+</b> ${escapeHtml(contrast.ordinary.affirmative || '')}</span>
              <span><b>−</b> ${escapeHtml(contrast.ordinary.negative || '')}</span>
              <span><b>?</b> ${escapeHtml(contrast.ordinary.question || '')}</span>
            </div>
            <p class="grammar-contrast-rule">${escapeHtml(contrast.ordinary.rule || '')}</p>
          </article>
          <article class="grammar-contrast-card be">
            <span class="grammar-contrast-label">B</span>
            <h3>${escapeHtml(contrast.be.label || '')}</h3>
            <p class="grammar-verb-list">${escapeHtml(contrast.be.verbs || '')}</p>
            <div class="grammar-pattern-list">
              <span><b>+</b> ${escapeHtml(contrast.be.affirmative || '')}</span>
              <span><b>−</b> ${escapeHtml(contrast.be.negative || '')}</span>
              <span><b>?</b> ${escapeHtml(contrast.be.question || '')}</span>
            </div>
            <p class="grammar-contrast-rule">${escapeHtml(contrast.be.rule || '')}</p>
          </article>
        </div>
      </section>` : ''}

      ${pattern.length ? `<section class="grammar-content-section" aria-labelledby="grammar-question-title">
        <div class="grammar-section-heading">
          <span class="grammar-section-number">4</span>
          <div><h2 id="grammar-question-title">${escapeHtml(builder.title || 'Word order')}</h2><p>${escapeHtml(builder.note || '')}</p></div>
        </div>
        <article class="card grammar-builder-card">
          <div class="grammar-token-row">${pattern.map((token, index) => `<span class="grammar-token grammar-token-${index + 1}">${escapeHtml(token)}</span>${index < pattern.length - 1 ? '<span class="grammar-token-arrow" aria-hidden="true">→</span>' : ''}`).join('')}</div>
          <div class="grammar-builder-example">
            <strong>${escapeHtml(builder.example || '')}</strong>
            <span>${escapeHtml(builder.translation || '')}</span>
          </div>
        </article>
      </section>` : ''}

      ${memorySteps.length ? `<article class="card grammar-memory-card">
        <div class="grammar-memory-icon" aria-hidden="true">⚡</div>
        <div>
          <span class="eyebrow">Algorithm</span>
          <h2>${escapeHtml(memoryRule.title || 'Quick check')}</h2>
          <ol>${memorySteps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol>
        </div>
      </article>` : ''}

      ${mistakes.length ? `<section class="grammar-content-section" aria-labelledby="grammar-mistakes-title">
        <div class="grammar-section-heading">
          <span class="grammar-section-number">5</span>
          <div><h2 id="grammar-mistakes-title">Common mistakes</h2><p>Compare the wrong and correct versions</p></div>
        </div>
        <div class="grammar-mistake-list">${mistakes.map((mistake) => `<article class="grammar-mistake-row">
          <div class="grammar-mistake-wrong"><span>✕</span><s>${escapeHtml(mistake.wrong || '')}</s></div>
          <div class="grammar-mistake-right"><span>✓</span><strong>${escapeHtml(mistake.right || '')}</strong></div>
          <p>${escapeHtml(mistake.reason || '')}</p>
        </article>`).join('')}</div>
      </section>` : ''}

      <section class="grammar-content-section grammar-test-section" aria-labelledby="mini-test-title">
        <div class="grammar-test-intro">
          <div>
            <span class="eyebrow">Mini-test</span>
            <h2 id="mini-test-title">${quizExercises.length ? '4 exercises × 4 tasks' : `${quiz.length} tasks: from easier to harder`}</h2>
            <p>Answer all questions. To pass, you need ${quiz.length} of ${quiz.length}. After a successful check, answers are locked.</p>
          </div>
          <span class="grammar-test-goal">${quiz.length} / ${quiz.length}</span>
        </div>
        <div id="grammar-quiz"></div>
      </section>
    </div>`;

    const quizRoot = byId('grammar-quiz');

    if (!quiz.length) {
      quizRoot.innerHTML = emptyState('🧩', 'The mini-test has not been added yet', 'Questions will appear with the teacher material.');
      return;
    }

    const renderQuiz = () => {
      const { state: currentState } = grammarProgressState(topic);
      const savedAnswers = Array.isArray(currentState.answers) ? currentState.answers : [];
      const locked = Boolean(currentState.passed && savedAnswers.length === quiz.length);

      const renderQuestionControl = (question, index, savedValue) => {
        const type = safeText(question.type, 'single');
        if (type === 'select') {
          return `<select class="grammar-select" data-grammar-control>
            <option value="">Choose an answer</option>
            ${(question.options || []).map((option, optionIndex) => `<option value="${optionIndex}" ${Number(savedValue) === optionIndex ? 'selected' : ''}>${escapeHtml(option)}</option>`).join('')}
          </select>`;
        }
        if (type === 'text') {
          return `<input class="text-field grammar-text-answer" data-grammar-control type="text" value="${escapeHtml(savedValue || '')}" placeholder="${escapeHtml(question.placeholder || '')}" autocomplete="off">`;
        }
        if (type === 'reorder') {
          const tokens = Array.isArray(question.tokens) ? question.tokens : [];
          return `${tokens.length ? `<div class="grammar-reorder-tokens">${tokens.map((token) => `<span>${escapeHtml(token)}</span>`).join('')}</div>` : ''}<input class="text-field grammar-text-answer" data-grammar-control type="text" value="${escapeHtml(savedValue || '')}" placeholder="${escapeHtml(question.placeholder || 'Write the complete sentence')}" autocomplete="off">`;
        }
        if (type === 'gaps') {
          const answers = Array.isArray(question.answers) ? question.answers : [];
          const segments = Array.isArray(question.segments) ? question.segments : [];
          const values = Array.isArray(savedValue) ? savedValue : [];
          return `<div class="grammar-gaps">${answers.map((_, gapIndex) => `${gapIndex < segments.length ? `<span>${escapeHtml(segments[gapIndex])}</span>` : ''}<input class="gap-input" data-grammar-gap="${gapIndex}" value="${escapeHtml(values[gapIndex] || '')}" aria-label="Gap ${gapIndex + 1}" autocomplete="off">`).join('')}${segments.length > answers.length ? `<span>${escapeHtml(segments[segments.length - 1])}</span>` : ''}</div>`;
        }
        return `<div class="option-list">${(question.options || []).map((option, optionIndex) => `<label class="option grammar-option">
          <input type="radio" name="grammar-${index}" value="${optionIndex}" ${Number(savedValue) === optionIndex ? 'checked' : ''}>
          <span>${escapeHtml(option)}</span>
        </label>`).join('')}</div>`;
      };

      const readAnswer = (question, node) => {
        const type = safeText(question.type, 'single');
        if (type === 'select') return node.querySelector('select')?.value ?? '';
        if (type === 'text' || type === 'reorder') return node.querySelector('input[type="text"]')?.value || '';
        if (type === 'gaps') return [...node.querySelectorAll('[data-grammar-gap]')].map((input) => input.value);
        return node.querySelector('input[type="radio"]:checked')?.value ?? '';
      };

      const isAnswered = (question, value) => {
        const type = safeText(question.type, 'single');
        if (type === 'gaps') return Array.isArray(value) && value.length === (question.answers || []).length && value.every((item) => normalizeAnswer(item) !== '');
        return normalizeAnswer(value) !== '';
      };

      const isCorrectAnswer = (question, value) => {
        const type = safeText(question.type, 'single');
        if (type === 'select' || type === 'single') return value !== '' && Number(value) === Number(question.answer);
        if (type === 'gaps') {
          const expected = Array.isArray(question.answers) ? question.answers : [];
          return expected.length > 0 && expected.every((answer, gapIndex) => {
            const variants = Array.isArray(answer) ? answer : [answer];
            return variants.some((variant) => normalizeAnswer(variant) === normalizeAnswer(value?.[gapIndex]));
          });
        }
        const accepted = Array.isArray(question.acceptedAnswers) && question.acceptedAnswers.length
          ? question.acceptedAnswers
          : [question.answer];
        return accepted.some((answer) => normalizeAnswer(answer) !== '' && normalizeAnswer(answer) === normalizeAnswer(value));
      };

      const questionCard = (question, index, displayNumber) => `<article class="card grammar-question-card" data-grammar-question="${index}">
        <div class="grammar-question-meta">
          <span class="grammar-difficulty">${escapeHtml(question.difficulty || `${displayNumber}`)}</span>
          <span>${escapeHtml(question.skill || '')}</span>
        </div>
        <h3>${displayNumber}. ${escapeHtml(question.prompt)}</h3>
        ${renderQuestionControl(question, index, savedAnswers[index])}
        <div class="feedback"></div>
      </article>`;

      const questionsMarkup = quizExercises.length
        ? quizExercises.map((exercise, exerciseIndex) => {
            const exerciseQuestions = quiz.filter((question) => question.__exerciseIndex === exerciseIndex);
            return `<section class="grammar-practice-group">
              <div class="grammar-practice-heading">
                <span class="eyebrow">Exercise ${exerciseIndex + 1}</span>
                <h3>${escapeHtml(exercise.title || `Exercise ${exerciseIndex + 1}`)}</h3>
                ${exercise.instructions ? `<p>${escapeHtml(exercise.instructions)}</p>` : ''}
              </div>
              ${exerciseQuestions.map((question) => questionCard(question, question.__flatIndex, question.__itemIndex + 1)).join('')}
            </section>`;
          }).join('')
        : quiz.map((question, index) => questionCard(question, index, index + 1)).join('');

      quizRoot.innerHTML = `${questionsMarkup}
      <article class="card grammar-test-actions">
        <div id="grammar-result" aria-live="polite">
          <strong>${locked ? 'Topic passed. Answers are locked.' : quizExercises.length ? `Complete all ${quiz.length} tasks.` : 'Complete all four tasks.'}</strong>
          <span>${locked ? `Best result: ${Number(currentState.bestScore || 0)}%` : 'The check button becomes active after you complete the test.'}</span>
        </div>
        ${locked ? '' : `<div class="button-row">
          <button class="btn btn-primary" type="button" id="check-grammar" disabled>Check tasks</button>
          <button class="btn btn-secondary" type="button" id="retry-grammar">${quizExercises.length ? 'Correct answers' : 'Clear answers'}</button>
        </div>`}
      </article>`;

      if (locked) {
        quizRoot.querySelectorAll('input, select').forEach((control) => { control.disabled = true; });
        quizRoot.querySelectorAll('[data-grammar-question]').forEach((node) => node.classList.add('is-correct'));
        return;
      }

      const checkButton = byId('check-grammar');
      const retryButton = byId('retry-grammar');

      const collectAnswers = () => quiz.map((question, index) => {
        const node = quizRoot.querySelector(`[data-grammar-question="${index}"]`);
        return readAnswer(question, node);
      });

      const updateCheckState = () => {
        const answers = collectAnswers();
        const answered = answers.filter((value, index) => isAnswered(quiz[index], value)).length;
        checkButton.disabled = answered !== quiz.length;
        checkButton.textContent = answered === quiz.length
          ? 'Check tasks'
          : `Answers: ${answered} / ${quiz.length}`;
      };

      quizRoot.querySelectorAll('input, select').forEach((control) => {
        control.addEventListener('input', updateCheckState);
        control.addEventListener('change', updateCheckState);
      });
      updateCheckState();

      checkButton.addEventListener('click', () => {
        let correct = 0;
        const actualAnswers = collectAnswers();

        quiz.forEach((question, index) => {
          const node = quizRoot.querySelector(`[data-grammar-question="${index}"]`);
          const isCorrect = isCorrectAnswer(question, actualAnswers[index]);
          if (isCorrect) correct += 1;

          node.classList.toggle('is-correct', isCorrect);
          node.classList.toggle('is-wrong', !isCorrect);
          node.querySelectorAll('input, select').forEach((control) => { control.disabled = true; });

          const feedback = node.querySelector('.feedback');
          feedback.className = `feedback show ${isCorrect ? 'good' : 'bad'}`;
          feedback.textContent = isCorrect
            ? 'Correct.'
            : safeText(question.explanation, 'There is a mistake. Check the rule and try again.');
        });

        const percent = safePercent(correct, quiz.length);
        const passScore = Number(topic.passScore || 100);
        const passedNow = percent >= passScore;
        const progress = window.ProgressService.loadGrammarProgress();
        const previous = progress.topics[topic.id] || {};
        const passed = Boolean(previous.passed || passedNow);
        const passedAt = previous.passedAt || (passedNow ? new Date().toISOString() : null);

        progress.topics[topic.id] = {
          passed,
          passedAt,
          attempts: Number(previous.attempts || 0) + 1,
          bestScore: Math.max(Number(previous.bestScore || 0), percent),
          answers: (passedNow || quizExercises.length) ? actualAnswers : (Array.isArray(previous.answers) ? previous.answers : []),
          updatedAt: new Date().toISOString()
        };
        window.ProgressService.saveGrammarProgress(progress);

        const result = byId('grammar-result');
        result.className = `grammar-result-box ${passedNow ? 'is-passed' : 'is-retry'}`;
        result.innerHTML = passedNow
          ? `<strong>Topic passed ✓</strong><span>${correct} of ${quiz.length} · ${percent}%. Answers are locked.</span>`
          : `<strong>${correct} of ${quiz.length} · ${percent}%</strong><span>There are mistakes. Correct answers are not shown; check the rule and correct the tasks.</span>`;

        checkButton.disabled = true;
        checkButton.textContent = passedNow ? 'Topic learned' : 'Checked';
        retryButton.disabled = passedNow;
        retryButton.hidden = passedNow;
        retryButton.textContent = 'Correct answers';

        const statusNode = byId('grammar-topic-status');
        if (statusNode) statusNode.outerHTML = grammarStatusMarkup(topic, progress.topics[topic.id]);

        showToast(passedNow ? 'Topic passed.' : 'There are mistakes in the tasks.');
      });

      retryButton.addEventListener('click', () => {
        renderQuiz();
        byId('mini-test-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    };

    renderQuiz();
  }

  function getTopicProgress(progress, topicId) {
    if (!progress.topics[topicId]) progress.topics[topicId] = { tests: [] };
    if (!Array.isArray(progress.topics[topicId].tests)) progress.topics[topicId].tests = [];
    return progress.topics[topicId];
  }

  function setWordStatus(progress, word, topicId, status) {
    const now = new Date().toISOString();
    const previous = progress.words[word.__wordKey] || {};
    progress.words[word.__wordKey] = {
      status,
      topicId: previous.topicId || topicId,
      learnedAt: status === 'known' ? (previous.learnedAt || now) : null,
      updatedAt: now
    };
  }

  function renderVocabulary() {
    const id = queryParam('id');
    const topic = VOCABULARY_CATALOG.allTopics.find((item) => item.id === id);
    const root = byId('vocabulary-root');
    if (!topic || !Array.isArray(topic.words) || !topic.words.length) {
      root.innerHTML = emptyState('💥', 'Words for this topic have not been added yet', 'The teacher will add the word list after the lesson. Repeated words from previous topics are not shown here.');
      return;
    }
    byId('vocab-hero-title').textContent = safeText(topic.title, 'Vocabulary');
    byId('vocab-hero-subtitle').textContent = `${safeText(topic.label, 'Vocabulary topic')} · ${topic.words.length} unique words`;
    const progress = window.ProgressService.loadVocabularyProgress();
    const topicProgress = getTopicProgress(progress, topic.id);
    let mode = 'cards';
    let cardQueue = [];
    let testState = null;
    let activeWordGroupIndex = 0;
    const exactKnown = exactKnownCountForTopic(progress, topic);
    const legacyKnown = Math.min(topic.words.length, Math.max(0, Number(topicProgress.legacyLearnedCount || 0)));
    const legacyNotice = legacyKnown > exactKnown
      ? `<div class="card info-card legacy-progress-note"><strong>Old progress saved: ${legacyKnown} of ${topic.words.length}.</strong><p class="muted">The old database stored only the number of learned words, not the exact cards. The overall result is saved, and individual words will be clarified during review.</p></div>`
      : '';

    root.innerHTML = `${legacyNotice}<div class="card info-card vocab-test-rule"><strong>How a word becomes learned</strong><p class="muted">Cards help you get familiar with words. A word becomes learned only after a completed test and a correct answer.</p></div><div class="mode-tabs" id="vocab-modes" aria-label="Practice mode">
      <button class="mode-btn active" type="button" data-mode="cards">New words</button>
      <button class="mode-btn" type="button" data-mode="test">Test</button>
      <button class="mode-btn" type="button" data-mode="all">All words</button>
      <button class="mode-btn" type="button" data-mode="difficult">Difficult words</button>
    </div><div id="vocab-mode-root" class="section"></div>`;
    const modeRoot = byId('vocab-mode-root');

    const save = () => window.ProgressService.saveVocabularyProgress(progress);
    const resetCardQueue = () => {
      cardQueue = shuffled(topic.words.filter((word) => {
        const status = progress.words[word.__wordKey]?.status;
        return mode === 'difficult' ? status === 'difficult' : status !== 'known';
      }));
    };

    const drawCard = () => {
      if (!cardQueue.length) {
        const isDifficult = mode === 'difficult';
        modeRoot.innerHTML = emptyState(
          isDifficult ? '🌟' : '🎉',
          isDifficult ? 'No difficult words yet' : 'No new words left in this topic',
          isDifficult ? 'Mark a word as difficult, and it will appear here.' : 'Cards reviewed. Now take the test: words become learned only after a completed test.'
        );
        return;
      }
      const word = cardQueue[0];
      const remaining = cardQueue.length;
      modeRoot.innerHTML = `<div class="flash-counter">Left: ${remaining}</div><div class="flashcard-stage"><div class="flashcard" id="flashcard" tabindex="0" role="button" aria-label="Flip the card">
        <div class="flash-face flash-front"><div class="flash-word">${escapeHtml(word.en)}</div>${word.transcription ? `<div class="flash-transcription">${escapeHtml(word.transcription)}</div>` : ''}<p class="muted">Click to see the translation</p></div>
        <div class="flash-face flash-back"><div class="flash-word">${escapeHtml(word.ru)}</div>${word.exampleEn ? `<p class="flash-example">${escapeHtml(word.exampleEn)}${word.exampleRu ? `<br>${escapeHtml(word.exampleRu)}` : ''}</p>` : ''}${word.audio ? `<audio class="audio-player" controls preload="none" src="${escapeHtml(word.audio)}"></audio>` : ''}</div>
      </div></div><div class="trainer-actions"><button class="btn btn-danger" id="word-difficult" type="button">Difficult</button><button class="btn btn-success" id="word-known" type="button">Got it - to the test</button></div>`;
      const flashcard = byId('flashcard');
      const flip = () => flashcard.classList.toggle('flipped');
      flashcard.addEventListener('click', flip);
      flashcard.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); flip(); } });
      byId('word-known').addEventListener('click', () => {
        cardQueue.shift();
        drawCard();
      });
      byId('word-difficult').addEventListener('click', () => {
        setWordStatus(progress, word, topic.id, 'difficult');
        cardQueue.shift();
        save();
        drawCard();
      });
    };

    const startTest = () => {
      if (topic.words.length < 4) {
        modeRoot.innerHTML = emptyState('🧩', 'At least 4 words are needed for a test', 'Add more unique words to the topic to create four answer options without invented data.');
        return;
      }
      testState = { words: shuffled(topic.words), index: 0, firstTryCorrect: 0, answered: false, firstAnswers: {} };
      drawQuestion();
    };

    const finishTest = () => {
      const completedAt = new Date().toISOString();
      testState.words.forEach((word) => {
        const answer = testState.firstAnswers[word.__wordKey];
        setWordStatus(progress, word, topic.id, answer?.correct ? 'known' : 'difficult');
      });
      const result = {
        score: testState.firstTryCorrect,
        total: testState.words.length,
        percent: safePercent(testState.firstTryCorrect, testState.words.length),
        answers: testState.firstAnswers,
        completedAt
      };
      topicProgress.tests.push(result);
      save();
      modeRoot.innerHTML = `<div class="card empty-state"><div class="empty-state-icon">🏁</div><h3>Test completed</h3><p>Learned after the test: ${result.score} of ${result.total}. Words with mistakes were added to difficult words.</p><div class="button-row" style="justify-content:center"><button class="btn btn-primary" id="restart-vocab-test" type="button">Try again</button></div></div>`;
      byId('restart-vocab-test').addEventListener('click', startTest);
    };

    const drawQuestion = () => {
      if (testState.index >= testState.words.length) { finishTest(); return; }
      const word = testState.words[testState.index];
      const distractors = shuffled(topic.words.filter((item) => item.__wordKey !== word.__wordKey)).slice(0, 3);
      const options = shuffled([word, ...distractors]);
      testState.answered = false;
      modeRoot.innerHTML = `<div class="flash-counter">Question ${testState.index + 1} of ${testState.words.length}</div><article class="card"><span class="eyebrow">Choose the translation</span><h2 class="flash-word">${escapeHtml(word.en)}</h2>${word.transcription ? `<p class="muted">${escapeHtml(word.transcription)}</p>` : ''}<div class="option-list section">${options.map((option) => `<button class="quiz-option" type="button" data-answer-key="${escapeHtml(option.__wordKey)}">${escapeHtml(option.ru)}</button>`).join('')}</div><div id="vocab-test-feedback" class="feedback"></div><div class="button-row"><button class="btn btn-primary" id="next-vocab-question" type="button" disabled>Next word</button></div></article>`;
      modeRoot.querySelectorAll('[data-answer-key]').forEach((button) => {
        button.addEventListener('click', () => {
          if (testState.answered) return;
          testState.answered = true;
          const correct = button.dataset.answerKey === word.__wordKey;
          testState.firstAnswers[word.__wordKey] = { correct, selected: button.dataset.answerKey };
          if (correct) testState.firstTryCorrect += 1;
          save();
          modeRoot.querySelectorAll('[data-answer-key]').forEach((optionButton) => {
            optionButton.disabled = true;
            if (optionButton.dataset.answerKey === word.__wordKey) optionButton.classList.add('correct');
          });
          if (!correct) button.classList.add('wrong');
          const feedback = byId('vocab-test-feedback');
          feedback.className = `feedback show ${correct ? 'good' : 'bad'}`;
          feedback.textContent = correct ? 'Correct on the first try!' : `Correct answer: ${word.ru}`;
          byId('next-vocab-question').disabled = false;
        });
      });
      byId('next-vocab-question').addEventListener('click', () => { testState.index += 1; drawQuestion(); });
    };

    const renderWordCard = (word) => {
      const status = progress.words[word.__wordKey]?.status;
      return `<article class="card word-card ${status === 'known' ? 'known' : ''} ${status === 'difficult' ? 'difficult' : ''}">
        <strong>${escapeHtml(word.en)}</strong>
        <span>${escapeHtml(word.ru)}</span>
        ${word.transcription ? `<span>${escapeHtml(word.transcription)}</span>` : ''}
      </article>`;
    };

    const drawAllWords = () => {
      const configuredGroups = (Array.isArray(topic.groups) ? topic.groups : [])
        .map((group) => ({
          ...group,
          words: topic.words.filter((word) => word.group === group.id)
        }))
        .filter((group) => group.words.length);

      const groupedKeys = new Set(
        configuredGroups.flatMap((group) =>
          group.words.map((word) => word.__wordKey)
        )
      );

      const ungroupedWords = topic.words.filter(
        (word) => !groupedKeys.has(word.__wordKey)
      );

      const sections = [
        ...configuredGroups,
        ...(ungroupedWords.length
          ? [{
              id: 'other',
              title: 'Other words',
              subtitle: 'Other words',
              icon: '📚',
              words: ungroupedWords
            }]
          : [])
      ];

      if (!sections.length) {
        modeRoot.innerHTML = emptyState(
          '📚',
          'Words have not been grouped yet',
          'The teacher will add categories to this topic.'
        );
        return;
      }

      activeWordGroupIndex = Math.min(
        Math.max(0, activeWordGroupIndex),
        sections.length - 1
      );
      const activeGroup = sections[activeWordGroupIndex];
      const knownInGroup = activeGroup.words.filter(
        (word) => progress.words[word.__wordKey]?.status === 'known'
      ).length;

      modeRoot.innerHTML = `<div class="vocab-section-browser">
        <div class="vocab-section-tabs" role="tablist" aria-label="Vocabulary sections">
          ${sections.map((group, index) => `
            <button
              class="vocab-section-tab ${index === activeWordGroupIndex ? 'active' : ''}"
              type="button"
              role="tab"
              aria-selected="${index === activeWordGroupIndex ? 'true' : 'false'}"
              aria-controls="vocab-section-panel"
              tabindex="${index === activeWordGroupIndex ? '0' : '-1'}"
              data-vocab-group-index="${index}"
            >
              <span class="vocab-section-tab-icon" aria-hidden="true">${escapeHtml(group.icon || '📚')}</span>
              <span class="vocab-section-tab-copy">
                <strong>${escapeHtml(group.title || group.id)}</strong>
                <small>${escapeHtml(group.subtitle || '')}</small>
              </span>
              <span class="vocab-section-tab-count">${group.words.length}</span>
            </button>
          `).join('')}
        </div>

        <section
          class="vocab-section-panel"
          id="vocab-section-panel"
          role="tabpanel"
          tabindex="0"
          aria-label="${escapeHtml(activeGroup.title || activeGroup.id)}"
        >
          <header class="vocab-section-panel-heading">
            <div class="vocab-section-panel-title">
              <span class="vocab-section-panel-icon" aria-hidden="true">${escapeHtml(activeGroup.icon || '📚')}</span>
              <div>
                <span class="eyebrow">Section ${activeWordGroupIndex + 1} of ${sections.length}</span>
                <h3>${escapeHtml(activeGroup.title || activeGroup.id)}</h3>
                ${activeGroup.subtitle ? `<p>${escapeHtml(activeGroup.subtitle)}</p>` : ''}
              </div>
            </div>
            <div class="vocab-section-progress" aria-label="Section progress">
              <strong>${knownInGroup} / ${activeGroup.words.length}</strong>
              <span>learned</span>
            </div>
          </header>

          <div class="words-grid">${activeGroup.words.map(renderWordCard).join('')}</div>

          <footer class="vocab-section-navigation" aria-label="Move between sections">
            <button
              class="btn btn-secondary"
              type="button"
              data-vocab-group-prev
              ${activeWordGroupIndex === 0 ? 'disabled' : ''}
            >
              ← Previous
            </button>
            <span>${activeWordGroupIndex + 1} / ${sections.length}</span>
            <button
              class="btn btn-primary"
              type="button"
              data-vocab-group-next
              ${activeWordGroupIndex === sections.length - 1 ? 'disabled' : ''}
            >
              Next →
            </button>
          </footer>
        </section>
      </div>`;

      const selectGroup = (index, focusPanel = true) => {
        activeWordGroupIndex = Math.min(
          Math.max(0, Number(index) || 0),
          sections.length - 1
        );
        drawAllWords();
        if (focusPanel) {
          byId('vocab-section-panel')?.focus({ preventScroll: true });
        }
      };

      const tabs = [...modeRoot.querySelectorAll('[data-vocab-group-index]')];

      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => selectGroup(index));

        tab.addEventListener('keydown', (event) => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
            return;
          }

          event.preventDefault();

          let nextIndex = index;
          if (event.key === 'ArrowRight') {
            nextIndex = (index + 1) % sections.length;
          } else if (event.key === 'ArrowLeft') {
            nextIndex = (index - 1 + sections.length) % sections.length;
          } else if (event.key === 'Home') {
            nextIndex = 0;
          } else if (event.key === 'End') {
            nextIndex = sections.length - 1;
          }

          activeWordGroupIndex = nextIndex;
          drawAllWords();
          modeRoot
            .querySelector(`[data-vocab-group-index="${nextIndex}"]`)
            ?.focus();
        });
      });

      modeRoot.querySelector('[data-vocab-group-prev]')?.addEventListener(
        'click',
        () => selectGroup(activeWordGroupIndex - 1)
      );

      modeRoot.querySelector('[data-vocab-group-next]')?.addEventListener(
        'click',
        () => selectGroup(activeWordGroupIndex + 1)
      );
    };

    const drawMode = () => {
      if (mode === 'cards' || mode === 'difficult') {
        resetCardQueue();
        drawCard();
      } else if (mode === 'test') startTest();
      else drawAllWords();
    };
    byId('vocab-modes').addEventListener('click', (event) => {
      const button = event.target.closest('[data-mode]');
      if (!button) return;
      mode = button.dataset.mode;
      byId('vocab-modes').querySelectorAll('[data-mode]').forEach((item) => item.classList.toggle('active', item === button));
      drawMode();
    });
    drawMode();
  }

  async function refreshCurrentView() {
    const view = document.body.dataset.view;
    const renderers = {
      home: renderHome,
      homework: renderHomework,
      grammar: renderGrammar,
      'vocabulary-hub': renderVocabularyHub,
      lesson: renderLesson,
      'grammar-topic': renderGrammarTopic,
      vocabulary: renderVocabulary
    };
    try {
      await renderers[view]?.();
    } catch (error) {
      console.error('Page render error:', error);
      const main = document.querySelector('main');
      if (main) main.innerHTML = emptyState('⚠️', 'Could not open the page', 'Check the data structure and try refreshing the page.');
    }
  }

  function homeworkCatalogSignature(items = HOMEWORK_DATA) {
    return JSON.stringify((Array.isArray(items) ? items : []).map((item) => ({
      id: item.id,
      number: item.number,
      title: item.title,
      subtitle: item.subtitle,
      status: item.status,
      publishedAt: item.publishedAt,
      notificationVersion: item.notification?.version || 0
    })));
  }

  async function refreshHomeworkCatalogIfChanged() {
    const view = document.body?.dataset?.view || '';
    if (!['home', 'homework'].includes(view)) return;

    const before = homeworkCatalogSignature();
    lessonCache.clear();

    try {
      await loadHomeworkData();
      const after = homeworkCatalogSignature();
      if (after !== before) {
        await refreshCurrentView();
        showToast('Homework list updated.');
      }
    } catch (error) {
      console.warn('Could not automatically update the homework list:', error);
    }
  }

  function startHomeworkAutoRefresh() {
    const view = document.body?.dataset?.view || '';
    if (!['home', 'homework'].includes(view)) return;

    window.setInterval(refreshHomeworkCatalogIfChanged, 60_000);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) refreshHomeworkCatalogIfChanged();
    });
  }

  async function init() {
    migrateLegacyLocalProgress();
    archiveLegacyLesson8LocalProgress();
    fillConfig();
    markNavigation();
    try {
      await loadHomeworkData();
    } catch (error) {
      console.error('Lesson catalog loading error:', error);
      HOMEWORK_DATA = [];
      window.HOMEWORK_DATA = HOMEWORK_DATA;
    }
    await refreshCurrentView();
    startHomeworkAutoRefresh();
    if (!CloudService.isConfigured()) return;
    try {
      await CloudService.init();
      await window.ProgressService.syncFromCloud();
      await refreshCurrentView();
    } catch (error) {
      console.error('Supabase connection error:', error);
      const detail = safeText(error?.message || error?.details || error?.hint);
      showToast(detail ? `Supabase error: ${detail}` : 'Supabase is temporarily unavailable.');
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
