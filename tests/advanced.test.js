const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');

test('las cinco herramientas avanzadas están enlazadas y documentadas', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const js = fs.readFileSync(path.join(root, 'src/advanced-tools.js'), 'utf8');
  const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
  for (const tool of ['editor', 'images', 'qr', 'diff', 'markdown']) {
    assert.match(html, new RegExp('data-advanced-tool="' + tool + '"'));
    assert.ok(js.includes("'" + tool + "'"), 'Falta la herramienta ' + tool);
    assert.ok(readme.toLowerCase().includes(tool === 'images' ? 'imágenes' : tool === 'editor' ? 'editor html/css/js' : tool === 'diff' ? 'comparador' : tool === 'qr' ? 'códigos qr' : 'markdown'));
  }
  assert.match(html, /src\/advanced-tools\.js/);
  assert.match(sw, /amilcartools-v3/);
  assert.match(sw, /src\/advanced-tools\.js/);
});

test('las funciones nuevas procesan en el navegador y no declaran APIs externas', () => {
  const js = fs.readFileSync(path.join(root, 'src/advanced-tools.js'), 'utf8');
  assert.match(js, /canvas\.toBlob/);
  assert.match(js, /function qr\(/);
  assert.match(js, /function diff\(/);
  assert.match(js, /function markdown\(/);
  assert.match(js, /sandbox="allow-scripts"/);
  assert.doesNotMatch(js, /fetch\s*\(|XMLHttpRequest|https:\/\//);
});
