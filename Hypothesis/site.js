const menu=document.querySelector('.menu-button'),nav=document.querySelector('.navigation');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus()}});
let filter='all';const search=document.querySelector('#record-search');
function updateItems(){let count=0;const term=(search?.value||'').trim().toLowerCase();document.querySelectorAll('[data-category]').forEach(item=>{const show=(filter==='all'||item.dataset.category===filter)&&(!term||item.textContent.toLowerCase().includes(term));item.hidden=!show;if(show)count++});const status=document.querySelector('#result-status');if(status)status.textContent=`${count} ${status.dataset.noun||'items'} shown${term?' for “'+search.value.trim()+'”':''}`}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));updateItems()}));search?.addEventListener('input',updateItems);
const initial=new URLSearchParams(location.search).get('category');if(initial){const b=Array.from(document.querySelectorAll('[data-filter]')).find(b=>b.dataset.filter===initial);if(b)b.click()}else if(document.querySelector('[data-category]'))updateItems();
const lightbox=document.querySelector('#lightbox');let lastPhoto;
document.querySelectorAll('[data-photo]').forEach(b=>b.addEventListener('click',()=>{lastPhoto=b;lightbox.querySelector('img').src=b.dataset.photo;lightbox.querySelector('img').alt=b.dataset.alt;lightbox.querySelector('#photo-title').textContent=b.dataset.title;lightbox.querySelector('a').href=b.dataset.gallery;lightbox.showModal();lightbox.querySelector('button').focus()}));
lightbox?.querySelector('button').addEventListener('click',()=>lightbox.close());lightbox?.addEventListener('click',e=>{if(e.target===lightbox){const r=lightbox.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)lightbox.close()}});lightbox?.addEventListener('close',()=>lastPhoto?.focus());
document.querySelectorAll('[data-model-mode]').forEach(b=>b.addEventListener('click',()=>{const model=b.closest('.optical-model');model.querySelectorAll('[data-model-mode]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));const mode=b.dataset.modelMode;model.querySelectorAll('[data-layer]').forEach(layer=>layer.classList.toggle('dim',mode!=='all'&&layer.dataset.layer!==mode));const label=model.querySelector('[data-model-status]');if(label)label.textContent=b.dataset.description}));
document.querySelector('[data-print]')?.addEventListener('click',()=>window.print());

// Play the original demonstration only while it is visible. Respect motion preferences.
const film=document.querySelector('[data-camera-film]'),filmToggle=document.querySelector('[data-film-toggle]');
if(film&&filmToggle){
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');let userPaused=false,inView=false;
 function syncFilm(){filmToggle.textContent=film.paused?'Play animation ▶':'Pause animation Ⅱ';filmToggle.setAttribute('aria-label',film.paused?'Play camera animation':'Pause camera animation')}
 function playFilm(){film.play().catch(()=>syncFilm())}
 film.addEventListener('play',syncFilm);film.addEventListener('pause',syncFilm);
 filmToggle.addEventListener('click',()=>{if(film.paused){userPaused=false;playFilm()}else{userPaused=true;film.pause()}});
 const visibility=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView&&!reduced.matches&&!userPaused&&!document.hidden)playFilm();else film.pause()},{threshold:.3});visibility.observe(film);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)film.pause();else if(inView&&!userPaused&&!reduced.matches)playFilm()});
 reduced.addEventListener('change',()=>{if(reduced.matches)film.pause();else if(inView&&!userPaused)playFilm()});syncFilm();
}
