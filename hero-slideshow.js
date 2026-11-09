// Shared accessible controller for the homepage featured-image slideshow.
(function () {
  'use strict';

  var root = document.querySelector('.hero-showcase');
  if (!root || root.dataset.slideshowReady === 'true') return;

  var slides = Array.from(root.querySelectorAll('.showcase-image'));
  if (!slides.length) return;
  root.dataset.slideshowReady = 'true';

  var isTurkish = (document.documentElement.lang || '').toLowerCase().startsWith('tr');
  var current = Math.max(0, slides.findIndex(function (slide) {
    return slide.classList.contains('active');
  }));
  var timer = null;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var dotsWrap = document.createElement('div');
  dotsWrap.className = 'showcase-dots';
  dotsWrap.setAttribute('role', 'group');
  dotsWrap.setAttribute('aria-label', isTurkish ? 'Öne çıkan görseli seçin' : 'Choose a featured image');

  var dots = slides.map(function (slide, index) {
    var dot = document.createElement('button');
    var caption = slide.querySelector('span');
    dot.type = 'button';
    dot.className = 'showcase-dot';
    dot.setAttribute('aria-label', (isTurkish ? 'Slaytı göster ' : 'Show slide ') +
      (index + 1) + ': ' + (caption ? caption.textContent.trim() : (isTurkish ? 'Öne çıkan görsel' : 'Featured image')));
    dot.addEventListener('click', function () {
      show(index);
      start();
    });
    dotsWrap.appendChild(dot);
    return dot;
  });
  root.appendChild(dotsWrap);

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
