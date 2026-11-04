(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Плавное исчезновение относительно видимой области, а не высоты документа.
  // Без JS маска не включается: страница остаётся полностью доступной.
  const pageContent = document.getElementById("page-content");
  if (pageContent) {
    const root = document.documentElement;
    const viewport = window.visualViewport;
    let fadeFrame = null;
    const updateEdgeFade = () => {
      fadeFrame = null;
      const offset = viewport ? viewport.offsetTop : 0;
      const height = viewport ? viewport.height : window.innerHeight;
      const contentTop = offset - pageContent.getBoundingClientRect().top;
      root.style.setProperty("--edge-viewport-height", `${height}px`);
      root.style.setProperty("--edge-content-top", `${contentTop}px`);
      root.style.setProperty("--edge-viewport-offset", `${offset}px`);
      root.classList.add("edge-fade-ready");
    };
    const scheduleEdgeFade = () => {
      if (fadeFrame === null) fadeFrame = requestAnimationFrame(updateEdgeFade);
    };
    window.addEventListener("scroll", scheduleEdgeFade, { passive: true });
    window.addEventListener("resize", scheduleEdgeFade, { passive: true });
    window.addEventListener("pageshow", scheduleEdgeFade);
    if (viewport) {
      viewport.addEventListener("scroll", scheduleEdgeFade, { passive: true });
      viewport.addEventListener("resize", scheduleEdgeFade, { passive: true });
    }
    updateEdgeFade();
  }

  // Плавающие сердечки и звёздочки на фоне
  const floaties = document.getElementById("floaties");
  const SYMBOLS = ["♥", "♡", "✦", "✧", "♥", "⋆"];
  const count = window.innerWidth < 480 ? 14 : 22;

  if (!reduceMotion) {
    const rand = (min, max) => Math.random() * (max - min) + min;
    const frag = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      const symbol = SYMBOLS[i % SYMBOLS.length];
      el.className = "floaty" + (symbol === "♥" || symbol === "♡" ? "" : " floaty--star");
      el.textContent = symbol;
      el.style.setProperty("--x", `${rand(0, 100)}vw`);
      el.style.setProperty("--size", `${rand(12, 28)}px`);
      el.style.setProperty("--dur", `${rand(12, 24)}s`);
      el.style.setProperty("--delay", `${-rand(0, 24)}s`);
      el.style.setProperty("--sway", `${rand(-40, 40)}px`);
      el.style.setProperty("--rot", `${rand(-40, 40)}deg`);
      el.style.setProperty("--alpha", rand(0.35, 0.8).toFixed(2));
      frag.appendChild(el);
    }
    floaties.appendChild(frag);
  }

  // Тост
  const toast = document.getElementById("toast");
  let toastTimer;
  const showToast = (text) => {
    toast.textContent = text;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
  };

  // Кнопки «скоро»
  document.querySelectorAll("[data-soon]").forEach((el) => {
    const notify = () => {
      el.classList.remove("is-wiggle");
      void el.offsetWidth; // перезапуск анимации
      el.classList.add("is-wiggle");
      showToast(`${el.dataset.soon} скоро появится ✨`);
    };
    el.addEventListener("click", notify);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        notify();
      }
    });
  });
})();
