(() => {
  const root = document.documentElement;
  const header = document.getElementById('siteHeader');
  const progress = document.getElementById('pageProgress');
  const hero = document.getElementById('top');
  const heroMedia = document.getElementById('heroMedia');
  const method = document.getElementById('method');
  const methodProgress = document.getElementById('methodProgress');
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrollTop = window.scrollY || root.scrollTop;
      const max = Math.max(1, root.scrollHeight - window.innerHeight);
      progress.style.width = `${Math.min(100, (scrollTop / max) * 100)}%`;
      header.classList.toggle('scrolled', scrollTop > 24);
      if (!reduceMotion && hero && heroMedia) {
        const rect = hero.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height)));
        heroMedia.style.transform = `scale(${1.03 + p * .12}) translateY(${p * 7}%)`;
      }
      if (method && methodProgress) {
        const rect = method.getBoundingClientRect();
        const travel = Math.max(1, rect.height - window.innerHeight);
        const p = Math.max(0, Math.min(1, -rect.top / travel));
        methodProgress.style.width = `${p * 100}%`;
      }
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .16, rootMargin: '0px 0px -7% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count || 0);
      const decimals = Number(el.dataset.decimals || 0);
      const suffix = el.dataset.suffix || '';
      const duration = reduceMotion ? 0 : 1100;
      const start = performance.now();
      const draw = (now) => {
        const t = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = `${(target * eased).toFixed(decimals)}${suffix}`;
        if (t < 1) requestAnimationFrame(draw);
      };
      requestAnimationFrame(draw);
      countObserver.unobserve(el);
    });
  }, { threshold: .5 });
  document.querySelectorAll('[data-count]').forEach((el) => countObserver.observe(el));
  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    menuToggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    siteNav.classList.toggle('open', !open);
    document.body.classList.toggle('menu-open', !open);
  });
  siteNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('open');
    document.body.classList.remove('menu-open');
  }));
  const filters = document.querySelectorAll('.filter');
  const athletes = document.querySelectorAll('.athlete-card');
  filters.forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.filter;
      filters.forEach((item) => item.classList.toggle('active', item === button));
      athletes.forEach((card) => {
        const show = value === 'all' || card.dataset.position === value;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });
  const video = document.querySelector('.hero-media video');
  video?.play().catch(() => { video.style.display = 'none'; });
  document.getElementById('year').textContent = new Date().getFullYear();
})();
