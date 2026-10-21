const $ = (selector, root = document) => root.querySelector(selector);
const panel = $('#tool-panel');
const feedback = $('#feedback');
const tools = {
  text: { kicker: 'HERRAMIENTA 01', title: 'Analizador de texto', description: 'Cuenta caracteres, palabras y líneas al instante.' },
  json: { kicker: 'HERRAMIENTA 02', title: 'Formateador JSON', description: 'Ordena, valida y compacta JSON sin enviarlo a ningún sitio.' },
  password: { kicker: 'HERRAMIENTA 03', title: 'Generador de contraseñas', description: 'Crea contraseñas aleatorias localmente con opciones personalizables.' },
  base64: { kicker: 'HERRAMIENTA 04', title: 'Codificador Base64', description: 'Codifica o decodifica texto usando compatibilidad Unicode.' },
  url: { kicker: 'HERRAMIENTA 05', title: 'Codificador de URL', description: 'Codifica o decodifica componentes de URL.' },
  hash: { kicker: 'HERRAMIENTA 06', title: 'Generador SHA-256', description: 'Calcula el hash SHA-256 del texto introducido en tu dispositivo.' }
};
function setFeedback(message = '', error = false) { feedback.textContent = message; feedback.classList.toggle('error', error); }
function setTool(name) {
  document.querySelectorAll('.tab').forEach(button => button.classList.toggle('active', button.dataset.tool === name));
  $('#tool-kicker').textContent = tools[name].kicker;
  $('#tool-title').textContent = tools[name].title;
  $('#tool-description').textContent = tools[name].description;
  setFeedback();
  renderTool(name);
}
function renderTool(name) {
  if (name === 'text') panel.innerHTML = `<label class="field-label" for="text-input">Tu texto <small>El análisis se actualiza mientras escribes</small></label><textarea id="text-input" placeholder="Escribe o pega aquí tu texto…"></textarea><div class="stats-grid"><div class="stat"><strong id="characters">0</strong><span>Caracteres</span></div><div class="stat"><strong id="no-spaces">0</strong><span>Sin espacios</span></div><div class="stat"><strong id="words">0</strong><span>Palabras</span></div><div class="stat"><strong id="lines">0</strong><span>Líneas</span></div></div><div class="control-row"><button class="btn" data-action="upper">MAYÚSCULAS</button><button class="btn" data-action="lower">minúsculas</button><button class="btn" data-action="trim">Quitar espacios extra</button><button class="btn" data-action="copy-text">Copiar texto</button><button class="btn" data-action="clear-text">Limpiar</button></div>`;
  if (name === 'json') panel.innerHTML = `<label class="field-label" for="json-input">JSON de entrada <small>Admite objetos y listas</small></label><textarea id="json-input" placeholder='{"nombre":"Amilcar","activo":true}'></textarea><div class="control-row"><button class="btn primary" data-action="pretty">Formatear JSON</button><button class="btn" data-action="minify">Minificar JSON</button><button class="btn" data-action="copy-json">Copiar resultado</button></div><label class="field-label" for="json-output" style="margin-top:18px">Resultado</label><textarea id="json-output" placeholder="El resultado aparecerá aquí…" readonly></textarea>`;
  if (name === 'password') panel.innerHTML = `<label class="field-label" for="password-output">Tu nueva contraseña <small>Se genera en este dispositivo</small></label><input id="password-output" type="text" readonly autocomplete="off" placeholder="Pulsa Generar contraseña"><div class="options"><label>Longitud <input id="password-length" type="number" min="8" max="128" value="20"></label><label><input id="include-upper" type="checkbox" checked> Mayúsculas</label><label><input id="include-lower" type="checkbox" checked> Minúsculas</label><label><input id="include-number" type="checkbox" checked> Números</label><label><input id="include-symbol" type="checkbox" checked> Símbolos</label></div><div class="strength"><span id="strength-bar"></span></div><div class="control-row"><button class="btn primary" data-action="generate-password">Generar contraseña</button><button class="btn" data-action="copy-password">Copiar</button></div><p style="font-size:11px;color:var(--muted);line-height:1.6">Guarda la contraseña en un gestor seguro. No se almacena en esta aplicación.</p>`;
  if (name === 'base64') panel.innerHTML = `<label class="field-label" for="base64-input">Texto de entrada</label><textarea id="base64-input" placeholder="Escribe el texto que quieres codificar o decodificar…"></textarea><div class="control-row"><button class="btn primary" data-action="encode-base64">Codificar → Base64</button><button class="btn" data-action="decode-base64">Decodificar ← Base64</button><button class="btn" data-action="copy-base64">Copiar resultado</button></div><label class="field-label" for="base64-output" style="margin-top:18px">Resultado</label><textarea id="base64-output" readonly placeholder="El resultado aparecerá aquí…"></textarea>`;
  if (name === 'url') panel.innerHTML = `<label class="field-label" for="url-input">Texto o componente de URL</label><textarea id="url-input" placeholder="Ejemplo: hola mundo & café"></textarea><div class="control-row"><button class="btn primary" data-action="encode-url">Codificar</button><button class="btn" data-action="decode-url">Decodificar</button><button class="btn" data-action="copy-url">Copiar resultado</button></div><label class="field-label" for="url-output" style="margin-top:18px">Resultado</label><textarea id="url-output" readonly placeholder="El resultado aparecerá aquí…"></textarea>`;
  if (name === 'hash') panel.innerHTML = `<label class="field-label" for="hash-input">Texto para calcular su hash</label><textarea id="hash-input" placeholder="Escribe o pega el texto…"></textarea><div class="control-row"><button class="btn primary" data-action="make-hash">Calcular SHA-256</button><button class="btn" data-action="copy-hash">Copiar hash</button></div><label class="field-label" for="hash-output" style="margin-top:18px">SHA-256 hexadecimal</label><div id="hash-output" class="result-box" aria-live="polite">El hash aparecerá aquí…</div>`;
  if (name === 'text') updateTextStats();
}
function updateTextStats() {
  const input = $('#text-input'); if (!input) return;
  const value = input.value;
  $('#characters').textContent = value.length.toLocaleString('es');
  $('#no-spaces').textContent = value.replace(/\s/g, '').length.toLocaleString('es');
  $('#words').textContent = (value.trim().match(/\S+/g) || []).length.toLocaleString('es');
  $('#lines').textContent = value.length ? value.split(/\r\n|\r|\n/).length.toLocaleString('es') : '0';
}
function randomPassword(length, sets) {
  const selected = sets.filter(Boolean);
  if (!selected.length) throw new Error('Activa al menos un tipo de carácter.');
  const all = selected.join('');
  const randomIndex = max => { const limit = Math.floor(256 / max) * max; let byte; do { byte = crypto.getRandomValues(new Uint8Array(1))[0]; } while (byte >= limit); return byte % max; };
  const result = selected.map(set => set[randomIndex(set.length)]);
  while (result.length < length) result.push(all[randomIndex(all.length)]);
  for (let i = result.length - 1; i > 0; i--) { const j = randomIndex(i + 1); [result[i], result[j]] = [result[j], result[i]]; }
  return result.join('');
}
async function copyText(value) {
  if (!value) throw new Error('No hay contenido para copiar.');
  if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
  else { const temp = document.createElement('textarea'); temp.value = value; temp.style.position = 'fixed'; temp.style.opacity = '0'; document.body.append(temp); temp.select(); const copied = document.execCommand('copy'); temp.remove(); if (!copied) throw new Error('No se pudo copiar automáticamente. Selecciona el texto y cópialo.'); }
  setFeedback('Copiado al portapapeles.');
}
function read(id) { return $(id)?.value ?? ''; }
function write(id, value) { const node = $(id); if (node) node.value = value; }
async function runAction(action) {
  try {
    setFeedback();
    switch (action) {
      case 'upper': write('#text-input', read('#text-input').toLocaleUpperCase()); updateTextStats(); break;
      case 'lower': write('#text-input', read('#text-input').toLocaleLowerCase()); updateTextStats(); break;
      case 'trim': write('#text-input', read('#text-input').split(/\r?\n/).map(line => line.trim().replace(/\s+/g, ' ')).join('\n').trim()); updateTextStats(); break;
      case 'copy-text': await copyText(read('#text-input')); break;
      case 'clear-text': write('#text-input', ''); updateTextStats(); setFeedback('Texto limpiado.'); break;
      case 'pretty': write('#json-output', JSON.stringify(JSON.parse(read('#json-input')), null, 2)); setFeedback('JSON válido y formateado.'); break;
      case 'minify': write('#json-output', JSON.stringify(JSON.parse(read('#json-input')))); setFeedback('JSON válido y minificado.'); break;
      case 'copy-json': await copyText(read('#json-output')); break;
      case 'generate-password': {
        const length = Number(read('#password-length'));
        if (!Number.isInteger(length) || length < 8 || length > 128) throw new Error('La longitud debe ser un número entre 8 y 128.');
        const sets = [$('#include-upper').checked ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : '', $('#include-lower').checked ? 'abcdefghijkmnopqrstuvwxyz' : '', $('#include-number').checked ? '23456789' : '', $('#include-symbol').checked ? '!@#$%^&*()-_=+[]{};:,.?' : ''];
        const password = randomPassword(length, sets); write('#password-output', password);
        const variety = sets.filter(Boolean).length; const score = Math.min(100, Math.round((length / 64) * 55 + variety * 11)); $('#strength-bar').style.width = `${score}%`; $('#strength-bar').style.background = score > 70 ? 'var(--accent2)' : score > 45 ? '#f6cf78' : 'var(--danger)'; setFeedback('Contraseña generada. No se ha guardado.'); break;
      }
      case 'copy-password': await copyText(read('#password-output')); break;
      case 'encode-base64': write('#base64-output', btoa(Array.from(new TextEncoder().encode(read('#base64-input')), byte => String.fromCharCode(byte)).join(''))); setFeedback('Texto codificado.'); break;
      case 'decode-base64': { const binary = atob(read('#base64-input').trim()); const bytes = Uint8Array.from(binary, char => char.charCodeAt(0)); write('#base64-output', new TextDecoder('utf-8', { fatal: true }).decode(bytes)); setFeedback('Base64 decodificado.'); break; }
      case 'copy-base64': await copyText(read('#base64-output')); break;
      case 'encode-url': write('#url-output', encodeURIComponent(read('#url-input'))); setFeedback('Texto codificado.'); break;
      case 'decode-url': write('#url-output', decodeURIComponent(read('#url-input'))); setFeedback('Texto decodificado.'); break;
      case 'copy-url': await copyText(read('#url-output')); break;
      case 'make-hash': { if (!crypto.subtle) throw new Error('Web Crypto no está disponible. Abre esta página mediante HTTPS o localhost.'); const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(read('#hash-input'))); $('#hash-output').textContent = Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join(''); setFeedback('Hash calculado localmente.'); break; }
      case 'copy-hash': await copyText($('#hash-output').textContent === 'El hash aparecerá aquí…' ? '' : $('#hash-output').textContent); break;
    }
  } catch (error) { setFeedback(error.message || 'No se pudo procesar el contenido.', true); }
}
document.querySelectorAll('.tab').forEach(button => button.addEventListener('click', () => setTool(button.dataset.tool)));
panel.addEventListener('input', event => { if (event.target.id === 'text-input') updateTextStats(); });
panel.addEventListener('click', event => { const button = event.target.closest('[data-action]'); if (button) runAction(button.dataset.action); });
setTool('text');
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
