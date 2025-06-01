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



// For certification
// Certifications horizontal auto-scroll with square cards
function setupCertificationsScroll() {
  const container = document.querySelector('.certifications-container');
  const track = document.querySelector('.certifications-track');
  const cards = document.querySelectorAll('.certification-card');
  
  if (!container || !track || cards.length === 0) return;
  
  // Clone cards for infinite scroll
  const clone = track.cloneNode(true);
  track.parentNode.appendChild(clone);
  
  let scrollPosition = 0;
  let animationId;
  let isPaused = false;
  let scrollSpeed = 0.5; // Adjust speed here (0.5 = slower, 1 = faster)
  
  // Initial positioning
  track.style.left = '0';
  clone.style.left = `${track.offsetWidth}px`;
  
  // Start auto-scroll
  function startScroll() {
    function animate() {
      if (!isPaused) {
        scrollPosition -= scrollSpeed;
        
        // Reset position when first set of cards has scrolled completely
        if (scrollPosition <= -track.offsetWidth) {
          scrollPosition = 0;
        }
        
        track.style.transform = `translateX(${scrollPosition}px)`;
        clone.style.transform = `translateX(${scrollPosition}px)`;
      }
      
      animationId = requestAnimationFrame(animate);
    }
    
    animate();
  }
  
  // Check card visibility for animations
  function checkCardVisibility() {
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    cards.forEach(card => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      
      // Calculate distance from center
      const distanceFromCenter = Math.abs(cardCenter - containerCenter);
      
      // Activate cards near center
      if (distanceFromCenter < containerRect.width / 3) {
        const scale = 1 - (distanceFromCenter / (containerRect.width / 3)) * 0.1;
        card.style.transform = `scale(${scale})`;
        card.style.opacity = 1 - (distanceFromCenter / (containerRect.width / 3)) * 0.2;
        card.classList.add('active');
      } else {
        card.style.transform = 'scale(0.95)';
        card.style.opacity = '0.8';
        card.classList.remove('active');
      }
    });
  }
  
  // Pause on hover
  container.addEventListener('mouseenter', () => {
    isPaused = true;
    container.style.cursor = 'grab';
  });
  
  container.addEventListener('mouseleave', () => {
    isPaused = false;
    container.style.cursor = 'default';
  });
  
  // Manual scroll with mouse drag
  let isDragging = false;
  let startX, startScrollLeft;
  
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    startScrollLeft = scrollPosition;
    container.style.cursor = 'grabbing';
  });
  
  document.addEventListener('mouseup', () => {
    isDragging = false;
    container.style.cursor = 'grab';
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 2; // Scroll-fastness
    scrollPosition = startScrollLeft - walk;
    track.style.transform = `translateX(${scrollPosition}px)`;
    clone.style.transform = `translateX(${scrollPosition}px)`;
  });
  
  // Start animations
  startScroll();
  setInterval(checkCardVisibility, 100);
  window.addEventListener('scroll', checkCardVisibility);
  checkCardVisibility();
  
  // Cleanup on section leave
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        cancelAnimationFrame(animationId);
      } else {
        startScroll();
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(container);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupCertificationsScroll();
});