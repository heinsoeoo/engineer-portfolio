const data=window.PORTFOLIO;
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tags=items=>items.map(x=>`<span>${escapeHTML(x)}</span>`).join('');
const dialog=document.querySelector('dialog');
document.querySelector('#projects').innerHTML=data.projects.map((p,i)=>`<button class="project" data-project="${i}" aria-label="View ${escapeHTML(p.title)} placeholder details"><div class="art"><div class="mock ${p.visual==='mobile'?'phone':p.visual==='commerce'?'commerce':''}"><div class="mock-head"><span>${p.visual==='mobile'?'Everyday.':p.visual==='commerce'?'FORM / OBJECT':'Workspace'}</span><span>◦</span></div><div class="mock-grid"><i></i><i></i><i></i></div><div class="mock-line"></div><div class="mock-line"></div><div class="mock-line"></div></div><span class="art-caption">ILLUSTRATIVE INTERFACE · NOT A PROJECT SCREENSHOT</span></div><span class="eyebrow">${escapeHTML(p.type)}</span><div class="project-bottom"><h3>${escapeHTML(p.title)}</h3><span class="project-arrow">↗</span></div><div class="tags">${tags(p.tags)}</div></button>`).join('');
document.querySelector('#skills-list').innerHTML=data.skills.map(s=>`<div><h3>${escapeHTML(s.title)}</h3><ul>${s.items.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul></div>`).join('');
document.querySelector('#timeline').innerHTML=data.experience.map(j=>`<article class="job"><div class="job-date">${escapeHTML(j.date)}</div><div><h3>${escapeHTML(j.company)}</h3><div class="job-role">${escapeHTML(j.role)}</div><p>${escapeHTML(j.detail)}</p>${j.note?`<p class="small">${escapeHTML(j.note)}</p>`:''}</div></article>`).join('');
document.querySelectorAll('[data-project]').forEach(b=>b.addEventListener('click',()=>{const p=data.projects[Number(b.dataset.project)];document.querySelector('#dialog-title').textContent=p.title;document.querySelector('#dialog-description').textContent=p.description;document.querySelector('#dialog-tags').innerHTML=tags(p.tags);dialog.showModal()}));
document.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
const theme=document.querySelector('.theme');function syncTheme(){const dark=document.documentElement.dataset.theme==='dark';theme.setAttribute('aria-label',`Switch to ${dark?'light':'dark'} mode`);theme.setAttribute('aria-pressed',String(dark));document.querySelector('meta[name="theme-color"]').content=dark?'#191d18':'#f4f3ee'}syncTheme();theme.addEventListener('click',()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('theme',document.documentElement.dataset.theme)}catch(e){}syncTheme()});
const email=document.querySelector('#email-link');email.href=`mailto:${data.email}`;email.replaceChildren(document.createTextNode(data.email+' '),Object.assign(document.createElement('span'),{textContent:'↗'}));document.querySelector('#github').href=data.github;document.querySelector('#linkedin').href=data.linkedin;
document.querySelector('#copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(data.email);document.querySelector('#copy-status').textContent='Email copied.'}catch(e){document.querySelector('#copy-status').textContent=`Copy this address: ${data.email}`}});document.querySelector('#year').textContent=new Date().getFullYear();

const wechatDialog=document.querySelector('#wechat-dialog');document.querySelector('#wechat-open').addEventListener('click',()=>wechatDialog.showModal());document.querySelector('#wechat-close').addEventListener('click',()=>wechatDialog.close());
// Progressive enhancement: content remains visible without JavaScript or motion.
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
 const reveals=[...document.querySelectorAll('.section-top,section:not(.hero) h2,.project,.about-copy,.skill-grid,.job,.contact p,.email,.contact-links,.messenger-links')];
 document.documentElement.classList.add('motion-ready');
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:0.08});
 reveals.forEach(el=>{el.classList.add('reveal');observer.observe(el)});
}

// Keep the floating menu aligned with the section being read.
const floatingLinks=[...document.querySelectorAll('.floating-nav a')];
const trackedSections=[document.querySelector('.hero'),...['work','about','experience','contact'].map(id=>document.getElementById(id))];
let navFramePending=false;
function updateFloatingNav(){
 let current='main';
 for(const section of trackedSections){if(section.getBoundingClientRect().top<=window.innerHeight*.4)current=section.id||'main'}
 if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-12)current='contact';
 floatingLinks.forEach(link=>{const active=link.dataset.section===current;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});
 navFramePending=false;
}
window.addEventListener('scroll',()=>{if(!navFramePending){navFramePending=true;requestAnimationFrame(updateFloatingNav)}},{passive:true});
window.addEventListener('resize',updateFloatingNav);updateFloatingNav();
