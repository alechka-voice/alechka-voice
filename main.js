(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
