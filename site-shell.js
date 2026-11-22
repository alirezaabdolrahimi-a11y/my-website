(function () {
  'use strict';
  if (document.documentElement.dataset.niazSiteShellInitialized === 'true') return;
  document.documentElement.dataset.niazSiteShellInitialized = 'true';


  // NIAZ NET GLOBAL UI STANDARD — the single source of truth for every locale/page.
  // Slideshow artwork is always fully visible inside a 1944×809 frame (no crop/stretch).
  // Shared visual rules are loaded from one cacheable stylesheet.
  if (!document.getElementById('niaz-site-shell-stylesheet')) {
    var shellStylesheet = document.createElement('link');
    shellStylesheet.id = 'niaz-site-shell-stylesheet';
    shellStylesheet.rel = 'stylesheet';
    shellStylesheet.href = '/assets/css/site-shell-enhancements.css';
    document.head.appendChild(shellStylesheet);
  }

  if (!document.querySelector('.whatsapp-float')) {
    var whatsappLink = document.createElement('a');
    whatsappLink.className = 'whatsapp-float';
    whatsappLink.href = 'https://wa.me/905340143473';
    whatsappLink.target = '_blank';
    whatsappLink.rel = 'noopener noreferrer';
    var whatsappPath = window.location.pathname || '/';
    var whatsappQueryLanguage = new URLSearchParams(window.location.search).get('lang');
    var whatsappRouteMatch = whatsappPath.match(/^\/(tr|es|fr|fa)(?:\/|$)/i);
    var whatsappLanguage = whatsappRouteMatch ? whatsappRouteMatch[1].toLowerCase() : whatsappQueryLanguage === 'fa' ? 'fa' : (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
    var whatsappLabels = { en: 'Message NIAZ NET on WhatsApp', fa: 'ارسال پیام به نیازنت در واتساپ', tr: 'WhatsApp üzerinden NIAZ NET\'e mesaj gönder', es: 'Enviar un mensaje a NIAZ NET por WhatsApp', fr: 'Envoyer un message à NIAZ NET sur WhatsApp' };
    whatsappLink.setAttribute('aria-label', whatsappLabels[whatsappLanguage] || whatsappLabels.en);
    whatsappLink.title = 'WhatsApp';
    whatsappLink.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.8 11.8 0 0 0 12.12 0C5.58 0 .25 5.32.25 11.87c0 2.09.55 4.13 1.6 5.93L.15 24l6.36-1.67a11.9 11.9 0 0 0 5.61 1.43h.01c6.54 0 11.87-5.32 11.87-11.87 0-3.17-1.24-6.15-3.48-8.41ZM12.13 21.7a9.85 9.85 0 0 1-5.02-1.37l-.36-.21-3.77.99 1.01-3.67-.23-.38a9.82 9.82 0 1 1 8.37 4.64Zm5.39-7.36c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg><span>Chat on WhatsApp</span>';
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

  // One shared contact destination and one single enquiry form across the site.
  var currentLocale = (document.documentElement.lang || 'en').toLowerCase();
  var localeMatch = (window.location.pathname || '/').match(/^\/(tr|es|fr|fa)(?:\/|$)/i);
  var locale = localeMatch ? localeMatch[1].toLowerCase() : (currentLocale.slice(0,2) || 'en');
  var queryLang = new URLSearchParams(window.location.search).get('lang');
  if (!localeMatch && queryLang === 'fa') locale = 'fa';
  var homePath = locale === 'tr' ? '/tr/index.html' : locale === 'es' ? '/es/index.html' : locale === 'fr' ? '/fr/index.html' : '/index.html';
  var contactTarget = homePath + (locale === 'fa' ? '?lang=fa' : '') + '#niaz-contact-hub';
  var isLocalizedHomepage = window.location.pathname === '/' || /\/index\.html$/i.test(window.location.pathname);
  // Contact visibility rules are in site-shell-enhancements.css.

  // Remove only the legacy newsletter form; preserve contact and partnership enquiry forms.
  document.querySelectorAll('form#newsletterForm').forEach(function (form) { form.remove(); });
  document.querySelectorAll('.footer-col.newsletter').forEach(function (column) {
    var footerCopy = {
      en: ['Contact NIAZ NET','For business enquiries and cooperation opportunities, contact our team.','CONTACT OUR TEAM →'],
      tr: ['NIAZ NET ile iletişim','Ticari talepler ve iş birliği fırsatları için ekibimizle iletişime geçin.','EKİBİMİZLE İLETİŞİME GEÇİN →'],
      fa: ['ارتباط با نیاز نت','برای درخواست‌های تجاری و فرصت‌های همکاری با تیم ما در ارتباط باشید.','ارتباط با تیم ما ←'],
      es: ['Contacte con NIAZ NET','Para consultas comerciales y oportunidades de colaboración, contacte con nuestro equipo.','CONTACTE CON NUESTRO EQUIPO →'],
      fr: ['Contacter NIAZ NET','Pour toute demande commerciale ou opportunité de partenariat, contactez notre équipe.','CONTACTER NOTRE ÉQUIPE →']
    };
    var ft = footerCopy[locale] || footerCopy.en;
    column.innerHTML = '<h3>' + ft[0] + '</h3><p>' + ft[1] + '</p><a class="footer-contact-link" href="' + contactTarget + '">' + ft[2] + '</a>';
  });

  // Create the only form on the localized homepage.
  var contactSection = document.getElementById('contact');
  if (contactSection && !document.getElementById('niazContactHubForm')) {
    var copy = {
      en: ['Contact our team','Full name *','Company','Job title / Position','Phone / WhatsApp','Business email *','Request type','General business enquiry','Partnership / distribution','Product sourcing / API','FCM / CMO / contract manufacturing','Regulatory / registration','Other','Your request and relevant details *','SEND ENQUIRY BY EMAIL →','Your email application will open with the details addressed to info@niaznet.net. Review and press Send.'],
      tr: ['Ekibimizle iletişime geçin','Ad Soyad *','Şirket','Görev / Pozisyon','Telefon / WhatsApp','İş e-postası *','Talep türü','Genel ticari talep','İş ortaklığı / distribütörlük','Ürün tedariki / API','FCM / CMO / fason üretim','Mevzuat / ruhsatlandırma','Diğer','Talebiniz ve ilgili ayrıntılar *','E-POSTA İLE TALEP GÖNDER →','E-posta uygulamanız info@niaznet.net adresine hazırlanmış bir taslak açacaktır. Kontrol edip Gönder’e basın.'],
      fa: ['ارتباط با تیم ما','نام و نام خانوادگی *','شرکت','عنوان شغلی / سمت','تلفن / واتساپ','ایمیل کاری *','نوع درخواست','درخواست عمومی تجاری','همکاری / نمایندگی / توزیع','تأمین محصول / API','تولید قراردادی FCM / CMO','رگولاتوری / ثبت محصول','سایر','شرح درخواست و جزئیات *','ارسال درخواست از طریق ایمیل ←','ایمیل پیش‌نویس‌شده به info@niaznet.net باز می‌شود؛ اطلاعات را بررسی و ارسال کنید.'],
      es: ['Contacte con nuestro equipo','Nombre completo *','Empresa','Cargo / Puesto','Teléfono / WhatsApp','Correo empresarial *','Tipo de solicitud','Consulta comercial general','Alianza / distribución','Abastecimiento de productos / API','FCM / CMO / fabricación por contrato','Regulación / registro','Otro','Su solicitud y detalles relevantes *','ENVIAR CONSULTA POR CORREO →','Se abrirá un borrador dirigido a info@niaznet.net. Revíselo y pulse Enviar.'],
      fr: ['Contactez notre équipe','Nom complet *','Entreprise','Fonction / Poste','Téléphone / WhatsApp','E-mail professionnel *','Type de demande','Demande commerciale générale','Partenariat / distribution','Approvisionnement / API','FCM / CMO / fabrication sous contrat','Réglementation / enregistrement','Autre','Votre demande et les détails utiles *','ENVOYER PAR E-MAIL →','Un brouillon adressé à info@niaznet.net sera ouvert. Vérifiez-le puis envoyez-le.']
    };
    var t = copy[locale] || copy.en;
    var section = document.createElement('section');
    section.className = 'container section niaz-contact-hub';
    section.id = 'niaz-contact-hub';
    section.innerHTML = '<div class="page-panel"><h2>' + t[0] + '</h2><form id="niazContactHubForm" class="niaz-inquiry-form"><div class="niaz-form-grid">' +
      '<label class="niaz-form-field">' + t[1] + '<input name="' + t[1].replace(' *','') + '" autocomplete="name" required></label>' +
      '<label class="niaz-form-field">' + t[2] + '<input name="' + t[2] + '" autocomplete="organization"></label>' +
      '<label class="niaz-form-field">' + t[3] + '<input name="' + t[3] + '"></label>' +
      '<label class="niaz-form-field">' + t[4] + '<input name="' + t[4] + '" autocomplete="tel"></label>' +
      '<label class="niaz-form-field">' + t[5] + '<input name="' + t[5].replace(' *','') + '" type="email" autocomplete="email" required></label>' +
      '<label class="niaz-form-field">' + t[6] + '<select name="' + t[6] + '"><option>' + t[7] + '</option><option>' + t[8] + '</option><option>' + t[9] + '</option><option>' + t[10] + '</option><option>' + t[11] + '</option><option>' + t[12] + '</option></select></label>' +
      '<label class="niaz-form-field wide">' + t[13] + '<textarea name="' + t[13].replace(' *','') + '" required></textarea></label></div><div class="niaz-form-actions"><button class="btn" type="submit">' + t[14] + '</button></div><p class="niaz-form-note">' + t[15] + '</p></form></div>';
    contactSection.insertAdjacentElement('afterend', section);
    if (isLocalizedHomepage) {
      var showContactHub = window.location.hash.toLowerCase() === '#niaz-contact-hub';
      contactSection.hidden = !showContactHub;
      section.hidden = !showContactHub;
      if (showContactHub) window.requestAnimationFrame(function () { section.scrollIntoView({ block: 'start' }); });
    }
    var centralForm = section.querySelector('#niazContactHubForm');
    centralForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!centralForm.reportValidity()) return;
      var body = [];
      new FormData(centralForm).forEach(function (value, key) { body.push(key + ': ' + String(value)); });
      var subject = locale === 'fa' ? 'درخواست تجاری - نیازنت' : locale === 'tr' ? 'NIAZ NET Ticari Talep' : locale === 'es' ? 'Consulta comercial - NIAZ NET' : locale === 'fr' ? 'Demande commerciale - NIAZ NET' : 'NIAZ NET Business Enquiry';
      window.location.href = 'mailto:info@niaznet.net?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body.join('\n'));
    });
  }

  function routeContactLinks(root) {
    var scope = root || document;
    var links = Array.prototype.slice.call(scope.querySelectorAll('a'));
    if (scope.nodeType === 1 && scope.matches && scope.matches('a')) links.unshift(scope);
    links.forEach(function (link) {
      var label = (link.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
      var href = (link.getAttribute('href') || '').toLowerCase();
      var isContactAction = /^(become our partner|iş ortağımız olun|iş ortağımız ol|partner with us|partner with niaz net|start a partnership discussion|contact us|contact our team|contact details|contact|let’s discuss your brand|let's discuss your brand|discuss this service|discuss your requirements|discuss your infant-nutrition project|email our team|email your partnership enquiry|send enquiry by email|ekibimizle iletişime geçin|iletişim bilgileri|iletişim|iş ortağımız olun|ortaklık görüşmesi başlatın|ekibimize e-posta gönderin)$/.test(label);
      var isContactDestination = /(?:contact\.html|become-our-partner\.html|mailto:.*(?:business|contact|partner|inquiry|enquiry|talep|iletişim))/i.test(href);
      if (isContactAction || isContactDestination || href === '#contact') {
        link.setAttribute('href', contactTarget);
        link.removeAttribute('target');
        link.removeAttribute('rel');
      }
    });
  }
  routeContactLinks(document);

  // Reveal the homepage contact area only when a contact CTA is activated.
  document.addEventListener('click', function (event) {
    var link = event.target && event.target.closest ? event.target.closest('a') : null;
    if (!link) return;
    var href = (link.getAttribute('href') || '').toLowerCase();
    if (href !== contactTarget.toLowerCase() || !isLocalizedHomepage) return;
    if (contactSection) contactSection.hidden = false;
    var contactHub = document.getElementById('niaz-contact-hub');
    if (contactHub) contactHub.hidden = false;
  }, true);

  if (window.MutationObserver) {
    var contactObserver = new MutationObserver(function (records) {
      records.forEach(function (record) { record.addedNodes.forEach(function (node) { if (node.nodeType === 1) routeContactLinks(node); }); });
    });
    contactObserver.observe(document.body, { childList: true, subtree: true });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  if (!document.querySelector('script[src="/language-switcher.js"]')) {
    var languageScript = document.createElement('script');
    languageScript.src = '/language-switcher.js';
    languageScript.async = true;
    document.head.appendChild(languageScript);
  }

  var pathname = window.location.pathname || '/';
  var isHomePage = pathname === '/' || /(?:^|\/)index\.html$/.test(pathname);
  if (!isHomePage) {
    var localeMatch = pathname.match(/^\/(tr|es|fr|fa)(?:\/|$)/i);
    var queryLanguage = new URLSearchParams(window.location.search).get('lang');
    var homeHref = localeMatch
      ? (localeMatch[1].toLowerCase() === 'fa'
          ? '/index.html?lang=fa#home'
          : '/' + localeMatch[1].toLowerCase() + '/index.html#home')
      : (queryLanguage === 'fa' ? '/index.html?lang=fa#home' : '/index.html#home');

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
