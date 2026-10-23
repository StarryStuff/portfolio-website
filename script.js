document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const track = gallery.querySelector(".gallery-track");
  const slides = Array.from(gallery.querySelectorAll(".gallery-slide"));
  const prev = gallery.querySelector(".gallery-prev");
  const next = gallery.querySelector(".gallery-next");
  const dotsWrap = gallery.querySelector(".gallery-dots");
  if (!track || slides.length === 0) return;

  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "gallery-dot";
    dot.setAttribute("aria-label", "Go to image " + (i + 1));
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
    return dot;
  });

  const current = () => Math.round(track.scrollLeft / track.clientWidth);

  function goTo(i) {
    const index = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  }

  function update() {
    const i = current();
    dots.forEach((d, n) => d.classList.toggle("active", n === i));
    if (prev) prev.disabled = i === 0;
    if (next) next.disabled = i === slides.length - 1;
  }

  if (prev) prev.addEventListener("click", () => goTo(current() - 1));
  if (next) next.addEventListener("click", () => goTo(current() + 1));
  track.addEventListener("scroll", () => window.requestAnimationFrame(update));
  window.addEventListener("resize", update);
  gallery.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(current() - 1);
    if (e.key === "ArrowRight") goTo(current() + 1);
  });
  gallery.tabIndex = 0;
  update();
});

const comingSoon = document.getElementById("comingSoon");
if (comingSoon) {
  const closeModal = () => { comingSoon.hidden = true; };
  document.querySelectorAll("[data-coming-soon]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      comingSoon.hidden = false;
      const ok = comingSoon.querySelector(".modal-ok");
      if (ok) ok.focus();
    });
  });
  comingSoon.addEventListener("click", (e) => { if (e.target === comingSoon) closeModal(); });
  comingSoon.querySelectorAll(".modal-x, .modal-ok").forEach((b) => b.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
}
