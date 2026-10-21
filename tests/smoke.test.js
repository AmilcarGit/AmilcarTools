const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');

test('la aplicación incluye las seis herramientas anunciadas', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const js = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
  for (const tool of ['text', 'json', 'password', 'base64', 'url', 'hash']) {
    assert.match(html, new RegExp(`data-tool="${tool}"`));
    assert.ok(js.includes(`if (name === '${tool}')`), `Falta renderizado de ${tool}`);
  }
});

test('la aplicación no declara dependencias de ejecución', () => {
  assert.equal(fs.existsSync(path.join(root, 'package.json')), false);
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.doesNotMatch(html, /<script[^>]+src="https?:\/\//i);
});

test('la aplicación contiene soporte de caché offline y manifiesto', () => {
  assert.ok(fs.existsSync(path.join(root, 'sw.js')));
  assert.ok(fs.existsSync(path.join(root, 'manifest.webmanifest')));
  assert.match(fs.readFileSync(path.join(root, 'sw.js'), 'utf8'), /caches\.open/);
});
