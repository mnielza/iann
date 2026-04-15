const looks = [
  { id: 1, img: "./assets/look-02.svg", label: "Look 02" },
  { id: 2, img: "./assets/look-03.svg", label: "Look 03" },
  { id: 3, img: "./assets/look-01.svg", label: "Look 01" },
];

let lookIdx = 0;

function $(sel) {
  return document.querySelector(sel);
}

function showToast(text) {
  const toast = $(".toast");
  const toastText = $("#toastText");
  if (!toast || !toastText) return;
  toastText.textContent = text;
  toast.hidden = false;
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => {
    toast.hidden = true;
  }, 2200);
}

function setYear() {
  const y = $("#year");
  if (y) y.textContent = String(new Date().getFullYear());
}

function setLook(i) {
  const img = $("#lookImg");
  const fill = document.querySelector(".track .fill");
  const thumb = document.querySelector(".track .thumb");
  if (!img || !fill || !thumb) return;

  const idx = ((i % looks.length) + looks.length) % looks.length;
  lookIdx = idx;
  img.src = looks[idx].img;
  img.alt = `${looks[idx].label} preview`;

  const pct = (idx / (looks.length - 1 || 1)) * 100;
  fill.style.width = `${Math.max(8, Math.min(92, pct))}%`;
  thumb.style.left = `${Math.max(8, Math.min(92, pct))}%`;
}

function wireCarousel() {
  document.querySelectorAll("[data-step]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const step = Number(btn.getAttribute("data-step") || "0");
      setLook(lookIdx + step);
    });
  });
}

function wireDots() {
  const dots = Array.from(document.querySelectorAll(".pager .dot"));
  if (!dots.length) return;
  dots.forEach((d, idx) => {
    d.addEventListener("click", () => {
      dots.forEach((x) => x.classList.remove("isActive"));
      d.classList.add("isActive");
      showToast(`Section ${idx + 1}`);
    });
  });
}

function wireQuickActions() {
  document.querySelectorAll(".iconBtn").forEach((b) =>
    b.addEventListener("click", () => showToast(b.getAttribute("aria-label") || "Action"))
  );

  const big = document.querySelector(".bigDot");
  if (big) {
    big.addEventListener("click", () => {
      const el = document.querySelector("#catalog");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("Opening catalog");
    });
  }

  document.querySelectorAll(".cardBtn").forEach((b) =>
    b.addEventListener("click", () => showToast("Added to cart"))
  );

  const heart = document.querySelector(".heartMini");
  if (heart) {
    heart.addEventListener("click", () => showToast("Saved look"));
  }
}

function wireParallax() {
  const model = document.querySelector(".model");
  if (!model) return;

  let raf = 0;
  window.addEventListener(
    "mousemove",
    (e) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const { innerWidth: w, innerHeight: h } = window;
        const dx = (e.clientX / w - 0.5) * 10;
        const dy = (e.clientY / h - 0.5) * 8;
        model.style.transform = `translateY(-18px) translate(${dx}px, ${dy}px)`;
      });
    },
    { passive: true }
  );
}

setYear();
setLook(0);
wireCarousel();
wireDots();
wireQuickActions();
wireParallax();

