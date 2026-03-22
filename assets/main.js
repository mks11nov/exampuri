/* ExamPuri Shared Runtime v3 — all panels open */
function getLang(){return document.documentElement.getAttribute('data-lang')||'hi'}
function t(o){if(!o)return '';if(typeof o==='string')return o;return o[getLang()]||o['en']||''}
function setLang(l){document.documentElement.setAttribute('data-lang',l);localStorage.setItem('ep_lang',l);document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===l));if(typeof renderDynamic==='function')renderDynamic()}
function initLang(){const s=localStorage.getItem('ep_lang')||'hi';document.documentElement.setAttribute('data-lang',s);document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===s))}
function toggleMob(){document.getElementById('mob-menu')?.classList.toggle('open')}
function trackCTA(label,dest){if(!EP_CONFIG?.analytics?.enabled)return;try{gtag('event','cta_click',{cta_label:label,destination:dest})}catch(e){}}

/* Countdown */
function startTimer(prefix,hours){
  const K='ep_dl_'+prefix;let dl=parseInt(localStorage.getItem(K)||'0');
  if(!dl||dl<Date.now()){dl=Date.now()+hours*3600000;localStorage.setItem(K,dl)}
  const pad=n=>String(n).padStart(2,'0');
  function tick(){const d=Math.max(0,dl-Date.now());const h=Math.floor(d/3600000),m=Math.floor((d%3600000)/60000),s=Math.floor((d%60000)/1000);
    [[prefix+'-th',prefix+'-oh'],[prefix+'-tm',prefix+'-om'],[prefix+'-ts',prefix+'-os']].forEach(([a,b],i)=>{const v=[h,m,s][i];[a,b].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=pad(v)})});
    if(!d)clearInterval(tid)}
  tick();const tid=setInterval(tick,1000)
}

/* Reveal */
function initReveal(){
  const els=document.querySelectorAll('.rv,.rv-l,.rv-r');
  const ob=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');ob.unobserve(e.target)}})},{threshold:0.07,rootMargin:'0px 0px -30px 0px'});
  els.forEach(el=>{if(!el.classList.contains('on'))ob.observe(el)})
}

/* Sticky */
function initSticky(){const bar=document.getElementById('sticky-cta');if(!bar)return;window.addEventListener('scroll',()=>bar.classList.toggle('up',window.scrollY>500),{passive:true})}

/* ── EXAM CATEGORIES — all open ── */
function renderExamCategories(){
  const container=document.getElementById('exam-categories');
  if(!container)return;
  const cats=window.EP_PAGE_DATA?.categories;
  if(!cats?.length){container.innerHTML=`<div class="state-box"><div class="state-icon">⚠️</div><p class="sm c-muted mt3">No data. Edit /data/${window.EP_PAGE_DATA?.slug||'?'}.js</p></div>`;return}
  container.innerHTML='';
  cats.forEach((cat,i)=>{
    const sec=document.createElement('div');
    sec.className='cat-section rv';
    sec.style.animationDelay=`${i*0.04}s`;
    const base=EP_CONFIG.brand.baseUrl;
    const catHref=cat.categoryUrl.startsWith('http')?cat.categoryUrl:base+cat.categoryUrl;
    sec.innerHTML=`
      <div class="cat-sec-hdr">
        <span class="cat-sec-icon">${cat.icon||'📚'}</span>
        <div><div class="cat-sec-name">${cat.name}</div>
        <div class="cat-sec-count">${cat.exams.length} <span class="en">Exams</span><span class="hi">Exams</span></div></div>
        <a href="${catHref}" target="_blank" rel="noopener" class="cat-sec-all"
           onclick="trackCTA('cat_${cat.id}','${catHref}')">
          <span class="en">View All →</span><span class="hi">सभी देखो →</span>
        </a>
      </div>
      <div class="cat-sec-body" id="csb-${cat.id}"></div>`;
    const body=sec.querySelector(`#csb-${cat.id}`);
    buildBody(body,cat.exams);
    container.appendChild(sec);
  });
  initReveal();
}

