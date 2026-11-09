(function () {
  'use strict';

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  if (!document.querySelector('script[src="/language-switcher.js"]')) {
    var languageScript = document.createElement('script');
    languageScript.src = '/language-switcher.js';
    languageScript.async = true;
    document.head.appendChild(languageScript);
  }

  var toggle = document.getElementById('mobileToggle');
  var nav = document.getElementById('navLinks');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '×' : '☰';
  });
})();
