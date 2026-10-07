/* ═══════════════════════════════════════════════════
   PORTFOLIO v2.0 — Interactive Engine
   Custom Cursor · Particle Canvas · 3D Tilt · Typewriter
   Magnetic Buttons · Animated Counters · Preloader
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCustomCursor();
  initScrollProgress();
  initNavScroll();
  initMobileNav();
  initScrollAnimations();
  initAnimatedCounters();
  initTypewriter();
  initSmoothScroll();
  initParticleCanvas();
  initTiltEffect();
  initMagneticButtons();
  initCardGlow();
  initBackToTop();
  initActiveNavHighlight();
});


/* ═══════════════════════════════════════════════════
   PRELOADER
   ═══════════════════════════════════════════════════ */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const progress = document.getElementById('preloader-progress');
  if (!preloader || !progress) return;

  document.body.classList.add('is-loading');

  let loaded = 0;
  const fakeProgress = setInterval(() => {
    loaded += Math.random() * 15 + 5;
    if (loaded >= 100) loaded = 100;
    progress.style.width = loaded + '%';

    if (loaded >= 100) {
      clearInterval(fakeProgress);
      setTimeout(() => {
        preloader.classList.add('is-hidden');
        document.body.classList.remove('is-loading');
      }, 400);
    }
  }, 120);

  // Fallback — force hide after 3s
  setTimeout(() => {
    clearInterval(fakeProgress);
    progress.style.width = '100%';
    preloader.classList.add('is-hidden');
    document.body.classList.remove('is-loading');
  }, 3000);
}


/* ═══════════════════════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════════════════════ */
function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  // Check for touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smooth follower
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover states for interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .btn, .skill-tag, .project-card, .about__card, .education__card, [data-magnetic]');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => follower.classList.remove('is-hovering'));
  });

  // Click effect
  document.addEventListener('mousedown', () => follower.classList.add('is-clicking'));
  document.addEventListener('mouseup', () => follower.classList.remove('is-clicking'));
}


/* ═══════════════════════════════════════════════════
   SCROLL PROGRESS BAR
   ═══════════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    bar.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}


/* ═══════════════════════════════════════════════════
   NAVBAR SCROLL EFFECT
   ═══════════════════════════════════════════════════ */
function initNavScroll() {
  const nav = document.getElementById('main-nav');
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('nav--scrolled', window.scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}


/* ═══════════════════════════════════════════════════
   MOBILE NAVIGATION
   ═══════════════════════════════════════════════════ */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  const overlay = document.createElement('div');
  overlay.classList.add('nav__overlay');
  document.body.appendChild(overlay);

  function openMenu() {
    links.classList.add('nav__links--open');
    toggle.classList.add('nav__toggle--active');
    overlay.classList.add('nav__overlay--visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    links.classList.remove('nav__links--open');
    toggle.classList.remove('nav__toggle--active');
    overlay.classList.remove('nav__overlay--visible');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    links.classList.contains('nav__links--open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  links.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}


/* ═══════════════════════════════════════════════════
   SCROLL-TRIGGERED ANIMATIONS
   ═══════════════════════════════════════════════════ */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -80px 0px',
    }
  );

  elements.forEach(el => observer.observe(el));
}


/* ═══════════════════════════════════════════════════
   ANIMATED COUNTERS (Intersection Observer)
   ═══════════════════════════════════════════════════ */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-count'));
  const isDecimal = target % 1 !== 0;
  const duration = 2200;
  const startTime = performance.now();

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutExpo(progress);
    const current = easedProgress * target;

    if (isDecimal) {
      el.textContent = current.toFixed(2);
    } else {
      el.textContent = Math.floor(current);
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = isDecimal ? target.toFixed(2) : target;
    }
  }

  requestAnimationFrame(update);
}


/* ═══════════════════════════════════════════════════
   TYPEWRITER EFFECT
   ═══════════════════════════════════════════════════ */
function initTypewriter() {
  const el = document.getElementById('hero-rotating-text');
  if (!el) return;

  const phrases = [
    'intelligent software',
    'scalable web apps',
    'computer vision systems',
    'AI-powered solutions',
    'full-stack platforms',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isPaused) {
      isPaused = false;
      isDeleting = true;
      setTimeout(type, 50);
      return;
    }

    if (!isDeleting) {
      // Typing
      el.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentPhrase.length) {
        isPaused = true;
        setTimeout(type, 2200); // Pause at full text
        return;
      }

      setTimeout(type, 60 + Math.random() * 40); // Natural typing speed
    } else {
      // Deleting
      el.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 400); // Pause before next phrase
        return;
      }

      setTimeout(type, 30); // Faster delete
    }
  }

  // Start after hero animation
  setTimeout(type, 1200);
}


