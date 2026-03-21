/* ════════════════════════════════════════════════════
   ExamPuri — Shared Runtime (main.js)
   Reads everything from EP_CONFIG (config.js)
   All pages include this file + config.js
════════════════════════════════════════════════════ */

/* ── Lang helper ── */
function getLang() { return document.documentElement.getAttribute('data-lang') || 'hi'; }
function t(obj)    { if (!obj) return ''; if (typeof obj === 'string') return obj; return obj[getLang()] || obj['en'] || ''; }

/* ── Language toggle ── */
function setLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  localStorage.setItem('ep_lang', lang);
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  // Re-render dynamic sections if page has renderDynamic()
  if (typeof renderDynamic === 'function') renderDynamic();
}

function initLang() {
  const saved = localStorage.getItem('ep_lang') || 'hi';
  document.documentElement.setAttribute('data-lang', saved);
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === saved);
  });
}

/* ── Mobile nav ── */
function toggleMob() {
  const m = document.getElementById('mob-menu');
  if (m) m.classList.toggle('open');
}

/* ── Scroll reveal ── */
function initReveal() {
  const els = document.querySelectorAll('.rv,.rv-l,.rv-r');
  if (!els.length) return;
  const ob = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); ob.unobserve(e.target); } });
  }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => { if (!el.classList.contains('on')) ob.observe(el); });
}

/* ── Sticky CTA ── */
function initSticky() {
  const bar = document.getElementById('sticky-cta');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    bar.classList.toggle('up', window.scrollY > 500);
  }, { passive: true });
}

/* ── FAQ accordion ── */
function initFAQ(wrapperId) {
  const w = document.getElementById(wrapperId);
  if (!w) return;
  w.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (q) q.addEventListener('click', () => item.classList.toggle('open'));
  });
}

/* ── Countdown timer ── */
function startTimer(prefix, hoursFromNow) {
  const KEY = 'ep_dl_' + prefix;
  let dl = parseInt(localStorage.getItem(KEY) || '0');
  if (!dl || dl < Date.now()) {
    dl = Date.now() + hoursFromNow * 3600000;
    localStorage.setItem(KEY, dl);
  }
  const pad = n => String(n).padStart(2, '0');
  const ids = [prefix + '-th', prefix + '-tm', prefix + '-ts',
               prefix + '-oh', prefix + '-om', prefix + '-os'];
  function tick() {
    const diff = Math.max(0, dl - Date.now());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    [h, m, s].forEach((v, i) => {
      const id1 = ids[i], id2 = ids[i + 3];
      const e1 = document.getElementById(id1), e2 = document.getElementById(id2);
      if (e1) e1.textContent = pad(v);
      if (e2) e2.textContent = pad(v);
    });
    if (!diff) clearInterval(tid);
  }
  tick();
  const tid = setInterval(tick, 1000);
}

/* ── Analytics helpers ── */
function trackCTA(label, dest) {
  const C = window.EP_CONFIG;
  if (!C?.analytics?.enabled) return;
  try { if (typeof gtag !== 'undefined') gtag('event', 'cta_click', { cta_label: label, destination: dest }); } catch(e){}
  try { if (typeof fbq !== 'undefined') fbq('track', 'InitiateCheckout', { content_name: label }); } catch(e){}
}

/* ══════════════════════════════════════════════════
   API LAYER — reads endpoints from config.js
══════════════════════════════════════════════════ */

/**
 * Build a URL from a template string in config
 * e.g. buildUrl(cfg.l1, { nodeId: 531 })
 */
function buildUrl(template, params) {
  const C = window.EP_CONFIG;
  let url = C.api.baseUrl + template;
  Object.entries(params).forEach(([k, v]) => {
    url = url.replace('{' + k + '}', v);
  });
  return url;
}

/**
 * Fetch L1 categories for a given nodeId
 * Returns: [{ id, name, url }]
 */
async function fetchCategories(nodeId) {
  try {
    const url = buildUrl(EP_CONFIG.api.l1, { nodeId });
    const res = await fetch(url);
    const json = await res.json();
    if (!json.status) throw new Error(json.msg || 'API error');
    return json.result.data || [];
  } catch (err) {
    console.warn('[ExamPuri] fetchCategories failed:', err);
    return null; // null = error, [] = empty
  }
}

/**
 * Fetch L2 exams for a given categoryId
 * Returns: [{ name, url, id, image }]
 */
