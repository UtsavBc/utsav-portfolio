const typedText = document.getElementById("typedText");
const phrases = [
  "Electronics & Communication Engineering Student",
  "IoT & Embedded Systems Developer",
  "Web Developer",
  "Robotics Enthusiast"
];

let phraseIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  typedText.textContent = deleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let speed = deleting ? 35 : 70;

  if (!deleting && charIndex > current.length) {
    deleting = true;
    speed = 1500;
  } else if (deleting && charIndex < 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    charIndex = 0;
    speed = 450;
  }
  setTimeout(typeLoop, speed);
}
typeLoop();

const nav = document.getElementById("navMenu");
const menuToggle = document.getElementById("menuToggle");
menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("utsav-theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
  themeToggle.textContent = "☀";
}
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const light = document.body.classList.contains("light");
  localStorage.setItem("utsav-theme", light ? "light" : "dark");
  themeToggle.textContent = light ? "☀" : "☾";
});

const navbar = document.getElementById("navbar");
const progress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${(window.scrollY / height) * 100}%`;

  const sections = document.querySelectorAll("section[id]");
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  document.querySelectorAll("nav a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
document.getElementById("year").textContent = new Date().getFullYear();
