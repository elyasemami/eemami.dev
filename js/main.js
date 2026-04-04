// ═══════════════════════════════════════════
//  NAV
// ═══════════════════════════════════════════
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ═══════════════════════════════════════════
//  Mobile menu
// ═══════════════════════════════════════════
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ═══════════════════════════════════════════
//  Boot sequence animation
// ═══════════════════════════════════════════
document.querySelectorAll('.boot-line').forEach(el => {
  const delay = parseInt(el.dataset.delay || 0);
  setTimeout(() => el.classList.add('visible'), delay);
});

// ═══════════════════════════════════════════
//  Typewriter in hero terminal
// ═══════════════════════════════════════════
const typeTarget = document.getElementById('typewriter');
const cursor = document.getElementById('cursor');

const phrases = [
  'cat README.md',
  'git log --oneline',
  'npm run build',
  'python3 main.py',
  'javac Main.java && java Main',
  'ssh deploy@eemami.dev',
];

let phraseIdx = 0;
let charIdx = 0;
let deleting = false;
let paused = false;

function type() {
  if (paused) return;

  const current = phrases[phraseIdx];

  if (!deleting) {
    typeTarget.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      paused = true;
      setTimeout(() => { paused = false; deleting = true; }, 2200);
    }
  } else {
    typeTarget.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }

  const speed = deleting ? 40 : 85;
  setTimeout(type, speed);
}

setTimeout(type, 1400);

// ═══════════════════════════════════════════
//  Reveal on scroll
// ═══════════════════════════════════════════
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ═══════════════════════════════════════════
//  ASCII skill bars
// ═══════════════════════════════════════════
const TOTAL_BLOCKS = 12;

const pcts = {
  'TypeScript': 88,
  'Java': 85,
  'Python': 80,
  'Obj-C++': 75,
  'JavaScript': 85,
};

function buildBar(filled, total = TOTAL_BLOCKS) {
  let out = '<span class="filled">';
  for (let i = 0; i < filled; i++) out += '█';
  out += '</span>';
  for (let i = filled; i < total; i++) out += '░';
  return out;
}

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-line').forEach(line => {
        const nameEl = line.querySelector('.sk-name');
        const barEl = line.querySelector('.sk-bar');
        if (!nameEl || !barEl) return;
        const name = nameEl.textContent.trim();
        const pct = pcts[name];
        if (!pct) return;
        const filled = Math.round((pct / 100) * TOTAL_BLOCKS);
        setTimeout(() => {
          barEl.innerHTML = buildBar(filled);
        }, 300);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-block').forEach(el => skillObserver.observe(el));

// ═══════════════════════════════════════════
//  Smooth scroll
// ═══════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
