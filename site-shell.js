(function () {
  'use strict';


  if (!document.getElementById('niaz-site-enhancements')) {
    var enhancementStyle = document.createElement('style');
    enhancementStyle.id = 'niaz-site-enhancements';
    enhancementStyle.textContent = "\n/* Compact navy-and-gold WhatsApp action from the approved reference */\n.whatsapp-float{position:fixed;right:5px;bottom:14px;z-index:20;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;min-height:36px;padding:0;border:1px solid #c99a43;border-radius:50%;background:linear-gradient(135deg,#071b38 0%,#123b66 100%);color:#fff;text-decoration:none;font-size:0;box-shadow:0 2px 8px #071b3828;transition:background .18s ease,border-color .18s ease,box-shadow .18s ease}\n.whatsapp-float:hover,.whatsapp-float:focus-visible{background:#123b66;border-color:#f0bf57;box-shadow:0 5px 16px #071b3840;transform:translateY(-1px)}\n.whatsapp-float svg{width:18px;height:18px;flex:0 0 18px;fill:#45d483}.whatsapp-float span{display:none}\n.niaz-inquiry-form{margin-top:18px}.niaz-form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 18px}.niaz-form-field{display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:600;color:#10203c}.niaz-form-field.wide{grid-column:1/-1}.niaz-form-field input,.niaz-form-field select,.niaz-form-field textarea{width:100%;min-width:0;border:1px solid #d7dee8;border-radius:6px;background:#fff;padding:12px 13px;color:#10203c;font:inherit;font-weight:400;font-size:13px;outline:none}.niaz-form-field textarea{min-height:130px;resize:vertical}.niaz-form-field input:focus,.niaz-form-field select:focus,.niaz-form-field textarea:focus{border-color:#c99a43;box-shadow:0 0 0 3px rgba(201,154,67,.13)}.niaz-form-actions{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-top:18px}.niaz-form-note{font-size:11px;color:#627087;line-height:1.65;margin:12px 0 0}.niaz-mail-fallback{font-size:12px;color:#08254a;text-decoration:underline;text-underline-offset:3px}\n.niaz-api-tools{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(180px,.7fr);gap:14px;margin:18px 0}.niaz-api-tools label{display:flex;flex-direction:column;gap:6px;font-size:11px;font-weight:700;color:#10203c}.niaz-api-tools input,.niaz-api-tools select{width:100%;border:1px solid #d7dee8;border-radius:6px;padding:12px 13px;background:#fff;color:#10203c;font:inherit;font-size:13px}.niaz-api-count{font-size:12px;color:#627087;margin:0 0 10px}.niaz-api-table-wrap{overflow-x:auto;border:1px solid #e6eaf0;border-radius:8px}.niaz-api-table{width:100%;border-collapse:collapse;font-size:13px}.niaz-api-table th,.niaz-api-table td{padding:11px 14px;text-align:left;border-bottom:1px solid #edf0f4}.niaz-api-table th{background:#071b39;color:#fff;font-size:11px;letter-spacing:.04em}.niaz-api-table tbody tr:nth-child(even){background:#f8fafc}.niaz-api-table tbody tr[hidden]{display:none}.niaz-api-empty{padding:18px;text-align:center;color:#627087;font-size:13px}\n.sports-brand-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin:18px 0 28px}\n.sports-brand-placeholder{min-height:118px;display:flex;align-items:center;justify-content:center;text-align:center;padding:14px;border:1px dashed rgba(201,154,67,.55);border-radius:12px;background:linear-gradient(145deg,rgba(255,255,255,.035),rgba(201,154,67,.045));color:#627087;font-size:12px;letter-spacing:.04em}\n.sports-brand-placeholder span{display:block;max-width:150px}\n.about-main{background:#f7f9fc;color:#10233f}.about-section{padding:48px 0}.about-section.white{background:#fff}.about-section-head{text-align:center;max-width:820px;margin:0 auto 28px}.about-section-head h2{font-size:clamp(23px,3vw,33px);color:#08254a;margin:0 0 10px}.about-section-head p{color:#62738a;line-height:1.8;margin:0}\n.about-pathways{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.about-path-card{overflow:hidden;border-radius:12px;background:#fff;border:1px solid #e2e9f0;box-shadow:0 8px 22px rgba(5,24,51,.05)}.about-path-body{padding:20px 22px 23px}.about-path-kicker{color:#b48332;font-weight:800;font-size:10px;letter-spacing:.14em}.about-path-body h3{font-size:18px;color:#08254a;margin:7px 0 9px}.about-path-body p{font-size:13px;line-height:1.8;color:#5b6c82;margin:0}\n.about-portfolio{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:11px}.about-portfolio-item{padding:14px 16px;background:#fff;border:1px solid #e5ebf1;border-radius:9px;color:#1c3553;font-size:12px;line-height:1.6;min-height:70px;display:flex;align-items:center;gap:9px}.about-portfolio-item:before{content:\"◆\";color:#c99a43;font-size:11px;flex:none}\n.about-process{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.about-process-item{padding:19px;background:#fff;border:1px solid #e3eaf1;border-radius:11px}.about-process-item strong{display:block;color:#c0923d;font-size:11px;letter-spacing:.12em;margin-bottom:8px}.about-process-item h3{font-size:17px;color:#08254a;margin:0 0 8px}.about-process-item p{font-size:12px;line-height:1.75;color:#627087;margin:0}\n.about-slide-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.about-slide-slot{position:relative;aspect-ratio:16/9;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:18px;border:1px dashed rgba(201,154,67,.7);border-radius:11px;background:linear-gradient(135deg,#071b38,#123b66);color:#f0c66e;text-align:center;overflow:hidden}.about-slide-slot:before{content:\"\";position:absolute;inset:8px;border:1px solid rgba(201,154,67,.25);border-radius:7px;pointer-events:none}.about-slide-slot i{font-style:normal;font-size:32px}.about-slide-slot span{font-size:12px;line-height:1.5;color:#e8eef6;max-width:300px}\n.about-cta{background:linear-gradient(115deg,#061a36,#123b64);color:#fff;padding:34px 0}.about-cta-inner{display:flex;align-items:center;justify-content:space-between;gap:22px}.about-cta h2{color:#f0c66e;margin:0 0 8px;font-size:23px}.about-cta p{margin:0;color:#e1eaf4;font-size:13px;line-height:1.75;max-width:700px}\n.project-detail-link{display:inline-flex;align-items:center;justify-content:center;margin-top:14px;padding:9px 14px;border:1px solid #c99a43;border-radius:30px;color:#08254a;font-size:11px;font-weight:800;text-decoration:none;letter-spacing:.03em}.project-detail-link:hover{background:#fff6e5}\n.project-detail-media{margin:28px 0}.project-detail-media h2{font-size:20px;color:#08254a;margin:0 0 8px}.project-detail-media>p{color:#627087;font-size:12px;line-height:1.7;margin:0 0 16px}.project-logo-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.project-logo-placeholder{min-height:82px;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;padding:12px;border:1px dashed #c99a43;border-radius:9px;background:#fff;color:#627087;font-size:10px;letter-spacing:.04em}.project-logo-placeholder small,.project-visual-placeholder small{font-size:10px;color:#a67c37;margin-top:5px}.project-visual-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.project-visual-placeholder{aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;padding:14px;border:1px dashed #c99a43;border-radius:9px;background:linear-gradient(135deg,#071b38,#123b66);color:#f0c66e;font-size:11px;letter-spacing:.05em}@media(max-width:760px){.project-logo-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.project-visual-grid{grid-template-columns:1fr}}\n\n@media(max-width:760px){.whatsapp-float{right:4px;bottom:10px;width:34px;height:34px;min-height:34px}.whatsapp-float svg{width:17px;height:17px;flex-basis:17px}.niaz-form-grid{grid-template-columns:1fr}.niaz-form-field.wide{grid-column:auto}.niaz-contact-details-grid{grid-template-columns:1fr}.niaz-api-tools{grid-template-columns:1fr}.niaz-api-table th,.niaz-api-table td{padding:9px 10px;font-size:12px}.sports-brand-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.about-pathways{grid-template-columns:1fr}.about-portfolio{grid-template-columns:repeat(2,minmax(0,1fr))}.about-process{grid-template-columns:repeat(2,minmax(0,1fr))}.about-slide-grid{grid-template-columns:1fr}.about-cta-inner{align-items:flex-start;flex-direction:column}}\n@media(max-width:420px){.sports-brand-grid{grid-template-columns:1fr 1fr;gap:9px}.sports-brand-placeholder{min-height:95px;padding:10px}.about-portfolio,.about-process{grid-template-columns:1fr}}\n@media(prefers-reduced-motion:reduce){.whatsapp-float{transition:none}.whatsapp-float:hover{transform:none}}\n";
    document.head.appendChild(enhancementStyle);
  }

  if (!document.querySelector('.whatsapp-float')) {
    var whatsappLink = document.createElement('a');
    whatsappLink.className = 'whatsapp-float';
    whatsappLink.href = 'https://wa.me/905340143473';
    whatsappLink.target = '_blank';
    whatsappLink.rel = 'noopener noreferrer';
    whatsappLink.setAttribute('aria-label', 'Message NIAZ NET on WhatsApp');
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
  if (queryLang === 'fa') locale = 'fa';
  var homePath = locale === 'tr' ? '/tr/index.html' : locale === 'es' ? '/es/index.html' : locale === 'fr' ? '/fr/index.html' : '/index.html';
  var contactTarget = homePath + (locale === 'fa' ? '?lang=fa' : '') + '#niaz-contact-hub';

  // Remove every legacy form (including duplicate newsletter and separate contact/partner forms).
  document.querySelectorAll('form').forEach(function (form) { form.remove(); });
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
      '<label class="niaz-form-field">' + t[1] + '<input name="Full name" autocomplete="name" required></label>' +
      '<label class="niaz-form-field">' + t[2] + '<input name="Company" autocomplete="organization"></label>' +
      '<label class="niaz-form-field">' + t[3] + '<input name="Job title / Position"></label>' +
      '<label class="niaz-form-field">' + t[4] + '<input name="Phone / WhatsApp" autocomplete="tel"></label>' +
      '<label class="niaz-form-field">' + t[5] + '<input name="Business email" type="email" autocomplete="email" required></label>' +
      '<label class="niaz-form-field">' + t[6] + '<select name="Request type"><option>' + t[7] + '</option><option>' + t[8] + '</option><option>' + t[9] + '</option><option>' + t[10] + '</option><option>' + t[11] + '</option><option>' + t[12] + '</option></select></label>' +
      '<label class="niaz-form-field wide">' + t[13] + '<textarea name="Request details" required></textarea></label></div><div class="niaz-form-actions"><button class="btn" type="submit">' + t[14] + '</button></div><p class="niaz-form-note">' + t[15] + '</p></form></div>';
    contactSection.insertAdjacentElement('afterend', section);
    var centralForm = section.querySelector('#niazContactHubForm');
    centralForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!centralForm.reportValidity()) return;
      var body = [];
      new FormData(centralForm).forEach(function (value, key) { body.push(key + ': ' + String(value)); });
      var subject = 'NIAZ NET ' + (locale === 'fa' ? 'Business Enquiry' : locale === 'tr' ? 'Ticari Talep' : locale === 'es' ? 'Consulta comercial' : locale === 'fr' ? 'Demande commerciale' : 'Business Enquiry');
      window.location.href = 'mailto:info@niaznet.net?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body.join('\n'));
    });
  }

  function routeContactLinks(root) {
    (root || document).querySelectorAll('a').forEach(function (link) {
      var label = (link.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
      var href = (link.getAttribute('href') || '').toLowerCase();
      var isContactAction = /^(become our partner|iş ortağımız olun|iş ortağımız ol|partner with us|partner with niaz net|start a partnership discussion|contact us|contact our team|contact details|contact|let’s discuss your brand|let's discuss your brand|discuss this service|discuss your requirements|discuss your infant-nutrition project|email our team|email your partnership enquiry|send enquiry by email|ekibimizle iletişime geçin|iletişim bilgileri|iletişim|iş ortağımız olun|ortaklık görüşmesi başlatın|ekibimize e-posta gönderin)$/.test(label);
      var isContactDestination = /(?:contact\.html|become-our-partner\.html|mailto:.*(?:business|contact|partner|inquiry|enquiry|talep|iletişim))/i.test(href);
      if (isContactAction || isContactDestination || link.classList.contains('whatsapp-float') || href === '#contact') {
        link.setAttribute('href', contactTarget);
        link.removeAttribute('target');
        link.removeAttribute('rel');
      }
    });
  }
  routeContactLinks(document);
  if (window.MutationObserver) {
    var contactObserver = new MutationObserver(function (records) {
      records.forEach(function (record) { record.addedNodes.forEach(function (node) { if (node.nodeType === 1) routeContactLinks(node); }); });
    });
    contactObserver.observe(document.body, { childList: true, subtree: true });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

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
