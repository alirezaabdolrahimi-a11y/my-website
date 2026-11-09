(() => {
  const root = document.querySelector('.api-catalog-section');
  if (!root || root.dataset.initialized === 'true') return;
  root.dataset.initialized = 'true';
  const search = root.querySelector('#apiSearchInput');
  const category = root.querySelector('#apiCategoryFilter');
  const direction = root.querySelector('#apiSortDirection');
  const body = root.querySelector('#apiCatalogBody');
  const count = root.querySelector('#apiResultsCount');
  const empty = root.querySelector('#apiNoResults');
  const table = root.querySelector('#apiCatalogTable');
  if (!search || !category || !direction || !body || !count || !empty || !table) return;
  let materials = [], sortKey = 'name', ascending = true;
  const locale = document.documentElement.lang === 'tr' ? 'tr' : 'en';
  function render() {
    const query = search.value.trim().toLocaleLowerCase(locale);
    const selectedCategory = category.value;
    const filtered = materials.map((item, index) => ({ ...item, originalNumber: index + 1 }))
      .filter(item => (selectedCategory === 'All' || item.category === selectedCategory)
        && (!query || [item.name, item.category, item.note || ''].some(value => String(value).toLocaleLowerCase(locale).includes(query))));
    filtered.sort((a, b) => {
      const comparison = sortKey === 'number' ? a.originalNumber - b.originalNumber
        : String(a[sortKey] || '').localeCompare(String(b[sortKey] || ''), locale, { sensitivity: 'base' });
      return ascending ? comparison : -comparison;
    });
    const rows = filtered.map((item, index) => {
      const row = document.createElement('tr');
      [String(index + 1), item.name, item.category, item.note || '—'].forEach(value => {
        const cell = document.createElement('td'); cell.textContent = value; row.appendChild(cell);
      });
      return row;
    });
    body.replaceChildren(...rows);
    count.textContent = locale === 'tr' ? filtered.length + ' / ' + materials.length + ' hammadde gösteriliyor'
      : 'Showing ' + filtered.length + ' of ' + materials.length + ' materials';
    empty.hidden = filtered.length !== 0;
  }
  search.addEventListener('input', render);
  category.addEventListener('change', render);
  direction.addEventListener('change', () => { ascending = direction.value === 'asc'; render(); });
  table.querySelectorAll('thead button[data-sort]').forEach(button => button.addEventListener('click', () => {
    const nextKey = button.dataset.sort; ascending = sortKey === nextKey ? !ascending : true;
    sortKey = nextKey; direction.value = ascending ? 'asc' : 'desc'; render();
  }));
  fetch('/api-catalog.json').then(response => {
    if (!response.ok) throw new Error('Catalogue request failed'); return response.json();
  }).then(data => {
    if (!Array.isArray(data)) throw new Error('Invalid catalogue format');
    materials = data.filter(item => item && typeof item.name === 'string' && typeof item.category === 'string');
    render();
  }).catch(() => {
    count.textContent = locale === 'tr' ? 'Katalog şu anda yüklenemiyor. Lütfen ekibimizle iletişime geçin.'
      : 'The catalogue could not be loaded. Please contact our team.';
  });
})();