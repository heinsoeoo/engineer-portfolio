const data=window.PORTFOLIO;
const arrowIcon='<svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg>';
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tags=items=>items.map(x=>`<span>${escapeHTML(x)}</span>`).join('');
const dialog=document.querySelector('dialog');
document.querySelector('#projects').innerHTML=data.projects.map((p,i)=>`<button class="project" data-project="${i}" aria-label="View ${escapeHTML(p.title)} placeholder details"><div class="art"><div class="mock ${p.visual==='mobile'?'phone':p.visual==='commerce'?'commerce':''}"><div class="mock-head"><span>${p.visual==='mobile'?'Everyday.':p.visual==='commerce'?'FORM / OBJECT':'Workspace'}</span><span>◦</span></div><div class="mock-grid"><i></i><i></i><i></i></div><div class="mock-line"></div><div class="mock-line"></div><div class="mock-line"></div></div><span class="art-caption">ILLUSTRATIVE INTERFACE · NOT A PROJECT SCREENSHOT</span></div><span class="eyebrow">${escapeHTML(p.type)}</span><div class="project-bottom"><h3>${escapeHTML(p.title)}</h3><span class="project-arrow">${arrowIcon}</span></div><div class="tags">${tags(p.tags)}</div></button>`).join('');
document.querySelector('#skills-list').innerHTML=data.skills.map(s=>`<div><h3>${escapeHTML(s.title)}</h3><ul>${s.items.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul></div>`).join('');
document.querySelector('#timeline').innerHTML=data.experience.map(j=>`<article class="job"><div class="job-date">${escapeHTML(j.date)}</div><div><h3>${escapeHTML(j.company)}</h3><div class="job-role">${escapeHTML(j.role)}</div><p>${escapeHTML(j.detail)}</p>${j.note?`<p class="small">${escapeHTML(j.note)}</p>`:''}</div></article>`).join('');
document.querySelectorAll('[data-project]').forEach(b=>b.addEventListener('click',()=>{const p=data.projects[Number(b.dataset.project)];document.querySelector('#dialog-title').textContent=p.title;document.querySelector('#dialog-description').textContent=p.description;document.querySelector('#dialog-tags').innerHTML=tags(p.tags);dialog.showModal()}));
document.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
const theme=document.querySelector('.theme');function syncTheme(){const dark=document.documentElement.dataset.theme==='dark';theme.setAttribute('aria-label',`Switch to ${dark?'light':'dark'} mode`);theme.setAttribute('aria-pressed',String(dark));document.querySelector('meta[name="theme-color"]').content=dark?'#191d18':'#f4f3ee'}syncTheme();let themeTransitionRunning=false;
function applyTheme(){document.documentElement.dataset.theme=document.documentElement.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('theme',document.documentElement.dataset.theme)}catch(e){}syncTheme()}
theme.addEventListener('click',async()=>{
 if(themeTransitionRunning)return;
 if(!document.startViewTransition||matchMedia('(prefers-reduced-motion: reduce)').matches){applyTheme();return}
 const rect=theme.getBoundingClientRect(),x=rect.left+rect.width/2,y=rect.top+rect.height/2;
 const radius=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
 themeTransitionRunning=true;
 document.documentElement.classList.add('theme-reveal');
 try{
  const transition=document.startViewTransition(applyTheme);
  await transition.ready;
  await document.documentElement.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${radius}px at ${x}px ${y}px)`]},{duration:650,easing:'cubic-bezier(.22,1,.36,1)',pseudoElement:'::view-transition-new(root)'}).finished;
  await transition.finished;
 }catch(e){}finally{document.documentElement.classList.remove('theme-reveal');themeTransitionRunning=false}
});
const email=document.querySelector('#email-link');email.href=`mailto:${data.email}`;email.replaceChildren(document.createTextNode(data.email+' '),Object.assign(document.createElement('span'),{innerHTML:arrowIcon}));document.querySelector('#github').href=data.github;document.querySelector('#linkedin').href=data.linkedin;
document.querySelector('#copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(data.email);document.querySelector('#copy-status').textContent='Email copied.'}catch(e){document.querySelector('#copy-status').textContent=`Copy this address: ${data.email}`}});document.querySelector('#year').textContent=new Date().getFullYear();

const wechatDialog=document.querySelector('#wechat-dialog');document.querySelector('#wechat-open').addEventListener('click',()=>wechatDialog.showModal());document.querySelector('#wechat-close').addEventListener('click',()=>wechatDialog.close());
// Progressive enhancement: content remains visible without JavaScript or motion.
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
 const reveals=[...document.querySelectorAll('.section-top,section:not(.hero) h2,.project,.about-copy,.skill-grid,.job,.contact p,.email,.contact-links,.messenger-links')];
 document.documentElement.classList.add('motion-ready');
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{entry.target.classList.toggle('is-visible',entry.isIntersecting)}),{threshold:0.08});
 reveals.forEach(el=>{el.classList.add('reveal');observer.observe(el)});
}

// Keep the floating menu aligned with the section being read.
const floatingLinks=[...document.querySelectorAll('.floating-nav a')];
const trackedSections=[document.querySelector('.hero'),...['work','about','experience','contact'].map(id=>document.getElementById(id))];
let navFramePending=false;
let navigationScrollLocked=false;
function updateFloatingNav(){
 if(navigationScrollLocked){navFramePending=false;return}
 let current='main';
 for(const section of trackedSections){if(section.getBoundingClientRect().top<=window.innerHeight*.4)current=section.id||'main'}
 if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-12)current='contact';
 floatingLinks.forEach(link=>{const active=link.dataset.section===current;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});
 if(window.moveNavBlob)window.moveNavBlob();
 navFramePending=false;
}
window.addEventListener('scroll',()=>{if(!navFramePending){navFramePending=true;requestAnimationFrame(updateFloatingNav)}},{passive:true});
window.addEventListener('resize',updateFloatingNav);updateFloatingNav();

const floatingNav=document.querySelector('.floating-nav');
const navBlob=document.createElement('span');navBlob.className='nav-blob';navBlob.setAttribute('aria-hidden','true');floatingNav.prepend(navBlob);
let previousBlobX=null,blobAnimation=null;
window.moveNavBlob=function(){
 const active=floatingNav.querySelector('a.active');if(!active)return;
 const x=active.offsetLeft,y=active.offsetTop,w=active.offsetWidth,h=active.offsetHeight;
 navBlob.style.width=w+'px';navBlob.style.height=h+'px';navBlob.style.transform=`translate(${x}px,${y}px)`;
 if(previousBlobX!==null && previousBlobX!==x && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  if(blobAnimation)blobAnimation.cancel();
  blobAnimation=navBlob.animate([{scale:'1 1',borderRadius:'22px'},{scale:'1.12 .88',borderRadius:'25px',offset:.35},{scale:'.98 1.03',borderRadius:'21px',offset:.75},{scale:'1 1',borderRadius:'22px'}],{duration:Number(floatingNav.dataset.travelDuration)||520,easing:'cubic-bezier(.22,1,.36,1)'});
 }
 previousBlobX=x;
};
window.moveNavBlob();floatingNav.classList.add('has-blob');
let navigationFrame=null;
function finishNavigationScroll(){
 if(navigationFrame!==null)cancelAnimationFrame(navigationFrame);
 navigationFrame=null;navigationScrollLocked=false;
 floatingNav.style.removeProperty('--nav-travel-duration');delete floatingNav.dataset.travelDuration;
 updateFloatingNav();
}
floatingLinks.forEach(link=>link.addEventListener('click',event=>{
 event.preventDefault();
 if(navigationFrame!==null)cancelAnimationFrame(navigationFrame);
 const target=document.querySelector(link.getAttribute('href'));
 const start=window.scrollY;
 const end=link.dataset.section==='main'?0:Math.max(0,Math.min(document.documentElement.scrollHeight-window.innerHeight,target.getBoundingClientRect().top+start-45));
 const distance=Math.abs(end-start);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const duration=reduced?0:Math.min(1700,Math.max(550,600+distance*.18));
 navigationScrollLocked=true;
 floatingNav.style.setProperty('--nav-travel-duration',duration+'ms');floatingNav.dataset.travelDuration=duration;
 floatingLinks.forEach(item=>{item.classList.toggle('active',item===link);if(item===link)item.setAttribute('aria-current','location');else item.removeAttribute('aria-current')});
 window.moveNavBlob();
 history.replaceState(null,'',link.getAttribute('href'));
 if(!duration){window.scrollTo({top:end,behavior:'instant'});finishNavigationScroll();return}
 const began=performance.now();
 const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
 function frame(now){
  const progress=Math.min(1,(now-began)/duration);
  window.scrollTo({top:start+(end-start)*ease(progress),behavior:'instant'});
  if(progress<1)navigationFrame=requestAnimationFrame(frame);else finishNavigationScroll();
 }
 navigationFrame=requestAnimationFrame(frame);
}));
['wheel','touchstart'].forEach(type=>window.addEventListener(type,()=>{if(navigationScrollLocked)finishNavigationScroll()},{passive:true}));
window.addEventListener('keydown',event=>{if(navigationScrollLocked&&['ArrowUp','ArrowDown','PageUp','PageDown','Home','End','Escape',' '].includes(event.key))finishNavigationScroll()});
if(document.fonts)document.fonts.ready.then(()=>window.moveNavBlob());
