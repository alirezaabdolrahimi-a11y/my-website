(function () {
  'use strict';

  var pathname = window.location.pathname || '/';
  var isNonPersianLocalePage = /^\/(?:tr|es|fr)(?:\/|$)/i.test(pathname);
  var isHomepage = pathname === '/' || /(?:^|\/)index\.html$/.test(pathname);
  var params = new URLSearchParams(window.location.search);
  var requestedLanguage = params.get('lang');

  // Preserve the homepage's saved Persian preference through the shared runtime.
  if (!isNonPersianLocalePage && isHomepage && !params.has('lang')) {
    try {
      if (window.localStorage.getItem('niaznet-language') === 'fa') {
        var target = new URL(window.location.href);
        target.searchParams.set('lang', 'fa');
        window.history.replaceState(window.history.state, '', target.pathname + target.search + target.hash);
        requestedLanguage = 'fa';
      }
    } catch (error) {}
  }

  if (isNonPersianLocalePage || requestedLanguage !== 'fa') return;
  if (document.querySelector('script[data-fa-translation-runtime]')) return;

  var runtime = document.createElement('script');
  runtime.src = '/fa-translation-runtime.js';
  runtime.dataset.faTranslationRuntime = 'true';
  runtime.async = false;
  document.head.appendChild(runtime);
})();
