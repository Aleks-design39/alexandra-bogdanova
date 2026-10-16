(() => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progress=document.querySelector('.scroll-progress');
  const contact=document.createElement('a');
  contact.className='mobile-contact';contact.href='https://t.me/Dmitrievna_DE';contact.target='_blank';contact.rel='noopener noreferrer';
  contact.append('Обсудить работу');const arrow=document.createElement('span');arrow.textContent='↗ Telegram';contact.append(arrow);document.body.append(contact);
  const hero=document.querySelector('.hero');const footer=document.querySelector('.contact');
  let ticking=false;
  function update(){const height=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${height>0?Math.min(1,scrollY/height):0})`;contact.classList.toggle('is-shown',hero.getBoundingClientRect().bottom<0&&footer.getBoundingClientRect().top>innerHeight);ticking=false;}
  addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true;}},{passive:true});addEventListener('resize',update);update();
  if(reduced)return;
  const metrics=document.querySelectorAll('.hero-results .proof-row strong');
  // Announce the final values once; intermediate frames remain decorative.
  metrics.forEach(el=>{const final=el.textContent;const target=Number(final.match(/\d+/)?.[0]);if(!target)return;el.setAttribute('aria-label',final);const visual=document.createElement('span');visual.setAttribute('aria-hidden','true');visual.style.cssText='font:inherit;color:inherit;max-width:none;line-height:inherit';el.replaceChildren(visual);let started;function frame(now){started??=now;const p=Math.min((now-started)/950,1);visual.textContent=final.replace(/\d+/,Math.round(target*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(frame);}requestAnimationFrame(frame);});
})();
