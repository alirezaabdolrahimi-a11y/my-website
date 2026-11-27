(() => {
  'use strict';

  const DATA = {
    pages: '/data/live-page-inventory.jsonl',
    slides: '/images/slideshow-manifest.json',
    api: '/api-catalog.json',
    services: '/data/rebuild-services.json'
  };
  const app = document.getElementById('app');
  const params = new URLSearchParams(window.location.search);
  const requestedPath = normalizePath(params.get('page') || '/');
  let pages = [];
  let pageMap = new Map();
  let manifest = {};
  let apiItems = [];
  let services = [];

  const COPY = {
    en: {
      home:'Home',about:'About Us',projects:'Projects',contact:'Contact',partner:'Become Our Partner',
      services:'Our Services',vip:'Priority Services',contactCta:'Contact Our Team',partnerCta:'Become Our Partner',
      apiTitle:'API & Pharmaceutical Raw Materials Catalogue',search:'Search by product or category',allCategories:'All categories',
      results:'records',empty:'No matching materials found.',apiNote:'This is an indicative sourcing reference, not a statement of current stock, supplier approval or regulatory eligibility. Details must be confirmed for each enquiry.',
      downloads:'Download FCM/CMO enquiry forms',downloadLanguage:'Document language',html:'HTML form',rtf:'RTF form',
      send:'Prepare email enquiry',mailNote:'This form opens a pre-addressed email draft in your email application. It does not submit directly to a server.',
      whatsapp:'WhatsApp',overview:'Page information',useful:'Useful links',limited:'Localized homepage content is available here; service detail pages may open in English where a translated route is not yet published.',
      faLimited:'Persian content is currently available for the About page. Other service details open in English until their translations are completed.',
      loading:'Loading verified site content…',notFound:'This page is not included in the current live-site inventory.',
      office:'Tehran Office',address:'Unit 603, 6th Floor, Marjan Tower, North Mofatteh St., Tehran, Iran',
      email:'Email',phone:'Telephone',addressLabel:'Tehran Address',copyright:'NIAZ NET · Unified rebuild preview · Isolated branch only'
    },
    tr: {
      home:'Ana Sayfa',about:'Hakkımızda',projects:'Projeler',contact:'İletişim',partner:'İş Ortağımız Olun',
      services:'Hizmetlerimiz',vip:'Öncelikli Hizmetler',contactCta:'Ekibimizle İletişime Geçin',partnerCta:'İş Ortağımız Olun',
      apiTitle:'API ve Farmasötik Hammaddeler Kataloğu',search:'Ürün veya kategori ara',allCategories:'Tüm kategoriler',
      results:'kayıt',empty:'Eşleşen ürün bulunamadı.',apiNote:'Bu liste gösterge niteliğinde bir tedarik referansıdır; güncel stok, tedarikçi onayı veya mevzuata uygunluk beyanı değildir. Her talep için ayrıntılar ayrıca doğrulanmalıdır.',
      downloads:'FCM/CMO talep formlarını indir',downloadLanguage:'Belge dili',html:'HTML formu',rtf:'RTF formu',
      send:'E-posta talebi hazırla',mailNote:'Bu form, e-posta uygulamanızda info@niaznet.net adresine hazırlanmış bir taslak açar. Sunucuya doğrudan gönderim yapmaz.',
      whatsapp:'WhatsApp',overview:'Sayfa bilgileri',useful:'Faydalı bağlantılar',limited:'Yerelleştirilmiş ana sayfa mevcuttur; çevrilmiş bir hizmet sayfası bulunmadığında hizmet ayrıntıları İngilizce açılabilir.',
      faLimited:'Farsça içerik şu anda yalnızca Hakkımızda sayfasında mevcuttur. Diğer hizmet ayrıntıları çevirileri tamamlanana kadar İngilizce açılır.',
      loading:'Doğrulanmış site içeriği yükleniyor…',notFound:'Bu sayfa mevcut canlı site envanterinde bulunmuyor.',
      office:'Tahran Ofisi',address:'Marjan Tower, 6. Kat, 603 numaralı ofis, Kuzey Mofatteh Caddesi, Tahran, İran',
      email:'E-posta',phone:'Telefon',addressLabel:'Tahran Adresi',copyright:'NIAZ NET · Birleşik yeniden yapım önizlemesi · Yalnızca izole dal'
    },
    fa: {
      home:'صفحه اصلی',about:'درباره ما',projects:'پروژه‌ها',contact:'تماس با ما',partner:'همکاری با ما',
      services:'خدمات ما',vip:'خدمات ویژه',contactCta:'تماس با تیم ما',partnerCta:'همکاری با ما',
      apiTitle:'فهرست مواد مؤثره دارویی و مواد اولیه',search:'جست‌وجو بر اساس نام محصول یا دسته',allCategories:'همه دسته‌ها',
      results:'رکورد',empty:'موردی مطابق جست‌وجو پیدا نشد.',apiNote:'این فهرست صرفاً مرجع اولیه تأمین است و به معنی موجودی فعلی، تأیید تأمین‌کننده یا مجاز بودن عرضه در بازار مقصد نیست. جزئیات هر درخواست باید جداگانه بررسی شود.',
      downloads:'دریافت فرم‌های درخواست FCM/CMO',downloadLanguage:'زبان مدرک',html:'فرم HTML',rtf:'فرم RTF',
      send:'آماده‌سازی ایمیل درخواست',mailNote:'این فرم یک پیش‌نویس ایمیل به نشانی info@niaznet.net باز می‌کند و اطلاعات را مستقیماً به سرور ارسال نمی‌کند.',
      whatsapp:'واتساپ',overview:'اطلاعات صفحه',useful:'پیوندهای مفید',limited:'صفحه اصلی بومی‌سازی‌شده در دسترس است؛ در صورت نبود صفحه خدمات ترجمه‌شده، جزئیات خدمات ممکن است به زبان انگلیسی باز شود.',
      faLimited:'در حال حاضر محتوای فارسی فقط برای صفحه درباره ما موجود است. سایر صفحات خدمات تا زمان تکمیل ترجمه به زبان انگلیسی باز می‌شوند.',
      loading:'در حال بارگذاری محتوای تأییدشده سایت…',notFound:'این صفحه در فهرست فعلی صفحات آنلاین وجود ندارد.',
      office:'دفتر تهران',address:'ایران، تهران، خیابان مفتح شمالی، برج مرجان، طبقه ششم، واحد ۶۰۳',
      email:'ایمیل',phone:'تلفن',addressLabel:'نشانی دفتر تهران',copyright:'NIAZ NET · پیش‌نمایش بازسازی یکپارچه · فقط شاخه آزمایشی'
    },
    es: {
      home:'Inicio',about:'Quiénes somos',projects:'Proyectos',contact:'Contacto',partner:'Conviértase en socio',
      services:'Nuestros servicios',vip:'Servicios prioritarios',contactCta:'Contacte con nuestro equipo',partnerCta:'Conviértase en socio',
      apiTitle:'Catálogo de API y materias primas farmacéuticas',search:'Buscar por producto o categoría',allCategories:'Todas las categorías',
      results:'registros',empty:'No se encontraron materiales.',apiNote:'Esta lista es una referencia orientativa de abastecimiento; no confirma existencias, aprobación del proveedor ni elegibilidad regulatoria. Cada solicitud debe verificarse individualmente.',
      downloads:'Descargar formularios de consulta FCM/CMO',downloadLanguage:'Idioma del documento',html:'Formulario HTML',rtf:'Formulario RTF',
      send:'Preparar consulta por correo',mailNote:'Este formulario abre un borrador de correo dirigido a info@niaznet.net. No envía los datos directamente a un servidor.',
      whatsapp:'WhatsApp',overview:'Información de la página',useful:'Enlaces útiles',limited:'La página de inicio está traducida; las páginas de detalle de servicios pueden abrirse en inglés cuando no existe una ruta traducida.',
      faLimited:'El contenido en persa está disponible actualmente solo para la página Acerca de nosotros.',
      loading:'Cargando contenido verificado…',notFound:'Esta página no figura en el inventario actual del sitio.',
      office:'Oficina de Teherán',address:'Unidad 603, 6.º piso, Marjan Tower, North Mofatteh St., Teherán, Irán',
      email:'Correo electrónico',phone:'Teléfono',addressLabel:'Dirección de Teherán',copyright:'NIAZ NET · Vista previa unificada · Rama aislada'
    },
    fr: {
      home:'Accueil',about:'À propos',projects:'Projets',contact:'Contact',partner:'Devenir partenaire',
      services:'Nos services',vip:'Services prioritaires',contactCta:'Contacter notre équipe',partnerCta:'Devenir partenaire',
      apiTitle:'Catalogue des API et matières premières pharmaceutiques',search:'Rechercher par produit ou catégorie',allCategories:'Toutes les catégories',
      results:'entrées',empty:'Aucun produit correspondant.',apiNote:'Cette liste constitue une référence indicative d’approvisionnement ; elle ne confirme ni stock actuel, ni qualification du fournisseur, ni admissibilité réglementaire. Chaque demande doit être vérifiée.',
      downloads:'Télécharger les formulaires FCM/CMO',downloadLanguage:'Langue du document',html:'Formulaire HTML',rtf:'Formulaire RTF',
      send:'Préparer une demande par e-mail',mailNote:'Ce formulaire ouvre un brouillon adressé à info@niaznet.net dans votre application e-mail. Il ne transmet pas directement les données à un serveur.',
      whatsapp:'WhatsApp',overview:'Informations de la page',useful:'Liens utiles',limited:'La page d’accueil est traduite ; les pages détaillées des services peuvent s’ouvrir en anglais lorsqu’une traduction n’est pas publiée.',
      faLimited:'Le contenu en persan est actuellement disponible uniquement pour la page À propos.',
      loading:'Chargement du contenu vérifié…',notFound:'Cette page ne figure pas dans l’inventaire actuel du site.',
      office:'Bureau de Téhéran',address:'Unité 603, 6e étage, Marjan Tower, North Mofatteh St., Téhéran, Iran',
      email:'E-mail',phone:'Téléphone',addressLabel:'Adresse de Téhéran',copyright:'NIAZ NET · Aperçu unifié · Branche isolée'
    }
  };

  function normalizePath(path) {
    if (!path || path === '/index.html') return '/';
    if (!path.startsWith('/')) path = '/' + path;
    return path.replace(/\/+/g, '/');
  }
  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }
  function langHome(lang) {
    if (lang === 'tr') return '/tr/';
    if (lang === 'es') return '/es/';
    if (lang === 'fr') return '/fr/';
    if (lang === 'fa') return '/fa/about.html';
    return '/';
  }
  function pageForLanguage(path, lang) {
    const bare = normalizePath(path).replace(/^\/(tr|fa|es|fr)(?=\/)/, '') || '/';
    let candidate = bare;
    if (lang === 'tr') candidate = bare === '/' ? '/tr/' : '/tr' + bare;
    if (lang === 'fa') candidate = bare === '/about.html' ? '/fa/about.html' : '/fa/about.html';
    if (lang === 'es' || lang === 'fr') candidate = langHome(lang);
    if (lang === 'en') candidate = bare;
    return pageMap.has(candidate) ? candidate : langHome(lang);
  }
  function pageForAction(path, lang) {
    const candidate = pageForLanguage(path, lang);
    if ((path === '/contact.html' || path === '/become-our-partner.html') &&
        candidate === langHome(lang) && pageMap.has(path)) return path;
    return candidate;
  }
  function navigationHref(path, lang) {
    if (lang === 'es' || lang === 'fr') {
      if (path === '/about.html') return linkTo(langHome(lang), '#about');
      if (path === '/projects.html') return linkTo(langHome(lang), '#projects');
    }
    return linkTo(pageForAction(path, lang));
  }
  function routeForService(slug, lang) {
    const en = '/' + slug + '.html';
    if (lang === 'tr' && pageMap.has('/tr/' + slug + '.html')) return '/tr/' + slug + '.html';
    if (pageMap.has(en)) return en;
    return langHome(lang);
  }
  function linkTo(path, hash) {
    return '?page=' + encodeURIComponent(path) + (hash || '');
  }
  function textFor(service, lang) {
    return service[lang] || service.en;
  }
  function titleFor(record) {
    const h1 = (record.blocks || []).find(b => b.type === 'h1');
    return h1 ? h1.text : ((record.headings || [])[0] || record.title || 'NIAZ NET');
  }
  function descriptionFor(record) {
    const p = (record.blocks || []).find(b => b.type === 'p');
    return p ? p.text : ((record.paragraphs || [])[0] || record.description || '');
  }
  function slideGroup(path) {
    const bare = normalizePath(path).replace(/^\/(tr|fa|es|fr)(?=\/)/, '');
    if (bare === '/') return 'home';
    const slug = bare.split('/').pop().replace(/\.html$/i, '');
    const exact = {
      about:'about','brand-registration':'brand','product-registration':'brand',
      'sports-nutrition':'sport','api-supply':'api','infant-formula':'infant',
      'cbd-products':'cbd','cosmoderma':'cosmo','pet-food':'pet',
      'international-markets':'all','import-export':'all','business-development':'all',
      'international-business-development':'all','cote-divoire-market':'all',
      'kenya-market':'all','south-africa-market':'all','contract-manufacturing':'all',
      'market-entry':'all','chamber-of-commerce':'all','exclusive-agency':'brand',
      'licensing-partnerships':'brand','medical-devices':'all','nutraceuticals':'all',
      'pharmaceutical-products':'api','private-label':'brand','regulatory-affairs':'api',
      'supply-chain-solutions':'all','technology-transfer':'all'
    };
    return exact[slug] || '';
  }
  function slideMarkup(group, lang, label) {
    let list = Array.isArray(manifest[group]) ? manifest[group].slice() : [];
    if (lang !== 'fa') list = list.filter(src => !/(^|\/)(FA[^/]*|[^/]*FA_[^/]*)\.png$/i.test(src));
    if (!list.length) return null;
    const wrap = el('div', 'slideshow');
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', label + ' slideshow');
    const slides = [];
    const dots = el('div', 'slide-dots');
    dots.setAttribute('role', 'group');
    dots.setAttribute('aria-label', 'Slideshow navigation');
    list.forEach((src, index) => {
      const slide = el('div', 'slide' + (index === 0 ? ' is-active' : ''));
      slide.setAttribute('aria-hidden', String(index !== 0));
      const img = document.createElement('img');
      img.src = src;
      img.alt = label + ' — ' + (index + 1);
      img.loading = index === 0 ? 'eager' : 'lazy';
      slide.appendChild(img);
      wrap.appendChild(slide);
      slides.push(slide);
      const dot = el('button', 'slide-dot');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Show slide ' + (index + 1));
      dot.setAttribute('aria-current', String(index === 0));
      dot.addEventListener('click', () => { show(index); restart(); });
      dots.appendChild(dot);
    });
    wrap.appendChild(dots);
    let active = 0, timer = null, startX = null;
    const dotButtons = [...dots.querySelectorAll('button')];
    function show(i) {
      active = (i + slides.length) % slides.length;
      slides.forEach((s, n) => { s.classList.toggle('is-active', n === active); s.setAttribute('aria-hidden', String(n !== active)); });
      dotButtons.forEach((b, n) => b.setAttribute('aria-current', String(n === active)));
    }
    function stop() { if (timer !== null) { window.clearInterval(timer); timer = null; } }
    function start() {
      stop();
      if (slides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !document.hidden) {
        timer = window.setInterval(() => show(active + 1), 5000);
      }
    }
    function restart() { start(); }
    wrap.addEventListener('mouseenter', stop);
    wrap.addEventListener('mouseleave', start);
    wrap.addEventListener('focusin', stop);
    wrap.addEventListener('focusout', event => { if (!wrap.contains(event.relatedTarget)) start(); });
    wrap.addEventListener('touchstart', event => { startX = event.changedTouches[0].clientX; }, { passive: true });
    wrap.addEventListener('touchend', event => {
      if (startX === null) return;
      const delta = event.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 40) { show(active + (delta < 0 ? 1 : -1)); restart(); }
      startX = null;
    }, { passive: true });
    document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
    show(0);
    start();
    return wrap;
  }
  function renderHeader(lang, currentPath) {
    const t = COPY[lang] || COPY.en;
    const header = el('header', 'site-header');
    const inner = el('div', 'container header-inner');
    const brand = el('a', 'brand');
    brand.href = linkTo(langHome(lang));
    const logo = document.createElement('img');
    logo.src = '/images/niaz-net-logo.png';
    logo.alt = 'NIAZ NET';
    brand.append(logo, el('span', '', 'NIAZ NET'));
    inner.appendChild(brand);
    const toggle = el('button', 'nav-toggle', 'Menu');
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Toggle navigation');
    const nav = el('nav', 'main-nav');
    nav.id = 'main-nav';
    const items = [
      [t.home, langHome(lang)],
      [t.about, pageForLanguage('/about.html', lang)],
      [t.projects, pageForLanguage('/projects.html', lang)],
      [t.contact, pageForAction('/contact.html', lang)],
      [t.partner, pageForAction('/become-our-partner.html', lang)]
    ];
    items.forEach(([label, path]) => {
      const a = el('a', '', label);
      a.href = navigationHref(path, lang);
      if (normalizePath(path) === currentPath) a.setAttribute('aria-current', 'page');
      nav.appendChild(a);
    });
    const select = el('select', 'language-select');
    select.setAttribute('aria-label', 'Language');
    [['en','EN'],['fa','FA'],['tr','TR'],['es','ES'],['fr','FR']].forEach(([value,label]) => {
      const option = el('option', '', label);
      option.value = value;
      option.selected = value === lang;
      select.appendChild(option);
    });
    select.addEventListener('change', () => {
      window.location.href = linkTo(pageForLanguage(currentPath, select.value));
    });
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
    inner.append(toggle, nav, select);
    header.appendChild(inner);
    return header;
  }
  function renderHero(record, path, lang) {
    const t = COPY[lang] || COPY.en;
    const hero = el('section', 'hero');
    const grid = el('div', 'container hero-grid');
    const copy = el('div', 'hero-copy-wrap');
    copy.appendChild(el('div', 'eyebrow', 'NIAZ NET · INTERNATIONAL BUSINESS'));
    copy.appendChild(el('h1', '', titleFor(record)));
    copy.appendChild(el('p', 'hero-copy', descriptionFor(record)));
    const actions = el('div', 'hero-actions');
    const contact = el('a', 'btn', t.contactCta);
    contact.href = linkTo(pageForAction('/contact.html', lang));
    const partner = el('a', 'btn secondary', t.partnerCta);
    partner.href = linkTo(pageForAction('/become-our-partner.html', lang));
    actions.append(contact, partner);
    copy.appendChild(actions);
    grid.appendChild(copy);
    const group = slideGroup(path);
    if (group) {
      const slides = slideMarkup(group, lang, titleFor(record));
      if (slides) grid.appendChild(slides);
    }
    hero.appendChild(grid);
    return hero;
  }
  function renderBlocks(record, lang) {
    const section = el('section', 'section white');
    const container = el('div', 'container');
    const panel = el('div', 'content-panel');
    const blocks = Array.isArray(record.blocks) ? record.blocks : [];
    let skippedH1 = false, skippedP = false, list = [];
    const flushList = () => {
      if (!list.length) return;
      const ul = document.createElement('ul');
      list.forEach(item => ul.appendChild(el('li', '', item)));
      panel.appendChild(ul);
      list = [];
    };
    blocks.forEach(block => {
      if (block.type === 'h1' && !skippedH1) { skippedH1 = true; return; }
      if (block.type === 'p' && !skippedP) { skippedP = true; return; }
      if (block.type === 'li') { list.push(block.text); return; }
      flushList();
      if (block.type === 'h2') panel.appendChild(el('h2', '', block.text));
      else if (block.type === 'h3') panel.appendChild(el('h3', '', block.text));
      else if (block.type === 'p') panel.appendChild(el('p', '', block.text));
      else if (block.type === 'blockquote') panel.appendChild(el('blockquote', '', block.text));
    });
    flushList();
    if (!panel.childElementCount) {
      (record.paragraphs || []).slice(1).forEach(p => panel.appendChild(el('p', '', p)));
    }
    container.appendChild(panel);
    section.appendChild(container);
    return section;
  }
  function renderServiceGrid(lang) {
    const t = COPY[lang] || COPY.en;
    const section = el('section', 'section');
    section.id = 'services';
    const container = el('div', 'container');
    const head = el('div', 'section-heading');
    const title = el('div');
    title.appendChild(el('h2', '', t.services));
    head.appendChild(title);
    container.appendChild(head);
    const grid = el('div', 'service-grid');
    services.forEach(service => {
      const a = el('a', 'service-card' + (service.vip ? ' vip' : ''));
      a.href = linkTo(routeForService(service.slug, lang));
      const img = document.createElement('img');
      img.src = '/images/service-icons/' + service.icon;
      img.alt = '';
      img.loading = 'lazy';
      a.append(img, el('h3', '', textFor(service, lang)));
      grid.appendChild(a);
    });
    container.appendChild(grid);
    const vip = services.filter(x => x.vip);
    if (vip.length) {
      container.appendChild(el('h3', 'section-subtitle', t.vip));
      const strip = el('div', 'vip-strip');
      strip.id = 'vip-services';
      vip.forEach(service => {
        const a = el('a', 'vip-link', textFor(service, lang));
        a.href = linkTo(routeForService(service.slug, lang));
        strip.appendChild(a);
      });
      container.appendChild(strip);
    }
    section.appendChild(container);
    return section;
  }
  function renderNetworkMap(network) {
    const map = el('div', 'network-map network-map-modern');
    map.setAttribute('role', 'img');
    map.setAttribute('aria-label', (network.locations || []).map(x => x.name).join(', '));
    map.appendChild(el('div', 'real-world-map'));
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'network-routes');
    svg.setAttribute('viewBox', '0 0 900 430');
    svg.setAttribute('role', 'presentation');
    const paths = [
      'M440 119 Q470 103 537 122',
      'M470 103 Q505 108 537 122',
      'M537 122 Q560 130 582 138',
      'M537 122 Q586 140 645 162',
      'M582 138 Q610 148 645 162'
    ];
    paths.forEach(d => {
      const path = document.createElementNS(ns, 'path');
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', '#c99a43');
      path.setAttribute('stroke-width', '3');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('opacity', '.9');
      svg.appendChild(path);
    });
    (network.locations || []).forEach(point => {
      const circle = document.createElementNS(ns, 'circle');
      circle.setAttribute('cx', point.x);
      circle.setAttribute('cy', point.y);
      circle.setAttribute('r', '8');
      circle.setAttribute('fill', '#071b38');
      circle.setAttribute('stroke', '#fff');
      circle.setAttribute('stroke-width', '4');
      svg.appendChild(circle);
      const label = document.createElementNS(ns, 'text');
      label.setAttribute('x', point.x + (point.x === 440 ? -38 : 10));
      label.setAttribute('y', point.y + (point.name === 'Switzerland' || point.name === 'İsviçre' || point.name === 'Suiza' || point.name === 'Suisse' ? -12 : 8));
      label.setAttribute('fill', '#071b38');
      label.setAttribute('font-family', 'Arial,sans-serif');
      label.setAttribute('font-size', '18');
      label.setAttribute('font-weight', '700');
      label.textContent = point.name;
      svg.appendChild(label);
    });
    map.appendChild(svg);
    map.appendChild(el('div', 'network-caption', network.caption || ''));
    return map;
  }

  function renderFeatureNetwork(featureGroup, networkGroup, record) {
    const section = el('section', 'container split home-split');
    section.id = 'about';
    const left = el('div', 'panel');
    left.appendChild(el('h2', '', featureGroup.title));
    const reasons = el('div', 'reasons');
    const icons = ['◎','♧','♧','▤','♙','◎','▱','♧'];
    featureGroup.items.forEach((entry, index) => {
      const reason = el('div', 'reason');
      reason.appendChild(el('div', 'reason-icon', icons[index] || '•'));
      const copy = el('div');
      copy.appendChild(el('h3', '', entry.title));
      entry.paragraphs.forEach(p => copy.appendChild(el('p', '', p)));
      reason.appendChild(copy);
      reasons.appendChild(reason);
    });
    left.appendChild(reasons);
    const right = el('div', 'panel');
    right.appendChild(el('h2', '', networkGroup.title));
    if (record.network) right.appendChild(renderNetworkMap(record.network));
    section.append(left, right);
    return section;
  }

  function renderHomeSections(record, lang) {
    const blocks = Array.isArray(record.blocks) ? record.blocks : [];
    const groups = [];
    let current = null, item = null, skippedH1 = false, skippedP = false;
    blocks.forEach(block => {
      if (block.type === 'h1' && !skippedH1) { skippedH1 = true; return; }
      if (block.type === 'p' && !skippedP) { skippedP = true; return; }
      if (block.type === 'h2') {
        current = { title: block.text, paragraphs: [], items: [] };
        groups.push(current);
        item = null;
      } else if (block.type === 'h3') {
        if (!current) { current = { title: '', paragraphs: [], items: [] }; groups.push(current); }
        item = { title: block.text, paragraphs: [] };
        current.items.push(item);
      } else if (block.type === 'p' || block.type === 'li') {
        if (item) item.paragraphs.push(block.text);
        else if (current) current.paragraphs.push(block.text);
      }
    });
    const output = [];
    const featureGroup = groups.find(g => /why choose|neden|por qué|pourquoi/.test(g.title.toLocaleLowerCase()));
    const networkGroup = groups.find(g => /network|ağımız|red global|réseau/.test(g.title.toLocaleLowerCase()));
    const renderedFeatureNetwork = Boolean(featureGroup && networkGroup && record.network);
    groups.forEach((group, index) => {
      if (renderedFeatureNetwork && group === networkGroup) return;
      const title = group.title || '';
      const normalized = title.toLocaleLowerCase();
      if (renderedFeatureNetwork && group === featureGroup) {
        output.push(renderFeatureNetwork(featureGroup, networkGroup, record));
        return;
      }
      let kind = 'generic', id = 'home-section-' + index;
      if (/vip/.test(normalized)) return;
      if (/why choose|neden|por qué|pourquoi/.test(normalized)) { kind = 'features'; id = 'about'; }
      else if (/project|proje|proyectos|projets/.test(normalized)) { kind = 'projects'; id = 'projects'; }
      else if (/news|haber|noticias|actualités|actualites/.test(normalized)) { kind = 'news'; id = 'news'; }
      else if (/success|başarı|basari|éxito|exito|réussite|reussite/.test(normalized)) { kind = 'cta'; id = 'contact'; }
      else if (/office|ofis|oficina|bureaux/.test(normalized)) { kind = 'offices'; id = 'offices'; }
      else if (/partner|ortak|socios|partenaires/.test(normalized)) { kind = 'partners'; id = 'partners'; }
      else if (/network|ağımız|red global|réseau/.test(normalized)) { kind = 'network'; id = 'network'; }
      else return;
      const hasPartnerData = kind === 'partners' && Array.isArray(record.partners) && record.partners.length;
      if (!group.items.length && !group.paragraphs.length && !hasPartnerData && !(kind === 'network' && record.network)) return;
      const section = el('section', 'section home-section ' + kind);
      section.id = id;
      const container = el('div', 'container');
      if (title) container.appendChild(el('h2', 'section-title', title));
      if (kind === 'partners') {
        const strip = el('div', 'partner-strip');
        (record.partners || []).forEach(partner => {
          const card = el('div', 'partner');
          if (partner.mark) card.appendChild(el('span', partner.tone || '', partner.mark));
          card.appendChild(document.createTextNode((partner.mark ? ' ' : '') + partner.name));
          strip.appendChild(card);
        });
        container.appendChild(strip);
      } else if (kind === 'projects' || kind === 'features' || kind === 'offices') {
        const gridClass = kind === 'features' ? 'feature-grid' : kind === 'projects' ? 'project-grid' : 'office-grid';
        const grid = el('div', gridClass);
        group.items.forEach((entry, entryIndex) => {
          const card = el('article', kind === 'features' ? 'feature-card' : kind === 'projects' ? 'project-card' : 'office-card');
          if (kind === 'projects') {
            const symbol = el('span', 'project-symbol');
            const imagePath = (record.projectImages || [])[entryIndex];
            if (imagePath) {
              const image = document.createElement('img');
              image.src = imagePath;
              image.alt = '';
              image.loading = 'lazy';
              image.decoding = 'async';
              symbol.appendChild(image);
            }
            card.appendChild(symbol);
          } else if (kind === 'offices') {
            card.appendChild(el('span', 'project-symbol', '⌖'));
          }
          card.appendChild(el('h3', '', entry.title));
          entry.paragraphs.forEach(paragraph => card.appendChild(el('p', '', paragraph)));
          grid.appendChild(card);
        });
        container.appendChild(grid);
        group.paragraphs.forEach(paragraph => container.appendChild(el('p', 'section-intro', paragraph)));
      } else if (kind === 'cta') {
        const band = el('div', 'home-cta');
        group.paragraphs.forEach(paragraph => band.appendChild(el('p', '', paragraph)));
        const actions = el('div', 'home-cta-actions');
        const contact = el('a', 'btn', (COPY[lang] || COPY.en).contactCta);
        contact.href = linkTo(pageForAction('/contact.html', lang));
        const partner = el('a', 'btn secondary', (COPY[lang] || COPY.en).partnerCta);
        partner.href = linkTo(pageForAction('/become-our-partner.html', lang));
        actions.append(contact, partner);
        band.appendChild(actions);
        const details = record.contactDetails;
        if (details) {
          const detailGrid = el('div', 'home-contact-details');
          const t = COPY[lang] || COPY.en;
          const items = [
            {label:t.email,value:details.email,href:'mailto:'+details.email},
            {label:t.office,value:details.phone,href:'tel:+982188322100'},
            {label:t.whatsapp,value:details.whatsapp,href:'https://wa.me/905340143473'},
            {label:t.addressLabel,value:details.address}
          ];
          items.forEach(item => {
            const entry = el('div', 'home-contact-item');
            entry.appendChild(el('b', '', item.label));
            if (item.href) {
              const link = el('a', '', item.value);
              link.href = item.href;
              if (item.href.startsWith('https://')) { link.target='_blank'; link.rel='noopener noreferrer'; }
              entry.appendChild(link);
            } else entry.appendChild(el('span', '', item.value));
            detailGrid.appendChild(entry);
          });
          band.appendChild(detailGrid);
        }
        container.appendChild(band);
      } else if (kind === 'news') {
        const placeholder = el('div', 'news-placeholder');
        placeholder.appendChild(el('strong', '', title));
        group.paragraphs.forEach(paragraph => placeholder.appendChild(el('p', '', paragraph)));
        const contact = el('a', 'btn', (COPY[lang] || COPY.en).contactCta);
        contact.href = linkTo(pageForAction('/contact.html', lang));
        placeholder.appendChild(contact);
        container.appendChild(placeholder);
      } else if (kind === 'network' && record.network) {
        container.appendChild(renderNetworkMap(record.network));
      } else {
        group.paragraphs.forEach(paragraph => container.appendChild(el('p', 'section-intro', paragraph)));
      }
      section.appendChild(container);
      output.push(section);
    });
    return output;
  }

  function renderApiCatalog(lang) {
    const t = COPY[lang] || COPY.en;
    const section = el('section', 'section white');
    const container = el('div', 'container');
    const panel = el('div', 'content-panel');
    panel.appendChild(el('h2', '', t.apiTitle));
    const tools = el('div', 'api-tools');
    const search = document.createElement('input');
    search.className = 'field';
    search.type = 'search';
    search.placeholder = t.search;
    search.setAttribute('aria-label', t.search);
    const category = document.createElement('select');
    category.className = 'field';
    category.setAttribute('aria-label', t.allCategories);
    const all = el('option', '', t.allCategories);
    all.value = '';
    category.appendChild(all);
    [...new Set(apiItems.map(x => x.category))].sort().forEach(value => {
      const o = el('option', '', value); o.value = value; category.appendChild(o);
    });
    const sort = document.createElement('select');
    sort.className = 'field';
    const sortLabels = {
      en: ['Sort: original order', 'Name A–Z', 'Name Z–A', 'Category'],
      fa: ['مرتب‌سازی: ترتیب اصلی', 'نام: الف تا ی', 'نام: ی تا الف', 'دسته‌بندی'],
      tr: ['Sıralama: özgün sıra', 'Ad A–Z', 'Ad Z–A', 'Kategori'],
      es: ['Orden: original', 'Nombre A–Z', 'Nombre Z–A', 'Categoría'],
      fr: ['Tri : ordre initial', 'Nom A–Z', 'Nom Z–A', 'Catégorie']
    }[lang] || ['Sort: original order', 'Name A–Z', 'Name Z–A', 'Category'];
    sort.setAttribute('aria-label', sortLabels[0]);
    [['original',sortLabels[0]],['name-asc',sortLabels[1]],['name-desc',sortLabels[2]],['category',sortLabels[3]]].forEach(([value,label]) => {
      const option = el('option', '', label);
      option.value = value;
      sort.appendChild(option);
    });
    tools.append(search, category, sort);
    panel.appendChild(tools);
    const count = el('p', 'api-count');
    const wrap = el('div', 'table-wrap');
    const table = el('table', 'api-table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const productHeading = {fa:'محصول / ماده',tr:'Ürün / Hammadde',es:'Producto / Material',fr:'Produit / Matière'}[lang] || 'Product / Material';
    const categoryHeading = {fa:'دسته‌بندی',tr:'Kategori',es:'Categoría',fr:'Catégorie'}[lang] || 'Category';
    tr.append(el('th', '', productHeading), el('th', '', categoryHeading));
    thead.appendChild(tr);
    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    wrap.appendChild(table);
    const empty = el('div', 'empty-state', t.empty);
    panel.append(count, wrap, empty, el('p', 'form-note', t.apiNote));
    tools.addEventListener('input', update);
    tools.addEventListener('change', update);
    function update() {
      const q = search.value.trim().toLocaleLowerCase();
      const cat = category.value;
      const filtered = apiItems.filter(item =>
        (!cat || item.category === cat) &&
        (!q || (item.name + ' ' + item.category).toLocaleLowerCase().includes(q))
      );
      if (sort.value === 'name-asc') filtered.sort((a,b) => a.name.localeCompare(b.name));
      else if (sort.value === 'name-desc') filtered.sort((a,b) => b.name.localeCompare(a.name));
      else if (sort.value === 'category') filtered.sort((a,b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
      tbody.replaceChildren();
      filtered.forEach(item => {
        const row = document.createElement('tr');
        row.append(el('td', '', item.name), el('td', '', item.category));
        tbody.appendChild(row);
      });
      count.textContent = filtered.length + ' / ' + apiItems.length + ' ' + t.results;
      empty.style.display = filtered.length ? 'none' : 'block';
      wrap.style.display = filtered.length ? 'block' : 'none';
    }
    update();
    container.appendChild(panel);
    section.appendChild(container);
    return section;
  }
  function renderDownloads(lang) {
    const t = COPY[lang] || COPY.en;
    const labels = {
      solid:{en:'Solid dosage forms',fa:'اشکال دارویی جامد',tr:'Katı dozaj formları',es:'Formas farmacéuticas sólidas',fr:'Formes pharmaceutiques solides'},
      nonsterile:{en:'Non-sterile liquids',fa:'مایعات غیراستریل',tr:'Steril olmayan sıvılar',es:'Líquidos no estériles',fr:'Liquides non stériles'},
      sterile:{en:'Sterile liquids (injectables)',fa:'مایعات استریل (تزریقی)',tr:'Steril sıvılar (enjeksiyon)',es:'Líquidos estériles (inyectables)',fr:'Liquides stériles (injectables)'}
    };
    const section = el('section', 'section white');
    section.id = 'fcm-downloads';
    const container = el('div', 'container');
    const panel = el('div', 'content-panel');
    panel.appendChild(el('h2', '', t.downloads));
    const controls = el('div', 'api-tools');
    const select = document.createElement('select');
    select.className = 'field';
    select.setAttribute('aria-label', t.downloadLanguage);
    [['en','English'],['fa','فارسی'],['tr','Türkçe'],['es','Español'],['fr','Français']].forEach(([v,l]) => {
      const o = el('option', '', l); o.value = v; o.selected = v === lang; select.appendChild(o);
    });
    controls.appendChild(select);
    panel.appendChild(controls);
    const grid = el('div', 'download-grid');
    function update() {
      grid.replaceChildren();
      Object.entries(labels).forEach(([type,names]) => {
        const card = el('article', 'download-card');
        card.appendChild(el('h3', '', names[select.value] || names.en));
        const actions = el('div', 'download-actions');
        const html = el('a', '', t.html); html.href = '/downloads/fcm-cmo/' + type + '-' + select.value + '.html';
        const rtf = el('a', '', t.rtf); rtf.href = '/downloads/fcm-cmo/' + type + '-' + select.value + '.rtf';
        actions.append(html, rtf);
        card.appendChild(actions);
        grid.appendChild(card);
      });
    }
    select.addEventListener('change', update);
    update();
    panel.appendChild(grid);
    container.appendChild(panel);
    section.appendChild(container);
    return section;
  }
  function renderForm(record, lang) {
    const t = COPY[lang] || COPY.en;
    const source = (record.forms || [])[0];
    if (!source || !source.fields || !source.fields.length) return null;
    const section = el('section', 'section white');
    const container = el('div', 'container');
    const panel = el('div', 'content-panel');
    panel.appendChild(el('h2', '', lang === 'fa' ? 'ارسال درخواست' : lang === 'tr' ? 'Talep gönderin' : lang === 'es' ? 'Enviar una consulta' : lang === 'fr' ? 'Envoyer une demande' : 'Send an Enquiry'));
    const form = document.createElement('form');
    form.className = 'form-grid';
    source.fields.forEach((field, index) => {
      const wrapper = el('div', 'form-field' + (field.tag === 'textarea' ? ' full' : ''));
      const labelText = field.label || field.name || 'Field';
      const label = el('label', '', labelText);
      const id = 'field-' + index;
      label.htmlFor = id;
      let control;
      if (field.tag === 'textarea') {
        control = document.createElement('textarea');
      } else if (field.tag === 'select' && field.options && field.options.length) {
        control = document.createElement('select');
        field.options.forEach(option => {
          const o = el('option', '', option.label); o.value = option.value; control.appendChild(o);
        });
      } else {
        control = document.createElement('input');
        control.type = field.type === 'email' ? 'email' : 'text';
      }
      control.id = id;
      control.name = field.name || labelText;
      control.required = !!field.required;
      control.className = 'field';
      wrapper.append(label, control);
      form.appendChild(wrapper);
    });
    const actions = el('div', 'form-field full');
    const submit = el('button', 'btn', t.send);
    submit.type = 'submit';
    actions.appendChild(submit);
    form.appendChild(actions);
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = 'NIAZ NET — ' + record.title;
      const body = [...data.entries()].map(([key, value]) => key + ': ' + value).join('\n');
      window.location.href = 'mailto:info@niaznet.net?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
    panel.appendChild(form);
    panel.appendChild(el('p', 'form-note', t.mailNote));
    container.appendChild(panel);
    section.appendChild(container);
    return section;
  }
  function renderUsefulLinks(record, lang) {
    const t = COPY[lang] || COPY.en;
    const candidates = (record.links || []).filter(x => {
      const href = x.href || '';
      const isDownload = href.includes('/downloads/') || href.startsWith('downloads/');
      if (isDownload && record.path.endsWith('/contract-manufacturing.html')) return false;
      return href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') ||
        href.startsWith('http://') || href.startsWith('https://') ||
        isDownload || /\.html(?:$|[?#])/i.test(href);
    });
    const seen = new Set();
    const filtered = candidates.filter(x => {
      if (seen.has(x.href)) return false;
      seen.add(x.href);
      return true;
    });
    if (!filtered.length) return null;
    const section = el('section', 'section');
    const container = el('div', 'container');
    const panel = el('div', 'content-panel');
    panel.appendChild(el('h2', '', t.useful));
    filtered.slice(0,30).forEach(item => {
      const a = el('a', 'content-link', item.text || item.href);
      if (item.href.startsWith('#')) {
        a.href = linkTo(record.path, item.href);
      } else if (item.href.startsWith('mailto:') || item.href.startsWith('tel:')) {
        a.href = item.href;
      } else if (item.href.startsWith('http://') || item.href.startsWith('https://')) {
        a.href = item.href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      } else if (item.href.includes('/downloads/') || item.href.startsWith('downloads/')) {
        a.href = item.href.startsWith('/') ? item.href : '/' + item.href;
      } else {
        const currentPrefix = record.path.startsWith('/tr/') ? '/tr/' :
          record.path.startsWith('/es/') ? '/es/' :
          record.path.startsWith('/fr/') ? '/fr/' :
          record.path.startsWith('/fa/') ? '/fa/' : '/';
        const rawPath = item.href.split(/[?#]/)[0];
        const hash = item.href.includes('#') ? item.href.slice(item.href.indexOf('#')) : '';
        let href = rawPath.startsWith('/') ? rawPath : currentPrefix + rawPath.replace(/^\.\//,'');
        if (href === '/index.html') href = '/';
        if (/^\/(tr|es|fr)\/index\.html$/.test(href)) href = href.replace('index.html','');
        if (href === '/fa/index.html') href = '/fa/about.html';
        href = normalizePath(href);
        if (!pageMap.has(href)) {
          const fallback = pageForLanguage(href, lang);
          href = pageMap.has(fallback) ? fallback : langHome(lang);
        }
        a.href = linkTo(href, hash);
      }
      panel.appendChild(a);
    });
    container.appendChild(panel);
    section.appendChild(container);
    return section;
  }
  function renderFooter(lang) {
    const t = COPY[lang] || COPY.en;
    const footer = el('footer', 'footer');
    footer.id = 'site-footer';
    const container = el('div', 'container');
    const grid = el('div', 'footer-grid');
    const about = el('div');
    about.append(el('h3', '', 'NIAZ NET'), el('p', '', t.copyright));
    const office = el('div');
    office.append(el('h3', '', t.office), el('p', '', t.address));
    const contact = el('div');
    contact.append(el('h3', '', t.contact), el('a', '', 'info@niaznet.net'), el('a', '', '+98 21 8832 2100 ext. 2'), el('a', '', '+90 534 014 3473'));
    contact.querySelectorAll('a')[0].href = 'mailto:info@niaznet.net';
    contact.querySelectorAll('a')[1].href = 'tel:+982188322100';
    contact.querySelectorAll('a')[2].href = 'https://wa.me/905340143473';
    grid.append(about, office, contact);
    container.appendChild(grid);
    container.appendChild(el('div', 'footer-bottom', t.copyright));
    footer.appendChild(container);
    return footer;
  }
  function updateMetadata(record) {
    const title = record.title || titleFor(record);
    const description = record.description || descriptionFor(record);
    document.title = title;
    let descriptionTag = document.head.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.name = 'description';
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.content = description;
    if (record.canonical) {
      let canonical = document.head.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = record.canonical;
    }
    const social = [
      ['og:title', title],
      ['og:description', description],
      ['og:url', record.canonical || window.location.href]
    ];
    social.forEach(([property, content]) => {
      let tag = document.head.querySelector('meta[property="' + property + '"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });
  }

  function renderPage(path) {
    const record = pageMap.get(path);
    if (!record) {
      app.replaceChildren(el('main', 'not-found', COPY.en.notFound));
      return;
    }
    const lang = COPY[record.lang] ? record.lang : 'en';
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    updateMetadata(record);
    const home = path === '/' || path === '/tr/' || path === '/es/' || path === '/fr/';
    app.replaceChildren();
    app.appendChild(renderHeader(lang, path));
    app.appendChild(renderHero(record, path, lang));
    if (home) {
      app.appendChild(renderServiceGrid(lang));
      renderHomeSections(record, lang).forEach(section => app.appendChild(section));
      if (lang === 'es' || lang === 'fr') {
        const note = el('section', 'section');
        const box = el('div', 'container');
        box.appendChild(el('p', 'language-note', COPY[lang].limited));
        note.appendChild(box);
        app.appendChild(note);
      }
    } else {
      app.appendChild(renderBlocks(record, lang));
    }
    if (path.endsWith('/api-supply.html') || path === '/api-supply.html') app.appendChild(renderApiCatalog(lang));
    if (path.endsWith('/contract-manufacturing.html')) app.appendChild(renderDownloads(lang));
    const form = renderForm(record, lang);
    if (form) app.appendChild(form);
    const links = renderUsefulLinks(record, lang);
    if (links) app.appendChild(links);
    app.appendChild(renderFooter(lang));
    const wa = el('a', 'whatsapp', COPY[lang].whatsapp);
    wa.href = 'https://wa.me/905340143473';
    wa.target = '_blank';
    wa.rel = 'noopener noreferrer';
    app.appendChild(wa);
  }



  async function init() {
    try {
      const [pageText, slideData, apiData, serviceData] = await Promise.all([
        fetch(DATA.pages).then(r => { if (!r.ok) throw new Error('page inventory ' + r.status); return r.text(); }),
        fetch(DATA.slides).then(r => { if (!r.ok) throw new Error('slideshow manifest ' + r.status); return r.json(); }),
        fetch(DATA.api).then(r => { if (!r.ok) throw new Error('API catalogue ' + r.status); return r.json(); }),
        fetch(DATA.services).then(r => { if (!r.ok) throw new Error('service catalogue ' + r.status); return r.json(); })
      ]);
      pages = pageText.trim().split(/\r?\n/).filter(Boolean).map(line => JSON.parse(line));
      pageMap = new Map(pages.map(page => [normalizePath(page.path), page]));
      manifest = slideData;
      apiItems = Array.isArray(apiData) ? apiData : [];
      services = Array.isArray(serviceData) ? serviceData : [];
      renderPage(pageMap.has(requestedPath) ? requestedPath : '/');
    } catch (error) {
      app.replaceChildren(el('main', 'not-found', 'Unified preview could not load its source data: ' + error.message));
    }
  }

  init();
})();
