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
    assert.ok(js.includes(tool + ':['), 'Falta la herramienta ' + tool);
    assert.ok(readme.toLowerCase().includes(tool === 'images' ? 'imágenes' : tool === 'editor' ? 'editor html/css/js' : tool === 'diff' ? 'comparador' : tool === 'qr' ? 'códigos qr' : 'markdown'));
  }
  assert.match(html, /src\/advanced-tools\.js/);
  assert.match(sw, /amilcartools-v7/);
  assert.match(sw, /src\/advanced-tools\.js/);
});

test('las funciones nuevas procesan en el navegador y no declaran APIs externas', () => {
  const js = fs.readFileSync(path.join(root, 'src/advanced-tools.js'), 'utf8');
  assert.match(js, /^\(function \(\) \{/);
  assert.match(js, /canvas\.toBlob/);
  assert.match(js, /function qr\(/);
  assert.match(js, /function diff\(/);
  assert.match(js, /function markdown\(/);
  assert.match(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), /sandbox="allow-scripts"/);
  assert.doesNotMatch(js, /fetch\s*\(|XMLHttpRequest|https:\/\//);
});

test('las cinco herramientas nuevas tienen botones, renderizado y acciones', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const js = fs.readFileSync(path.join(root, 'src/advanced-tools.js'), 'utf8');
  for (const tool of ['csv', 'jwt', 'html', 'list', 'css']) {
    assert.match(html, new RegExp('data-advanced-tool="' + tool + '"'));
    assert.ok(js.includes(tool + ':['), 'Falta renderizado para ' + tool);
  }
  for (const action of ['csv-convert', 'jwt-decode', 'html-convert', 'list-process', 'css-format']) {
    assert.ok(js.includes("'" + action + "'"), 'Falta acción ' + action);
  }
  assert.match(js, /function parseCsv\(/);
  assert.match(js, /function toCsv\(/);
  assert.match(js, /function decodeBase64Url\(/);
  assert.match(js, /function cssTransform\(/);
  assert.match(sw, /amilcartools-v7/);
});

test('24 herramientas adicionales enlazadas y con procesadores',()=>{const h=fs.readFileSync(path.join(root,'index.html'),'utf8'),j=fs.readFileSync(path.join(root,'src/extra-tools.js'),'utf8'),sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');for(const id of ["xml","sql","htmlvalidate","jsinspect","regexpro","palette","gradient","lorem","hashpro","totp","passcheck","wordpro","diffpro","csvclean","schema","favicon","svg","extractcolors","resize","ascii","seo","robots","timepro","calculator"]){assert.match(h,new RegExp('data-extra-tool="'+id+'"'));assert.ok(j.includes("'"+id+"'"))}assert.match(j,/async function run/);assert.match(sw,/amilcartools-v7/);assert.match(sw,/src\/extra-tools\.js/)});

test('el generador QR permite elegir colores locales',()=>{const js=fs.readFileSync(path.join(root,'src/advanced-tools.js'),'utf8');assert.match(js,/id="qr-fg" type="color"/);assert.match(js,/id="qr-bg" type="color"/);assert.match(js,/qrSvg\(qr\(v\)\)\.replace/)});
