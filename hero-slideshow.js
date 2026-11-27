// NIAZ NET shared slideshow controller — every page uses the complete folder manifest.
(function () {
  'use strict';
  var root = document.querySelector('.hero-showcase');
  if (!root || root.dataset.slideshowReady === 'true') return;

  var path = (window.location.pathname || '/').toLowerCase().replace(/\\/g, '/');
  var slug = path.split('/').pop() || '';
  var requestedKey = (root.getAttribute('data-slideshow') || '').toLowerCase();
  var aliases = {
    home: 'home',
    about: 'about',
    brand: 'brand',
    'brand-registration': 'brand',
    sports: 'sport',
    sport: 'sport',
    'sports-nutrition': 'sport',
    infant: 'infant',
    'infant-formula': 'infant',
    cbd: 'cbd',
    api: 'api',
    'api-supply': 'api',
    'cbd-products': 'cbd',
    cosmo: 'cosmo',
    cosmoderma: 'cosmo',
    pet: 'pet',
    'pet-food': 'pet',
    all: 'all',
    'business-development': 'all',
    'international-business-development': 'all',
    'import-export': 'all',
    'contract-manufacturing': 'all',
    'chamber-of-commerce': 'all',
    'cote-divoire-market': 'all',
    'kenya-market': 'all',
    'south-africa-market': 'all',
    'exclusive-agency': 'all',
    'licensing-partnerships': 'all',
    'market-entry': 'all',
    'medical-devices': 'all',
    nutraceuticals: 'all',
    'pharmaceutical-products': 'all',
    'private-label': 'all',
    'product-registration': 'all',
    'regulatory-affairs': 'all',
    'supply-chain-solutions': 'all',
    'technology-transfer': 'all'
  };
  var key = aliases[requestedKey] || aliases[slug.replace(/\.html$/, '')] ||
    ((slug === '' || slug === 'index.html') ? 'home' : 'all');

  var params = new URLSearchParams(window.location.search);
  var route = path.match(/^\/(tr|es|fr|fa)(?:\/|$)/);
  var locale = (route ? route[1] : (params.get('lang') || document.documentElement.lang || 'en')).toLowerCase().slice(0, 2);
  var labels = {
    home: {en:'NIAZ NET featured services',fa:'خدمات و فرصت‌های نیاز نت',tr:'NIAZ NET öne çıkan hizmetler'},
    about: {en:'About NIAZ NET',fa:'درباره نیاز نت',tr:'NIAZ NET hakkında'},
    brand: {en:'Brand registration and partnerships',fa:'ثبت برند و همکاری‌های تجاری',tr:'Marka tescili ve iş ortaklıkları'},
    sport: {en:'Sports nutrition and supplements',fa:'تغذیه ورزشی و مکمل‌ها',tr:'Sporcu beslenmesi ve takviyeler'},
    infant: {en:'Infant formula and baby nutrition',fa:'شیرخشک و تغذیه نوزاد',tr:'Bebek maması ve beslenmesi'},
    cbd: {en:'CBD product coordination',fa:'هماهنگی محصولات CBD',tr:'CBD ürün koordinasyonu'},
    api: {en:'API and pharmaceutical ingredients',fa:'مواد اولیه دارویی و API',tr:'API ve farmasötik hammaddeler'},
    cosmo: {en:'Cosmoderma and aesthetic medicine',fa:'کازمودرما و پزشکی زیبایی',tr:'Kozmoderma ve estetik tıp'},
    pet: {en:'Pet food and animal nutrition',fa:'غذای حیوانات و تغذیه دامپزشکی',tr:'Evcil hayvan maması ve beslenmesi'},
    all: {en:'Global products and opportunities',fa:'محصولات و فرصت‌های جهانی',tr:'Küresel ürünler ve fırsatlar'}
  };

  fetch('/images/slideshow-manifest.json')
    .then(function (response) {
      if (!response.ok) throw new Error('Slideshow manifest unavailable');
      return response.json();
    })
    .then(function (manifest) {
      var sources = Array.isArray(manifest[key]) ? manifest[key].slice() : [];
      // Artwork explicitly marked FA is reserved for Persian-language pages.
      if (locale !== 'fa') sources = sources.filter(function (src) {
        return !/(^|\/)FA[^/]*\.png$/i.test(src);
      });
      if (!sources.length) throw new Error('No slideshow images configured for: ' + key);

      // Reuse the already-rendered first slide when it matches the manifest.
      // This avoids downloading the hero image twice and prevents a visible swap.
      var firstLabel = (labels[key] && (labels[key][locale] || labels[key].en)) || 'NIAZ NET';
      var initialSlide = root.querySelector('.showcase-image');
      var initialImage = initialSlide && initialSlide.querySelector('img');
      var initialPath = initialImage ? decodeURI(new URL(initialImage.getAttribute('src'), window.location.href).pathname) : '';
      var manifestFirstPath = decodeURI(new URL(sources[0], window.location.href).pathname);
      var reuseInitial = !!(initialImage && initialPath === manifestFirstPath);

      root.querySelectorAll('.showcase-image, .showcase-dots, .showcase-arrow').forEach(function (node) {
        if (reuseInitial && node === initialSlide) return;
        node.remove();
      });

      sources.forEach(function (src, index) {
        if (index === 0 && reuseInitial) {
          initialSlide.classList.add('active');
          initialSlide.setAttribute('aria-hidden', 'false');
          initialImage.alt = firstLabel;
          initialImage.loading = 'eager';
          initialImage.decoding = 'async';
          initialImage.fetchPriority = 'high';
          return;
        }
        var slide = document.createElement('div');
        var img = document.createElement('img');
        slide.className = 'showcase-image' + (index === 0 ? ' active' : '');
        img.src = encodeURI(src);
        img.alt = firstLabel;
        img.loading = index === 0 ? 'eager' : 'lazy';
        img.decoding = 'async';
        if (index === 0) img.fetchPriority = 'high';
        img.onerror = function () { slide.classList.add('image-missing'); };
        slide.appendChild(img);
        root.appendChild(slide);
      });
      root.dataset.slideshowKey = key;
      root.dataset.slideCount = String(sources.length);
      initialize();
    })
    .catch(function (error) {
      console.error('[NIAZ NET slideshow]', error);
    });

  function initialize() {
    var slides = Array.from(root.querySelectorAll('.showcase-image'));
    if (!slides.length) return;
    root.dataset.slideshowReady = 'true';

    var labelsByLocale = {
      en: {choose:'Choose a featured image',show:'Show slide ',featured:'Featured image'},
      fa: {choose:'انتخاب اسلاید',show:'نمایش اسلاید ',featured:'تصویر منتخب'},
      tr: {choose:'Öne çıkan görseli seçin',show:'Slaytı göster ',featured:'Öne çıkan görsel'},
      es: {choose:'Elegir imagen destacada',show:'Mostrar diapositiva ',featured:'Imagen destacada'},
      fr: {choose:'Choisir une image à la une',show:'Afficher la diapositive ',featured:'Image à la une'}
    };
    var text = labelsByLocale[locale] || labelsByLocale.en;
    var current = 0, timer = null;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    var dotSize = slides.length > 12 ? 4 : slides.length > 8 ? 5 : 7;
    var dotGap = slides.length > 12 ? 3 : slides.length > 8 ? 5 : 8;
    var activeDotWidth = slides.length > 12 ? 11 : slides.length > 8 ? 14 : 19;
    var dotsWrap = document.createElement('div');
    dotsWrap.className = 'showcase-dots';
    dotsWrap.setAttribute('role', 'group');
    dotsWrap.setAttribute('aria-label', text.choose);
    dotsWrap.style.setProperty('gap', dotGap + 'px', 'important');
    dotsWrap.style.setProperty('max-width', 'calc(100% - 24px)', 'important');
    dotsWrap.style.setProperty('flex-wrap', slides.length > 12 ? 'wrap' : 'nowrap', 'important');
    dotsWrap.style.setProperty('justify-content', 'flex-end', 'important');
    if (slides.length > 12) dotsWrap.style.setProperty('padding', '4px 6px', 'important');

    var dots = slides.map(function (slide, index) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'showcase-dot';
      dot.setAttribute('aria-label', text.show + (index + 1) + ' of ' + slides.length + ': ' + text.featured);
      dot.style.setProperty('width', dotSize + 'px', 'important');
      dot.style.setProperty('min-width', dotSize + 'px', 'important');
      dot.style.setProperty('height', dotSize + 'px', 'important');
      dot.style.setProperty('min-height', dotSize + 'px', 'important');
      dot.addEventListener('click', function () { show(index); start(); });
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
        dot.setAttribute('aria-pressed', String(active));
        dot.style.setProperty('width', (active ? activeDotWidth : dotSize) + 'px', 'important');
        dot.style.setProperty('min-width', (active ? activeDotWidth : dotSize) + 'px', 'important');
      });
    }
    function stop() {
      if (timer) { window.clearInterval(timer); timer = null; }
    }
    function start() {
      stop();
      if (!reduced.matches && slides.length > 1) {
        timer = window.setInterval(function () { show(current + 1); }, 5500);
      }
    }

    var touch = null;
    root.addEventListener('touchstart', function (event) {
      if (event.touches.length === 1) touch = {x: event.touches[0].clientX, y: event.touches[0].clientY};
    }, {passive: true});
    root.addEventListener('touchend', function (event) {
      if (!touch || !event.changedTouches.length) return;
      var dx = event.changedTouches[0].clientX - touch.x;
      var dy = event.changedTouches[0].clientY - touch.y;
      touch = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        show(current + (dx < 0 ? 1 : -1));
        start();
      }
    }, {passive: true});
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);
    if (reduced.addEventListener) reduced.addEventListener('change', start);
    show(0);
    start();
  }
})();
