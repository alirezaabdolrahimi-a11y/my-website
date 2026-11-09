(function () {
  'use strict';

  var form = document.getElementById('newsletterForm');
  if (!form) return;

  var notice = document.getElementById('newsletterNotice');
  var isTurkish = (document.documentElement.lang || '').toLowerCase().startsWith('tr');
  var message = isTurkish
    ? 'Bülten aboneliği henüz etkin değil. Güncellemeler için lütfen info@niaznet.net adresine e-posta gönderin.'
    : 'Newsletter subscription is not connected yet. Please email info@niaznet.net for updates.';

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (notice) notice.textContent = message;
  });
})();
