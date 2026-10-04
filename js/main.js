const nav = document.getElementById('nav');
const navLinks = document.getElementById('navLinks');
const navToggle = document.getElementById('navToggle');
const toTop = document.getElementById('toTop');
const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth scrolling (Lenis) synced with ScrollTrigger
let lenis = null;
if (!prefersReduced && window.Lenis) {
  lenis = new Lenis({ duration: 1.3 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

// Sticky navbar + back-to-top
function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle('is-solid', y > 80);
  toTop.classList.toggle('show', y > 900);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
function setMenu(open) {
  navLinks.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.style.overflow = open ? 'hidden' : '';
  open ? lenis && lenis.stop() : lenis && lenis.start();
}
navToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));

// Anchor links (smooth scroll, close mobile menu)
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const target = document.querySelector(a.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  setMenu(false);
  lenis ? lenis.scrollTo(target, { offset: 0 }) : target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
}));

toTop.addEventListener('click', () => lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }));

// Testimonials
new Swiper('.reviews .swiper', {
  loop: true,
  speed: 900,
  autoplay: { delay: 6000, disableOnInteraction: false },
  pagination: { el: '.swiper-pagination', clickable: true }
});
