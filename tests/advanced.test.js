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
  assert.match(sw, /amilcartools-v18/);
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
  assert.match(sw, /amilcartools-v18/);
});

test('24 herramientas adicionales enlazadas y con procesadores',()=>{const h=fs.readFileSync(path.join(root,'index.html'),'utf8'),j=fs.readFileSync(path.join(root,'src/extra-tools.js'),'utf8'),sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');for(const id of ["xml","sql","htmlvalidate","jsinspect","regexpro","palette","gradient","lorem","hashpro","totp","passcheck","wordpro","diffpro","csvclean","schema","favicon","svg","extractcolors","resize","ascii","seo","robots","timepro","calculator"]){assert.match(h,new RegExp('data-extra-tool="'+id+'"'));assert.ok(j.includes("'"+id+"'"))}assert.match(j,/async function run/);assert.match(sw,/amilcartools-v18/);assert.match(sw,/src\/extra-tools\.js/)});

test('el generador QR permite elegir colores locales',()=>{const js=fs.readFileSync(path.join(root,'src/advanced-tools.js'),'utf8');assert.match(js,/id="qr-fg" type="color"/);assert.match(js,/id="qr-bg" type="color"/);assert.match(js,/qrSvg\(qr\(v\)\)\.replace/)});

test('menú hamburguesa organiza herramientas y elimina botones duplicados',()=>{const h=fs.readFileSync(path.join(root,'index.html'),'utf8'),m=fs.readFileSync(path.join(root,'src/menu.js'),'utf8'),sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');assert.match(h,/id="menu-toggle"/);assert.match(h,/id="tool-menu"/);assert.match(h,/src\/menu\.js/);for(const group of ['Código y desarrollo','Texto y datos','Diseño e imágenes','Seguridad y utilidades'])assert.ok(m.includes(group));assert.match(sw,/amilcartools-v18/);assert.match(sw,/src\/menu\.js/);for(const id of ["xml","sql","htmlvalidate","jsinspect","regexpro","palette","gradient","lorem","hashpro","totp","passcheck","wordpro","diffpro","csvclean","schema","favicon","svg","extractcolors","resize","ascii","seo","robots","timepro","calculator"])assert.equal((h.match(new RegExp('data-extra-tool="'+id+'"','g'))||[]).length,1,'Botón duplicado o ausente: '+id)});

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


test('el menú muestra iconos por herramienta, accesos rápidos y contadores de categoría', () => {
  const menu = fs.readFileSync(path.join(root, 'src/menu.js'), 'utf8');
  const css = fs.readFileSync(path.join(root, 'src/styles.css'), 'utf8');
  const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  assert.match(menu, /const toolIcons=/);
  assert.match(menu, /className='menu-tool-icon'/);
  assert.match(menu, /id="menu-quick"/);
  assert.match(menu, /Accesos rápidos/);
  assert.match(menu, /count\.textContent=q\|\|filter==='favorites'\?visible\+'\/'\+all:String\(all\)/);
  assert.match(css, /\.menu-tool-icon/);
  assert.match(css, /\.menu-quick-section/);
  assert.match(sw, /amilcartools-v18/);
});


test('Image Studio permite transformar y ajustar imágenes antes de exportar',()=>{const js=fs.readFileSync(path.join(root,'src/advanced-tools.js'),'utf8'),css=fs.readFileSync(path.join(root,'src/styles.css'),'utf8'),sw=fs.readFileSync(path.join(root,'sw.js'),'utf8'),readme=fs.readFileSync(path.join(root,'README.md'),'utf8');for(const action of ['image-rotate-left','image-rotate-right','image-flip-x','image-flip-y','image-reset-edits'])assert.ok(js.includes(action),'Falta acción '+action);for(const id of ['image-brightness','image-contrast','image-saturation','image-grayscale'])assert.ok(js.includes(id),'Falta ajuste '+id);assert.match(js,/ctx\.rotate\(opts\.rotation\*Math\.PI\/180\)/);assert.match(js,/ctx\.filter='brightness\('/);assert.match(js,/ctx\.drawImage\(source\.image,-source\.width\/2,-source\.height\/2\)/);assert.ok(js.includes("blob.type==='image/webp'?'webp':blob.type==='image/jpeg'?'jpg':'png'"),'La extensión debe coincidir con el formato exportado.');assert.match(css,/\.image-edit-tools/);assert.match(readme,/Image Studio/);assert.match(sw,/amilcartools-v18/)});


test('el editor para programadores incluye vista en vivo, atajos, copia y exportación independiente',()=>{
  const js=fs.readFileSync(path.join(root,'src/advanced-tools.js'),'utf8');
  const css=fs.readFileSync(path.join(root,'src/styles.css'),'utf8');
  const readme=fs.readFileSync(path.join(root,'README.md'),'utf8');
  const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
  for(const id of ['editor-live','adv-html','adv-css','adv-js','adv-preview','editor-preview-status','editor-search','editor-line-count','editor-diagnostics'])assert.ok(js.includes(id),'Falta control '+id);
  for(const action of ['editor-run','editor-reset','editor-download','editor-copy-html','editor-copy-css','editor-copy-js'])assert.ok(js.includes(action),'Falta acción '+action);
  assert.match(js,/setTimeout\(runPreview,280\)/);assert.match(js,/function updateEditorMeta\(\)/);assert.match(js,/new Function\(values\[2\]\)/);assert.match(js,/data-editor-find/);
  assert.match(js,/event\.key==='Tab'/);
  assert.match(js,/event\.ctrlKey\|\|event\.metaKey/);
  assert.match(js,/proyecto-amilcartools\.html/);
  assert.match(js,/sandbox="allow-scripts"/);
  assert.match(css,/\.editor-code-card/);assert.match(css,/\.editor-pro-toolbar/);assert.match(css,/\.editor-diagnostics/);
  assert.match(css,/\.editor-preview-card/);
  assert.match(readme,/vista previa automática/i);
  assert.match(sw,/amilcartools-v18/);
});


test('la portada y el menú móvil tienen espaciado compacto y foco accesible',()=>{
  const css=fs.readFileSync(path.join(root,'src/styles.css'),'utf8');
  const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
  assert.match(css,/@media\(max-width:640px\)\{\s*\.topbar\{height:66px\}/);
  assert.match(css,/\.hero\{padding:30px 0 22px\}/);
  assert.match(css,/\.menu-search:focus,\.menu-search:focus-visible\{outline:none/);
  assert.match(css,/\.menu-shortcuts \.menu-item\{min-height:42px/);
  assert.match(css,/\.menu-drawer\{width:100vw;max-width:100vw/);
  assert.match(css,/env\(safe-area-inset-top\)/);
  assert.match(sw,/amilcartools-v18/);
});


test('la aplicación comienza con bienvenida y mantiene el tema elegido',()=>{
 const h=fs.readFileSync(path.join(root,'index.html'),'utf8'),a=fs.readFileSync(path.join(root,'src/app.js'),'utf8'),css=fs.readFileSync(path.join(root,'src/styles.css'),'utf8'),sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
 assert.match(h,/id="welcome-screen"/);assert.match(h,/id="start-app"/);assert.match(h,/id="inicio" hidden/);assert.match(h,/class="topbar" hidden/);
 assert.match(h,/data-theme-toggle/);assert.match(a,/startButton\.addEventListener/);assert.match(a,/amilcartools-theme/);assert.match(a,/basicWorkspace\.hidden = false/);assert.match(a,/advancedWorkspace\.hidden = true/);
 assert.match(css,/\.welcome-screen/);assert.match(css,/:root\[data-theme="light"\]/);assert.match(sw,/amilcartools-v18/);
});
test('las herramientas avanzadas cierran el panel básico y se ocultan hasta seleccionarse',()=>{
 const h=fs.readFileSync(path.join(root,'index.html'),'utf8'),a=fs.readFileSync(path.join(root,'src/advanced-tools.js'),'utf8'),x=fs.readFileSync(path.join(root,'src/extra-tools.js'),'utf8');
 assert.match(h,/id="basic-workspace" hidden/);assert.match(h,/id="advanced-tools"[^>]*hidden/);assert.match(a,/if\(basicWorkspace\)basicWorkspace\.hidden=true/);assert.match(a,/render\('editor'\);\s*root\.hidden=true/);assert.match(x,/root\.hidden=false;const basicWorkspace=document\.getElementById\('basic-workspace'\);if\(basicWorkspace\)basicWorkspace\.hidden=true/);
});

test('el editor incluye números de línea sincronizados y diagnóstico local',()=>{
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),js=fs.readFileSync(path.join(root,'src/advanced-tools.js'),'utf8'),css=fs.readFileSync(path.join(root,'src/styles.css'),'utf8'),readme=fs.readFileSync(path.join(root,'README.md'),'utf8');
 for(const id of ['adv-html','adv-css','adv-js']){assert.match(js,new RegExp('id="lines-'+id+'"'));assert.match(js,new RegExp('updateEditorLines\\(event.target.id\\)'));}
 assert.match(js,/function validateEditor\(\)/);assert.match(js,/new Function\(js\)/);assert.match(js,/new CSSStyleSheet\(\)/);assert.match(js,/id="editor-diagnostics"/);assert.match(css,/\.editor-line-numbers/);assert.match(css,/\.editor-diagnostics/);assert.match(readme,/números de línea sincronizados/);assert.match(html,/id="start-app"/);
});
