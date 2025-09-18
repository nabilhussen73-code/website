/* ============================================================
   scroll.js — Fancy Smooth Scroll + Spotlight Animation
   ============================================================ */
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.header');
  const headerH = header ? header.offsetHeight : 0;
  const offset = 16; // gap below sticky header

  // Easing with a little bounce at the end
  function easeOutBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  function smoothScrollTo(targetY, duration) {
    const startY = window.pageYOffset;
    const distY = targetY - startY;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutBack(progress);
      window.scrollTo(0, startY + distY * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Spotlight animation (fade-in glow)
  function spotlight(el) {
    el.style.position = "relative";
    const glow = document.createElement("div");
    glow.style.position = "absolute";
    glow.style.inset = "-10px";
    glow.style.background = "radial-gradient(circle, rgba(255,140,0,0.3), transparent 70%)";
    glow.style.borderRadius = "20px";
    glow.style.pointerEvents = "none";
    glow.style.opacity = "0";
    glow.style.transition = "opacity 0.8s ease-out";
    el.appendChild(glow);

    requestAnimationFrame(() => { glow.style.opacity = "1"; });
    setTimeout(() => { glow.style.opacity = "0"; }, 900);
    setTimeout(() => { glow.remove(); }, 1700);
  }

  // Attach to all nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      document.getElementById('mobileMenu')?.classList.remove('open');

      const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerH - offset;

      if (prefersReduced) {
        window.scrollTo(0, targetTop);
        return;
      }

      smoothScrollTo(targetTop, 900); // a bit slower for bounce effect
      setTimeout(() => spotlight(target), 850); // spotlight after scroll
    });
  });
})();
