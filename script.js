const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const tiltCards = document.querySelectorAll(".tilt");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    card.style.transform = `translateY(-10px) perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

const stars = document.querySelector(".stars");
const blobs = document.querySelector(".bg-blobs");

window.addEventListener("scroll", () => {
  const offset = window.scrollY;
  if (stars) stars.style.transform = `translateY(${offset * 0.15}px)`;
  if (blobs) blobs.style.transform = `translateY(${offset * 0.06}px)`;
});
