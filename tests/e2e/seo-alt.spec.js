const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

test('all pre-rendered images include an alt attribute', async ({ page }) => {
  const siteRoot = path.resolve(__dirname, '../..');
  const records = fs.readFileSync(path.join(siteRoot, 'data/live-page-inventory.jsonl'), 'utf8')
    .trim().split(/\r?\n/).map(line => JSON.parse(line)).filter(record => !record.redirectTo);
  const missing = [];

  for (const record of records) {
    const relativePath = record.path === '/'
      ? 'index.html'
      : record.path.endsWith('/')
        ? record.path.slice(1) + 'index.html'
        : record.path.slice(1);
    const html = fs.readFileSync(path.join(siteRoot, relativePath), 'utf8');
    const imagesWithoutAlt = await page.evaluate(source => {
      const doc = new DOMParser().parseFromString(source, 'text/html');
      if (doc.documentElement.getAttribute('data-prerendered') !== 'true') return [];
      return [...doc.querySelectorAll('img:not([alt])')]
        .map(image => image.getAttribute('src') || '(missing src)');
    }, html);
    if (imagesWithoutAlt.length) missing.push({ path: record.path, images: imagesWithoutAlt });
  }

  expect(missing).toEqual([]);
});
