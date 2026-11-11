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

  if (document.getElementById('newsletterForm') && !document.querySelector('script[src="/newsletter.js"]')) {
    var newsletterScript = document.createElement('script');
    newsletterScript.src = '/newsletter.js';
    newsletterScript.async = true;
    document.head.appendChild(newsletterScript);
  }

  var pathname = window.location.pathname || '/';
  var homePath = pathname.indexOf('/tr/') === 0 ? '/tr/' :
    pathname.indexOf('/es/') === 0 ? '/es/' :
    pathname.indexOf('/fr/') === 0 ? '/fr/' : '/';
  var homeUrl = homePath + '#home';
  var homeLabels = {
    'home': true,
    'ana sayfa': true,
    'inicio': true,
    'accueil': true
  };

  document.querySelectorAll('#navLinks a, header nav a').forEach(function (link) {
    var label = (link.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
    if (homeLabels[label]) link.setAttribute('href', homeUrl);
  });

  document.querySelectorAll('a.brand').forEach(function (link) {
    link.setAttribute('href', homeUrl);
  });

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
