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
      home:'Home',about:'About Us',navServices:'Services',partners:'Partners',projects:'Projects',news:'News',contact:'Contact',getInTouch:'Get in Touch',
      services:'Our Services',vipTitle:'VIP SERVICES',contactCta:'Contact Our Team',partnerCta:'Become Our Partner',quickLinks:'Quick Links',tagline:'Connecting markets worldwide',newsHeadline:'Meet NIAZ NET at upcoming industry events',importExportLabel:'IMPORT / EXPORT',
      apiTitle:'API & Pharmaceutical Raw Materials Catalogue',search:'Search by product or category',allCategories:'All categories',
      results:'records',empty:'No matching materials found.',apiNote:'This is an indicative sourcing reference, not a statement of current stock, supplier approval or regulatory eligibility. Details must be confirmed for each enquiry.',
      downloads:'Download FCM/CMO enquiry forms',downloadLanguage:'Document language',html:'HTML form',rtf:'RTF form',
      send:'Prepare email enquiry',mailNote:'This form opens a pre-addressed email draft in your email application. It does not submit directly to a server.',
      whatsapp:'WhatsApp',useful:'Useful links',limited:'Localized homepage content is available here; service detail pages may open in English where a translated route is not yet published.',
      faLimited:'صفحه اصلی، صفحات اصلی کسب‌وکار و مجموعه‌ای از خدمات منتخب به فارسی در دسترس‌اند؛ سایر خدمات تا زمان تکمیل ترجمه به انگلیسی نمایش داده می‌شوند.',
      notFound:'This page is not included in the current live-site inventory.',
      office:'Tehran Office',address:'Unit 603, 6th Floor, Marjan Tower, North Mofatteh St., Tehran, Iran',
      email:'Email',addressLabel:'Tehran Address',copyright:'NIAZ NET · Unified rebuild preview · Isolated branch only'
    },
    tr: {
      home:'Ana Sayfa',about:'Hakkımızda',navServices:'Hizmetlerimiz',partners:'İş Ortakları',projects:'Projeler',news:'Haberler',contact:'İletişim',getInTouch:'Bize Ulaşın',
      services:'Hizmetlerimiz',vipTitle:'VIP HİZMETLER',contactCta:'Ekibimizle İletişime Geçin',partnerCta:'İş Ortağımız Olun',quickLinks:'Hızlı Bağlantılar',tagline:'Dünya pazarlarını birbirine bağlıyoruz',newsHeadline:'Yaklaşan sektör etkinliklerinde NIAZ NET ile buluşun',importExportLabel:'İTHALAT / İHRACAT',
      apiTitle:'API ve Farmasötik Hammaddeler Kataloğu',search:'Ürün veya kategori ara',allCategories:'Tüm kategoriler',
      results:'kayıt',empty:'Eşleşen ürün bulunamadı.',apiNote:'Bu liste gösterge niteliğinde bir tedarik referansıdır; güncel stok, tedarikçi onayı veya mevzuata uygunluk beyanı değildir. Her talep için ayrıntılar ayrıca doğrulanmalıdır.',
      downloads:'FCM/CMO talep formlarını indir',downloadLanguage:'Belge dili',html:'HTML formu',rtf:'RTF formu',
      send:'E-posta talebi hazırla',mailNote:'Bu form, e-posta uygulamanızda info@niaznet.net adresine hazırlanmış bir taslak açar. Sunucuya doğrudan gönderim yapmaz.',
      whatsapp:'WhatsApp',useful:'Faydalı bağlantılar',limited:'Yerelleştirilmiş ana sayfa mevcuttur; çevrilmiş bir hizmet sayfası bulunmadığında hizmet ayrıntıları İngilizce açılabilir.',
      faLimited:'Farsça içerik şu anda yalnızca Hakkımızda sayfasında mevcuttur. Diğer hizmet ayrıntıları çevirileri tamamlanana kadar İngilizce açılır.',
      notFound:'Bu sayfa mevcut canlı site envanterinde bulunmuyor.',
      office:'Tahran Ofisi',address:'Marjan Tower, 6. Kat, 603 numaralı ofis, Kuzey Mofatteh Caddesi, Tahran, İran',
      email:'E-posta',addressLabel:'Tahran Adresi',copyright:'NIAZ NET · Birleşik yeniden yapım önizlemesi · Yalnızca izole dal'
    },
    fa: {
      home:'صفحه اصلی',about:'درباره ما',navServices:'خدمات',partners:'شرکای ما',projects:'پروژه‌ها',news:'اخبار',contact:'تماس با ما',getInTouch:'تماس با ما',
      services:'خدمات ما',vipTitle:'خدمات VIP',contactCta:'تماس با تیم ما',partnerCta:'همکاری با ما',quickLinks:'دسترسی سریع',tagline:'پیونددهنده بازارهای جهانی',newsHeadline:'در رویدادهای پیش‌روی صنعت با نیاز نت دیدار کنید',importExportLabel:'واردات / صادرات',
      apiTitle:'فهرست مواد مؤثره دارویی و مواد اولیه',search:'جست‌وجو بر اساس نام محصول یا دسته',allCategories:'همه دسته‌ها',
      results:'رکورد',empty:'موردی مطابق جست‌وجو پیدا نشد.',apiNote:'این فهرست صرفاً مرجع اولیه تأمین است و به معنی موجودی فعلی، تأیید تأمین‌کننده یا مجاز بودن عرضه در بازار مقصد نیست. جزئیات هر درخواست باید جداگانه بررسی شود.',
      downloads:'دریافت فرم‌های درخواست FCM/CMO',downloadLanguage:'زبان مدرک',html:'فرم HTML',rtf:'فرم RTF',
      send:'آماده‌سازی ایمیل درخواست',mailNote:'این فرم یک پیش‌نویس ایمیل به نشانی info@niaznet.net باز می‌کند و اطلاعات را مستقیماً به سرور ارسال نمی‌کند.',
      whatsapp:'واتساپ',useful:'پیوندهای مفید',limited:'صفحه اصلی بومی‌سازی‌شده در دسترس است؛ در صورت نبود صفحه خدمات ترجمه‌شده، جزئیات خدمات ممکن است به زبان انگلیسی باز شود.',
      faLimited:'صفحه اصلی، صفحات درباره ما، پروژه‌ها، تماس و همکاری و ۲۶ صفحه خدمات به زبان فارسی در دسترس هستند.',
      notFound:'این صفحه در فهرست فعلی صفحات آنلاین وجود ندارد.',
      office:'دفتر تهران',address:'ایران، تهران، خیابان مفتح شمالی، برج مرجان، طبقه ششم، واحد ۶۰۳',
      email:'ایمیل',addressLabel:'نشانی دفتر تهران',copyright:'NIAZ NET · پیش‌نمایش بازسازی یکپارچه · فقط شاخه آزمایشی'
    },
    es: {
      home:'Inicio',about:'Quiénes somos',navServices:'Servicios',partners:'Socios',projects:'Proyectos',news:'Noticias',contact:'Contacto',getInTouch:'Contacte',
      services:'Nuestros servicios',vipTitle:'SERVICIOS VIP',contactCta:'Contacte con nuestro equipo',partnerCta:'Conviértase en socio',quickLinks:'Enlaces rápidos',tagline:'Conectando mercados en todo el mundo',newsHeadline:'Conozca a NIAZ NET en los próximos eventos del sector',importExportLabel:'IMPORTACIÓN / EXPORTACIÓN',
      apiTitle:'Catálogo de API y materias primas farmacéuticas',search:'Buscar por producto o categoría',allCategories:'Todas las categorías',
      results:'registros',empty:'No se encontraron materiales.',apiNote:'Esta lista es una referencia orientativa de abastecimiento; no confirma existencias, aprobación del proveedor ni elegibilidad regulatoria. Cada solicitud debe verificarse individualmente.',
      downloads:'Descargar formularios de consulta FCM/CMO',downloadLanguage:'Idioma del documento',html:'Formulario HTML',rtf:'Formulario RTF',
      send:'Preparar consulta por correo',mailNote:'Este formulario abre un borrador de correo dirigido a info@niaznet.net. No envía los datos directamente a un servidor.',
      whatsapp:'WhatsApp',useful:'Enlaces útiles',limited:'La página de inicio está traducida; las páginas de detalle de servicios pueden abrirse en inglés cuando no existe una ruta traducida.',
      faLimited:'El contenido en persa está disponible actualmente solo para la página Acerca de nosotros.',
      notFound:'Esta página no figura en el inventario actual del sitio.',
      office:'Oficina de Teherán',address:'Unidad 603, 6.º piso, Marjan Tower, North Mofatteh St., Teherán, Irán',
      email:'Correo electrónico',addressLabel:'Dirección de Teherán',copyright:'NIAZ NET · Vista previa unificada · Rama aislada'
    },
    fr: {
      home:'Accueil',about:'À propos',navServices:'Services',partners:'Partenaires',projects:'Projets',news:'Actualités',contact:'Contact',getInTouch:'Nous contacter',
      services:'Nos services',vipTitle:'SERVICES VIP',contactCta:'Contacter notre équipe',partnerCta:'Devenir partenaire',quickLinks:'Liens rapides',tagline:'Connecter les marchés du monde',newsHeadline:'Rencontrez NIAZ NET lors des prochains événements du secteur',importExportLabel:'IMPORT / EXPORT',
      apiTitle:'Catalogue des API et matières premières pharmaceutiques',search:'Rechercher par produit ou catégorie',allCategories:'Toutes les catégories',
      results:'entrées',empty:'Aucun produit correspondant.',apiNote:'Cette liste constitue une référence indicative d’approvisionnement ; elle ne confirme ni stock actuel, ni qualification du fournisseur, ni admissibilité réglementaire. Chaque demande doit être vérifiée.',
      downloads:'Télécharger les formulaires FCM/CMO',downloadLanguage:'Langue du document',html:'Formulaire HTML',rtf:'Formulaire RTF',
      send:'Préparer une demande par e-mail',mailNote:'Ce formulaire ouvre un brouillon adressé à info@niaznet.net dans votre application e-mail. Il ne transmet pas directement les données à un serveur.',
      whatsapp:'WhatsApp',useful:'Liens utiles',limited:'La page d’accueil est traduite ; les pages détaillées des services peuvent s’ouvrir en anglais lorsqu’une traduction n’est pas publiée.',
      faLimited:'Le contenu en persan est actuellement disponible uniquement pour la page À propos.',
      notFound:'Cette page ne figure pas dans l’inventaire actuel du site.',
      office:'Bureau de Téhéran',address:'Unité 603, 6e étage, Marjan Tower, North Mofatteh St., Téhéran, Iran',
      email:'E-mail',addressLabel:'Adresse de Téhéran',copyright:'NIAZ NET · Aperçu unifié · Branche isolée'
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
    if (lang === 'fa') return pageMap.has('/fa/') ? '/fa/' : '/fa/about.html';
    return '/';
  }
  function pageForLanguage(path, lang) {
    const bare = normalizePath(path).replace(/^\/(tr|fa|es|fr)(?=\/)/, '') || '/';
    let candidate = bare;
    if (lang === 'tr') candidate = bare === '/' ? '/tr/' : '/tr' + bare;
    if (lang === 'fa') { candidate = bare === '/' ? '/fa/' : '/fa' + bare; if (pageMap.has(candidate)) return candidate; return pageMap.has(bare) ? bare : langHome(lang); }
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
    if (/^mailto:/i.test(path)) return path;
    if (path.startsWith('#')) return linkTo(langHome(lang), path);
    if (lang === 'es' || lang === 'fr') {
      if (path === '/about.html') return linkTo(langHome(lang), '#about');
      if (path === '/projects.html') return linkTo(langHome(lang), '#projects');
    }
    return linkTo(pageForAction(path, lang));
  }
  function routeForService(slug, lang) {
    const en = '/' + slug + '.html';
    const localized = '/' + lang + '/' + slug + '.html';
    if ((lang === 'fa' || lang === 'tr') && pageMap.has(localized)) return localized;
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
    return h1 ? h1.text : (record.title || 'NIAZ NET');
  }
  function descriptionFor(record) {
    const p = (record.blocks || []).find(b => b.type === 'p');
    return p ? p.text : (record.description || '');
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
    const wrap = el('div', 'slideshow hero-showcase');
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', label + ' slideshow');
    const slides = [];
    const dots = el('div', 'slide-dots showcase-dots');
    dots.setAttribute('role', 'group');
    dots.setAttribute('aria-label', 'Slideshow navigation');
    list.forEach((src, index) => {
      const slide = el('div', 'slide showcase-image' + (index === 0 ? ' is-active active' : ''));
      slide.setAttribute('aria-hidden', String(index !== 0));
      const img = document.createElement('img');
      img.dataset.src = src;
      img.alt = label + ' — ' + (index + 1);
      img.decoding = 'async';
      slide.appendChild(img);
      wrap.appendChild(slide);
      slides.push(slide);
      const dot = el('button', 'slide-dot showcase-dot');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Show slide ' + (index + 1));
      dot.setAttribute('aria-current', String(index === 0));
      dot.addEventListener('click', () => { show(index); restart(); });
      dots.appendChild(dot);
    });
    wrap.appendChild(dots);
    let active = 0, timer = null, startX = null;
    const dotButtons = [...dots.querySelectorAll('button')];
    function loadSlide(i, priority) {
      const img = slides[i].querySelector('img');
      if (!img || img.hasAttribute('src')) return;
      const src = img.dataset.src;
      delete img.dataset.src;
      img.loading = 'eager';
      img.fetchPriority = priority ? 'high' : 'low';
      img.src = src;
    }
    function show(i) {
      active = (i + slides.length) % slides.length;
      loadSlide(active, true);
      if (slides.length > 1) loadSlide((active + 1) % slides.length, false);
      slides.forEach((s, n) => {
        s.classList.toggle('is-active', n === active);
        s.classList.toggle('active', n === active);
        s.setAttribute('aria-hidden', String(n !== active));
      });
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
    const inner = el('div', 'container nav header-inner');
    const brand = el('a', 'brand');
    brand.href = linkTo(langHome(lang));
    const logo = document.createElement('img');
    logo.className = 'brand-logo';
    logo.src = '/images/niaz-net-logo.png';
    logo.alt = 'NIAZ NET Tehran';
    logo.onerror = () => {
      logo.hidden = true;
      brand.appendChild(el('span', 'brand-fallback-text', 'NIAZ NET TEHRAN'));
    };
    brand.appendChild(logo);
    inner.appendChild(brand);

    const toggle = el('button', 'mobile-toggle nav-toggle', '☰');
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    const nav = el('nav', 'nav-links main-nav');
    nav.id = 'main-nav';
    const items = [
      [t.home, langHome(lang)],
      [t.about, '/about.html'],
      [t.navServices, '#services'],
      [t.partners, '#partners'],
      [t.projects, '/projects.html'],
      [t.news, '#news'],
      [t.contact, '/contact.html'],
      [t.getInTouch, 'mailto:info@niaznet.net?subject=Business%20Inquiry']
    ];
    items.forEach(([label, path]) => {
      const a = el('a', path.startsWith('mailto:') ? 'nav-cta' : '', label);
      a.href = navigationHref(path, lang);
      const sectionAnchor = path.startsWith('#') ||
        ((lang === 'es' || lang === 'fr') && (path === '/about.html' || path === '/projects.html'));
      if (!sectionAnchor && !path.startsWith('mailto:') && normalizePath(path) === currentPath) {
        a.setAttribute('aria-current', 'page');
      }
      nav.appendChild(a);
    });

    const select = el('select', 'language-select lang');
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
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      toggle.textContent = open ? '×' : '☰';
    });
    inner.append(toggle, nav, select);
    header.appendChild(inner);
    return header;
  }
  function renderHero(record, path, lang) {
    const t = COPY[lang] || COPY.en;
    const hero = el('section', 'hero');
    const grid = el('div', 'container hero-inner hero-grid');
    const copy = el('div', 'hero-copy');
    copy.appendChild(el('div', 'eyebrow', t.tagline));
    const heading = el('h1');
    const title = titleFor(record);
    if (lang === 'en' && title.endsWith(' Partner')) {
      heading.append(document.createTextNode(title.slice(0, -7)));
      heading.appendChild(el('span', '', 'Partner'));
    } else {
      heading.textContent = title;
    }
    copy.appendChild(heading);
    copy.appendChild(el('p', 'hero-description', descriptionFor(record)));
    const actions = el('div', 'hero-actions');
    const contact = el('a', 'btn btn-outline', t.contactCta);
    contact.href = linkTo(pageForAction('/contact.html', lang));
    const partner = el('a', 'btn partner-hero-btn', t.partnerCta);
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
  function renderDataTable(dataTable, lang) {
    const wrap = el('div', 'table-wrap');
    const table = el('table', 'api-table product-price-table');
    if (dataTable.caption) table.appendChild(el('caption', '', dataTable.caption));
    const headers = dataTable.headers[lang] || dataTable.headers.en;
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(label => headerRow.appendChild(el('th', '', label)));
    thead.appendChild(headerRow);
    const tbody = document.createElement('tbody');
    const rows = dataTable.rowsByLang && dataTable.rowsByLang[lang] ? dataTable.rowsByLang[lang] : (dataTable.rows || []);
    rows.forEach(values => {
      const row = document.createElement('tr');
      values.forEach(value => row.appendChild(el('td', '', value)));
      tbody.appendChild(row);
    });
    table.append(thead, tbody);
    wrap.appendChild(table);
    return wrap;
  }

  function renderBlocks(record, lang) {
    const section = el('section', 'section white');
    const container = el('div', 'container');
    const panel = el('div', 'content-panel');
    const blocks = Array.isArray(record.blocks) ? record.blocks : [];
    let skippedH1 = false, skippedP = false, list = [];
    const renderedTableIndexes = new Set();
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
      else if (block.type === 'table' && record.tables && record.tables[block.index] &&
          !renderedTableIndexes.has(block.index)) {
        renderedTableIndexes.add(block.index);
        panel.appendChild(renderDataTable(record.tables[block.index], lang));
      }
    });
    flushList();
    container.appendChild(panel);
    section.appendChild(container);
    return section;
  }
  function createServiceImage(service) {
    const image = document.createElement('img');
    image.src = '/images/service-icons/' + service.icon;
    image.alt = '';
    image.loading = 'lazy';
    image.decoding = 'async';
    return image;
  }

  function renderServiceGrid(lang) {
    const t = COPY[lang] || COPY.en;
    const section = el('section', 'container service-section');
    section.id = 'services';
    section.setAttribute('aria-label', t.services);
    const layout = el('div', 'services-layout');
    const grid = el('div', 'services-grid');
    const primary = services.filter(service => !service.vip);
    const displayOrder = [
      'import-export','brand-registration','api-supply','sports-nutrition','infant-formula',
      'cbd-products','business-development','pharmaceutical-products','nutraceuticals',
      'pet-food','medical-devices','technology-transfer','private-label','contract-manufacturing',
      'cosmoderma','regulatory-affairs','licensing-partnerships','supply-chain-solutions'
    ];
    const ordered = displayOrder
      .map(slug => primary.find(service => service.slug === slug))
      .filter(Boolean);
    primary.forEach(service => {
      if (!displayOrder.includes(service.slug)) ordered.push(service);
    });

    ordered.forEach(service => {
      const isLead = service.slug === 'import-export';
      const card = el('a', 'service-card' + (isLead ? ' import-export-card' : ''));
      card.href = linkTo(routeForService(service.slug, lang));
      const icon = el('span', 'service-icon');
      icon.appendChild(createServiceImage(service));
      card.append(icon, el('h3', '', isLead ? t.importExportLabel : textFor(service, lang)));
      grid.appendChild(card);
    });
    layout.appendChild(grid);

    const vip = services.filter(service => service.vip);
    if (vip.length) {
      const panel = el('aside', 'vip-services');
      panel.id = 'vip-services';
      panel.appendChild(el('h2', '', '♛ ' + t.vipTitle));
      const list = el('div', 'vip-service-list');
      vip.forEach(service => {
        const link = el('a', 'vip-service-link');
        link.href = linkTo(routeForService(service.slug, lang));
        link.append(createServiceImage(service), el('span', 'vip-label', textFor(service, lang)));
        list.appendChild(link);
      });
      panel.appendChild(list);
      const arrow = el('a', 'vip-arrow', '→');
      arrow.href = linkTo(langHome(lang), '#contact');
      arrow.setAttribute('aria-label', t.contactCta);
      panel.appendChild(arrow);
      layout.appendChild(panel);
    }
    section.appendChild(layout);
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
    const featureGroup = groups.find(g => /why choose|neden|por qué|pourquoi|چرا/.test(g.title.toLocaleLowerCase()));
    const networkGroup = groups.find(g => /network|ağımız|red global|réseau|شبکه/.test(g.title.toLocaleLowerCase()));
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
      else if (/project|proje|proyectos|projets|پروژه/.test(normalized)) { kind = 'projects'; id = 'projects'; }
      else if (/news|haber|noticias|actualités|actualites|اخبار/.test(normalized)) { kind = 'news'; id = 'news'; }
      else if (/success|başarı|basari|éxito|exito|réussite|reussite|موفقیت/.test(normalized)) { kind = 'cta'; id = 'contact'; }
      else if (/office|ofis|oficina|bureaux|دفتر|دفاتر/.test(normalized)) { kind = 'offices'; id = 'offices'; }
      else if (/partner|ortak|socios|partenaires|شرکای|همکار/.test(normalized)) { kind = 'partners'; id = 'partners'; }
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
        placeholder.appendChild(el('strong', '', (COPY[lang] || COPY.en).newsHeadline));
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
    section.id = 'api-catalogue';
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
    tools.addEventListener('input', updateApiResults);
    tools.addEventListener('change', updateApiResults);
    function updateApiResults() {
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
    updateApiResults();
    container.appendChild(panel);
    section.appendChild(container);
    return section;
  }
  function renderDownloads(lang, record) {
    const t = COPY[lang] || COPY.en;
    const labels = {
      solid:{en:'Solid dosage forms',fa:'اشکال دارویی جامد',tr:'Katı dozaj formları',es:'Formas farmacéuticas sólidas',fr:'Formes pharmaceutiques solides'},
      nonsterile:{en:'Non-sterile liquids',fa:'مایعات غیراستریل',tr:'Steril olmayan sıvılar',es:'Líquidos no estériles',fr:'Liquides non stériles'},
      sterile:{en:'Sterile liquids (injectables)',fa:'مایعات استریل (تزریقی)',tr:'Steril sıvılar (enjeksiyon)',es:'Líquidos estériles (inyectables)',fr:'Liquides stériles (injectables)'}
    };
    const descriptions = {
      solid:{
        en:'Tablets and capsules, manufacturing process, equipment, packaging and testing requirements.',
        tr:'Tablet ve kapsüller; üretim süreci, ekipman, ambalaj ve test gereklilikleri.',
        fa:'قرص و کپسول، فرایند تولید، تجهیزات، بسته‌بندی و الزامات آزمون.',
        es:'Tabletas y cápsulas, proceso de fabricación, equipos, envase y requisitos de ensayo.',
        fr:'Comprimés et gélules, procédé de fabrication, équipements, conditionnement et exigences d’essai.'
      },
      nonsterile:{
        en:'Solutions, syrups and drops, raw materials, storage, container and packaging specifications.',
        tr:'Solüsyonlar, şuruplar ve damlalar; hammaddeler, depolama, kap ve ambalaj özellikleri.',
        fa:'محلول‌ها، شربت‌ها و قطره‌ها، مواد اولیه، شرایط نگهداری، ظرف و مشخصات بسته‌بندی.',
        es:'Soluciones, jarabes y gotas, materias primas, almacenamiento, envase y especificaciones de embalaje.',
        fr:'Solutions, sirops et gouttes, matières premières, stockage, contenants et spécifications d’emballage.'
      },
      sterile:{
        en:'Aseptic or terminal sterilization, ampoules and vials, storage, packaging and testing.',
        tr:'Aseptik veya terminal sterilizasyon, ampul ve flakon, depolama, ambalaj ve test.',
        fa:'استریلیزاسیون آسپتیک یا نهایی، آمپول و ویال، نگهداری، بسته‌بندی و آزمون.',
        es:'Esterilización aséptica o terminal, ampollas y viales, almacenamiento, envase y pruebas.',
        fr:'Stérilisation aseptique ou terminale, ampoules et flacons, stockage, conditionnement et essais.'
      }
    };
    const section = el('section', 'section white');
    section.id = 'fcm-downloads';
    const container = el('div', 'container');
    const panel = el('div', 'content-panel');
    panel.appendChild(el('h2', '', t.downloads));
    if (record && record.downloadsIntro) panel.appendChild(el('p', '', record.downloadsIntro));
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
    function updateDownloads() {
      grid.replaceChildren();
      Object.entries(labels).forEach(([type,names]) => {
        const card = el('article', 'download-card');
        card.id = 'download-' + type;
        card.appendChild(el('h3', '', names[select.value] || names.en));
        card.appendChild(el('p', '', descriptions[type][select.value] || descriptions[type].en));
        const actions = el('div', 'download-actions');
        const html = el('a', '', t.html); html.href = '/downloads/fcm-cmo/' + type + '-' + select.value + '.html';
        const rtf = el('a', '', t.rtf); rtf.href = '/downloads/fcm-cmo/' + type + '-' + select.value + '.rtf';
        actions.append(html, rtf);
        card.appendChild(actions);
        grid.appendChild(card);
      });
    }
    select.addEventListener('change', updateDownloads);
    updateDownloads();
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
    const defaultTitle = lang === 'fa' ? 'ارسال درخواست' : lang === 'tr' ? 'Talep gönderin' : lang === 'es' ? 'Enviar una consulta' : lang === 'fr' ? 'Envoyer une demande' : 'Send an Enquiry';
    panel.appendChild(el('h2', '', record.formTitle || defaultTitle));
    if (record.formIntro) panel.appendChild(el('p', '', record.formIntro));
    const form = document.createElement('form');
    form.className = 'form-grid';
    source.fields.forEach((field, index) => {
      const wrapper = el('div', 'form-field' + (field.tag === 'textarea' ? ' full' : ''));
      const labelText = field.label || field.name || 'Field';
      const label = el('label', '', labelText);
      const id = 'field-' + index;
      label.htmlFor = id;
      let control;
      if (field.tag === 'textarea') control = document.createElement('textarea');
      else if (field.tag === 'select') {
        control = document.createElement('select');
        if (Array.isArray(field.options) && field.options.length) {
          field.options.forEach(option => { const o = el('option', '', option.label); o.value = option.value; control.appendChild(o); });
        } else {
          const option = el('option', '', labelText);
          option.value = '';
          control.appendChild(option);
        }
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
        if (href === '/fa/index.html') href = '/fa/';
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

    const brand = el('div', 'footer-brand');
    const logo = document.createElement('img');
    logo.src = '/images/niaz-net-logo.png';
    logo.alt = 'NIAZ NET Tehran';
    logo.loading = 'lazy';
    brand.append(logo, el('p', '', t.copyright));

    const quick = el('div', 'footer-col');
    quick.appendChild(el('h3', '', t.quickLinks));
    [
      [t.about, '/about.html'],
      [t.navServices, '#services'],
      [t.partners, '#partners'],
      [t.projects, '/projects.html'],
      [t.news, '#news']
    ].forEach(([label, path]) => {
      const link = el('a', '', label);
      link.href = navigationHref(path, lang);
      quick.appendChild(link);
    });

    const serviceColumn = el('div', 'footer-col');
    serviceColumn.appendChild(el('h3', '', t.services));
    services.filter(service => !service.vip).slice(0, 5).forEach(service => {
      const link = el('a', '', textFor(service, lang));
      link.href = linkTo(routeForService(service.slug, lang));
      serviceColumn.appendChild(link);
    });

    const contact = el('div', 'footer-col footer-contact');
    contact.appendChild(el('h3', '', 'Contact NIAZ NET'));
    contact.appendChild(el('p', '', t.address));
    const email = el('a', '', 'info@niaznet.net');
    email.href = 'mailto:info@niaznet.net';
    const phone = el('a', '', '+98 21 8832 2100 ext. 2');
    phone.href = 'tel:+982188322100';
    const whatsapp = el('a', '', '+90 534 014 3473');
    whatsapp.href = 'https://wa.me/905340143473';
    whatsapp.target = '_blank';
    whatsapp.rel = 'noopener noreferrer';
    const contactCta = el('a', 'footer-contact-link', t.contactCta);
    contactCta.href = linkTo(pageForAction('/contact.html', lang));
    contact.append(email, phone, whatsapp, contactCta);

    grid.append(brand, quick, serviceColumn, contact);
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
    if (record.redirectTo) {
      window.location.replace(linkTo(record.redirectTo, record.redirectHash || ''));
      return;
    }
    const lang = COPY[record.lang] ? record.lang : 'en';
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    updateMetadata(record);
    const home = path === '/' || path === '/tr/' || path === '/es/' || path === '/fr/' || path === '/fa/';
    app.replaceChildren();
    app.appendChild(renderHeader(lang, path));
    app.appendChild(renderHero(record, path, lang));
    if (home) {
      app.appendChild(renderServiceGrid(lang));
      renderHomeSections(record, lang).forEach(section => app.appendChild(section));
      const contactBand = app.querySelector('#contact');
      if (contactBand) {
        const showContactBand = ['#contact', '#niaz-contact-hub'].includes(window.location.hash.toLowerCase());
        contactBand.hidden = !showContactBand;
      }
      if (lang === 'es' || lang === 'fr') {
        const note = el('section', 'section');
        const box = el('div', 'container');
        box.appendChild(el('p', 'language-note', COPY[lang].limited));
        note.appendChild(box);
        app.appendChild(note);
      }
      if (lang === 'fa') {
        const note = el('section', 'section');
        const box = el('div', 'container');
        box.appendChild(el('p', 'language-note', COPY.fa.faLimited));
        note.appendChild(box);
        app.appendChild(note);
      }
    } else {
      if (path.endsWith('/api-supply.html') || path === '/api-supply.html') app.appendChild(renderApiCatalog(lang));
      app.appendChild(renderBlocks(record, lang));
    }
    if (path.endsWith('/contract-manufacturing.html')) app.appendChild(renderDownloads(lang, record));
    const form = renderForm(record, lang);
    if (form) app.appendChild(form);
    const links = renderUsefulLinks(record, lang);
    if (links && !home) app.appendChild(links);
    app.appendChild(renderFooter(lang));
    const wa = el('a', 'whatsapp whatsapp-float', COPY[lang].whatsapp);
    wa.setAttribute('aria-label', COPY[lang].whatsapp);
    const waSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    waSvg.setAttribute('viewBox', '0 0 24 24');
    waSvg.setAttribute('aria-hidden', 'true');
    const waPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    waPath.setAttribute('fill', 'currentColor');
    waPath.setAttribute('d', 'M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.45 0 .08 5.37.08 11.98c0 2.11.55 4.17 1.6 5.98L0 24l6.2-1.63a11.9 11.9 0 0 0 5.86 1.53h.01c6.6 0 11.98-5.37 11.98-11.98 0-3.2-1.25-6.2-3.53-8.44ZM12.06 21.87h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.68.97.98-3.59-.23-.37a9.88 9.88 0 0 1-1.52-5.31c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.03 7.01 2.9a9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.98 9.92Zm5.45-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.13-.27-.2-.57-.35Z');
    waSvg.appendChild(waPath);
    wa.appendChild(waSvg);
    wa.href = 'https://wa.me/905340143473';
    wa.target = '_blank';
    wa.rel = 'noopener noreferrer';
    app.appendChild(wa);
  }



  async function init() {
    try {
      const apiPage = requestedPath === '/api-supply.html' || requestedPath.endsWith('/api-supply.html');
      const [pageText, slideData, apiData, serviceData] = await Promise.all([
        fetch(DATA.pages).then(r => { if (!r.ok) throw new Error('page inventory ' + r.status); return r.text(); }),
        slideGroup(requestedPath)
          ? fetch(DATA.slides).then(r => { if (!r.ok) throw new Error('slideshow manifest ' + r.status); return r.json(); })
          : Promise.resolve(null),
        apiPage
          ? fetch(DATA.api).then(r => { if (!r.ok) throw new Error('API catalogue ' + r.status); return r.json(); })
          : Promise.resolve(null),
        fetch(DATA.services).then(r => { if (!r.ok) throw new Error('service catalogue ' + r.status); return r.json(); })
      ]);
      pages = pageText.trim().split(/\r?\n/).filter(Boolean).map(line => JSON.parse(line));
      pageMap = new Map(pages.map(page => [normalizePath(page.path), page]));
      const renderPath = pageMap.has(requestedPath) ? requestedPath : '/';
      manifest = slideData || {};
      if (!slideData && slideGroup(renderPath)) {
        manifest = await fetch(DATA.slides).then(r => {
          if (!r.ok) throw new Error('slideshow manifest ' + r.status);
          return r.json();
        });
      }
      apiItems = Array.isArray(apiData) ? apiData : [];
      services = Array.isArray(serviceData) ? serviceData : [];
      renderPage(renderPath);
    } catch (error) {
      app.replaceChildren(el('main', 'not-found', 'Unified preview could not load its source data: ' + error.message));
    }
  }

  init();
})();
