// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Theme toggle - Improved version
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Function to set theme
function setTheme(theme) {
  if (theme === 'dark') {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun text-teal-400"></i>';
  } else {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-moon text-teal-600"></i>';
  }
}

// Theme toggle event
themeToggle.addEventListener('click', () => {
  if (html.classList.contains('dark')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
  setTheme(savedTheme);
} else if (systemPrefersDark) {
  setTheme('dark');
} else {
  setTheme('light');
}

// Rest of your existing code...
const typed = new Typed('#typed-role', {
  strings: ['Data Science Engineer', 'Data Analytics', 'Software Developer', 'Tech Enthusiast'],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);

// Back to top button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.remove('opacity-0', 'scale-0');
    backToTopButton.classList.add('flex', 'opacity-100', 'scale-100');
  } else {
    backToTopButton.classList.remove('flex', 'opacity-100', 'scale-100');
    backToTopButton.classList.add('opacity-0', 'scale-0');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('#mobile-menu a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});