/* ═══════════════════════════════════════════════════
   SMOOTH SCROLL
   ═══════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}


/* ═══════════════════════════════════════════════════
   PARTICLE / CONSTELLATION CANVAS
   ═══════════════════════════════════════════════════ */
function initParticleCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouseX = 0, mouseY = 0;
  let animationId;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 100);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const opacity = (1 - dist / 150) * 0.12;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(167, 139, 250, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw & update particles
    particles.forEach(p => {
      // Mouse interaction
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180 && dist > 0) {
        const force = (180 - dist) / 180 * 0.015;
        p.vx += dx * force;
        p.vy += dy * force;
      }

      // Damping
      p.vx *= 0.99;
      p.vy *= 0.99;

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Draw
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(167, 139, 250, ${p.opacity})`;
      ctx.fill();
    });

    // Mouse glow
    if (mouseX > 0 && mouseY > 0) {
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 120);
      gradient.addColorStop(0, 'rgba(124, 58, 237, 0.06)');
      gradient.addColorStop(1, 'rgba(124, 58, 237, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(mouseX - 120, mouseY - 120, 240, 240);
    }

    animationId = requestAnimationFrame(drawParticles);
  }

  // Mouse tracking on hero
  const heroSection = document.getElementById('hero');
  heroSection.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });
  heroSection.addEventListener('mouseleave', () => {
    mouseX = 0;
    mouseY = 0;
  });

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  // Only animate when hero is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animationId) drawParticles();
      } else {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      }
    });
  }, { threshold: 0 });

  observer.observe(heroSection);

  resize();
  createParticles();
  drawParticles();
}


/* ═══════════════════════════════════════════════════
   3D TILT EFFECT
   ═══════════════════════════════════════════════════ */
function initTiltEffect() {
  // Standard tilt for smaller cards
  const tiltElements = document.querySelectorAll('[data-tilt]');
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      el.style.transition = 'transform 0.1s ease';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });

  // Subtle tilt for larger cards
  const subtleTiltElements = document.querySelectorAll('[data-tilt-subtle]');
  subtleTiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      el.style.transition = 'transform 0.1s ease';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });
}


/* ═══════════════════════════════════════════════════
   MAGNETIC BUTTONS
   ═══════════════════════════════════════════════════ */
function initMagneticButtons() {
  if ('ontouchstart' in window) return; // Skip on touch devices

  const magnets = document.querySelectorAll('[data-magnetic]');

  magnets.forEach(el => {
    let bound = null;

    el.addEventListener('mouseenter', () => {
      el.style.transform = 'translate(0, 0)';
      bound = el.getBoundingClientRect();
    });

    el.addEventListener('mousemove', (e) => {
      if (!bound) return;
      // Calculate distance from center
      const x = e.clientX - bound.left - bound.width / 2;
      const y = e.clientY - bound.top - bound.height / 2;

      // Limit the movement range so it doesn't escape the cursor
      const moveX = Math.max(-15, Math.min(15, x * 0.2));
      const moveY = Math.max(-15, Math.min(15, y * 0.2));

      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      el.style.transition = 'transform 0.1s ease';
    });

    el.addEventListener('mouseleave', () => {
      bound = null;
      el.style.transform = ''; // Clear inline transform to allow CSS hover effects
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });
}


/* ═══════════════════════════════════════════════════
   CARD GLOW FOLLOW (Mouse-tracking glow)
   ═══════════════════════════════════════════════════ */
function initCardGlow() {
  const cards = document.querySelectorAll('.skill-category, .about__card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');

      // Move the glow div if it exists
      const glow = card.querySelector('.about__card-glow, .skill-category__glow');
      if (glow && glow.classList.contains('about__card-glow')) {
        glow.style.left = (e.clientX - rect.left) + 'px';
        glow.style.top = (e.clientY - rect.top) + 'px';
      }
    });
  });
}


/* ═══════════════════════════════════════════════════
   BACK TO TOP BUTTON
   ═══════════════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  function toggleVisibility() {
    btn.classList.toggle('is-visible', window.scrollY > 500);
  }

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ═══════════════════════════════════════════════════
   ACTIVE NAV LINK HIGHLIGHTING
   ═══════════════════════════════════════════════════ */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function highlightNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();
}
