/* ═══════════════════════════════════════════════
   ExamPuri — Shared JS
   Handles: lang, nav, FAQ, timer, reveal, sticky
═══════════════════════════════════════════════ */

/* ── Language ── */
function setLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  localStorage.setItem('ep_lang', lang);
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
}
function initLang() {
  const saved = localStorage.getItem('ep_lang') || 'hi';
  setLang(saved);
}

/* ── Mobile nav toggle ── */
function toggleMob() {
  const m = document.getElementById('mob-menu');
  if (m) m.classList.toggle('open');
}
function closeMob() {
  const m = document.getElementById('mob-menu');
  if (m) m.classList.remove('open');
}

/* ── Countdown Timer ── */
function startCountdown(prefix, hoursFromNow) {
  const KEY = 'ep_deadline_' + prefix;
  let deadline = parseInt(localStorage.getItem(KEY) || '0');
  if (!deadline || deadline < Date.now()) {
    deadline = Date.now() + hoursFromNow * 3600 * 1000;
    localStorage.setItem(KEY, deadline);
  }
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    const diff = Math.max(0, deadline - Date.now());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    ['h','m','s'].forEach((key, i) => {
      const vals = [h, m, s];
      [prefix + '-' + key, prefix + '-o-' + key].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = pad(vals[i]);
      });
    });
    if (diff === 0) clearInterval(tid);
  }
  tick();
  const tid = setInterval(tick, 1000);
}

/* ── FAQ Toggle ── */
function initFAQ(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (q) q.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });
}

/* ── Scroll Reveal ── */
function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-l, .reveal-r');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ── Sticky CTA ── */
function initStickyBar() {
  const bar = document.getElementById('sticky-cta');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    bar.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
}

/* ── GA4 event helper (drop-in) ── */
function trackEvent(name, params) {
  try { if (typeof gtag !== 'undefined') gtag('event', name, params || {}); } catch(e) {}
}
/* ── Meta Pixel helper ── */
function trackPixel(event, params) {
  try { if (typeof fbq !== 'undefined') fbq('track', event, params || {}); } catch(e) {}
}

/* ── CTA click tracker ── */
function trackCTA(label, destination) {
  trackEvent('cta_click', { cta_label: label, destination });
  trackPixel('InitiateCheckout', { content_name: label });
}

/* ── Init all on DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initReveal();
  initStickyBar();
});
