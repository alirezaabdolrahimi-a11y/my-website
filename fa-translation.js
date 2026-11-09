(function () {
  'use strict';

  var params = new URLSearchParams(window.location.search);
  var isTurkishPage = /^\/tr\//.test(window.location.pathname);
  if (isTurkishPage || params.get('lang') !== 'fa') return;
  if (document.querySelector('script[data-fa-translation-runtime]')) return;

  var runtime = document.createElement('script');
  runtime.src = '/fa-translation-runtime.js';
  runtime.dataset.faTranslationRuntime = 'true';
  runtime.async = true;
  document.head.appendChild(runtime);
})();
