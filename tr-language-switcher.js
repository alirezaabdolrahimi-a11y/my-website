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
  menu.hidden = true;
  menu.setAttribute('role', 'menu');
  menu.setAttribute('aria-label', 'Dil seçimi');

  function persistLanguage(code) {
    try {
      localStorage.setItem('niaznet-language', code);
      document.cookie = 'niaznet-language=' + code + '; Path=/; Max-Age=31536000; SameSite=Lax; Secure';
      document.cookie = 'niaznet-manual-language=' + code + '; Path=/; Max-Age=31536000; SameSite=Lax; Secure';
    } catch (error) {}
  }

  var english = document.createElement('button');
  english.type = 'button';
  english.className = 'tr-language-option';
  english.textContent = 'English';
  english.setAttribute('role', 'menuitem');
  english.addEventListener('click', function () {
    persistLanguage('en');
    var target = new URL(window.location.href);
    target.pathname = target.pathname.startsWith('/tr/') ? target.pathname.slice(3) : (target.pathname === '/tr' ? '/' : target.pathname);
    target.searchParams.delete('lang');
    window.location.assign(target.pathname + target.search + target.hash);
  });

  var persian = document.createElement('button');
  persian.type = 'button';
  persian.className = 'tr-language-option';
  persian.textContent = 'فارسی';
  persian.setAttribute('role', 'menuitem');
  persian.addEventListener('click', function () {
    persistLanguage('fa');
    var target = new URL(window.location.href);
    target.pathname = target.pathname.startsWith('/tr/') ? target.pathname.slice(3) : (target.pathname === '/tr' ? '/' : target.pathname);
    target.searchParams.set('lang', 'fa');
    window.location.assign(target.pathname + target.search + target.hash);
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

  var style = document.createElement('style');
  style.textContent = '.tr-language-switcher{position:relative;display:inline-flex;align-items:center}.tr-language-menu{position:absolute;z-index:9999;top:calc(100% + 8px);right:0;min-width:130px;padding:6px;background:#fff;border:1px solid #e6eaf0;border-radius:7px;box-shadow:0 10px 25px rgba(5,24,51,.18)}.tr-language-menu[hidden]{display:none}.tr-language-option{display:block;width:100%;padding:9px 11px;border:0;border-radius:5px;background:#fff;color:#10203c;text-align:left;font:500 12px/1.3 Inter,Arial,sans-serif;cursor:pointer}.tr-language-option:hover,.tr-language-option:focus{background:#f3f6fa;outline:none}.tr-language-option[aria-current=true]{color:#9b7028;font-weight:700}';
  document.head.appendChild(style);

  button.setAttribute('aria-haspopup', 'menu');
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