async function fetchExams(categoryId) {
  try {
    const url = buildUrl(EP_CONFIG.api.l2, { categoryId });
    const res = await fetch(url);
    const json = await res.json();
    if (!json.status) throw new Error(json.msg || 'API error');
    return (json.result.data || []).map(row => ({
      name:  row[0],
      url:   row[1],
      id:    row[2],
      image: row[3],
    }));
  } catch (err) {
    console.warn('[ExamPuri] fetchExams failed:', err);
    return null;
  }
}

/* ══════════════════════════════════════════════════
   EXAM CATEGORIES SECTION RENDERER
   Used on: ssc.html, banking.html, railway.html etc.
   
   Target element: <div id="exam-categories"></div>
   Config: EP_CONFIG.pages[slug].nodeId
══════════════════════════════════════════════════ */

async function renderExamCategories(slug) {
  const container = document.getElementById('exam-categories');
  if (!container) return;

  const cfg = EP_CONFIG.pages[slug];
  if (!cfg) { container.innerHTML = errorState('Page config not found'); return; }

  // Show loading skeletons
  container.innerHTML = skeletonHTML(4);

  const categories = await fetchCategories(cfg.nodeId);

  if (categories === null) {
    container.innerHTML = errorState(
      getLang() === 'hi'
        ? 'Exam list load नहीं हो पाई। Page refresh करें।'
        : 'Could not load exam list. Please refresh the page.'
    );
    return;
  }

  if (!categories.length) {
    container.innerHTML = errorState(
      getLang() === 'hi' ? 'कोई category नहीं मिली।' : 'No categories found.'
    );
    return;
  }

  // Render category blocks (collapsed by default, click to expand)
  container.innerHTML = '';
  categories.forEach((cat, i) => {
    const block = document.createElement('div');
    block.className = 'cat-block rv';
    block.style.animationDelay = `${i * 0.05}s`;

    block.innerHTML = `
      <div class="cat-header" onclick="toggleCategory(this, ${cat.id})" aria-expanded="false">
        <div class="flex ai-c g3">
          <span style="font-size:20px">${getCatIcon(cat.name)}</span>
          <div>
            <div class="fw7" style="font-size:15px;color:var(--text-h)">${cat.name}</div>
          </div>
        </div>
        <span class="cat-count" id="cat-count-${cat.id}">
          <span class="en">Loading...</span><span class="hi">Loading...</span>
        </span>
        <svg class="cat-chevron" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
      <div class="cat-body" id="cat-body-${cat.id}"></div>
    `;
    container.appendChild(block);

    // Eagerly pre-fetch exam count (for badge) without waiting for click
    prefetchCount(cat.id);
  });

  // Open first category automatically
  if (categories.length > 0) {
    const firstHeader = container.querySelector('.cat-header');
    if (firstHeader) firstHeader.click();
  }

  initReveal();
}

// Pre-fetch just to get count for the badge
async function prefetchCount(categoryId) {
  const exams = await fetchExams(categoryId);
  const countEl = document.getElementById('cat-count-' + categoryId);
  if (countEl) {
    if (exams === null) {
      countEl.textContent = '—';
    } else {
      countEl.textContent = exams.length + (getLang() === 'hi' ? ' Exams' : ' Exams');
    }
  }
}

// Toggle category open/close, lazy-load exams on first open
async function toggleCategory(header, categoryId) {
  const body = document.getElementById('cat-body-' + categoryId);
  if (!body) return;

  const isOpen = header.classList.contains('open');

  // Close all others
  document.querySelectorAll('.cat-header.open').forEach(h => h.classList.remove('open'));
  document.querySelectorAll('.cat-body.open').forEach(b => b.classList.remove('open'));

  if (isOpen) return; // was open → just close

  header.classList.add('open');
  body.classList.add('open');
  header.setAttribute('aria-expanded', 'true');

  // Already loaded?
  if (body.dataset.loaded === 'true') return;

  // Show loading
  body.innerHTML = skeletonHTML(3, true);

  const exams = await fetchExams(categoryId);
  body.dataset.loaded = 'true';

  if (exams === null) {
    body.innerHTML = `<div class="state-box"><div class="state-icon">⚠️</div><div class="sm c-muted">${getLang() === 'hi' ? 'Load failed। Retry करें।' : 'Failed to load. Please retry.'}</div></div>`;
    return;
  }
  if (!exams.length) {
    body.innerHTML = `<div class="state-box"><div class="state-icon">📭</div><div class="sm c-muted">${getLang() === 'hi' ? 'कोई exam नहीं मिली।' : 'No exams found.'}</div></div>`;
    return;
  }

  body.innerHTML = '';
  exams.forEach(exam => {
    const a = document.createElement('a');
    a.className = 'exam-sub-card';
    a.href = EP_CONFIG.brand.baseUrl + exam.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('onclick', `trackCTA('exam_${exam.id}','${EP_CONFIG.brand.baseUrl + exam.url}')`);

    const imgSrc = exam.image.startsWith('http')
      ? exam.image
      : EP_CONFIG.api.imgBase + exam.image;

    a.innerHTML = `
      <img src="${imgSrc}" alt="${exam.name}" loading="lazy"
           onerror="this.src='${EP_CONFIG.api.imgFallback}'"/>
      <div>
        <div class="sub-name">${exam.name}</div>
        <div class="sm c-muted mt2">
          <span class="en">Start Practice →</span>
          <span class="hi">Practice शुरू करो →</span>
        </div>
      </div>
      <svg class="sub-arrow" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    `;
    body.appendChild(a);
  });
}

