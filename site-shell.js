(function () {
  'use strict';


  if (!document.getElementById('niaz-site-enhancements')) {
    var enhancementStyle = document.createElement('style');
    enhancementStyle.id = 'niaz-site-enhancements';
    enhancementStyle.textContent = "\n.niaz-whatsapp-float{position:fixed;right:22px;bottom:22px;z-index:99999;width:60px;height:60px;border-radius:50%;display:grid;place-items:center;background:#25d366;color:#fff;box-shadow:0 8px 24px rgba(0,0,0,.24);border:2px solid #fff;transition:transform .18s ease,box-shadow .18s ease}\n.niaz-whatsapp-float:hover,.niaz-whatsapp-float:focus-visible{transform:translateY(-3px);box-shadow:0 12px 28px rgba(0,0,0,.3)}\n.niaz-whatsapp-float svg{width:33px;height:33px;display:block}\n.niaz-inquiry-form{margin-top:18px}.niaz-form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 18px}.niaz-form-field{display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:600;color:#10203c}.niaz-form-field.wide{grid-column:1/-1}.niaz-form-field input,.niaz-form-field select,.niaz-form-field textarea{width:100%;min-width:0;border:1px solid #d7dee8;border-radius:6px;background:#fff;padding:12px 13px;color:#10203c;font:inherit;font-weight:400;font-size:13px;outline:none}.niaz-form-field textarea{min-height:130px;resize:vertical}.niaz-form-field input:focus,.niaz-form-field select:focus,.niaz-form-field textarea:focus{border-color:#c99a43;box-shadow:0 0 0 3px rgba(201,154,67,.13)}.niaz-form-actions{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-top:18px}.niaz-form-note{font-size:11px;color:#627087;line-height:1.65;margin:12px 0 0}.niaz-mail-fallback{font-size:12px;color:#08254a;text-decoration:underline;text-underline-offset:3px}\n.niaz-brand-network{margin-top:28px;margin-bottom:28px}.niaz-logo-wall{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin-top:18px}.niaz-logo-wordmark{min-height:76px;padding:12px;display:flex;align-items:center;justify-content:center;text-align:center;border:1px solid #e6eaf0;border-radius:9px;background:#fff;color:#09264a;font-size:clamp(14px,1.7vw,21px);font-weight:800;letter-spacing:.02em;line-height:1.15;box-shadow:0 5px 16px rgba(5,24,51,.045)}.niaz-logo-wordmark:nth-child(3n){font-family:Georgia,serif;letter-spacing:-.03em}.niaz-logo-wordmark:nth-child(3n+1){color:#b18436}.niaz-logo-wordmark small{display:block;font-size:9px;letter-spacing:.08em;font-weight:600;margin-top:4px}\n.niaz-api-tools{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(180px,.7fr);gap:14px;margin:18px 0}.niaz-api-tools label{display:flex;flex-direction:column;gap:6px;font-size:11px;font-weight:700;color:#10203c}.niaz-api-tools input,.niaz-api-tools select{width:100%;border:1px solid #d7dee8;border-radius:6px;padding:12px 13px;background:#fff;color:#10203c;font:inherit;font-size:13px}.niaz-api-count{font-size:12px;color:#627087;margin:0 0 10px}.niaz-api-table-wrap{overflow-x:auto;border:1px solid #e6eaf0;border-radius:8px}.niaz-api-table{width:100%;border-collapse:collapse;font-size:13px}.niaz-api-table th,.niaz-api-table td{padding:11px 14px;text-align:left;border-bottom:1px solid #edf0f4}.niaz-api-table th{background:#071b39;color:#fff;font-size:11px;letter-spacing:.04em}.niaz-api-table tr:last-child td{border-bottom:0}.niaz-api-table tbody tr:nth-child(even){background:#f8fafc}.niaz-api-category{font-size:10px;font-weight:700;color:#91651e;background:#fff5df;border:1px solid #f0dfba;border-radius:20px;padding:4px 8px;white-space:nowrap}.niaz-api-empty{padding:18px;text-align:center;color:#627087;font-size:13px}\n@media(max-width:760px){.niaz-whatsapp-float{right:15px;bottom:15px;width:54px;height:54px}.niaz-whatsapp-float svg{width:30px;height:30px}.niaz-form-grid{grid-template-columns:1fr}.niaz-form-field.wide{grid-column:auto}.niaz-logo-wall{grid-template-columns:repeat(2,minmax(0,1fr))}.niaz-api-tools{grid-template-columns:1fr}.niaz-api-table th,.niaz-api-table td{padding:9px 10px;font-size:12px}}\n";
    document.head.appendChild(enhancementStyle);
  }

  if (!document.querySelector('.niaz-whatsapp-float')) {
    var whatsappLink = document.createElement('a');
    whatsappLink.className = 'niaz-whatsapp-float';
    whatsappLink.href = 'https://wa.me/905340143473';
    whatsappLink.target = '_blank';
    whatsappLink.rel = 'noopener noreferrer';
    whatsappLink.setAttribute('aria-label', 'Chat with NIAZ NET on WhatsApp');
    whatsappLink.title = 'Chat with NIAZ NET on WhatsApp';
    whatsappLink.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16.04 3C9.1 3 3.46 8.62 3.46 15.55c0 2.2.58 4.3 1.68 6.17L3.35 29l7.47-1.96a12.6 12.6 0 0 0 5.22 1.13h.01c6.94 0 12.58-5.63 12.58-12.57 0-3.36-1.31-6.52-3.69-8.9A12.5 12.5 0 0 0 16.04 3Zm0 22.98h-.01c-1.7 0-3.37-.46-4.83-1.33l-.35-.2-4.43 1.16 1.18-4.32-.23-.37a10.4 10.4 0 0 1-1.6-5.37c0-5.67 4.61-10.28 10.29-10.28 2.75 0 5.33 1.07 7.27 3.01a10.2 10.2 0 0 1 3.01 7.28c0 5.67-4.62 10.29-10.3 10.29Z"/><path fill="currentColor" d="M22.02 18.47c-.33-.17-1.96-.97-2.27-1.08-.3-.11-.53-.17-.75.17-.23.34-.87 1.08-1.07 1.3-.2.23-.4.26-.73.09-.34-.17-1.42-.52-2.7-1.66-1-.89-1.67-1.99-1.87-2.32-.2-.34-.02-.52.15-.69.15-.15.34-.4.5-.6.17-.2.22-.34.34-.56.11-.23.05-.43-.03-.6-.09-.17-.75-1.8-1.03-2.46-.27-.65-.54-.56-.75-.57l-.64-.01c-.23 0-.6.09-.91.43-.31.34-1.2 1.17-1.2 2.86s1.23 3.31 1.4 3.54c.17.23 2.42 3.69 5.86 5.17.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.13.66-.1 2.02-.83 2.3-1.63.28-.8.28-1.49.2-1.63-.09-.14-.31-.23-.65-.4Z"/></svg>';
    document.body.appendChild(whatsappLink);
  }

  document.querySelectorAll('form[data-mailto-form]').forEach(function (form) {
    if (form.dataset.mailtoBound === 'true') return;
    form.dataset.mailtoBound = 'true';
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      var lines = [];
      new FormData(form).forEach(function (value, key) {
        lines.push(key + ': ' + String(value));
      });
      var subject = form.getAttribute('data-mail-subject') || 'NIAZ NET Business Enquiry';
      var body = lines.join('\n');
      window.location.href = 'mailto:info@niaznet.net?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  });

  var apiCatalogRoot = document.getElementById('niazApiCatalog');
  if (apiCatalogRoot && !apiCatalogRoot.dataset.initialized) {
    apiCatalogRoot.dataset.initialized = 'true';
    var searchInput = document.getElementById('niazApiSearch');
    var categorySelect = document.getElementById('niazApiCategory');
    var resultsBody = document.getElementById('niazApiResults');
    var countLabel = document.getElementById('niazApiCount');
    var emptyLabel = document.getElementById('niazApiEmpty');
    var isTurkish = (document.documentElement.lang || '').toLowerCase().startsWith('tr');
    fetch('/api-catalog.json').then(function (response) {
      if (!response.ok) throw new Error('Catalog request failed');
      return response.json();
    }).then(function (items) {
      if (!Array.isArray(items)) throw new Error('Invalid catalogue data');
      var categories = Array.from(new Set(items.map(function (item) { return item.category || 'API'; }))).sort();
      categories.forEach(function (category) {
        var option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
      });
      function renderCatalog() {
        var query = (searchInput.value || '').trim().toLowerCase();
        var category = categorySelect.value;
        var matches = items.filter(function (item) {
          return (category === 'all' || item.category === category) &&
            String(item.name || '').toLowerCase().includes(query);
        });
        resultsBody.replaceChildren();
        matches.forEach(function (item) {
          var row = document.createElement('tr');
          var nameCell = document.createElement('td');
          var categoryCell = document.createElement('td');
          var categoryBadge = document.createElement('span');
          nameCell.textContent = item.name || '';
          categoryBadge.className = 'niaz-api-category';
          categoryBadge.textContent = item.category || 'API';
          categoryCell.appendChild(categoryBadge);
          row.appendChild(nameCell);
          row.appendChild(categoryCell);
          resultsBody.appendChild(row);
        });
        countLabel.textContent = isTurkish
          ? matches.length + ' / ' + items.length + ' kayıt gösteriliyor'
          : 'Showing ' + matches.length + ' of ' + items.length + ' records';
        emptyLabel.hidden = matches.length !== 0;
      }
      searchInput.addEventListener('input', renderCatalog);
      categorySelect.addEventListener('change', renderCatalog);
      renderCatalog();
    }).catch(function () {
      countLabel.textContent = isTurkish
        ? 'Katalog yüklenemedi. Lütfen info@niaznet.net ile iletişime geçin.'
        : 'The catalogue could not be loaded. Please contact info@niaznet.net.';
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  if (!document.querySelector('script[src="/language-switcher.js"]')) {
    var languageScript = document.createElement('script');
    languageScript.src = '/language-switcher.js';
    languageScript.async = true;
    document.head.appendChild(languageScript);
  }

  if (document.getElementById('newsletterForm') && !document.querySelector('script[src="/newsletter.js"]')) {
    var newsletterScript = document.createElement('script');
    newsletterScript.src = '/newsletter.js';
    newsletterScript.async = true;
    document.head.appendChild(newsletterScript);
  }

  var pathname = window.location.pathname || '/';
  var isHomePage = pathname === '/' || /(?:^|\/)index\.html$/.test(pathname);
  if (!isHomePage) {
    var localeMatch = pathname.match(/^\/(tr|es|fr|fa)(?:\/|$)/i);
    var homeHref = localeMatch
      ? '/' + localeMatch[1].toLowerCase() + '/index.html#home'
      : '/index.html#home';

    document.querySelectorAll('a[href="#home"]').forEach(function (link) {
      link.setAttribute('href', homeHref);
    });
  }

  var toggle = document.getElementById('mobileToggle');
  var nav = document.getElementById('navLinks');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '×' : '☰';
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });
  }
})();
