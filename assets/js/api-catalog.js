(function () {
  'use strict';

  var root = document.getElementById('niazApiCatalog');
  if (!root || root.dataset.ready === 'true') return;

  var input = root.querySelector('#niazApiSearch');
  var filter = root.querySelector('#niazApiCategory');
  var body = root.querySelector('#niazApiResults');
  var count = root.querySelector('#niazApiCount');
  var empty = root.querySelector('#niazApiEmpty');
  if (!input || !filter || !body || !count || !empty) return;

  root.dataset.ready = 'true';
  var rows = Array.from(body.querySelectorAll('tr'));
  var isTurkish = document.documentElement.lang.toLowerCase() === 'tr';

  function render() {
    var query = input.value.trim().toLocaleLowerCase(isTurkish ? 'tr' : 'en');
    var category = filter.value;
    var shown = 0;

    rows.forEach(function (row) {
      var visible = (!query || row.textContent.toLocaleLowerCase(isTurkish ? 'tr' : 'en').includes(query)) &&
        (category === 'all' || row.dataset.category === category);
      row.hidden = !visible;
      if (visible) shown += 1;
    });

    count.textContent = isTurkish
      ? shown + ' / ' + rows.length + ' kayıt gösteriliyor'
      : 'Showing ' + shown + ' of ' + rows.length + ' records';
    empty.hidden = shown !== 0;
  }

  input.addEventListener('input', render);
  filter.addEventListener('change', render);
  render();
})();