/* ── Helpers ── */
function skeletonHTML(count, small) {
  const h = small ? 64 : 72;
  return Array.from({ length: count }, () =>
    `<div class="skel skel-card" style="height:${h}px"></div>`
  ).join('');
}

function errorState(msg) {
  return `<div class="state-box"><div class="state-icon">⚠️</div><p class="sm c-muted mt3">${msg}</p></div>`;
}

function getCatIcon(name) {
  const n = name.toLowerCase();
  if (n.includes('cgl') || n.includes('mts') || n.includes('ssc')) return '📝';
  if (n.includes('bank') || n.includes('sbi') || n.includes('ibps')) return '🏦';
  if (n.includes('railway') || n.includes('rrb') || n.includes('ntpc')) return '🚂';
  if (n.includes('upsc') || n.includes('ias') || n.includes('civil')) return '🏛️';
  if (n.includes('police') || n.includes('constable')) return '👮';
  if (n.includes('teach') || n.includes('ctet')) return '🎓';
  if (n.includes('bihar') || n.includes('bssc')) return '🏅';
  if (n.includes('steno')) return '⌨️';
  if (n.includes('chsl')) return '📋';
  if (n.includes('cpo') || n.includes('sub inspector')) return '🚔';
  return '📚';
}

/* ══════════════════════════════════════════════════
   SHARED UI BLOCKS (navbar, footer, sticky)
   Pages can call these to inject shared HTML
══════════════════════════════════════════════════ */

function renderNavbar(activePage, rootPath) {
  const root = rootPath || '';
  const C = EP_CONFIG;
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const links = [
    { key: 'home',    href: root + 'index.html',         en: 'Home',    hi: 'होम' },
    { key: 'ssc',     href: root + 'pages/ssc.html',     en: 'SSC',     hi: 'SSC' },
    { key: 'banking', href: root + 'pages/banking.html', en: 'Banking', hi: 'बैंकिंग' },
    { key: 'railway', href: root + 'pages/railway.html', en: 'Railway', hi: 'रेलवे' },
    { key: 'pricing', href: root + 'pages/pricing.html', en: 'Pricing', hi: 'मूल्य' },
    { key: 'about',   href: root + 'pages/about.html',   en: 'About',   hi: 'About' },
  ];

  nav.innerHTML = `
    <div class="nav-wrap">
      <a href="${root}index.html" class="nav-logo">
        <img src="${C.brand.logo}" alt="${C.brand.name}" width="34" height="34"
             onerror="this.style.display='none'"/>
        <span class="nav-logo-txt">${C.brand.name}</span>
      </a>

      <div class="nav-links ml-a">
        ${links.map(l => `
          <a href="${l.href}" class="nav-lnk${activePage === l.key ? ' active' : ''}">
            <span class="en">${l.en}</span><span class="hi">${l.hi}</span>
          </a>`).join('')}
      </div>

      <div class="flex ai-c g3 ml-a">
        <a href="${C.brand.phoneHref}" class="nav-phone mob-hide">📞 ${C.brand.phone}</a>

        <div class="lang-tog" role="group">
          <button class="lang-btn" data-lang="hi" onclick="setLang('hi')">हिं</button>
          <button class="lang-btn" data-lang="en" onclick="setLang('en')">EN</button>
        </div>

        <a href="${C.brand.baseUrl}" target="_blank" rel="noopener"
           class="btn btn-primary btn-sm nav-cta-d"
           onclick="trackCTA('nav_start_free','${C.brand.baseUrl}')">
          <span class="en">Start Free</span><span class="hi">Free शुरू करें</span>
        </a>

        <button class="mob-tog" onclick="toggleMob()" aria-label="Menu">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    </div>

    <div id="mob-menu">
      ${links.map(l => `
        <a href="${l.href}" class="mob-item">
          <span class="en">${l.en}</span><span class="hi">${l.hi}</span>
        </a>`).join('')}
      <div class="mob-ctas">
        <a href="${C.brand.baseUrl}" target="_blank" rel="noopener"
           class="btn btn-primary btn-md w-full"
           onclick="trackCTA('mob_free','${C.brand.baseUrl}')">
          🆓 <span class="en">Start Free</span><span class="hi">Free शुरू करें</span>
        </a>
      </div>
    </div>
  `;
  initLang();
}

