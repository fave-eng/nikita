
(() => {
  'use strict';

  const guides = window.GRAMMAR_GUIDES || {};

  const escapeHtml = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const renderComparison = (section) => `
    <section class="tg-section">
      <div class="tg-heading"><h2>${escapeHtml(section.title)}</h2>${section.subtitle ? `<p>${escapeHtml(section.subtitle)}</p>` : ''}</div>
      <div class="tg-table-wrap"><table class="tg-table">
        <thead><tr>${(section.columns || []).map((c) => `<th>${escapeHtml(c)}</th>`).join('')}</tr></thead>
        <tbody>${(section.rows || []).map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody>
      </table></div>
      ${section.note ? `<div class="tg-note"><strong>Note</strong><span>${escapeHtml(section.note)}</span></div>` : ''}
    </section>`;

  const renderPatterns = (section) => `
    <section class="tg-section">
      <div class="tg-heading"><h2>${escapeHtml(section.title)}</h2>${section.subtitle ? `<p>${escapeHtml(section.subtitle)}</p>` : ''}</div>
      <div class="tg-pattern-grid">${(section.items || []).map((item) => `
        <article class="tg-pattern-card">
          <span class="tg-pattern-label">${escapeHtml(item.label)}</span>
          <code>${escapeHtml(item.formula)}</code>
          <p>${escapeHtml(item.example)}</p>
        </article>`).join('')}</div>
      ${section.warning ? `<div class="tg-warning"><strong>Watch out</strong><span>${escapeHtml(section.warning)}</span></div>` : ''}
    </section>`;

  const renderSection = (section) => {
    switch (section.type) {
      case 'timeline':
        return `<section class="tg-section">
          <div class="tg-heading"><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.subtitle || '')}</p></div>
          <div class="tg-timeline">${(section.items || []).map((item) => `
            <article class="tg-time-item">
              <span class="tg-time-label">${escapeHtml(item.label)}</span>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.text)}</p>
              <code>${escapeHtml(item.example)}</code>
            </article>`).join('')}</div>
        </section>`;

      case 'comparison':
        return renderComparison(section);

      case 'patterns':
        return renderPatterns(section);

      case 'position':
        return `<section class="tg-section">
          <div class="tg-heading"><h2>${escapeHtml(section.title)}</h2></div>
          <div class="tg-rule-list">${(section.rules || []).map((item, index) => `
            <article class="tg-rule-row"><span>${index + 1}</span><div><strong>${escapeHtml(item.rule)}</strong><code>${escapeHtml(item.example)}</code></div></article>`).join('')}</div>
        </section>`;

      case 'contrastCards':
        return `<section class="tg-section">
          <div class="tg-heading"><h2>${escapeHtml(section.title)}</h2></div>
          <div class="tg-card-grid">${(section.cards || []).map((card) => `
            <article class="tg-contrast-card">
              <h3>${escapeHtml(card.title)}</h3>
              <p>${escapeHtml(card.meaning)}</p>
              <code>${escapeHtml(card.example)}</code>
            </article>`).join('')}</div>
        </section>`;

      case 'algorithm':
        return `<section class="tg-section tg-algorithm">
          <div class="tg-heading"><h2>${escapeHtml(section.title)}</h2></div>
          <ol>${(section.steps || []).map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol>
        </section>`;

      case 'scale':
        return `<section class="tg-section">
          <div class="tg-heading"><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.subtitle || '')}</p></div>
          <div class="tg-scale">${(section.items || []).map((item) => `
            <article class="tg-scale-item tg-${escapeHtml(item.strength)}">
              <strong>${escapeHtml(item.label)}</strong>
              <p>${escapeHtml(item.meaning)}</p>
              <code>${escapeHtml(item.example)}</code>
            </article>`).join('')}</div>
        </section>`;

      case 'examples':
        return `<section class="tg-section">
          <div class="tg-heading"><h2>${escapeHtml(section.title)}</h2></div>
          <div class="tg-examples">${(section.pairs || []).map((pair) => `
            <article><span>${escapeHtml(pair.context)}</span><p>${escapeHtml(pair.sentence)}</p></article>`).join('')}</div>
        </section>`;

      case 'roleMap':
        return `<section class="tg-section">
          <div class="tg-heading"><h2>${escapeHtml(section.title)}</h2></div>
          <div class="tg-role-map">${(section.items || []).map((item) => `
            <article>
              <span class="tg-role-target">${escapeHtml(item.target)}</span>
              <span class="tg-role-arrow">→</span>
              <strong>${escapeHtml(item.use)}</strong>
              <code>${escapeHtml(item.example)}</code>
            </article>`).join('')}</div>
        </section>`;

      case 'pronounTable':
        return `<section class="tg-section">
          <div class="tg-heading"><h2>${escapeHtml(section.title)}</h2></div>
          <div class="tg-pronouns">${(section.items || []).map((item) => `
            <article><strong>${escapeHtml(item.word)}</strong><span>${escapeHtml(item.for)}</span><code>${escapeHtml(item.example)}</code></article>`).join('')}</div>
        </section>`;

      case 'flow':
        return `<section class="tg-section">
          <div class="tg-heading"><h2>${escapeHtml(section.title)}</h2></div>
          <div class="tg-flow">${(section.steps || []).map((step, index) => `
            <article>
              <span class="tg-flow-num">${index + 1}</span>
              <h3>${escapeHtml(step.question)}</h3>
              <div><b>YES</b> ${escapeHtml(step.yes)}</div>
              <div><b>NO</b> ${escapeHtml(step.no)}</div>
            </article>`).join('')}</div>
        </section>`;

      case 'note':
        return `<section class="tg-section"><article class="tg-big-note"><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.text)}</p></article></section>`;

      case 'questionAnatomy':
        return `<section class="tg-section">
          <div class="tg-heading"><h2>${escapeHtml(section.title)}</h2></div>
          <div class="tg-anatomy">${(section.parts || []).map((part, index) => `<span>${escapeHtml(part)}</span>${index < section.parts.length - 1 ? '<b>→</b>' : ''}`).join('')}</div>
          <div class="tg-examples">${(section.examples || []).map((sentence) => `<article><p>${escapeHtml(sentence)}</p></article>`).join('')}</div>
          ${section.note ? `<div class="tg-note"><strong>Rule</strong><span>${escapeHtml(section.note)}</span></div>` : ''}
        </section>`;

      case 'transformation':
        return `<section class="tg-section">
          <div class="tg-heading"><h2>${escapeHtml(section.title)}</h2></div>
          <div class="tg-transform">${(section.pairs || []).map((pair) => `
            <article><div>${escapeHtml(pair.from)}</div><span>→</span><strong>${escapeHtml(pair.to)}</strong></article>`).join('')}</div>
          <div class="tg-note"><strong>Rule</strong><span>${escapeHtml(section.rule)}</span></div>
        </section>`;

      case 'focusSplit':
        return `<section class="tg-section">
          <div class="tg-heading"><h2>${escapeHtml(section.title)}</h2></div>
          <div class="tg-focus-split">${(section.sides || []).map((side) => `
            <article>
              <span>${escapeHtml(side.label)}</span>
              <h3>${escapeHtml(side.title)}</h3>
              ${(side.patterns || []).map((p) => `<code>${escapeHtml(p)}</code>`).join('')}
              <p>${escapeHtml(side.example)}</p>
            </article>`).join('')}</div>
        </section>`;

      default:
        return '';
    }
  };

  const style = document.createElement('style');
  style.textContent = `
    .grammar-topic-shell.has-textbook-guide > .grammar-lead-card,
    .grammar-topic-shell.has-textbook-guide > .grammar-content-section:not(.grammar-test-section),
    .grammar-topic-shell.has-textbook-guide > .grammar-memory-card { display:none !important; }

    .textbook-grammar-guide { display:grid; gap:22px; }
    .tg-intro {
      padding:24px; border:1.5px solid #c7d2fe; border-radius:20px;
      background:linear-gradient(145deg,#fff,#f7f7ff);
      box-shadow:0 12px 32px rgba(15,23,42,.05);
    }
    .tg-intro .eyebrow { color:#4f46e5; }
    .tg-intro h2 { margin-top:6px; font-size:clamp(1.55rem,5vw,2.1rem); line-height:1.15; }
    .tg-intro p { max-width:780px; margin-top:12px; color:#475569; line-height:1.75; }

    .tg-section { display:grid; gap:12px; }
    .tg-heading { padding:0 3px; }
    .tg-heading h2 { font-size:clamp(1.2rem,4vw,1.55rem); line-height:1.25; }
    .tg-heading p { margin-top:5px; color:#64748b; font-size:.86rem; line-height:1.55; }

    .tg-timeline { display:grid; grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); gap:10px; }
    .tg-time-item {
      position:relative; padding:17px; border:1px solid #dbe3ef; border-top:4px solid #6366f1;
      border-radius:16px; background:#fff;
    }
    .tg-time-label { display:inline-flex; margin-bottom:10px; padding:4px 8px; border-radius:999px; background:#eef2ff; color:#4338ca; font-size:.68rem; font-weight:900; }
    .tg-time-item h3 { font-size:.95rem; }
    .tg-time-item p { margin-top:6px; min-height:58px; color:#64748b; font-size:.8rem; line-height:1.5; }
    .tg-time-item code, .tg-pattern-card code, .tg-contrast-card code, .tg-pronouns code, .tg-rule-row code {
      display:block; margin-top:10px; padding:9px 10px; border-radius:10px; background:#f8fafc; color:#312e81;
      font-family:Inter,sans-serif; font-size:.79rem; line-height:1.45; white-space:normal;
    }

    .tg-table-wrap { overflow-x:auto; border:1px solid #dbe3ef; border-radius:16px; background:#fff; }
    .tg-table { width:100%; min-width:650px; border-collapse:collapse; font-size:.82rem; }
    .tg-table th { padding:11px 12px; background:#f1f5f9; color:#334155; text-align:left; font-weight:900; }
    .tg-table td { padding:11px 12px; border-top:1px solid #e2e8f0; color:#475569; line-height:1.5; vertical-align:top; }
    .tg-table td:first-child { color:#1e293b; font-weight:800; }

    .tg-note, .tg-warning { display:flex; gap:10px; padding:12px 14px; border-radius:13px; font-size:.82rem; line-height:1.55; }
    .tg-note { border:1px solid #bfdbfe; background:#eff6ff; color:#1e3a8a; }
    .tg-warning { border:1px solid #fed7aa; background:#fff7ed; color:#9a3412; }
    .tg-note strong,.tg-warning strong { flex:0 0 auto; }

    .tg-pattern-grid,.tg-card-grid,.tg-pronouns,.tg-focus-split { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
    .tg-pattern-card,.tg-contrast-card,.tg-pronouns article,.tg-focus-split article {
      padding:16px; border:1px solid #dbe3ef; border-radius:16px; background:#fff;
    }
    .tg-pattern-label { display:inline-flex; margin-bottom:9px; padding:4px 8px; border-radius:8px; background:#eef2ff; color:#4338ca; font-size:.7rem; font-weight:900; }
    .tg-pattern-card code { margin-top:0; font-weight:800; }
    .tg-pattern-card p,.tg-contrast-card p,.tg-focus-split p { margin-top:9px; color:#64748b; font-size:.82rem; line-height:1.5; }
    .tg-contrast-card h3,.tg-focus-split h3 { font-size:.96rem; line-height:1.35; }

    .tg-rule-list,.tg-flow,.tg-transform,.tg-examples { display:grid; gap:9px; }
    .tg-rule-row { display:grid; grid-template-columns:32px minmax(0,1fr); gap:10px; padding:13px; border:1px solid #e2e8f0; border-radius:14px; background:#fff; }
    .tg-rule-row > span,.tg-flow-num { display:grid; place-items:center; width:32px; height:32px; border-radius:10px; background:#eef2ff; color:#4338ca; font-size:.75rem; font-weight:900; }
    .tg-rule-row code { margin-top:6px; }

    .tg-algorithm { padding:19px; border:1px solid #fde68a; border-radius:18px; background:linear-gradient(145deg,#fffbeb,#fff); }
    .tg-algorithm ol { display:grid; gap:8px; margin:0; padding-left:22px; color:#475569; font-size:.85rem; line-height:1.6; }

    .tg-scale { display:grid; gap:8px; }
    .tg-scale-item { display:grid; grid-template-columns:130px minmax(0,1fr) minmax(210px,.8fr); gap:12px; align-items:center; padding:12px 14px; border:1px solid #dbe3ef; border-radius:14px; background:#fff; }
    .tg-scale-item strong { color:#312e81; font-size:.95rem; }
    .tg-scale-item p { color:#64748b; font-size:.8rem; line-height:1.45; }
    .tg-scale-item code { color:#1e293b; font-family:Inter,sans-serif; font-size:.8rem; }
    .tg-strong { border-left:5px solid #16a34a; }
    .tg-medium { border-left:5px solid #0ea5e9; }
    .tg-possible { border-left:5px solid #8b5cf6; }
    .tg-negative { border-left:5px solid #f43f5e; }

    .tg-examples article { padding:12px 14px; border-left:4px solid #818cf8; border-radius:0 12px 12px 0; background:#fff; }
    .tg-examples span { color:#6366f1; font-size:.7rem; font-weight:900; text-transform:uppercase; }
    .tg-examples p { margin-top:4px; color:#334155; font-size:.86rem; line-height:1.55; }

    .tg-role-map { display:grid; gap:8px; }
    .tg-role-map article { display:grid; grid-template-columns:minmax(120px,.6fr) 28px minmax(130px,.7fr) minmax(200px,1fr); gap:8px; align-items:center; padding:12px 14px; border:1px solid #e2e8f0; border-radius:14px; background:#fff; }
    .tg-role-target { color:#475569; font-size:.82rem; }
    .tg-role-arrow { color:#94a3b8; text-align:center; }
    .tg-role-map strong { color:#4338ca; font-size:.82rem; }
    .tg-role-map code { font-size:.8rem; color:#1e293b; }

    .tg-pronouns { grid-template-columns:repeat(3,minmax(0,1fr)); }
    .tg-pronouns strong { display:block; color:#4338ca; font-size:1.05rem; }
    .tg-pronouns span { display:block; margin-top:3px; color:#64748b; font-size:.76rem; }
    .tg-pronouns code { margin-top:9px; }

    .tg-flow { grid-template-columns:repeat(3,minmax(0,1fr)); }
    .tg-flow article { padding:15px; border:1px solid #dbe3ef; border-radius:16px; background:#fff; }
    .tg-flow h3 { margin-top:9px; min-height:48px; font-size:.9rem; line-height:1.4; }
    .tg-flow article div { margin-top:7px; color:#64748b; font-size:.77rem; line-height:1.45; }
    .tg-flow article div b { display:inline-block; min-width:30px; color:#4338ca; }

    .tg-big-note { padding:19px; border:1px solid #ddd6fe; border-radius:18px; background:linear-gradient(145deg,#f5f3ff,#fff); }
    .tg-big-note h2 { font-size:1.18rem; }
    .tg-big-note p { margin-top:9px; color:#475569; line-height:1.7; }

    .tg-anatomy { display:flex; align-items:center; gap:7px; overflow-x:auto; padding:14px; border:1px solid #c7d2fe; border-radius:15px; background:#f8f7ff; }
    .tg-anatomy span { flex:0 0 auto; padding:8px 10px; border-radius:10px; background:#fff; color:#312e81; font-size:.78rem; font-weight:800; }
    .tg-anatomy b { color:#94a3b8; }

    .tg-transform article { display:grid; grid-template-columns:minmax(0,1fr) 28px minmax(0,1.2fr); gap:9px; align-items:center; padding:12px 14px; border:1px solid #e2e8f0; border-radius:14px; background:#fff; font-size:.83rem; line-height:1.5; }
    .tg-transform article span { color:#94a3b8; text-align:center; }
    .tg-transform article strong { color:#312e81; }

    .tg-focus-split article > span { display:inline-flex; padding:4px 8px; border-radius:999px; background:#eef2ff; color:#4338ca; font-size:.68rem; font-weight:900; }
    .tg-focus-split h3 { margin-top:9px; }
    .tg-focus-split code { display:block; margin-top:8px; padding:8px 9px; border-radius:9px; background:#f8fafc; color:#1e1b4b; font-size:.78rem; white-space:normal; }

    @media (max-width:760px) {
      .tg-pattern-grid,.tg-card-grid,.tg-focus-split { grid-template-columns:1fr; }
      .tg-pronouns { grid-template-columns:repeat(2,minmax(0,1fr)); }
      .tg-flow { grid-template-columns:1fr; }
      .tg-scale-item { grid-template-columns:1fr; gap:5px; }
      .tg-role-map article { grid-template-columns:1fr; }
      .tg-role-arrow { transform:rotate(90deg); }
      .tg-transform article { grid-template-columns:1fr; }
      .tg-transform article span { transform:rotate(90deg); }
    }

    @media (max-width:480px) {
      .tg-pronouns { grid-template-columns:1fr; }
      .tg-intro { padding:19px; }
    }
  `;
  document.head.appendChild(style);

  const applyGuide = () => {
    const id = new URLSearchParams(location.search).get('id') || '';
    const guide = guides[id];
    const root = document.getElementById('grammar-topic-root');
    const shell = root?.querySelector('.grammar-topic-shell');
    if (!guide || !shell || shell.dataset.textbookGuide === 'true') return;

    const status = shell.querySelector('.grammar-status-card');
    const guideNode = document.createElement('div');
    guideNode.className = 'textbook-grammar-guide';
    guideNode.innerHTML = `
      <article class="tg-intro">
        <span class="eyebrow">Study guide</span>
        <h2>${escapeHtml(guide.title)}</h2>
        <p>${escapeHtml(guide.intro)}</p>
      </article>
      ${(guide.sections || []).map(renderSection).join('')}
    `;

    if (status) status.insertAdjacentElement('afterend', guideNode);
    else shell.prepend(guideNode);

    shell.classList.add('has-textbook-guide');
    shell.dataset.textbookGuide = 'true';
  };

  const rootObserver = new MutationObserver(() => {
    window.requestAnimationFrame(applyGuide);
  });

  document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('grammar-topic-root');
    if (root) {
      rootObserver.observe(root, { childList: true, subtree: false });
      window.requestAnimationFrame(applyGuide);
      window.setTimeout(applyGuide, 250);
      window.setTimeout(applyGuide, 1000);
    }
  });
})();
