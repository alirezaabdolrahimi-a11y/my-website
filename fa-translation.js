(function () {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  const isTurkishPage = /^\/tr\//.test(window.location.pathname);
  const languageAnchor =
    document.querySelector('.lang') ||
    document.querySelector('.nav-cta');

  if (
    !isTurkishPage &&
    languageAnchor &&
    !document.querySelector('.fa-lang') &&
    !document.getElementById('langButton')
  ) {
    const faLink = document.createElement('a');
    faLink.className = 'lang fa-lang';
    faLink.href = window.location.pathname + '?lang=fa';
    faLink.setAttribute('aria-label', 'فارسی');
    faLink.setAttribute('title', 'فارسی');
    faLink.textContent = 'FA⌄';
    languageAnchor.parentNode.insertBefore(faLink, languageAnchor.nextSibling);
  }

  if (isTurkishPage || params.get('lang') !== 'fa') return;
  if (document.querySelector('script[data-fa-translation-runtime]')) return;

  const runtime = document.createElement('script');
  runtime.src = '/fa-translation-runtime.js';
  runtime.dataset.faTranslationRuntime = 'true';
  runtime.async = true;
  document.head.appendChild(runtime);
})();
