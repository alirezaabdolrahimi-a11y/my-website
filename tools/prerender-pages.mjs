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
  en:{services:'Our Services',vip:'VIP SERVICES',contact:'Contact Our Team',partner:'Become Our Partner',useful:'Useful Links',address:'Tehran Office',email:'Email',whatsapp:'WhatsApp'},
  fa:{services:'خدمات ما',vip:'خدمات ویژه',contact:'تماس با تیم ما',partner:'همکاری با ما',useful:'پیوندهای مفید',address:'دفتر تهران',email:'ایمیل',whatsapp:'واتساپ'},
  tr:{services:'Hizmetlerimiz',vip:'ÖZEL HİZMETLER',contact:'Ekibimizle İletişime Geçin',partner:'İş Ortağımız Olun',useful:'Faydalı Bağlantılar',address:'Tahran Ofisi',email:'E-posta',whatsapp:'WhatsApp'},
  es:{services:'Nuestros servicios',vip:'SERVICIOS VIP',contact:'Contactar con nuestro equipo',partner:'Conviértase en socio',useful:'Enlaces útiles',address:'Oficina de Teherán',email:'Correo',whatsapp:'WhatsApp'},
  fr:{services:'Nos services',vip:'SERVICES VIP',contact:'Contacter notre équipe',partner:'Devenir partenaire',useful:'Liens utiles',address:'Bureau de Téhéran',email:'E-mail',whatsapp:'WhatsApp'}
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
  const prefix = languagePrefix(lang);
  return '<section class="hero"><div class="container hero-inner hero-grid"><div class="hero-copy">' +
    '<div class="eyebrow">Connecting markets worldwide</div><h1>' + escapeHtml(heading) + '</h1>' +
    '<p class="hero-description">' + escapeHtml(description) + '</p>' +
    '<div class="hero-actions"><a class="btn btn-outline" href="' + attr(localizedPath(lang, 'contact.html')) + '">' + escapeHtml(text.contact) + '</a>' +
    '<a class="btn partner-hero-btn" href="' + attr(localizedPath(lang, 'become-our-partner.html')) + '">' + escapeHtml(text.partner) + '</a></div>' +
    '</div></div></section>';
}
function renderServices(lang) {
  const text = labels[lang] || labels.en;
  const prefix = languagePrefix(lang);
  const primary = services.filter(service => !service.vip);
  const vip = services.filter(service => service.vip);
  const cards = primary.map(service => {
    const title = service[lang] || service.en || service.slug;
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
function renderTable(table, lang) {
  const headers = table.headers?.[lang] || table.headers?.en || [];
  const rows = table.rowsByLang?.[lang] || table.rows || [];
  return '<div class="table-wrap"><table class="api-table product-price-table">' +
    (table.caption ? '<caption>' + escapeHtml(table.caption) + '</caption>' : '') +
    '<thead><tr>' + headers.map(value => '<th>' + escapeHtml(value) + '</th>').join('') + '</tr></thead>' +
    '<tbody>' + rows.map(row => '<tr>' + row.map(value => '<td>' + escapeHtml(value) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
}
function renderBlocks(record) {
  const lang = record.lang || 'en';
  const blocks = record.blocks || [];
  let skippedH1 = false, skippedP = false, list = [], body = '';
  const flush = () => {
    if (list.length) { body += '<ul>' + list.map(value => '<li>' + escapeHtml(value) + '</li>').join('') + '</ul>'; list = []; }
  };
  for (const block of blocks) {
    if (block.type === 'h1' && !skippedH1) { skippedH1 = true; continue; }
    if (block.type === 'p' && !skippedP) { skippedP = true; continue; }
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
  return '<section class="section white"><div class="container"><div class="content-panel">' + body + '</div></div></section>';
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
  const links = (record.links || []).filter(item => item.href && (item.href.startsWith('/') || item.href.startsWith('#') || item.href.startsWith('mailto:') || item.href.startsWith('tel:') || /\.html(?:$|[?#])/i.test(item.href)));
  if (!links.length) return '';
  const prefix = record.path.startsWith('/tr/') ? '/tr/' : record.path.startsWith('/fa/') ? '/fa/' : record.path.startsWith('/es/') ? '/es/' : record.path.startsWith('/fr/') ? '/fr/' : '/';
  return '<section class="section"><div class="container"><div class="content-panel"><h2>Useful Links</h2>' +
    links.slice(0, 30).map(item => {
      const raw = item.href;
      const hash = raw.includes('#') ? raw.slice(raw.indexOf('#')) : '';
      const rawPath = raw.split(/[?#]/)[0];
      const href = raw.startsWith('mailto:') || raw.startsWith('tel:') || raw.startsWith('http') || raw.startsWith('#')
        ? raw
        : resolvePageLink(record, rawPath) + hash;
      return '<a class="content-link" href="' + attr(href) + '">' + escapeHtml(item.text || raw) + '</a>';
    }).join('') + '</div></div></section>';
}
function renderFooter(record) {
  const lang = record.lang || 'en';
  const text = labels[lang] || labels.en;
  const prefix = languagePrefix(lang);
  return '<footer class="footer" id="site-footer"><div class="container"><div class="footer-grid">' +
    '<div class="footer-brand"><img src="/images/niaz-net-logo.png" alt="NIAZ NET"><p>NIAZ NET · International Business Development</p></div>' +
    '<div class="footer-col"><h3>Quick Links</h3><a href="' + attr(localizedPath(lang, 'about.html')) + '">About Us</a><a href="' + attr(localizedPath(lang, 'projects.html')) + '">Projects</a><a href="' + attr(localizedPath(lang, 'contact.html')) + '">Contact</a></div>' +
    '<div class="footer-col"><h3>' + escapeHtml(text.services) + '</h3>' + services.filter(item => !item.vip).slice(0, 5).map(item => '<a href="' + attr(localizedPath(lang, item.slug + '.html')) + '">' + escapeHtml(item[lang] || item.en || item.slug) + '</a>').join('') + '</div>' +
    '<div class="footer-col footer-contact"><h3>Contact NIAZ NET</h3><a href="mailto:info@niaznet.net">info@niaznet.net</a><a href="tel:+982188322100">+98 21 8832 2100 ext. 2</a><a href="https://wa.me/905340143473">+90 534 014 3473</a></div>' +
    '</div><div class="footer-bottom">NIAZ NET · International Business Development</div></div></footer>';
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
  const mainContent = (home ? renderServices(lang) : '') + renderBlocks(record) + renderForm(record) + (!home ? renderLinks(record) : '');
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
    '</head><body><div id="app">' + renderHeader(record) + renderHero(record) + mainContent + renderFooter(record) +
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