function renderFooter(rootPath) {
  const root = rootPath || '';
  const C = EP_CONFIG;
  const ft = document.getElementById('site-footer');
  if (!ft) return;

  ft.innerHTML = `
    <div class="ft-inner">
      <div class="g-4" style="display:grid;gap:36px">
        <div>
          <div class="ft-brand">${C.brand.name}</div>
          <p style="color:rgba(255,255,255,.4);font-size:13px;line-height:1.75;margin-bottom:16px">
            <span class="en">India's most affordable test series for SSC, Banking, Railway &amp; UPSC aspirants. Hindi-medium friendly.</span>
            <span class="hi">SSC, Banking, Railway &amp; UPSC aspirants के लिए India का सबसे affordable test series। Hindi-medium friendly।</span>
          </p>
          <div class="flex g2">
            <a href="#" class="soc-ic">📘</a>
            <a href="#" class="soc-ic">📸</a>
            <a href="#" class="soc-ic">▶️</a>
            <a href="${C.brand.whatsapp}" target="_blank" class="soc-ic">💬</a>
          </div>
        </div>
        <div>
          <div class="ft-hd"><span class="en">Exams</span><span class="hi">Exams</span></div>
          <a href="${root}pages/ssc.html"     class="ft-lnk">SSC CGL / CHSL</a>
          <a href="${root}pages/banking.html" class="ft-lnk"><span class="en">Banking</span><span class="hi">बैंकिंग</span></a>
          <a href="${root}pages/railway.html" class="ft-lnk"><span class="en">Railway</span><span class="hi">रेलवे</span></a>
          <a href="${root}pages/about.html"   class="ft-lnk">UPSC / State PSC</a>
        </div>
        <div>
          <div class="ft-hd"><span class="en">Company</span><span class="hi">Company</span></div>
          <a href="${root}pages/about.html"   class="ft-lnk"><span class="en">About Us</span><span class="hi">हमारे बारे में</span></a>
          <a href="${root}pages/pricing.html" class="ft-lnk"><span class="en">Pricing</span><span class="hi">Pricing</span></a>
          <a href="${C.brand.baseUrl}/exam_calendar" target="_blank" class="ft-lnk"><span class="en">Exam Calendar</span><span class="hi">Exam Calendar</span></a>
          <a href="${root}pages/about.html"   class="ft-lnk"><span class="en">Contact</span><span class="hi">Contact</span></a>
        </div>
        <div>
          <div class="ft-hd"><span class="en">Connect</span><span class="hi">Connect</span></div>
          <a href="${C.brand.phoneHref}"       class="ft-lnk">📞 ${C.brand.phone}</a>
          <a href="mailto:${C.brand.email}"    class="ft-lnk">✉️ ${C.brand.email}</a>
          <a href="${C.brand.baseUrl}"         target="_blank" class="ft-lnk" style="color:rgba(255,255,255,.6)">🌐 prepare.exampuri.in</a>
          <a href="${C.brand.whatsapp}"        target="_blank" class="ft-lnk" style="color:#25D366">💬 WhatsApp</a>
        </div>
      </div>
      <div class="ft-bot flex jc-b fw g3">
        <span>© 2025 ${C.brand.name}. <span class="en">All rights reserved.</span><span class="hi">All rights reserved.</span></span>
        <div class="flex g4">
          <a href="${C.brand.baseUrl}" target="_blank" class="ft-lnk" style="display:inline"><span class="en">Terms</span><span class="hi">Terms</span></a>
          <a href="${C.brand.baseUrl}" target="_blank" class="ft-lnk" style="display:inline"><span class="en">Privacy</span><span class="hi">Privacy</span></a>
          <a href="${C.brand.baseUrl}" target="_blank" class="ft-lnk" style="display:inline"><span class="en">Refund</span><span class="hi">Refund</span></a>
        </div>
      </div>
    </div>
  `;
}

/* ── Init everything on DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initReveal();
  initSticky();
});
