import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SITE = 'https://www.niaznet.net';
const inventoryFile = path.join(ROOT, 'data/live-page-inventory.jsonl');
const servicesFile = path.join(ROOT, 'data/rebuild-services.json');

const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));
const attr = escapeHtml;
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const records = fs.readFileSync(inventoryFile, 'utf8').split(/\r?\n/).filter(Boolean).map(line => JSON.parse(line));
const slideManifest = readJson(path.join(ROOT, 'images/slideshow-manifest.json'));
const services = readJson(servicesFile);
const byPath = new Map(records.map(record => [normalize(record.path), record]));
const languageNames = { en:'EN', fa:'FA', tr:'TR', es:'ES', fr:'FR' };
const navLabels = {
  en:['Home','About Us','Services','Partners','Projects','News','Contact','Get in Touch'],
  fa:['خانه','درباره ما','خدمات','شرکا','پروژه‌ها','اخبار','تماس','ارتباط با ما'],
  tr:['Ana Sayfa','Hakkımızda','Hizmetler','İş Ortakları','Projeler','Haberler','İletişim','Bize Ulaşın'],
  es:['Inicio','Nosotros','Servicios','Socios','Proyectos','Noticias','Contacto','Contáctenos'],
  fr:['Accueil','À propos','Services','Partenaires','Projets','Actualités','Contact','Nous contacter']
};
const labels = {
  en:{tagline:'Connecting markets worldwide',services:'Our Services',vip:'VIP SERVICES',importExportLabel:'IMPORT / EXPORT',contact:'Contact Our Team',partner:'Become Our Partner',useful:'Useful Links',marketPages:'Market Profiles',address:'Tehran Office',email:'Email',whatsapp:'WhatsApp'},
  fa:{tagline:'پیونددهنده بازارهای جهان',services:'خدمات ما',vip:'خدمات ویژه',importExportLabel:'واردات / صادرات',contact:'تماس با تیم ما',partner:'همکاری با ما',useful:'پیوندهای مفید',marketPages:'صفحات بازار',address:'دفتر تهران',email:'ایمیل',whatsapp:'واتساپ'},
  tr:{tagline:'Dünya pazarlarını birbirine bağlıyoruz',services:'Hizmetlerimiz',vip:'ÖZEL HİZMETLER',importExportLabel:'İTHALAT / İHRACAT',contact:'Ekibimizle İletişime Geçin',partner:'İş Ortağımız Olun',useful:'Faydalı Bağlantılar',marketPages:'Pazar Profilleri',address:'Tahran Ofisi',email:'E-posta',whatsapp:'WhatsApp'},
  es:{tagline:'Conectando mercados en todo el mundo',services:'Nuestros servicios',vip:'SERVICIOS VIP',importExportLabel:'IMPORTACIÓN / EXPORTACIÓN',contact:'Contactar con nuestro equipo',partner:'Conviértase en socio',useful:'Enlaces útiles',marketPages:'Perfiles de mercado',address:'Oficina de Teherán',email:'Correo',whatsapp:'WhatsApp'},
  fr:{tagline:'Connecter les marchés du monde entier',services:'Nos services',vip:'SERVICES VIP',importExportLabel:'IMPORT / EXPORT',contact:'Contacter notre équipe',partner:'Devenir partenaire',useful:'Liens utiles',marketPages:'Profils de marché',address:'Bureau de Téhéran',email:'E-mail',whatsapp:'WhatsApp'}
};
function normalize(value) {
  let result = String(value || '/').replace(/\/+/g, '/');
  if (!result.startsWith('/')) result = '/' + result;
  return result;
}
function languagePrefix(lang) { return lang === 'en' ? '/' : '/' + lang + '/'; }
function languageHome(lang) { return lang === 'en' ? '/' : '/' + lang + '/'; }
function localizedPath(lang, page) {
  const localized = (lang === 'en' ? '/' : '/' + lang + '/') + page;
  if (byPath.has(normalize(localized))) return localized;
  const english = '/' + page;
  return byPath.has(english) ? english : languageHome(lang);
}
function resolvePageLink(record, rawPath) {
  const prefix = record.path.startsWith('/tr/') ? '/tr/' : record.path.startsWith('/fa/') ? '/fa/' : record.path.startsWith('/es/') ? '/es/' : record.path.startsWith('/fr/') ? '/fr/' : '/';
  const candidate = rawPath.startsWith('/') ? normalize(rawPath) : normalize(prefix + rawPath.replace(/^\.\//, ''));
  if (byPath.has(candidate)) return candidate;
  const english = normalize('/' + rawPath.replace(/^\//, '').replace(/^\.\//, ''));
  return byPath.has(english) ? english : languageHome(record.lang || 'en');
}
function outputPath(urlPath) {
  const clean = normalize(urlPath);
  return path.join(ROOT, clean === '/' ? 'index.html' : clean.endsWith('/') ? clean.slice(1) + 'index.html' : clean.slice(1));
}
function firstBlock(record, type) {
  return (record.blocks || []).find(block => block.type === type)?.text || '';
}
function pageDescription(record, descriptionCounts) {
  const base = record.description || firstBlock(record, 'p') || record.title || 'NIAZ NET — International business development, strategic distribution, trade and partnerships.';
  return descriptionCounts.get(base) > 1 ? base + ' ' + (firstBlock(record, 'h1') || record.title) : base;
}
function canonicalFor(record, canonicalCounts) {
  if (record.redirectTo) return SITE + normalize(record.redirectTo);
  const canonical = record.canonical || SITE + normalize(record.path);
  return canonicalCounts.get(canonical) > 1 ? SITE + normalize(record.path) : canonical;
}
function renderHeader(record) {
  const lang = record.lang || 'en';
  const names = navLabels[lang] || navLabels.en;
  const prefix = languagePrefix(lang);
  const items = [
    [names[0], languageHome(lang)],
    [names[1], localizedPath(lang, 'about.html')],
    [names[2], languageHome(lang) + '#services'],
    [names[3], languageHome(lang) + '#partners'],
    [names[4], localizedPath(lang, 'projects.html')],
    [names[5], languageHome(lang) + '#news'],
    [names[6], localizedPath(lang, 'contact.html')],
    [names[7], 'mailto:info@niaznet.net?subject=Business%20Inquiry']
  ];
  return '<header class="site-header"><div class="container nav header-inner">' +
    '<a class="brand" href="' + attr(languageHome(lang)) + '"><img class="brand-logo" src="/images/niaz-net-logo.png" alt="NIAZ NET"></a>' +
    '<button class="mobile-toggle nav-toggle" type="button" aria-expanded="false" aria-label="Open navigation">☰</button>' +
    '<nav class="nav-links main-nav" id="main-nav">' + items.map(item =>
      '<a' + (item[1].startsWith('mailto:') ? ' class="nav-cta"' : '') + ' href="' + attr(item[1]) + '">' + escapeHtml(item[0]) + '</a>'
    ).join('') + '</nav>' +
    '<select class="language-select lang" aria-label="Language">' +
    Object.entries(languageNames).map(([code, name]) => '<option value="' + code + '"' + (code === lang ? ' selected' : '') + '>' + name + '</option>').join('') +
    '</select></div></header>';
}
function renderHero(record) {
  const heading = firstBlock(record, 'h1') || record.title;
  const description = firstBlock(record, 'p') || pageDescription(record);
  const lang = record.lang || 'en';
  const text = labels[lang] || labels.en;
  const sportSlides = normalize(record.path).endsWith('/sports-nutrition.html') ? (slideManifest.sport || []) : [];
  const showcase = sportSlides.length
    ? '<div class="slideshow hero-showcase" role="group" aria-label="' + attr(heading + ' slideshow') + '">' +
      sportSlides.map((src, index) => '<div class="slide showcase-image' + (index === 0 ? ' is-active active' : '') + '" aria-hidden="' + (index !== 0) + '">' +
        '<img src="' + attr(src) + '" alt="' + attr(heading + ' — ' + (index + 1)) + '" decoding="async"></div>').join('') +
      '<div class="slide-dots showcase-dots" role="group" aria-label="Slideshow navigation">' +
      sportSlides.map((src, index) => '<button class="slide-dot showcase-dot" type="button" aria-label="Show slide ' + (index + 1) + '" aria-current="' + (index === 0) + '"></button>').join('') +
      '</div></div>'
    : '';
  return '<section class="hero"><div class="container hero-inner hero-grid"><div class="hero-copy">' +
    '<div class="eyebrow">' + escapeHtml(text.tagline) + '</div><h1>' + escapeHtml(heading) + '</h1>' +
    '<p class="hero-description">' + escapeHtml(description) + '</p>' +
    '<div class="hero-actions"><a class="btn btn-outline" href="' + attr(localizedPath(lang, 'contact.html')) + '">' + escapeHtml(text.contact) + '</a>' +
    '<a class="btn partner-hero-btn" href="' + attr(localizedPath(lang, 'become-our-partner.html')) + '">' + escapeHtml(text.partner) + '</a></div>' +
    '</div>' + showcase + '</div></section>';
}
function renderAboutHero(record) {
  const lang = record.lang || 'en';
  const heading = firstBlock(record, 'h1') || record.title;
  const description = firstBlock(record, 'p') || pageDescription(record);
  const eyebrow = lang === 'fa' ? 'درباره نیاز نت' : lang === 'tr' ? 'NIAZ NET HAKKINDA' : 'ABOUT NIAZ NET';
  const slides = (slideManifest.about || []).filter(src => lang === 'fa' || !/(^|\/)(FA[^/]*|[^/]*FA_[^/]*)\.png$/i.test(src));
  const showcase = slides.length
    ? '<div class="slideshow hero-showcase about-hero-showcase" role="group" aria-label="' + attr(heading + ' slideshow') + '">' +
      slides.map((src, index) => '<div class="slide showcase-image' + (index === 0 ? ' is-active active' : '') + '" aria-hidden="' + (index !== 0) + '">' +
        '<img src="' + attr(src) + '" alt="' + attr(heading + ' — ' + (index + 1)) + '" decoding="async"></div>').join('') +
      '<div class="slide-dots showcase-dots" role="group" aria-label="Slideshow navigation">' +
      slides.map((src, index) => '<button class="slide-dot showcase-dot" type="button" aria-label="Show slide ' + (index + 1) + '" aria-current="' + (index === 0) + '"></button>').join('') +
      '</div></div>'
    : '';
  return '<section class="about-hero"><div class="container about-hero-inner"><div class="about-hero-copy">' +
    '<div class="eyebrow">' + escapeHtml(eyebrow) + '</div><h1>' + escapeHtml(heading) + '</h1>' +
    '<p>' + escapeHtml(description) + '</p></div>' + showcase + '</div></section>';
}

function renderServices(lang) {
  const text = labels[lang] || labels.en;
  const prefix = languagePrefix(lang);
  const primary = services.filter(service => !service.vip && service.showOnHomepage !== false);
  const vip = services.filter(service => service.vip && service.showOnHomepage !== false);
  const cards = primary.map(service => {
    const title = service.slug === 'import-export' ? text.importExportLabel : (service[lang] || service.en || service.slug);
    const href = prefix + service.slug + '.html';
    const target = byPath.has(normalize(href)) ? href : byPath.has('/' + service.slug + '.html') ? '/' + service.slug + '.html' : languageHome(lang);
    return '<a class="service-card' + (service.slug === 'import-export' ? ' import-export-card' : '') + '" href="' + attr(target) + '">' +
      '<span class="service-icon"><img src="/images/service-icons/' + attr(service.icon) + '" alt="" loading="lazy"></span><h3>' + escapeHtml(title) + '</h3></a>';
  }).join('');
  const vipCards = vip.map(service => { const target = byPath.has(normalize(prefix + service.slug + '.html')) ? prefix + service.slug + '.html' : byPath.has('/' + service.slug + '.html') ? '/' + service.slug + '.html' : languageHome(lang); return '<a class="vip-service-link" href="' + attr(target) + '">' +
    '<img src="/images/service-icons/' + attr(service.icon) + '" alt="" loading="lazy"><span class="vip-label">' +
    escapeHtml(service[lang] || service.en || service.slug) + '</span></a>'; }).join('');
  return '<section class="container service-section" id="services" aria-label="' + attr(text.services) + '">' +
    '<div class="services-layout"><div class="services-grid">' + cards + '</div>' +
    (vipCards ? '<aside class="vip-services" id="vip-services"><h2>' + escapeHtml(text.vip) + '</h2><div class="vip-service-list">' + vipCards + '</div></aside>' : '') +
    '</div></section>';
}
function renderApiCatalogStatic(lang) {
  const headings = {
    en:['API & Pharmaceutical Raw Materials Catalogue','Product / Material','Category'],
    fa:['فهرست مواد اولیه دارویی و مواد مؤثره','محصول / ماده','دسته‌بندی'],
    tr:['API ve Farmasötik Hammaddeler Kataloğu','Ürün / Hammadde','Kategori'],
    es:['Catálogo de API y materias primas farmacéuticas','Producto / Material','Categoría'],
    fr:['Catalogue des API et matières premières pharmaceutiques','Produit / Matière','Catégorie']
  };
  const labels = headings[lang] || headings.en;
  const items = readJson(path.join(ROOT, 'api-catalog.json'));
  return '<section class="section white" id="api-catalogue"><div class="container"><div class="content-panel"><h2>' + escapeHtml(labels[0]) + '</h2>' +
    '<div class="table-wrap"><table class="api-table"><thead><tr><th>' + escapeHtml(labels[1]) + '</th><th>' + escapeHtml(labels[2]) + '</th></tr></thead><tbody>' +
    items.map(item => '<tr><td>' + escapeHtml(item.name) + '</td><td>' + escapeHtml(item.category) + '</td></tr>').join('') +
    '</tbody></table></div></div></div></section>';
}
function renderDownloadsStatic(record) {
  if (!normalize(record.path).endsWith('/contract-manufacturing.html')) return '';
  const lang = record.lang || 'en';
  const titles = {
    en:['Solid dosage forms','Non-sterile liquids','Sterile liquids (injectables)'],
    fa:['اشکال دارویی جامد','مایعات غیراستریل','مایعات استریل (تزریقی)'],
    tr:['Katı dozaj formları','Steril olmayan sıvılar','Steril sıvılar (enjeksiyon)'],
    es:['Formas farmacéuticas sólidas','Líquidos no estériles','Líquidos estériles (inyectables)'],
    fr:['Formes pharmaceutiques solides','Liquides non stériles','Liquides stériles (injectables)']
  };
  const names = titles[lang] || titles.en;
  const downloadHeading = {en:'Download FCM/CMO enquiry forms',fa:'دریافت فرم‌های درخواست FCM/CMO',tr:'FCM/CMO talep formlarını indirin',es:'Descargar formularios de consulta FCM/CMO',fr:'Télécharger les formulaires FCM/CMO'}[lang] || 'Download FCM/CMO enquiry forms';
  const types = ['solid','nonsterile','sterile'];
  return '<section class="section white" id="fcm-downloads"><div class="container"><div class="content-panel"><h2>' + escapeHtml(downloadHeading) + '</h2><div class="download-grid">' +
    types.map((type,index) => '<article class="download-card"><h3>' + escapeHtml(names[index]) + '</h3><div class="download-actions">' +
      '<a href="/downloads/fcm-cmo/' + type + '-' + attr(lang) + '.html">HTML form</a>' +
      '<a href="/downloads/fcm-cmo/' + type + '-' + attr(lang) + '.rtf">RTF form</a>' +
      '</div></article>').join('') + '</div></div></div></section>';
}
function twentyKgBagPrice(price) {
  const amount = Number(String(price || '').replace(/[^0-9.]/g, ''));
  return Number.isFinite(amount) && amount > 0 ? '€' + (amount * 20).toFixed(2) : '';
}
function renderTable(table, lang, sportsPage = false) {
  const headers = table.headers?.[lang] || table.headers?.en || [];
  const rows = table.rowsByLang?.[lang] || table.rows || [];
  const caption = table.captionByLang?.[lang] || table.caption || '';
  const displayRows = sportsPage ? rows.map(row => [...row, twentyKgBagPrice(row[2])]) : rows;
  const wrapperClass = sportsPage ? 'bulk-whey-table-wrap' : 'table-wrap';
  const tableClass = sportsPage ? 'bulk-whey-table product-price-table' : 'api-table product-price-table';
  return '<div class="' + wrapperClass + '"><table class="' + tableClass + '">' +
    (caption ? '<caption>' + escapeHtml(caption) + '</caption>' : '') +
    '<thead><tr>' + headers.map(value => '<th scope="col">' + escapeHtml(value) + '</th>').join('') + '</tr></thead>' +
    '<tbody>' + displayRows.map(row => '<tr>' + row.map((value, index) => '<td' + (sportsPage && index === 2 ? ' class="bulk-whey-price"' : '') + '>' + escapeHtml(value) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
}
const sportsPageCopy = {
  en:{brandTitle:'Sports Brand Experience & Portfolio',brandIntro:'Four spaces are reserved for selected sports brands and brand-partnership experience. Logos will be added after the preferred brands are confirmed.',brandLabel:'SPORTS BRAND LOGO ',pending:'To be added'},
  tr:{brandTitle:'Spor Markası Deneyimi ve Portföyü',brandIntro:'Seçili spor markaları ve marka ortaklığı deneyimi için dört alan ayrılmıştır. Tercih edilen markalar onaylandığında logolar eklenecektir.',brandLabel:'SPOR MARKASI LOGOSU ',pending:'Eklenecek'},
  fa:{brandTitle:'تجربه و سبد برندهای ورزشی',brandIntro:'چهار جایگاه برای برندهای ورزشی منتخب و سوابق همکاری با برندها در نظر گرفته شده است. نشان‌ها پس از تأیید برندهای موردنظر اضافه می‌شوند.',brandLabel:'نشان برند ورزشی ',pending:'در انتظار افزودن'}
};
function renderSportsPricing(record, lang, titleIndex, tableIndex) {
  const title = record.blocks[titleIndex]?.text || '';
  const paragraphs = record.blocks.slice(titleIndex + 1, tableIndex).filter(block => block.type === 'p').map(block => block.text);
  const tableBlock = record.blocks[tableIndex];
  return '<section class="container service-content bulk-whey-section" aria-labelledby="bulk-whey-title"><div class="bulk-whey-panel">' +
    '<h2 id="bulk-whey-title">' + escapeHtml(title) + '</h2>' +
    (paragraphs[0] ? '<p class="bulk-whey-intro">' + escapeHtml(paragraphs[0]) + '</p>' : '') +
    renderTable(record.tables[tableBlock.index], lang, true) +
    (paragraphs[1] ? '<p class="bulk-whey-note">' + escapeHtml(paragraphs[1]) + '</p>' : '') +
    '</div></section>';
}
function renderSportsBrandSection(lang) {
  const copy = sportsPageCopy[lang] || sportsPageCopy.en;
  return '<section class="container service-content niaz-brand-network"><div class="panel"><h2>' + escapeHtml(copy.brandTitle) + '</h2>' +
    '<p>' + escapeHtml(copy.brandIntro) + '</p><div class="sports-brand-grid" aria-label="' + attr(copy.brandTitle) + '">' +
    [1,2,3,4].map(number => '<div class="sports-brand-placeholder"><span>' + escapeHtml(copy.brandLabel + String(number).padStart(2, '0')) + '<br>' + escapeHtml(copy.pending) + '</span></div>').join('') +
    '</div></div></section>';
}
function getAboutGroups(record) {
  const blocks = record.blocks || [];
  const headings = [];
  blocks.forEach((block, index) => { if (block.type === 'h2') headings.push(index); });
  return headings.map((start, index) => ({
    title: blocks[start].text,
    blocks: blocks.slice(start + 1, headings[index + 1] ?? blocks.length)
  }));
}
function getAboutItems(group) {
  const items = [];
  let current = null;
  (group?.blocks || []).forEach(block => {
    if (block.type === 'h3') {
      current = { title: block.text, paragraphs: [] };
      items.push(current);
    } else if (block.type === 'p' && current) current.paragraphs.push(block.text);
  });
  return items;
}
function renderAboutNetwork(layout) {
  const points = layout.network?.locations || [];
  const paths = ['M440 119 Q470 103 537 122','M470 103 Q505 108 537 122','M537 122 Q560 130 582 138','M537 122 Q586 140 645 162','M582 138 Q610 148 645 162'];
  const routes = paths.map(d => '<path d="' + d + '" fill="none" stroke="#c99a43" stroke-width="3" stroke-linecap="round" opacity=".9"></path>').join('');
  const marks = points.map(([name,x,y]) => '<circle cx="' + x + '" cy="' + y + '" r="8" fill="#071b38" stroke="#fff" stroke-width="4"></circle>' +
    '<text x="' + (x === 440 ? x - 38 : x + 10) + '" y="' + (name.toLowerCase().includes('switzerland') || name === 'سوئیس' || name === 'İsviçre' ? y - 12 : y + 8) +
    '" fill="#071b38" font-family="Arial,sans-serif" font-size="18" font-weight="700">' + escapeHtml(name) + '</text>').join('');
  return '<div class="network-map network-map-modern" role="img" aria-label="' + attr(points.map(point => point[0]).join(', ')) + '">' +
    '<div class="real-world-map" aria-hidden="true"></div><svg class="network-routes" viewBox="0 0 900 430" role="presentation">' +
    '<g fill="none">' + routes + '</g><g>' + marks + '</g></svg><div class="network-caption">' + escapeHtml(layout.network?.caption || '') + '</div></div>';
}
function renderAboutPage(record) {
  const lang = record.lang || 'en';
  const layout = record.aboutLayout || {};
  const groups = getAboutGroups(record);
  const sectionHead = group => '<div class="about-section-head"><h2>' + escapeHtml(group?.title || '') + '</h2>' +
    ((group?.blocks || []).find(block => block.type === 'p') ? '<p>' + escapeHtml(group.blocks.find(block => block.type === 'p').text) + '</p>' : '') + '</div>';
  const itemsMarkup = (group, cardClass, numbered = false) => '<div class="' + cardClass + '">' +
    getAboutItems(group).map((item, index) => '<article class="' + (cardClass === 'about-process' ? 'about-process-item' : 'about-path-card') + '">' +
      (numbered ? '<strong>' + String(index + 1).padStart(2, '0') + '</strong>' : '<div class="about-path-body"><span class="about-path-kicker">' + String(index + 1).padStart(2, '0') + ' / NIAZ NET</span>') +
      '<h3>' + escapeHtml(item.title) + '</h3>' + item.paragraphs.map(paragraph => '<p>' + escapeHtml(paragraph) + '</p>').join('') +
      (numbered ? '</article>' : '</div></article>')).join('') + '</div>';
  const portfolio = (group, items) => '<section class="about-section"><div class="container">' + sectionHead(group) +
    '<div class="about-portfolio">' + (items || []).map(item => '<div class="about-portfolio-item">' + escapeHtml(item) + '</div>').join('') + '</div></div></section>';
  const markets = ['kenya-market.html','south-africa-market.html','international-markets.html'].map(slug => {
    const targetPath = localizedPath(lang, slug);
    const target = byPath.get(normalize(targetPath)) || byPath.get('/' + slug);
    if (!target) return '';
    const marketLink = (record.links || []).find(item => (item.href || '').includes(slug));
    return '<a class="about-market-card" href="' + attr(targetPath) + '">' +
      '<span class="about-market-kicker">' + escapeHtml(lang === 'fa' ? 'بازار هدف' : lang === 'tr' ? 'HEDEF PAZAR' : 'MARKET PROFILE') + '</span>' +
      '<h3>' + escapeHtml(marketLink?.text || firstBlock(target, 'h1') || target.title) + '</h3><p>' + escapeHtml(firstBlock(target, 'p') || target.description || '') + '</p>' +
      '<span class="about-market-arrow" aria-hidden="true">→</span></a>';
  }).join('');
  const ctaLinks = (record.links || []).filter(item => /become-our-partner|contact\.html/.test(item.href || '')).map(item => {
    const href = /contact\.html/.test(item.href || '') ? localizedPath(lang, 'contact.html') : localizedPath(lang, 'become-our-partner.html');
    return '<a class="btn' + (/contact\.html/.test(item.href || '') ? ' btn-outline' : '') + '" href="' + attr(href) + '">' + escapeHtml(item.text || item.href) + '</a>';
  }).join('');
  const facts = (layout.facts || []).map(([value,label]) => '<article><strong>' + escapeHtml(value) + '</strong><span>' + escapeHtml(label) + '</span></article>').join('');
  const regions = (layout.regions || []).map(region => '<span>' + escapeHtml(region) + '</span>').join('');
  const reasons = getAboutItems(groups[0]).map((item,index) => '<article class="about-reason"><span class="about-reason-icon">' +
    ['◎','♧','♧','▤','♙','◎','▱','♧'][index] + '</span><div><h3>' + escapeHtml(item.title) + '</h3>' +
    item.paragraphs.map(paragraph => '<p>' + escapeHtml(paragraph) + '</p>').join('') + '</div></article>').join('');
  const mvv = [groups[9],groups[10],groups[11]].map(group => '<article class="panel"><h2>' + escapeHtml(group?.title || '') + '</h2>' +
    '<p>' + escapeHtml((group?.blocks || []).find(block => block.type === 'p')?.text || '') + '</p></article>').join('');
  const cta = groups[12];
  return '<main class="about-page-content"><section class="about-section"><div class="container"><div class="about-facts">' + facts + '</div></div></section>' +
    '<section class="container about-feature-network"><div class="about-feature-panel"><h2>' + escapeHtml(groups[0]?.title || '') + '</h2><div class="about-reasons">' + reasons + '</div></div>' +
    '<div class="about-feature-panel"><h2>' + escapeHtml(groups[1]?.title || '') + '</h2>' + renderAboutNetwork(layout) + '</div></section>' +
    '<section class="about-section white"><div class="container">' + sectionHead(groups[2]) + '<div class="about-market-cards">' + markets + '</div>' +
    '<div class="about-market-grid">' + regions + '</div></div></section>' +
    '<section class="about-section"><div class="container"><div class="about-value-chain">' + sectionHead(groups[3]) + '</div></div></section>' +
    '<section class="about-section white"><div class="container">' + sectionHead(groups[4]) + itemsMarkup(groups[4], 'about-pathways') + '</div></section>' +
    portfolio(groups[5], layout.industries) + portfolio(groups[6], layout.additionalIndustries) +
    '<section class="about-section white"><div class="container">' + sectionHead(groups[7]) + itemsMarkup(groups[7], 'about-process', true) + '</div></section>' +
    '<section class="about-section"><div class="container">' + sectionHead(groups[8]) + '<div class="about-mvv">' + mvv + '</div></div></section>' +
    '<section class="about-cta"><div class="container about-cta-inner"><div><h2>' + escapeHtml(cta?.title || '') + '</h2>' +
    '<p>' + escapeHtml((cta?.blocks || []).find(block => block.type === 'p')?.text || '') + '</p></div><div class="page-actions">' + ctaLinks + '</div></div></section></main>';
}

function renderBlocks(record) {
  const lang = record.lang || 'en';
  const blocks = record.blocks || [];
  const isSportsPage = normalize(record.path).endsWith('/sports-nutrition.html');
  const tableIndex = isSportsPage ? blocks.findIndex(block => block.type === 'table' && record.tables?.[block.index]) : -1;
  let pricingTitleIndex = -1;
  if (tableIndex > 0) for (let i = 0; i < tableIndex; i++) if (blocks[i].type === 'h2') pricingTitleIndex = i;
  let brandTitleIndex = -1;
  if (isSportsPage && tableIndex >= 0) for (let i = tableIndex + 1; i < blocks.length; i++) if (blocks[i].type === 'h2') brandTitleIndex = i;
  let skippedH1 = false, skippedP = false, list = [], body = '';
  const flush = () => {
    if (list.length) { body += '<ul>' + list.map(value => '<li>' + escapeHtml(value) + '</li>').join('') + '</ul>'; list = []; }
  };
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.type === 'h1' && !skippedH1) { skippedH1 = true; continue; }
    if (block.type === 'p' && !skippedP) { skippedP = true; continue; }
    if (isSportsPage && pricingTitleIndex >= 0 && i >= pricingTitleIndex && i <= tableIndex) continue;
    if (isSportsPage && brandTitleIndex >= 0 && i >= brandTitleIndex && i <= brandTitleIndex + 1) continue;
    if (block.type === 'li') { list.push(block.text); continue; }
    flush();
    if (block.type === 'h2') body += '<h2>' + escapeHtml(block.text) + '</h2>';
    else if (block.type === 'h3') body += '<h3>' + escapeHtml(block.text) + '</h3>';
    else if (block.type === 'p') body += '<p>' + escapeHtml(block.text) + '</p>';
    else if (block.type === 'blockquote') body += '<blockquote>' + escapeHtml(block.text) + '</blockquote>';
    else if (block.type === 'table' && record.tables?.[block.index]) body += renderTable(record.tables[block.index], lang);
  }
  flush();
  if (record.partners?.length) body += '<h2>' + escapeHtml((labels[lang] || labels.en).partners || 'Global Partners') + '</h2><div class="partner-strip">' +
    record.partners.map(partner => '<div class="partner">' + (partner.mark ? '<span class="' + attr(partner.tone || '') + '">' + escapeHtml(partner.mark) + '</span> ' : '') + escapeHtml(partner.name) + '</div>').join('') + '</div>';
  if (record.network?.locations?.length) body += '<h3>' + escapeHtml(record.network.locations.map(point => point.name).join(' · ')) + '</h3>' + (record.network.caption ? '<p>' + escapeHtml(record.network.caption) + '</p>' : '');
  if (record.projectImages?.length) body += '<div class="project-image-list">' + record.projectImages.map(src => '<img src="' + attr(src) + '" alt="" loading="lazy">').join('') + '</div>';
  const pricing = isSportsPage && pricingTitleIndex >= 0 && tableIndex >= 0 ? renderSportsPricing(record, lang, pricingTitleIndex, tableIndex) : '';
  const brand = isSportsPage ? renderSportsBrandSection(lang) : '';
  return '<section class="section white"><div class="container">' + pricing + '<div class="content-panel">' + body + '</div>' + brand + '</div></section>';
}
function renderForm(record) {
  const form = record.forms?.[0];
  if (!form?.fields?.length) return '';
  const fields = form.fields.map((field, index) => {
    const label = field.label || field.name || 'Field';
    const id = 'field-' + index;
    let input;
    if (field.tag === 'textarea') input = '<textarea class="field" id="' + id + '" name="' + attr(field.name || label) + '"' + (field.required ? ' required' : '') + '></textarea>';
    else if (field.tag === 'select') input = '<select class="field" id="' + id + '" name="' + attr(field.name || label) + '"' + (field.required ? ' required' : '') + '>' +
      (field.options || []).map(option => '<option value="' + attr(option.value) + '">' + escapeHtml(option.label) + '</option>').join('') + '</select>';
    else input = '<input class="field" id="' + id + '" type="' + (field.type === 'email' ? 'email' : 'text') + '" name="' + attr(field.name || label) + '"' + (field.required ? ' required' : '') + '>';
    return '<div class="form-field' + (field.tag === 'textarea' ? ' full' : '') + '"><label for="' + id + '">' + escapeHtml(label) + '</label>' + input + '</div>';
  }).join('');
  return '<section class="section white"><div class="container"><div class="content-panel"><h2>' +
    escapeHtml(record.formTitle || 'Send an Enquiry') + '</h2>' + (record.formIntro ? '<p>' + escapeHtml(record.formIntro) + '</p>' : '') +
    '<form class="form-grid" action="mailto:info@niaznet.net" method="get">' + fields +
    '<div class="form-field full"><button class="btn" type="submit">Send an Enquiry</button></div></form></div></div></section>';
}
function renderLinks(record) {
  const links = (record.links || []).filter(item => item.href && (item.href.startsWith('/') || item.href.startsWith('#') || item.href.startsWith('mailto:') || item.href.startsWith('tel:') || item.href.includes('.html')));
  if (!links.length) return '';
  const isAboutPage = record.path.endsWith('/about.html');
  const isMarketLink = item => {
    const path = (item.href || '').split(/[?#]/)[0];
    return ['/kenya-market.html', '/south-africa-market.html', '/international-markets.html']
      .some(suffix => path.endsWith(suffix));
  };
  const marketLinks = isAboutPage ? links.filter(isMarketLink) : [];
  const otherLinks = isAboutPage ? links.filter(item => !isMarketLink(item)) : links;
  const renderItem = (item, marketLink = false) => {
    const raw = item.href;
    const hash = raw.includes('#') ? raw.slice(raw.indexOf('#')) : '';
    const rawPath = raw.split(/[?#]/)[0];
    const href = raw.startsWith('mailto:') || raw.startsWith('tel:') || raw.startsWith('http') || raw.startsWith('#')
      ? raw
      : resolvePageLink(record, rawPath) + hash;
    return '<a class="content-link' + (marketLink ? ' about-market-link' : '') + '" href="' + attr(href) + '">' + escapeHtml(item.text || raw) + '</a>';
  };
  const marketSection = isAboutPage && marketLinks.length
    ? '<h2>' + escapeHtml((labels[record.lang] || labels.en).marketPages) + '</h2>' + marketLinks.slice(0, 3).map(item => renderItem(item, true)).join('')
    : '';
  const quickSection = otherLinks.length
    ? (marketSection ? '<h2>' + escapeHtml((labels[record.lang] || labels.en).useful) + '</h2>' : '') + otherLinks.slice(0, marketSection ? 27 : 30).map(item => renderItem(item)).join('')
    : '';
  if (!marketSection && !quickSection) return '';
  return '<section class="section' + (marketSection ? ' about-market-links' : '') + '"><div class="container"><div class="content-panel">' +
    (marketSection || '<h2>' + escapeHtml((labels[record.lang] || labels.en).useful) + '</h2>') + quickSection +
    '</div></div></section>';
}
function renderFooter(record) {
  const lang = record.lang || 'en';
  const text = labels[lang] || labels.en;
  const footerCopy = {
    en:{quick:'Quick Links',about:'About Us',projects:'Projects',contact:'Contact',contactHeading:'Contact NIAZ NET',tagline:'NIAZ NET · International Business Development'},
    tr:{quick:'Hızlı Bağlantılar',about:'Hakkımızda',projects:'Projeler',contact:'İletişim',contactHeading:'NIAZ NET İletişim',tagline:'NIAZ NET · Uluslararası İş Geliştirme'},
    fa:{quick:'دسترسی سریع',about:'درباره ما',projects:'پروژه‌ها',contact:'تماس با ما',contactHeading:'تماس با نیاز نت',tagline:'نیاز نت · توسعه کسب‌وکار بین‌المللی'}
  };
  const copy = footerCopy[lang] || footerCopy.en;
  return '<footer class="footer" id="site-footer"><div class="container"><div class="footer-grid">' +
    '<div class="footer-brand"><img src="/images/niaz-net-logo.png" alt="NIAZ NET"><p>' + escapeHtml(copy.tagline) + '</p></div>' +
    '<div class="footer-col"><h3>' + escapeHtml(copy.quick) + '</h3><a href="' + attr(localizedPath(lang, 'about.html')) + '">' + escapeHtml(copy.about) + '</a><a href="' + attr(localizedPath(lang, 'projects.html')) + '">' + escapeHtml(copy.projects) + '</a><a href="' + attr(localizedPath(lang, 'contact.html')) + '">' + escapeHtml(copy.contact) + '</a></div>' +
    '<div class="footer-col"><h3>' + escapeHtml(text.services) + '</h3>' + services.filter(item => !item.vip).slice(0, 5).map(item => '<a href="' + attr(localizedPath(lang, item.slug + '.html')) + '">' + escapeHtml(item[lang] || item.en || item.slug) + '</a>').join('') + '</div>' +
    '<div class="footer-col footer-contact"><h3>' + escapeHtml(copy.contactHeading) + '</h3><a href="mailto:info@niaznet.net">info@niaznet.net</a><a href="tel:+982188322100">' + escapeHtml(lang === 'fa' ? '+98 21 8832 2100 · داخلی ۲' : lang === 'tr' ? '+98 21 8832 2100 · dahili 2' : '+98 21 8832 2100 ext. 2') + '</a><a href="https://wa.me/905340143473">+90 534 014 3473</a></div>' +
    '</div><div class="footer-bottom">' + escapeHtml(copy.tagline) + '</div></div></footer>';
}
function pageHtml(record, canonical, titleCounts, descriptionCounts) {
  const lang = record.lang || 'en';
  const description = pageDescription(record, descriptionCounts);
  if (record.redirectTo) {
    const target = normalize(record.redirectTo);
    return '<!doctype html><html lang="' + attr(lang) + '"><head><meta charset="utf-8"><meta name="robots" content="noindex,follow">' +
      '<meta http-equiv="refresh" content="0;url=' + attr(target) + '"><link rel="canonical" href="' + attr(canonical) + '">' +
      '<title>Redirecting to NIAZ NET</title></head><body><p>This page has moved. <a href="' + attr(target) + '">Continue to the updated page</a>.</p></body></html>';
  }
  const pathName = normalize(record.path);
  const home = pathName === '/' || /^\/(fa|tr|es|fr)\/$/.test(pathName);
  const baseTitle = record.title || firstBlock(record, 'h1') || 'NIAZ NET';
  const title = titleCounts.get(baseTitle) > 1 ? baseTitle + ' — ' + pathName.split('/').filter(Boolean).pop().replace(/\.html$/, '').replace(/-/g, ' ') : baseTitle;
  const alternates = records.filter(other => other.path.split('/').pop() === pathName.split('/').pop() &&
    (other.path === '/' || other.path.endsWith('/' + pathName.split('/').pop())) && other.lang);
  const alternateTags = [...new Map(alternates.map(other => [other.lang, other])).values()]
    .map(other => '<link rel="alternate" hreflang="' + attr(other.lang) + '" href="' + attr(other.canonical || SITE + normalize(other.path)) + '">').join('');
  const isAboutPage = pathName.endsWith('/about.html');
  const mainContent = home ? renderServices(lang) + renderBlocks(record) :
    isAboutPage ? renderAboutPage(record) :
    (pathName.endsWith('/api-supply.html') ? renderApiCatalogStatic(lang) : '') + renderBlocks(record) + renderDownloadsStatic(record) + renderForm(record) + renderLinks(record);
  const direction = lang === 'fa' ? 'rtl' : 'ltr';
  return '<!doctype html><html lang="' + attr(lang) + '" dir="' + direction + '" data-prerendered="true"><head>' +
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">' +
    '<title>' + escapeHtml(title) + '</title><meta name="description" content="' + attr(description) + '">' +
    '<link rel="canonical" href="' + attr(canonical) + '">' + alternateTags +
    '<meta property="og:type" content="website"><meta property="og:site_name" content="NIAZ NET">' +
    '<meta property="og:title" content="' + attr(title) + '"><meta property="og:description" content="' + attr(description) + '">' +
    '<meta property="og:url" content="' + attr(canonical) + '"><meta property="og:image" content="' + SITE + '/images/niaz-net-logo.png">' +
    '<meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="/rebuild/site.css">' +
    (isAboutPage ? '<link rel="stylesheet" href="/assets/css/about-page.css">' : '') +
    (pathName.endsWith('/sports-nutrition.html') ? '<link rel="stylesheet" href="/assets/css/sports-nutrition-page.css">' : '') +
    '</head><body><div id="app">' + renderHeader(record) + (isAboutPage ? renderAboutHero(record) : renderHero(record)) + mainContent + renderFooter(record) +
    '<a class="whatsapp whatsapp-float" href="https://wa.me/905340143473" aria-label="WhatsApp">WhatsApp</a></div>' +
    '<noscript><nav aria-label="Essential pages"><a href="/">Home</a> · <a href="/about.html">About Us</a> · <a href="/projects.html">Projects</a> · <a href="/contact.html">Contact</a> · <a href="/become-our-partner.html">Become Our Partner</a></nav></noscript>' +
    '<script src="/rebuild/site.js" defer></script></body></html>';
}
function build() {
  const canonicalCounts = new Map(), titleCounts = new Map(), descriptionCounts = new Map();
  for (const record of records) {
    const canonical = record.canonical || SITE + normalize(record.path);
    const title = record.title || firstBlock(record, 'h1') || 'NIAZ NET';
    const description = record.description || firstBlock(record, 'p') || title;
    canonicalCounts.set(canonical, (canonicalCounts.get(canonical) || 0) + 1);
    titleCounts.set(title, (titleCounts.get(title) || 0) + 1);
    descriptionCounts.set(description, (descriptionCounts.get(description) || 0) + 1);
  }
  for (const record of records) {
    const file = outputPath(record.path);
    const canonical = canonicalFor(record, canonicalCounts);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, pageHtml(record, canonical, titleCounts, descriptionCounts), 'utf8');
  }
  const sitemapRecords = records.filter(record => !record.redirectTo);
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">' +
    sitemapRecords.map(record => {
      const canonical = canonicalFor(record, canonicalCounts);
      const basename = normalize(record.path).split('/').pop();
      const translations = sitemapRecords.filter(other => normalize(other.path).split('/').pop() === basename);
      return '<url><loc>' + escapeHtml(canonical) + '</loc>' + translations.map(other =>
        '<xhtml:link rel="alternate" hreflang="' + attr(other.lang) + '" href="' + attr(canonicalFor(other, canonicalCounts)) + '"/>'
      ).join('') + '</url>';
    }).join('') + '</urlset>';
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');
  fs.writeFileSync(path.join(ROOT, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: ' + SITE + '/sitemap.xml\n', 'utf8');
  const indexable = records.filter(record => !record.redirectTo);
  const canonicalSet = new Set(indexable.map(record => canonicalFor(record, canonicalCounts)));
  const titleSet = new Set(indexable.map(record => {
    const base = record.title || firstBlock(record, 'h1') || 'NIAZ NET';
    return titleCounts.get(base) > 1 ? base + ' — ' + normalize(record.path).split('/').filter(Boolean).pop().replace(/\\.html$/, '').replace(/-/g, ' ') : base;
  }));
  const descriptionSet = new Set(indexable.map(record => pageDescription(record, descriptionCounts)));
  if (canonicalSet.size !== indexable.length || titleSet.size !== indexable.length || descriptionSet.size !== indexable.length) {
    throw new Error('SEO validation failed: canonical URLs, titles and descriptions must be unique for indexable pages.');
  }
  for (const record of indexable) {
    const html = fs.readFileSync(outputPath(record.path), 'utf8');
    if (!/<h1\b/.test(html) || !/<meta name="description"/.test(html) || !/<link rel="canonical"/.test(html) || !/<a\s/.test(html)) {
      throw new Error('Pre-render validation failed for ' + record.path + ': missing heading, metadata or internal links.');
    }
  }
  console.log('Pre-rendered and validated ' + indexable.length + ' indexable pages plus ' + (records.length - indexable.length) + ' redirect aliases.');
}
build();
