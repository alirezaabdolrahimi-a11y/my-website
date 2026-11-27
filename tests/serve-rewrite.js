'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const inventoryFile = path.join(root, 'data/live-page-inventory.jsonl');
const publishedPaths = new Set(
  fs.readFileSync(inventoryFile, 'utf8')
    .trim()
    .split(/\\r?\\n/)
    .map(line => JSON.parse(line).path)
);
publishedPaths.add('/index.html');

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jsonl': 'application/x-ndjson; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.rtf': 'application/rtf',
  '.pdf': 'application/pdf'
};

const server = http.createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    response.writeHead(400).end('Bad Request');
    return;
  }

  const servedPath = publishedPaths.has(pathname)
    ? path.join(root, 'rebuild/index.html')
    : path.resolve(root, '.' + pathname);

  if (servedPath !== path.join(root, 'rebuild/index.html') &&
      servedPath !== root && !servedPath.startsWith(root + path.sep)) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  let file = servedPath;
  try {
    if (fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    const body = fs.readFileSync(file);
    response.writeHead(200, {
      'Content-Type': contentTypes[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not Found');
  }
});

server.listen(4173, '127.0.0.1');
