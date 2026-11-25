(()=>{
 'use strict';
 const menuButton=document.querySelector('.menu-toggle');
 const nav=document.querySelector('.nav-links');
 if(menuButton&&nav){
  const close=()=>{nav.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation')};
  menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')close()});
  document.addEventListener('pointerdown',event=>{if(!nav.contains(event.target)&&!menuButton.contains(event.target))close()});
 }
 const lightbox=document.getElementById('image-lightbox');
 let restoreFocus=null;
 if(lightbox){
  const img=lightbox.querySelector('img'),caption=lightbox.querySelector('.lightbox-caption'),close=lightbox.querySelector('.lightbox-close');
  const dismiss=()=>{lightbox.classList.remove('is-open');lightbox.setAttribute('aria-hidden','true');img.removeAttribute('src');document.body.style.overflow='';if(restoreFocus)restoreFocus.focus()};
  document.addEventListener('click',event=>{
   const trigger=event.target.closest('[data-zoom-src]');if(!trigger)return;
   const src=trigger.getAttribute('data-zoom-src');if(!src)return;
   restoreFocus=trigger;img.src=src;img.alt=trigger.getAttribute('data-zoom-alt')||'Enlarged original product screenshot';caption.textContent=trigger.getAttribute('data-zoom-alt')||'Original interface image';lightbox.classList.add('is-open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';close.focus();
  });
  close.addEventListener('click',dismiss);
  lightbox.addEventListener('click',event=>{if(event.target===lightbox)dismiss()});
  document.addEventListener('keydown',event=>{if(!lightbox.classList.contains('is-open'))return;if(event.key==='Escape')dismiss();if(event.key==='Tab'){event.preventDefault();close.focus()}});
 }
 document.querySelectorAll('[data-explorer]').forEach(root=>{
  const script=root.querySelector('script.explorer-data');if(!script)return;
  let items=[];try{items=JSON.parse(script.textContent)}catch(e){console.warn('Invalid explorer data',e);return}
  if(!items.length)return;
  const image=root.querySelector('.explorer-visual img');const visual=root.querySelector('.explorer-visual');const title=root.querySelector('.explorer-title');const desc=root.querySelector('.explorer-detail');const index=root.querySelector('.explorer-index');const group=root.querySelector('.explorer-group');const source=root.querySelector('.explorer-attribution');const count=root.closest('.explorer-section').querySelector('.explorer-count');const prev=root.querySelector('.explorer-prev');const next=root.querySelector('.explorer-next');const zoom=root.querySelector('.zoom-button');const filterBox=root.querySelector('.explorer-filter');
  const picker = root.querySelector('.explorer-picker');
  const preview = root.querySelector('.p-screen-scroll');
  preview?.querySelector('img').addEventListener('click', () => zoom.click());
  const populatePicker = () => {
   if (picker) picker.replaceChildren(...filtered.map((item, i) => new Option(item.title, i)));
  };
  const groups=['All',...new Set(items.map(it=>it.group))];let activeGroup='All';let filtered=items;let current=0;
  const draw=()=>{const item=filtered[current];if(!item)return;image.src='../../'+item.src;image.alt=item.alt||item.title;title.textContent=item.title;desc.textContent=item.description;if(group)group.textContent=item.group;if(source)source.textContent=item.source||'Original supplied product screen. No artwork added to the interface.';index.textContent=String(current+1).padStart(2,'0')+' / '+String(filtered.length).padStart(2,'0')+' screens';if(count)count.textContent=items.length+' original views';if(picker)picker.value=String(current);prev.disabled=current===0;next.disabled=current===filtered.length-1;if(preview)zoom.setAttribute('aria-label','Enlarge '+item.title);zoom.setAttribute('data-zoom-src','../../'+item.src);zoom.setAttribute('data-zoom-alt',item.alt||item.title);if(preview){
   visual.classList.toggle('is-scrollable',Boolean(item.scrollPreview));
   preview.scrollTop=0;
   if(item.scrollPreview){
    preview.tabIndex=0;
    preview.setAttribute('role','region');
    preview.setAttribute('aria-label',item.title+' preview, scroll for more');
   }else{
    preview.removeAttribute('tabindex');
    preview.removeAttribute('role');
    preview.removeAttribute('aria-label');
   }
  }
  visual.classList.toggle('is-phone',item.orientation==='phone');visual.classList.toggle('is-wide',item.orientation!=='phone');};
  groups.forEach(g=>{const b=document.createElement('button');b.type='button';b.textContent=g;b.setAttribute('aria-pressed',g===activeGroup?'true':'false');b.addEventListener('click',()=>{activeGroup=g;filtered=g==='All'?items:items.filter(it=>it.group===g);current=0;populatePicker();filterBox.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));draw()});filterBox.append(b)});
  prev.addEventListener('click',()=>{current=Math.max(0,current-1);draw()});next.addEventListener('click',()=>{current=Math.min(filtered.length-1,current+1);draw()});
  root.addEventListener('keydown',event=>{if(event.target===picker||!root.contains(document.activeElement))return;if(event.key==='ArrowRight'&&current<filtered.length-1){current++;draw()}if(event.key==='ArrowLeft'&&current>0){current--;draw()}});
  picker?.addEventListener('change', () => {
   current = Number(picker.value);
   draw();
  });
  populatePicker();
  draw();
 });
 document.querySelectorAll('[data-story-carousel]').forEach(root=>{
  const track=root.querySelector('.story-scenes');const slides=[...root.querySelectorAll('.story-scene')];const back=root.querySelector('[data-story-back]'),forward=root.querySelector('[data-story-next]'),position=root.querySelector('[data-story-position]');if(!track||slides.length<2)return;
  let current=0;const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const update=()=>{position.textContent=String(current+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');back.disabled=current===0;forward.disabled=current===slides.length-1};
  const go=(i)=>{current=Math.max(0,Math.min(slides.length-1,i));track.scrollTo({left:slides[current].offsetLeft-track.offsetLeft,behavior:reduced?'instant':'smooth'});update()};
  back.addEventListener('click',()=>go(current-1));forward.addEventListener('click',()=>go(current+1));
  let frame=0;track.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{if(window.innerWidth>550)return;let x=track.scrollLeft;let closest=0;let min=Infinity;slides.forEach((s,i)=>{let d=Math.abs(s.offsetLeft-track.offsetLeft-x);if(d<min){min=d;closest=i}});current=closest;update()})},{passive:true});update();
 });
})();
