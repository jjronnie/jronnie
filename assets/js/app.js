// ===== Vanilla Portfolio — JavaScript =====
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile Menu ---- */
  const mobileBtn = document.getElementById('mobile-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const open = mobileMenu.style.display === 'block';
      mobileMenu.style.display = open ? 'none' : 'block';
    });
  }

  /* ---- Nav Scroll ---- */
  const navBar = document.getElementById('nav-bar');
  if (navBar) {
    window.addEventListener('scroll', () => {
      navBar.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  /* ---- Nav Pill ---- */
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  let navPill = document.querySelector('.nav-pill');

  if (!navPill && navLinksContainer) {
    navPill = document.createElement('span');
    navPill.className = 'nav-pill';
    navPill.style.display = 'none';
    navLinksContainer.appendChild(navPill);
  }

  function positionPill(link) {
    if (!navPill || !link) { if (navPill) navPill.style.display = 'none'; return; }
    const parentRect = navLinksContainer.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    navPill.style.display = 'block';
    navPill.style.left = (linkRect.left - parentRect.left) + 'px';
    navPill.style.top = (linkRect.top - parentRect.top) + 'px';
    navPill.style.width = linkRect.width + 'px';
    navPill.style.height = linkRect.height + 'px';
  }

  function setActiveLink(activeEl) {
    navLinks.forEach(a => a.classList.remove('active'));
    if (activeEl) {
      activeEl.classList.add('active');
      positionPill(activeEl);
    } else {
      if (navPill) navPill.style.display = 'none';
    }
  }

  /* ---- Active Section Tracking (home page) ---- */
  const sections = [];
  document.querySelectorAll('section[id]').forEach(s => sections.push(s));

  function updateActiveLink() {
    const path = window.location.pathname;
    let current = '';
    sections.forEach(s => {
      const top = s.getBoundingClientRect().top;
      if (top <= 150) current = s.id;
    });
    if (!current && sections.length > 0) current = sections[0].id;

    navLinks.forEach(a => {
      const href = a.getAttribute('href') || '';
      const isActive = href === '#' + current;
      a.classList.toggle('active', isActive);
    });

    /* Position the pill on the active section link */
    let activeLink = null;
    navLinks.forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href === '#' + current) activeLink = a;
    });
    if (activeLink) {
      positionPill(activeLink);
    } else if (navPill) {
      navPill.style.display = 'none';
    }
  }

  if (navLinks.length && sections.length) {
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    /* Smooth scroll + close mobile */
    navLinks.forEach(a => {
      a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
          if (mobileMenu) mobileMenu.style.display = 'none';
        }
      });
    });
  }

  /* ---- Page-level link highlighting (Projects, Services pages) ---- */
  const currentPath = window.location.pathname;
  navLinks.forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === currentPath || href === currentPath.replace(/\/$/, '')) {
      setActiveLink(a);
    }
  });
  document.querySelectorAll('.nav-mobile-link').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === currentPath || href === currentPath.replace(/\/$/, '')) {
      a.classList.add('active');
    }
  });

  /* ---- Mobile nav smooth scroll ---- */
  document.querySelectorAll('.nav-mobile-link').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        if (mobileMenu) mobileMenu.style.display = 'none';
      }
    });
  });

  /* ---- Scroll Animations (IntersectionObserver) ---- */
  const animEls = document.querySelectorAll('.fade-in, .fade-in-scale, .stagger');
  if (animEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    animEls.forEach(el => observer.observe(el));
  }

  /* ---- Skill Bar Animation ---- */
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const pct = bar.getAttribute('data-pct');
        if (pct) {
          setTimeout(() => { bar.style.width = pct + '%'; }, 200);
        }
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-bar').forEach(bar => skillObserver.observe(bar));

  /* ---- Experience Tabs ---- */
  const expTabs = document.querySelectorAll('.exp-tab');
  const expLists = document.querySelectorAll('.exp-list');

  function switchExpTab(tab) {
    const value = tab.getAttribute('data-value');
    expTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    expLists.forEach(list => {
      list.style.display = list.getAttribute('data-type') === value ? 'flex' : 'none';
    });
  }

  expTabs.forEach(tab => {
    tab.addEventListener('click', () => switchExpTab(tab));
  });

  /* Init first tab */
  const firstTab = document.querySelector('.exp-tab');
  if (firstTab) switchExpTab(firstTab);

  /* ---- Contact Form (mailto) ---- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(contactForm);
      const name = fd.get('name') || '';
      const email = fd.get('email') || '';
      const subject = fd.get('subject') || '';
      const message = fd.get('message') || '';
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      window.location.href = `mailto:jjuukoronald01@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

});
