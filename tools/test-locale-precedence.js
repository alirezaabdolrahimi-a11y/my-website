'use strict';
const fs = require('fs');
const vm = require('vm');
const assert = require('assert');
const source = fs.readFileSync('fa-translation.js', 'utf8');

function run(path, search, savedLanguage) {
  const origin = 'https://www.niaznet.net';
  const window = {
    location: new URL(path + search, origin),
    localStorage: { getItem: () => savedLanguage },
    history: {
      state: null,
      replaceState(_state, _title, next) {
        window.location = new URL(next, origin);
      }
    }
  };
  const appended = [];
  const document = {
    documentElement: { lang: 'en' },
    querySelector: () => null,
    createElement: () => ({ dataset: {}, setAttribute() {} }),
    head: { appendChild: node => appended.push(node) }
  };
  vm.runInNewContext(source, { window, document, URL, URLSearchParams });
  return { appended, location: window.location };
}

let result = run('/index.html', '', 'fa');
assert.strictEqual(result.appended.length, 1, 'saved Persian preference should activate on the unqualified EN homepage');
assert.strictEqual(result.location.searchParams.get('lang'), 'fa', 'saved preference should be reflected in the URL');
assert.strictEqual(result.appended[0].async, false, 'runtime must be inserted with deterministic execution order');

result = run('/index.html', '?lang=en', 'fa');
assert.strictEqual(result.appended.length, 0, 'explicit EN query must override saved Persian preference');
assert.strictEqual(result.location.searchParams.get('lang'), 'en');

result = run('/es/index.html', '?lang=fa', 'fa');
assert.strictEqual(result.appended.length, 0, 'ES route must take precedence over stale Persian query and preference');
assert.strictEqual(result.location.searchParams.get('lang'), 'fa');

result = run('/fr/index.html', '', 'fa');
assert.strictEqual(result.appended.length, 0, 'FR route must not inherit saved Persian preference');
assert.strictEqual(result.location.search, '');

result = run('/tr/index.html', '?lang=fa', 'fa');
assert.strictEqual(result.appended.length, 0, 'TR route must take precedence over stale Persian query');

result = run('/contact.html', '?lang=fa', null);
assert.strictEqual(result.appended.length, 1, 'explicit Persian query should activate the runtime on an EN content route');

result = run('/index.html', '', null);
assert.strictEqual(result.appended.length, 0, 'no saved preference or query should leave EN unchanged');

console.log('LOCALE PRECEDENCE PASS: 7 scenarios');
