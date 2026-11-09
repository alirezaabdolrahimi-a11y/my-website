(function () {
  'use strict';
  var nav = document.querySelector('.nav-links');
  if (!nav) return;

  var button = document.getElementById('langButton');
  if (!button) {
    button = document.createElement('button');
    button.type = 'button';
    button.className = 'lang';
    button.id = 'langButton';
    button.textContent = 'TR⌄';
    nav.appendChild(button);
  }

  var wrap = document.createElement('span');
  wrap.className = 'tr-language-switcher';
  button.parentNode.insertBefore(wrap, button);
  wrap.appendChild(button);

  var menu = document.createElement('div');
  menu.className = 'tr-language-menu';
  menu.id = 'tr-language-menu';
  menu.hidden = true;
  menu.setAttribute('role', 'menu');
  menu.setAttribute('aria-label', 'Dil seçimi');

  function persistLanguage(code) {
    try {
      localStorage.setItem('niaznet-language', code);
    } catch (error) {
      // Cookies below still preserve the explicit choice when storage is unavailable.
    }

    document.cookie = 'niaznet-language=' + code + '; Path=/; Max-Age=31536000; SameSite=Lax; Secure';
    document.cookie = 'niaznet-manual-language=' + code + '; Path=/; Max-Age=31536000; SameSite=Lax; Secure';
  }

  function getEnglishPath() {
    if (window.location.pathname === '/tr' || window.location.pathname === '/tr/') {
      return '/';
    }

    return window.location.pathname.startsWith('/tr/')
      ? window.location.pathname.slice(3)
      : window.location.pathname;
  }

  function navigateToLanguage(code) {
    persistLanguage(code);

    var target = new URL(getEnglishPath(), window.location.origin);
    if (code === 'fa') {
      target.searchParams.set('lang', 'fa');
    } else {
      target.searchParams.delete('lang');
    }

    window.location.assign(target.pathname + target.search + target.hash);
  }

  var english = document.createElement('button');
  english.type = 'button';
  english.className = 'tr-language-option';
  english.textContent = 'English';
  english.setAttribute('role', 'menuitem');
  english.addEventListener('click', function () {
    navigateToLanguage('en');
  });

  var persian = document.createElement('button');
  persian.type = 'button';
  persian.className = 'tr-language-option';
  persian.textContent = 'فارسی';
  persian.setAttribute('role', 'menuitem');
  persian.addEventListener('click', function () {
    navigateToLanguage('fa');
  });

  var turkish = document.createElement('button');
  turkish.type = 'button';
  turkish.className = 'tr-language-option';
  turkish.textContent = 'Türkçe';
  turkish.setAttribute('role', 'menuitem');
  turkish.setAttribute('aria-current', 'true');
  turkish.addEventListener('click', function () {
    persistLanguage('tr');
    menu.hidden = true;
    button.setAttribute('aria-expanded', 'false');
  });

  menu.append(english, persian, turkish);
  wrap.appendChild(menu);

  if (!document.querySelector('link[data-tr-language-styles]')) {
    var stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = '/tr-language-switcher.css';
    stylesheet.dataset.trLanguageStyles = 'true';
    document.head.appendChild(stylesheet);
  }

  button.setAttribute('aria-haspopup', 'menu');
  button.setAttribute('aria-controls', menu.id);
  button.setAttribute('aria-expanded', 'false');
  button.textContent = 'TR⌄';

  button.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    menu.hidden = !menu.hidden;
    button.setAttribute('aria-expanded', String(!menu.hidden));
  }, true);

  document.addEventListener('click', function (event) {
    if (!wrap.contains(event.target)) {
      menu.hidden = true;
      button.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      menu.hidden = true;
      button.setAttribute('aria-expanded', 'false');
      button.focus();
    }
  });
})();