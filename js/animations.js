gsap.registerPlugin(ScrollTrigger);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.hero__brand', { opacity: 0, y: 12, duration: 1 })
    .from('.hero h1 .split > span, .split > span > span', { yPercent: 110, duration: 1.4, stagger: 0.18 }, '-=0.5')
    .from('.hero__desc', { opacity: 0, y: 24, duration: 1 }, '-=0.8')
    .from('.hero__cta .btn, .hero__open', { opacity: 0, y: 16, duration: 0.9, stagger: 0.12 }, '-=0.6');
  gsap.to('.hero__bg img', { scale: 1, duration: 9, ease: 'power1.out' });
}

function preload() {
  const done = () => { document.querySelector('.preloader').remove(); heroIntro(); };
  if (reduceMotion) return done();
  gsap.timeline({ onComplete: done })
    .from('.preloader span', { opacity: 0, duration: 1, ease: 'power2.out' })
    .to('.preloader', { yPercent: -100, duration: 0.9, ease: 'power3.inOut' }, '+=0.2');
}

function scrollAnimations() {
  if (reduceMotion) return;
  gsap.utils.toArray('.reveal').forEach(el =>
    gsap.from(el, { opacity: 0, y: 40, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true } }));

  gsap.utils.toArray('[data-parallax]').forEach(img =>
    gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: 'none',
      scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));

  gsap.utils.toArray('.intro__img, .signature__img, .story__img').forEach(fig =>
    gsap.from(fig, { clipPath: 'inset(0 0 100% 0)', duration: 1.6, ease: 'power3.inOut',
      scrollTrigger: { trigger: fig, start: 'top 80%', once: true } }));

  gsap.from('.timeline li', { opacity: 0, x: -24, duration: 0.9, stagger: 0.2, ease: 'power2.out',
    scrollTrigger: { trigger: '.timeline', start: 'top 85%', once: true } });

  gsap.from('.xp', { opacity: 0, y: 60, duration: 1.2, stagger: 0.18, ease: 'power3.out',
    scrollTrigger: { trigger: '.experience', start: 'top 75%', once: true } });

  gsap.to('.float--1', { y: -30, repeat: -1, yoyo: true, duration: 3.5, ease: 'sine.inOut' });
  gsap.to('.float--2', { y: 24, x: -12, repeat: -1, yoyo: true, duration: 4.5, ease: 'sine.inOut' });
  gsap.to('.signature__bg', { xPercent: -60, ease: 'none',
    scrollTrigger: { trigger: '.signature', start: 'top bottom', end: 'bottom top', scrub: true } });
}

preload();
scrollAnimations();
