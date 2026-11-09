(function () {
  'use strict';

  var form = document.getElementById('newsletterForm');
  if (!form) return;

  var notice = document.getElementById('newsletterNotice');
  var queryLanguage = new URLSearchParams(window.location.search).get('lang');
  var language = (queryLanguage || document.documentElement.lang || 'en').toLowerCase().slice(0, 2);
  var messages = {
    en: 'Newsletter subscription is not connected yet. Please email info@niaznet.net for updates.',
    fa: 'ثبت‌نام خبرنامه هنوز فعال نشده است. برای دریافت به‌روزرسانی‌ها به info@niaznet.net ایمیل بزنید.',
    tr: 'Bülten aboneliği henüz etkin değil. Güncellemeler için lütfen info@niaznet.net adresine e-posta gönderin.',
    es: 'La suscripción al boletín aún no está disponible. Para recibir novedades, escriba a info@niaznet.net.',
    fr: 'L’inscription à la newsletter n’est pas encore disponible. Pour recevoir les actualités, écrivez à info@niaznet.net.'
  };
  var message = messages[language] || messages.en;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (notice) notice.textContent = message;
  });
})();
