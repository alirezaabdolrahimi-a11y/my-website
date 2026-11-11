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
