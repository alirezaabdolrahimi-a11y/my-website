// Shared accessible slideshow controller used across NIAZ NET pages.
(function () {
  'use strict';

  var root = document.querySelector('.hero-showcase');
  if (!root || root.dataset.slideshowReady === 'true') return;

  var slides = Array.from(root.querySelectorAll('.showcase-image'));
  var params = new URLSearchParams(window.location.search);
  var pathname = (window.location.pathname || '/').toLowerCase();
  var locale = (params.get('lang') || document.documentElement.lang || 'en').toLowerCase().slice(0, 2);
  if (root.getAttribute('data-slideshow') === 'infant-formula') {
    var infantSlides = [
      { src: '/images/04-infant-formula.png', alt: {
        en: 'Infant formula and baby nutrition products',
        fa: 'محصولات شیرخشک و تغذیه نوزاد',
        tr: 'Bebek maması ve bebek beslenmesi ürünleri'
      }},
      { src: '/images/Infant%2001.png', alt: {
        en: 'Infant nutrition product range',
        fa: 'گروه محصولات تغذیه نوزاد',
        tr: 'Bebek beslenmesi ürün grubu'
      }},
      { src: '/images/Infant%2002.png', alt: {
        en: 'Infant formula supply and product presentation',
        fa: 'معرفی و تأمین محصولات شیرخشک',
        tr: 'Bebek maması tedariki ve ürün sunumu'
      }},
      { src: '/images/Infant%2003.png', alt: {
        en: 'Infant formula and specialized baby nutrition',
        fa: 'شیرخشک و محصولات تخصصی تغذیه نوزاد',
        tr: 'Bebek maması ve özel bebek beslenmesi'
      }}
    ];
    infantSlides.forEach(function (item, index) {
      var slide = document.createElement('div');
      var image = document.createElement('img');
      slide.className = 'showcase-image' + (index === 0 ? ' active' : '');
      image.src = item.src;
      image.alt = item.alt[locale] || item.alt.en;
      image.loading = index === 0 ? 'eager' : 'lazy';
      image.decoding = 'async';
      image.onerror = function () { slide.classList.add('image-missing'); };
      slide.appendChild(image);
      root.appendChild(slide);
    });
    slides = Array.from(root.querySelectorAll('.showcase-image'));
  }
  if (root.getAttribute('data-slideshow') === 'sports') {
    var sportsSlides = [
      { src: '/images/03-sports-nutrition.png', alt: {
        en: 'Sports nutrition and supplement sourcing',
        fa: 'تأمین و تجارت محصولات تغذیه ورزشی و مکمل‌ها',
        tr: 'Sporcu beslenmesi ve takviye ürünleri tedariki'
      }},
      { src: '/images/12-international-sports-brands.png', alt: {
        en: 'International sports nutrition brands and partnerships',
        fa: 'برندها و همکاری‌های بین‌المللی در حوزه تغذیه ورزشی',
        tr: 'Uluslararası sporcu beslenmesi markaları ve iş birlikleri'
      }}
    ];
    sportsSlides.forEach(function (item, index) {
      var slide = document.createElement('div');
      var image = document.createElement('img');
      slide.className = 'showcase-image' + (index === 0 ? ' active' : '');
      image.src = item.src;
      image.alt = item.alt[locale] || item.alt.en;
      image.loading = index === 0 ? 'eager' : 'lazy';
      image.decoding = 'async';
      image.onerror = function () { slide.classList.add('image-missing'); };
      slide.appendChild(image);
      root.appendChild(slide);
    });
    slides = Array.from(root.querySelectorAll('.showcase-image'));
  }
  if (!slides.length) return;

  // Add the approved Persian-only introductory artwork as slide 1 on the
  // homepage and About Us showcase. Existing EN/TR slides remain untouched.
  var isHomeOrAbout = pathname === '/' || /(?:^|\/)index\.html$/.test(pathname) ||
    /(?:^|\/)about\.html$/.test(pathname);
  var isPersian = isHomeOrAbout && (locale === 'fa' ||
    /^\/fa\//i.test(window.location.pathname) || params.get('lang') === 'fa');
  if (isPersian && !root.querySelector('img[src*="FA_About%20us01.png"], img[src*="FA_About us01.png"]')) {
    var persianSlide = document.createElement('div');
    var persianImage = document.createElement('img');
    persianSlide.className = 'showcase-image active';
    persianImage.src = '/images/FA_About%20us01.png';
    persianImage.alt = 'معرفی نیاز نت';
    persianImage.loading = 'eager';
    persianImage.decoding = 'async';
    persianSlide.appendChild(persianImage);
    slides.forEach(function (slide) { slide.classList.remove('active'); });
    root.insertBefore(persianSlide, root.firstChild);
    slides.unshift(persianSlide);
  }
  root.dataset.slideshowReady = 'true';

  var isTurkish = locale === 'tr';
  var isPersianLocale = locale === 'fa';
  var current = Math.max(0, slides.findIndex(function (slide) {
    return slide.classList.contains('active');
  }));
  var timer = null;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var dotsWrap = document.createElement('div');
  dotsWrap.className = 'showcase-dots';
  dotsWrap.setAttribute('role', 'group');
  dotsWrap.setAttribute('aria-label', isPersianLocale ? 'انتخاب اسلاید' : isTurkish ? 'Öne çıkan görseli seçin' : 'Choose a featured image');

  var dots = slides.map(function (slide, index) {
    var dot = document.createElement('button');
    var caption = slide.querySelector('span');
    dot.type = 'button';
    dot.className = 'showcase-dot';
    dot.setAttribute('aria-label', (isPersianLocale ? 'نمایش اسلاید ' : isTurkish ? 'Slaytı göster ' : 'Show slide ') +
      (index + 1) + ': ' + (caption ? caption.textContent.trim() : (isPersianLocale ? 'تصویر منتخب' : isTurkish ? 'Öne çıkan görsel' : 'Featured image')));
    dot.addEventListener('click', function () {
      show(index);
      start();
    });
    dotsWrap.appendChild(dot);
    return dot;
  });
  root.appendChild(dotsWrap);

  if (root.getAttribute('data-showcase-arrows') === 'true') {
    var previous = document.createElement('button');
    var next = document.createElement('button');
    previous.type = next.type = 'button';
    previous.className = 'showcase-arrow prev';
    next.className = 'showcase-arrow next';
    previous.textContent = '‹';
    next.textContent = '›';
    previous.setAttribute('aria-label', isPersianLocale ? 'اسلاید قبلی' : isTurkish ? 'Önceki slayt' : 'Previous slide');
    next.setAttribute('aria-label', isPersianLocale ? 'اسلاید بعدی' : isTurkish ? 'Sonraki slayt' : 'Next slide');
    previous.addEventListener('click', function () { show(current - 1); start(); });
    next.addEventListener('click', function () { show(current + 1); start(); });
    root.append(previous, next);
  }

  var touchStart = null;
  root.addEventListener('touchstart', function (event) {
    if (event.touches.length === 1) touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });
  root.addEventListener('touchend', function (event) {
    if (!touchStart || !event.changedTouches.length) return;
    var dx = event.changedTouches[0].clientX - touchStart.x;
    var dy = event.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      show(current + (dx < 0 ? 1 : -1));
      start();
    }
  }, { passive: true });

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      var active = i === current;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach(function (dot, i) {
      var active = i === current;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
  }

  function stop() {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  function start() {
    stop();
    if (slides.length > 1 && !reducedMotion.matches && !document.hidden) {
      timer = window.setInterval(function () {
        show(current + 1);
      }, 4000);
    }
  }

  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', function (event) {
    if (!root.contains(event.relatedTarget)) start();
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop();
    else start();
  });
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', start);

  show(current);
  start();
})();
