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
    a.innerHTML+=`<div style="flex:1;min-width:0"><div class="sub-name">${exam.name}</div>
      <div class="sm c-muted mt2"><span class="en">Start Practice →</span><span class="hi">Practice शुरू करो →</span></div></div>
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
      <img src="${C.brand.logo}" alt="${C.brand.name}" width="34" height="34" onerror="this.style.display='none'"/>
      <span class="nav-logo-txt">${C.brand.name}</span>
    </a>
    <div class="nav-links ml-a">
      ${links.map(l=>`<a href="${l.h}" class="nav-lnk${active===l.k?' active':''}"><span class="en">${l.en}</span><span class="hi">${l.hi}</span></a>`).join('')}
    </div>
    <div class="flex ai-c g3 ml-a">
      <a href="${C.brand.phoneHref}" class="nav-phone mob-hide">📞 ${C.brand.phone}</a>
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
        <div class="flex g2"><a href="#" class="soc-ic">📘</a><a href="#" class="soc-ic">📸</a><a href="#" class="soc-ic">▶️</a><a href="${C.brand.whatsapp}" target="_blank" class="soc-ic">💬</a></div>
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
        <a href="${C.brand.phoneHref}" class="ft-lnk">📞 ${C.brand.phone}</a>
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