function buildBody(body,exams){
  if(!exams?.length){body.innerHTML=`<div class="state-box" style="grid-column:1/-1"><p class="sm c-muted"><span class="en">No exams yet.</span><span class="hi">अभी कोई exam नहीं।</span></p></div>`;return}
  const base=EP_CONFIG.brand.baseUrl,imgBase=EP_CONFIG.api.imgBase;
  exams.forEach(exam=>{
    const href=exam.url.startsWith('http')?exam.url:base+exam.url;
    const init=exam.name.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase();
    const a=document.createElement('a');
    a.className='exam-sub-card';a.href=href;a.target='_blank';a.rel='noopener';
    a.addEventListener('click',()=>trackCTA('exam_'+exam.name,href));
    const thumb=document.createElement('div');
    if(exam.image){
      const img=document.createElement('img');
      img.src=exam.image.startsWith('http')?exam.image:imgBase+exam.image;
      img.alt=exam.name;img.loading='lazy';
      img.style.cssText='width:38px;height:38px;border-radius:8px;object-fit:cover;flex-shrink:0;border:1px solid var(--border)';
      img.onerror=()=>img.replaceWith(mkAvatar(init));
      thumb.appendChild(img);
    }else{thumb.appendChild(mkAvatar(init))}
    a.appendChild(thumb);
    const testsLabel = exam.tests ? `<span style="display:inline-block;background:var(--primary-lt);color:var(--primary);border-radius:4px;padding:1px 7px;font-size:11px;font-weight:700;margin-right:6px">${exam.tests} Tests</span>` : '';
    a.innerHTML+=`<div style="flex:1;min-width:0"><div class="sub-name">${exam.name}</div>
      <div class="sm c-muted mt2">${testsLabel}<span class="en">Start Practice →</span><span class="hi">Practice शुरू करो →</span></div></div>
      <svg class="sub-arrow" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>`;
    body.appendChild(a);
  });
}

function mkAvatar(init){
  const cols=['#1565C0','#E8380D','#2E7D32','#7C3AED','#0D47A1','#B45309','#0891B2','#BE185D'];
  const bg=cols[(init.charCodeAt(0)||0)%cols.length];
  const el=document.createElement('div');
  el.style.cssText=`width:38px;height:38px;border-radius:8px;flex-shrink:0;background:${bg};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;border:1px solid rgba(0,0,0,.08)`;
  el.textContent=init;return el;
}

/* ── SHARED NAV ── */
function renderNavbar(active,root){
  const nav=document.getElementById('navbar');if(!nav)return;
  root=root||'';const C=EP_CONFIG;
  const links=[
    {k:'home',   h:root+'index.html',                   en:'Home',      hi:'होम'},
    {k:'ssc',    h:root+'pages/ssc.html',               en:'SSC',       hi:'SSC'},
    {k:'banking',h:root+'pages/banking.html',           en:'Banking',   hi:'बैंकिंग'},
    {k:'railway',h:root+'pages/railway.html',           en:'Railway',   hi:'रेलवे'},
    {k:'defence',h:root+'pages/defence-police.html',    en:'Defence',   hi:'Defence'},
    {k:'teaching',h:root+'pages/teaching.html',         en:'Teaching',  hi:'Teaching'},
    {k:'govt',   h:root+'pages/government-exams.html',  en:'Govt Exams',hi:'Govt Exams'},
    {k:'pricing',h:root+'pages/pricing.html',           en:'Pricing',   hi:'मूल्य'},
  ];
  nav.innerHTML=`<div class="nav-wrap">
    <a href="${root}index.html" class="nav-logo">
      <img src="${C.brand.logo}" alt="${C.brand.name}" height="40" style="width:auto;height:40px" onerror="this.style.display='none'"/>
    </a>
    <div class="nav-links ml-a">
      ${links.map(l=>`<a href="${l.h}" class="nav-lnk${active===l.k?' active':''}"><span class="en">${l.en}</span><span class="hi">${l.hi}</span></a>`).join('')}
    </div>
    <div class="flex ai-c g3 ml-a">
      <a href="mailto:${C.brand.email}" class="nav-phone mob-hide"> ✉️ ${C.brand.email}</a>
      <div class="lang-tog" role="group">
        <button class="lang-btn" data-lang="hi" onclick="setLang('hi')">हिं</button>
        <button class="lang-btn" data-lang="en" onclick="setLang('en')">EN</button>
      </div>
      <a href="${C.brand.baseUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm nav-cta-d" onclick="trackCTA('nav_free','${C.brand.baseUrl}')">
        <span class="en">Start Free</span><span class="hi">Free शुरू करें</span>
      </a>
      <button class="mob-tog" onclick="toggleMob()"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
    </div></div>
    <div id="mob-menu">
      ${links.map(l=>`<a href="${l.h}" class="mob-item"><span class="en">${l.en}</span><span class="hi">${l.hi}</span></a>`).join('')}
      <div class="mob-ctas"><a href="${C.brand.baseUrl}" target="_blank" class="btn btn-primary btn-md w-full" onclick="trackCTA('mob_free','${C.brand.baseUrl}')"><span class="en">🆓 Start Free</span><span class="hi">🆓 Free शुरू करें</span></a></div>
    </div>`;
  initLang();
}

