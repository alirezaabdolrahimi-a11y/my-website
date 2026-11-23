// NIAZ NET shared slideshow controller — folder-driven image mapping.
(function () {
  'use strict';
  var root = document.querySelector('.hero-showcase');
  if (!root || root.dataset.slideshowReady === 'true') return;

  var path = (window.location.pathname || '/').toLowerCase().replace(/\\/g, '/');
  var key = 'home';
  if (/about\\.html$/.test(path)) key = 'about';
  else if (/brand-registration\\.html$/.test(path)) key = 'brand';
  else if (/sports-nutrition\\.html$/.test(path)) key = 'sport';
  else if (/infant-formula\\.html$/.test(path)) key = 'infant';
  else if (/cbd-products\\.html$/.test(path)) key = 'cbd';
  else if (/api-supply\\.html$/.test(path)) key = 'api';
  else if (/cosmoderma\\.html$/.test(path)) key = 'cosmo';
  else if (/pet-food\\.html$/.test(path)) key = 'pet';
  else if (/international-markets\\.html$/.test(path)) key = 'all';

  var params = new URLSearchParams(window.location.search);
  var route = path.match(/^\\/(tr|es|fr|fa)(?:\\/|$)/);
  var locale = (route ? route[1] : (params.get('lang') || document.documentElement.lang || 'en')).toLowerCase().slice(0,2);
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
  fetch('/images/slideshow-manifest.json', {cache:'no-cache'})
    .then(function (response) { if (!response.ok) throw new Error('Slideshow manifest unavailable'); return response.json(); })
    .then(function (manifest) {
      var sources = Array.isArray(manifest[key]) ? manifest[key].slice() : [];
      if (!sources.length) return;
      root.querySelectorAll('.showcase-image, .showcase-dots, .showcase-arrow').forEach(function (node) { node.remove(); });
      sources.forEach(function (src, index) {
        var slide = document.createElement('div');
        var img = document.createElement('img');
        slide.className = 'showcase-image' + (index === 0 ? ' active' : '');
        img.src = encodeURI(src);
        img.alt = (labels[key] && (labels[key][locale] || labels[key].en)) || 'NIAZ NET';
        img.loading = index === 0 ? 'eager' : 'lazy';
        img.decoding = 'async';
        if (index === 0) img.fetchPriority = 'high';
        img.onerror = function () { slide.classList.add('image-missing'); };
        slide.appendChild(img);
        root.appendChild(slide);
      });
      initialize();
    })
    .catch(function (error) { console.error('[NIAZ NET slideshow]', error); });

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
    var dotsWrap = document.createElement('div');
    dotsWrap.className = 'showcase-dots';
    dotsWrap.setAttribute('role','group');
    dotsWrap.setAttribute('aria-label',text.choose);
    var dots = slides.map(function (slide,index) {
      var dot = document.createElement('button');
      dot.type='button'; dot.className='showcase-dot';
      dot.setAttribute('aria-label',text.show+(index+1)+': '+text.featured);
      dot.addEventListener('click',function(){ show(index); start(); });
      dotsWrap.appendChild(dot); return dot;
    });
    root.appendChild(dotsWrap);
    function show(index) {
      current=(index+slides.length)%slides.length;
      slides.forEach(function(slide,i){
        var active=i===current; slide.classList.toggle('active',active);
        slide.setAttribute('aria-hidden',String(!active));
      });
      dots.forEach(function(dot,i){dot.classList.toggle('active',i===current);dot.setAttribute('aria-pressed',String(i===current));});
    }
    function stop(){if(timer){window.clearInterval(timer);timer=null;}}
    function start(){stop();if(!reduced.matches && slides.length>1) timer=window.setInterval(function(){show(current+1);},5500);}
    var touch=null;
    root.addEventListener('touchstart',function(e){if(e.touches.length===1)touch={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
    root.addEventListener('touchend',function(e){
      if(!touch||!e.changedTouches.length)return;
      var dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;touch=null;
      if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.2){show(current+(dx<0?1:-1));start();}
    },{passive:true});
    root.addEventListener('mouseenter',stop); root.addEventListener('mouseleave',start);
    root.addEventListener('focusin',stop); root.addEventListener('focusout',start);
    if(reduced.addEventListener) reduced.addEventListener('change',start);
    show(0); start();
  }
})();