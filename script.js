(() => {
  'use strict';
  document.body.classList.add('js-enabled');
  const header = document.querySelector('header');
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  const closeMenu = () => { navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); };
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; navigation.classList.toggle('open', open); menu.setAttribute('aria-expanded', String(open)); });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);
  let scheduled = false;
  const updateHeader = () => { header.classList.toggle('scrolled', window.scrollY > 60); scheduled = false; };
  window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateHeader); } }, { passive: true });
  updateHeader();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reduced.matches) {
    const reveal = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('visible'); reveal.unobserve(entry.target); } }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => reveal.observe(element));
    document.body.classList.add('motion-ready');
    reduced.addEventListener('change', () => { if (reduced.matches) { document.body.classList.remove('motion-ready'); reveal.disconnect(); } });
  }
  if ('IntersectionObserver' in window) {
    const sections = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) navigation.querySelectorAll('a').forEach(link => { const active = link.getAttribute('href') === '#' + entry.target.id; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); }, { rootMargin: '-20% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => sections.observe(section));
  }
})();
