const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const revealItems = document.querySelectorAll('[data-reveal]');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });
}

if (revealItems.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const lightbox = document.getElementById('image-lightbox');
const lightboxImage = document.getElementById('image-lightbox-image');
const lightboxCaption = document.getElementById('image-lightbox-caption');
const lightboxClose = document.getElementById('image-lightbox-close');
const talkPosterTriggers = document.querySelectorAll('.talk-poster-trigger');

if (lightbox && lightboxImage && lightboxCaption && lightboxClose && talkPosterTriggers.length > 0) {
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    lightboxCaption.textContent = '';
  };

  talkPosterTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const imageUrl = trigger.dataset.fullImage || trigger.getAttribute('src');
      const imageTitle = trigger.dataset.fullTitle || trigger.getAttribute('alt') || 'Talk poster';

      lightboxImage.src = imageUrl;
      lightboxImage.alt = imageTitle;
      lightboxCaption.textContent = imageTitle;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}
