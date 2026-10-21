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
  assert.match(sw, /amilcartools-v10/);
  assert.match(sw, /src\/advanced-tools\.js/);
});

test('las funciones nuevas procesan en el navegador y no declaran APIs externas', () => {
  const js = fs.readFileSync(path.join(root, 'src/advanced-tools.js'), 'utf8');
  assert.match(js, /^\(function \(\) \{/);
  assert.match(js, /canvas\.toBlob/);
  assert.match(js, /function qr\(/);
  assert.match(js, /function diff\(/);
  assert.match(js, /function markdown\(/);
  assert.match(js, /sandbox="allow-scripts"/);
  assert.doesNotMatch(js, /fetch\s*\(|XMLHttpRequest/);
});

test('las cinco herramientas nuevas tienen botones, renderizado y acciones', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const js = fs.readFileSync(path.join(root, 'src/advanced-tools.js'), 'utf8');
  const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
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
  assert.match(sw, /amilcartools-v10/);
});

test('24 herramientas adicionales enlazadas y con procesadores',()=>{const h=fs.readFileSync(path.join(root,'index.html'),'utf8'),j=fs.readFileSync(path.join(root,'src/extra-tools.js'),'utf8'),sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');for(const id of ["xml","sql","htmlvalidate","jsinspect","regexpro","palette","gradient","lorem","hashpro","totp","passcheck","wordpro","diffpro","csvclean","schema","favicon","svg","extractcolors","resize","ascii","seo","robots","timepro","calculator"]){assert.match(h,new RegExp('data-extra-tool="'+id+'"'));assert.ok(j.includes("'"+id+"'"))}assert.match(j,/async function run/);assert.match(sw,/amilcartools-v10/);assert.match(sw,/src\/extra-tools\.js/)});

test('el generador QR permite elegir colores locales',()=>{const js=fs.readFileSync(path.join(root,'src/advanced-tools.js'),'utf8');assert.match(js,/id="qr-fg" type="color"/);assert.match(js,/id="qr-bg" type="color"/);assert.match(js,/qrSvg\(qr\(v\)\)\.replace/)});

test('menú hamburguesa organiza herramientas y elimina botones duplicados',()=>{const h=fs.readFileSync(path.join(root,'index.html'),'utf8'),m=fs.readFileSync(path.join(root,'src/menu.js'),'utf8'),sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');assert.match(h,/id="menu-toggle"/);assert.match(h,/id="tool-menu"/);assert.match(h,/src\/menu\.js/);for(const group of ['Código y desarrollo','Texto y datos','Diseño e imágenes','Seguridad y utilidades'])assert.ok(m.includes(group));assert.match(sw,/amilcartools-v10/);assert.match(sw,/src\/menu\.js/);for(const id of ["xml","sql","htmlvalidate","jsinspect","regexpro","palette","gradient","lorem","hashpro","totp","passcheck","wordpro","diffpro","csvclean","schema","favicon","svg","extractcolors","resize","ascii","seo","robots","timepro","calculator"])assert.equal((h.match(new RegExp('data-extra-tool="'+id+'"','g'))||[]).length,1,'Botón duplicado o ausente: '+id)});

test('el menú incluye búsqueda, favoritos e historial local', () => {
  const menu = fs.readFileSync(path.join(root, 'src/menu.js'), 'utf8');
  const css = fs.readFileSync(path.join(root, 'src/styles.css'), 'utf8');
  assert.match(menu, /type="search"/);
  assert.match(menu, /data-menu-filter="favorites"/);
  assert.match(menu, /amilcartools-menu-v2/);
  assert.match(menu, /recent/);
  assert.match(menu, /localStorage/);
  assert.match(css, /\.menu-search/);
  assert.match(css, /\.menu-favorite/);
});

test('cada herramienta adicional está en el menú y tiene un procesador', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const menu = fs.readFileSync(path.join(root, 'src/menu.js'), 'utf8');
  const js = fs.readFileSync(path.join(root, 'src/extra-tools.js'), 'utf8');
  for (const id of ["xml","sql","htmlvalidate","jsinspect","regexpro","palette","gradient","lorem","hashpro","totp","passcheck","wordpro","diffpro","csvclean","schema","favicon","svg","extractcolors","resize","ascii","seo","robots","timepro","calculator"]) {
    assert.match(html, new RegExp('data-extra-tool="' + id + '"'));
    assert.ok(menu.includes("['" + id + "'"), 'Falta en el menú: ' + id);
    assert.ok(js.includes("case '" + id + "'"), 'Falta procesador: ' + id);
  }
});

test('el parser CSV admite comas y comillas escapadas y el conversor XML conserva estructuras', () => {
  const js = fs.readFileSync(path.join(root, 'src/extra-tools.js'), 'utf8');
  assert.match(js, /if\(c==='"'&&s\[i\+1\]==='"'\)/);
  assert.match(js, /campo entre comillas sin cerrar/);
  assert.match(js, /@attributes/);
  assert.match(js, /Nombre XML no válido/);
  assert.match(js, /scripts, eventos o enlaces peligrosos/);
});

test('Image Studio ofrece lotes, presets, límites y procesamiento local', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const js = fs.readFileSync(path.join(root, 'src/advanced-tools.js'), 'utf8');
  const css = fs.readFileSync(path.join(root, 'src/styles.css'), 'utf8');
  const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
  assert.match(js, /id="image-file"[^>]*multiple/);
  assert.match(js, /id="image-preset"/);
  assert.match(js, /image-batch/);
  assert.match(js, /20 imágenes por lote/i);
  assert.match(js, /createObjectURL/);
  assert.match(js, /revokeObjectURL/);
  assert.match(js, /toBlob/);
  assert.match(css, /\.image-batch-row/);
  assert.match(readme, /### Image Studio/);
  assert.match(readme, /not uploaded to a server/i);
  assert.match(html, /data-advanced-tool="images"/);
});

test('el menú mejora búsqueda, accesibilidad y controles de teclado', () => {
  const menu = fs.readFileSync(path.join(root, 'src/menu.js'), 'utf8');
  const css = fs.readFileSync(path.join(root, 'src/styles.css'), 'utf8');
  assert.match(menu, /normalize\(value\)/);
  assert.match(menu, /menu-search-clear/);
  assert.match(menu, /menu-result-count/);
  assert.match(menu, /search\.focus\(\{preventScroll:true\}\)/);
  assert.match(menu, /e\.key==='Escape'/);
  assert.match(menu, /e\.key==='\/'/);
  assert.match(menu, /lastFocused\.focus\(\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /overscroll-behavior:contain/);
  assert.match(css, /\.menu-search-clear/);
});