/* ── SHARED FOOTER ── */
function renderFooter(root){
  const ft=document.getElementById('site-footer');if(!ft)return;
  root=root||'';const C=EP_CONFIG;
  ft.innerHTML=`<div class="ft-inner">
    <div class="ft-grid">
      <div>
        <div class="ft-brand">${C.brand.name}</div>
        <p style="color:rgba(255,255,255,.4);font-size:13px;line-height:1.75;margin-bottom:16px">
          <span class="en">India's most affordable test series for all competitive exams.</span>
          <span class="hi">सभी competitive exams के लिए India का सबसे affordable test series।</span>
        </p>
        <div class="flex g2">
          <a href="https://www.facebook.com/exampuri.in/" target="_blank" rel="noopener" class="soc-ic" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://www.instagram.com/exampuri.in/" target="_blank" rel="noopener" class="soc-ic" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://www.youtube.com/channel/UC_ABAREp9RLp2kp8ESVW4-w" target="_blank" rel="noopener" class="soc-ic" aria-label="YouTube">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-2.53 12.63 12.63 0 0 0-7.64 0A4.83 4.83 0 0 1 4.41 6.69 49.21 49.21 0 0 0 4 12a49.21 49.21 0 0 0 .41 5.31 4.83 4.83 0 0 1 3.77 2.53 12.63 12.63 0 0 0 7.64 0 4.83 4.83 0 0 1 3.77-2.53A49.21 49.21 0 0 0 20 12a49.21 49.21 0 0 0-.41-5.31zM10 15V9l5 3-5 3z"/></svg>
          </a>
          <a href="https://twitter.com/_exampuri" target="_blank" rel="noopener" class="soc-ic" aria-label="Twitter / X">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="${C.brand.whatsapp}" target="_blank" rel="noopener" class="soc-ic" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
          </a>
        </div>
      </div>
      <div>
        <div class="ft-hd">Exams</div>
        <a href="${root}pages/ssc.html" class="ft-lnk">SSC</a>
        <a href="${root}pages/banking.html" class="ft-lnk"><span class="en">Banking</span><span class="hi">बैंकिंग</span></a>
        <a href="${root}pages/railway.html" class="ft-lnk"><span class="en">Railway</span><span class="hi">रेलवे</span></a>
        <a href="${root}pages/defence-police.html" class="ft-lnk">Defence & Police</a>
        <a href="${root}pages/teaching.html" class="ft-lnk">Teaching</a>
        <a href="${root}pages/government-exams.html" class="ft-lnk">Govt Exams</a>
      </div>
      <div>
        <div class="ft-hd">More</div>
        <a href="${root}pages/engineering.html" class="ft-lnk">Engineering</a>
        <a href="${root}pages/school-boards.html" class="ft-lnk">School Boards</a>
        <a href="${root}pages/driving-license.html" class="ft-lnk">Driving License</a>
        <a href="${root}pages/pricing.html" class="ft-lnk"><span class="en">Pricing</span><span class="hi">Pricing</span></a>
      </div>
      <div>
        <div class="ft-hd">Connect</div>
        <a href="mailto:${C.brand.email}" class="ft-lnk">✉️ ${C.brand.email}</a>
        <a href="${C.brand.baseUrl}" target="_blank" class="ft-lnk" style="color:rgba(255,255,255,.6)">🌐 prepare.exampuri.in</a>
        <a href="${C.brand.whatsapp}" target="_blank" class="ft-lnk" style="color:#25D366">💬 WhatsApp</a>
      </div>
    </div>
    <div class="ft-bot flex jc-b fw g3">
      <span>© 2025 ${C.brand.name}. All rights reserved.</span>
      <div class="flex g4">
        <a href="${C.brand.baseUrl}" target="_blank" class="ft-lnk" style="display:inline">Terms</a>
        <a href="${C.brand.baseUrl}" target="_blank" class="ft-lnk" style="display:inline">Privacy</a>
        <a href="${C.brand.baseUrl}" target="_blank" class="ft-lnk" style="display:inline">Refund</a>
      </div>
    </div></div>`;
}

document.addEventListener('DOMContentLoaded',()=>{initLang();initReveal();initSticky()});

/* ── FAQ accordion ── */
function initFAQ(containerId){
  const container=document.getElementById(containerId);
  if(!container)return;
  container.querySelectorAll('.faq-item').forEach(item=>{
    const q=item.querySelector('.faq-q');
    if(!q)return;
    q.addEventListener('click',()=>{
      const isOpen=item.classList.contains('open');
      container.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
      if(!isOpen)item.classList.add('open');
    });
  });
}
