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
    nav.appendChild(button);
  }

  var path = window.location.pathname;
  var match = path.match(/^\/(tr|es|fr)(\/|$)/);
  var basePath = match ? path.replace(/^\/(tr|es|fr)(?=\/|$)/, '') || '/' : path;
  var params = new URLSearchParams(window.location.search);
  var active = (match && match[1]) || (params.get('lang') === 'fa' ? 'fa' : (document.documentElement.lang || 'en').slice(0, 2));
  var labels = [
    ['en', 'English'],
    ['fa', 'فارسی'],
    ['tr', 'Türkçe'],
    ['es', 'Español'],
    ['fr', 'Français']
  ];

  function persistLanguage(code) {
    try {
      localStorage.setItem('niaznet-language', code);
      document.cookie = 'niaznet-language=' + code + '; Path=/; Max-Age=31536000; SameSite=Lax; Secure';
      document.cookie = 'niaznet-manual-language=' + code + '; Path=/; Max-Age=31536000; SameSite=Lax; Secure';
    } catch (error) {}
  }

  var wrap = document.createElement('span');
  wrap.className = 'niaz-language-switcher';
  button.parentNode.insertBefore(wrap, button);
  wrap.appendChild(button);

  var menu = document.createElement('div');
  menu.className = 'niaz-language-menu';
  menu.hidden = true;
  menu.setAttribute('role', 'menu');
  menu.setAttribute('aria-label', 'Choose website language');

  labels.forEach(function (entry) {
    var code = entry[0];
    var item = document.createElement('button');
    item.type = 'button';
    item.className = 'niaz-language-option';
    item.textContent = entry[1];
    item.setAttribute('role', 'menuitem');
    item.setAttribute('aria-current', code === active ? 'true' : 'false');
    item.addEventListener('click', function () {
      persistLanguage(code);
      var target;
      if (code === 'fa') target = basePath + '?lang=fa';
      else if (code === 'en') target = basePath;
      else if (code === 'tr') target = '/tr' + (basePath === '/' ? '/' : basePath);
      else target = '/' + code + '/';
      window.location.assign(target);
    });
    menu.appendChild(item);
  });

  wrap.appendChild(menu);

  var style = document.createElement('style');
  style.textContent = '.niaz-language-switcher{position:relative;display:inline-flex;align-items:center}.niaz-language-menu{position:absolute;z-index:9999;top:calc(100% + 8px);right:0;min-width:150px;padding:7px;background:#fff;border:1px solid #e6eaf0;border-radius:8px;box-shadow:0 10px 30px rgba(5,24,51,.18)}.niaz-language-menu[hidden]{display:none}.niaz-language-option{display:block;width:100%;padding:10px 12px;border:0;border-radius:5px;background:#fff;color:#10203c;text-align:left;font:500 12px/1.3 Inter,Arial,sans-serif;cursor:pointer}.niaz-language-option:hover,.niaz-language-option:focus{background:#f3f6fa;outline:none}.niaz-language-option[aria-current=true]{color:#9b7028;font-weight:700}.niaz-language-switcher>.lang{white-space:nowrap}';
  document.head.appendChild(style);

  button.setAttribute('aria-haspopup', 'menu');
  button.setAttribute('aria-expanded', 'false');
  button.textContent = active.toUpperCase() + '⌄';

  function closeMenu() {
    menu.hidden = true;
    button.setAttribute('aria-expanded', 'false');
  }

  button.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    menu.hidden = !menu.hidden;
    button.setAttribute('aria-expanded', String(!menu.hidden));
  }, true);

  document.addEventListener('click', function (event) {
    if (!wrap.contains(event.target)) closeMenu();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeMenu();
      button.focus();
    }
  });
})();