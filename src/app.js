const $ = (selector, root = document) => root.querySelector(selector);
const panel = $('#tool-panel');
const feedback = $('#feedback');
const tools = {
  text: { kicker: 'HERRAMIENTA 01', title: 'Analizador de texto', description: 'Cuenta caracteres, palabras y líneas al instante.' },
  json: { kicker: 'HERRAMIENTA 02', title: 'Formateador JSON', description: 'Ordena, valida y compacta JSON sin enviarlo a ningún sitio.' },
  password: { kicker: 'HERRAMIENTA 03', title: 'Generador de contraseñas', description: 'Crea contraseñas aleatorias localmente con opciones personalizables.' },
  base64: { kicker: 'HERRAMIENTA 04', title: 'Codificador Base64', description: 'Codifica o decodifica texto usando compatibilidad Unicode.' },
  url: { kicker: 'HERRAMIENTA 05', title: 'Codificador de URL', description: 'Codifica o decodifica componentes de URL.' },
  hash: { kicker: 'HERRAMIENTA 06', title: 'Generador SHA-256', description: 'Calcula el hash SHA-256 del texto introducido en tu dispositivo.' },
  uuid: { kicker: 'HERRAMIENTA 07', title: 'Generador UUID', description: 'Crea identificadores únicos aleatorios directamente en tu navegador.' },
  color: { kicker: 'HERRAMIENTA 08', title: 'Conversor de colores', description: 'Convierte colores HEX a RGB y HSL y revisa el contraste.' },
  regex: { kicker: 'HERRAMIENTA 09', title: 'Probador de expresiones regulares', description: 'Prueba patrones regex con texto de ejemplo, sin enviar datos.' },
  timestamp: { kicker: 'HERRAMIENTA 10', title: 'Conversor de tiempo Unix', description: 'Convierte fechas a timestamps y timestamps a fechas locales y UTC.' }
};
function setFeedback(message = '', error = false) { feedback.textContent = message; feedback.classList.toggle('error', error); }
function setTool(name) {
  const basicWorkspace = $('#basic-workspace');
  const advancedWorkspace = $('#advanced-tools');
  if (basicWorkspace) basicWorkspace.hidden = false;
  if (advancedWorkspace) advancedWorkspace.hidden = true;
  document.querySelectorAll('.tab').forEach(button => button.classList.toggle('active', button.dataset.tool === name));
  $('#tool-kicker').textContent = tools[name].kicker;
  $('#tool-title').textContent = tools[name].title;
  $('#tool-description').textContent = tools[name].description;
  setFeedback();
  renderTool(name);
  if (name === 'color') updateColor();
}
function renderTool(name) {
  if (name === 'text') panel.innerHTML = `<label class="field-label" for="text-input">Tu texto <small>El análisis se actualiza mientras escribes</small></label><textarea id="text-input" placeholder="Escribe o pega aquí tu texto…"></textarea><div class="stats-grid"><div class="stat"><strong id="characters">0</strong><span>Caracteres</span></div><div class="stat"><strong id="no-spaces">0</strong><span>Sin espacios</span></div><div class="stat"><strong id="words">0</strong><span>Palabras</span></div><div class="stat"><strong id="lines">0</strong><span>Líneas</span></div></div><div class="control-row"><button class="btn" data-action="upper">MAYÚSCULAS</button><button class="btn" data-action="lower">minúsculas</button><button class="btn" data-action="trim">Quitar espacios extra</button><button class="btn" data-action="copy-text">Copiar texto</button><button class="btn" data-action="clear-text">Limpiar</button></div>`;
  if (name === 'json') panel.innerHTML = `<label class="field-label" for="json-input">JSON de entrada <small>Admite objetos y listas</small></label><textarea id="json-input" placeholder='{"nombre":"Amilcar","activo":true}'></textarea><div class="control-row"><button class="btn primary" data-action="pretty">Formatear JSON</button><button class="btn" data-action="minify">Minificar JSON</button><button class="btn" data-action="copy-json">Copiar resultado</button></div><label class="field-label" for="json-output" style="margin-top:18px">Resultado</label><textarea id="json-output" placeholder="El resultado aparecerá aquí…" readonly></textarea>`;
  if (name === 'password') panel.innerHTML = `<label class="field-label" for="password-output">Tu nueva contraseña <small>Se genera en este dispositivo</small></label><input id="password-output" type="text" readonly autocomplete="off" placeholder="Pulsa Generar contraseña"><div class="options"><label>Longitud <input id="password-length" type="number" min="8" max="128" value="20"></label><label><input id="include-upper" type="checkbox" checked> Mayúsculas</label><label><input id="include-lower" type="checkbox" checked> Minúsculas</label><label><input id="include-number" type="checkbox" checked> Números</label><label><input id="include-symbol" type="checkbox" checked> Símbolos</label></div><div class="strength"><span id="strength-bar"></span></div><div class="control-row"><button class="btn primary" data-action="generate-password">Generar contraseña</button><button class="btn" data-action="copy-password">Copiar</button></div><p style="font-size:11px;color:var(--muted);line-height:1.6">Guarda la contraseña en un gestor seguro. No se almacena en esta aplicación.</p>`;
  if (name === 'base64') panel.innerHTML = `<label class="field-label" for="base64-input">Texto de entrada</label><textarea id="base64-input" placeholder="Escribe el texto que quieres codificar o decodificar…"></textarea><div class="control-row"><button class="btn primary" data-action="encode-base64">Codificar → Base64</button><button class="btn" data-action="decode-base64">Decodificar ← Base64</button><button class="btn" data-action="copy-base64">Copiar resultado</button></div><label class="field-label" for="base64-output" style="margin-top:18px">Resultado</label><textarea id="base64-output" readonly placeholder="El resultado aparecerá aquí…"></textarea>`;
  if (name === 'url') panel.innerHTML = `<label class="field-label" for="url-input">Texto o componente de URL</label><textarea id="url-input" placeholder="Ejemplo: hola mundo & café"></textarea><div class="control-row"><button class="btn primary" data-action="encode-url">Codificar</button><button class="btn" data-action="decode-url">Decodificar</button><button class="btn" data-action="copy-url">Copiar resultado</button></div><label class="field-label" for="url-output" style="margin-top:18px">Resultado</label><textarea id="url-output" readonly placeholder="El resultado aparecerá aquí…"></textarea>`;
  if (name === 'hash') panel.innerHTML = `<label class="field-label" for="hash-input">Texto para calcular su hash</label><textarea id="hash-input" placeholder="Escribe o pega el texto…"></textarea><div class="control-row"><button class="btn primary" data-action="make-hash">Calcular SHA-256</button><button class="btn" data-action="copy-hash">Copiar hash</button></div><label class="field-label" for="hash-output" style="margin-top:18px">SHA-256 hexadecimal</label><div id="hash-output" class="result-box" aria-live="polite">El hash aparecerá aquí…</div>`;
  if (name === 'uuid') panel.innerHTML = `<label class="field-label" for="uuid-output">Identificador UUID v4 <small>Generación criptográficamente segura</small></label><textarea id="uuid-output" rows="3" readonly placeholder="Pulsa Generar UUID"></textarea><div class="control-row"><button class="btn primary" data-action="generate-uuid">Generar UUID</button><button class="btn" data-action="generate-uuids">Generar 10</button><button class="btn" data-action="copy-uuid">Copiar</button></div><p style="font-size:11px;color:var(--muted);line-height:1.6">Los UUID sirven como identificadores; no son contraseñas ni secretos de autenticación.</p>`;
  if (name === 'color') panel.innerHTML = `<label class="field-label" for="color-picker">Elige un color</label><div class="color-row"><input id="color-picker" type="color" value="#a99bff" aria-label="Selector de color"><input id="color-hex" type="text" value="#a99bff" maxlength="7" spellcheck="false" aria-label="Color hexadecimal"></div><div class="color-preview" id="color-preview"><span>Vista previa</span></div><div class="stats-grid"><div class="stat"><strong id="color-rgb">169, 155, 255</strong><span>RGB</span></div><div class="stat"><strong id="color-hsl">248°, 100%, 80%</strong><span>HSL</span></div><div class="stat"><strong id="color-contrast">—</strong><span>Contraste con blanco</span></div><div class="stat"><strong id="color-contrast-dark">—</strong><span>Contraste con negro</span></div></div><div class="control-row"><button class="btn" data-action="copy-hex">Copiar HEX</button><button class="btn" data-action="copy-rgb">Copiar RGB</button><button class="btn" data-action="copy-hsl">Copiar HSL</button></div>`;
  if (name === 'regex') panel.innerHTML = `<label class="field-label" for="regex-pattern">Expresión regular <small>Sin barras / /</small></label><input id="regex-pattern" type="text" value="\\b\\w+\\b" placeholder="Ej. \\d+" spellcheck="false"><div class="options"><label>Flags <input id="regex-flags" type="text" value="gi" maxlength="6" spellcheck="false" style="width:72px"></label><span>Flags comunes: g, i, m, s, u</span></div><label class="field-label" for="regex-text" style="margin-top:16px">Texto de prueba</label><textarea id="regex-text" placeholder="Escribe aquí el texto donde buscar coincidencias…">Hola mundo. Hola AmilcarTools 123.</textarea><div class="control-row"><button class="btn primary" data-action="test-regex">Probar expresión</button><button class="btn" data-action="copy-regex">Copiar coincidencias</button></div><label class="field-label" for="regex-output" style="margin-top:18px">Coincidencias</label><div id="regex-output" class="result-box" aria-live="polite">El resultado aparecerá aquí…</div>`;
  if (name === 'timestamp') panel.innerHTML = `<label class="field-label" for="date-input">Fecha y hora local</label><input id="date-input" type="datetime-local"><div class="control-row"><button class="btn primary" data-action="date-to-timestamp">Convertir fecha</button></div><div class="two-col" style="margin-top:18px"><div><label class="field-label" for="timestamp-seconds">Timestamp en segundos</label><input id="timestamp-seconds" type="number" placeholder="Ej. 1735689600"></div><div><label class="field-label" for="timestamp-ms">Timestamp en milisegundos</label><input id="timestamp-ms" type="number" placeholder="Ej. 1735689600000"></div></div><div class="control-row"><button class="btn" data-action="timestamp-to-date">Convertir timestamp</button><button class="btn" data-action="timestamp-now">Usar ahora</button></div><label class="field-label" style="margin-top:18px">Fecha interpretada</label><div id="timestamp-output" class="result-box" aria-live="polite">La fecha aparecerá aquí…</div>`;
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
function createUuid() {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
function updateColor() {
  const hexInput = $('#color-hex'); const picker = $('#color-picker');
  if (!hexInput || !picker) return;
  const hex = hexInput.value.trim().replace(/^#/, '');
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) { hexInput.setAttribute('aria-invalid', 'true'); return; }
  hexInput.removeAttribute('aria-invalid');
  const normalized = `#${hex.toLowerCase()}`; picker.value = normalized;
  const values = [0, 2, 4].map(index => parseInt(hex.slice(index, index + 2), 16));
  const [r, g, b] = values.map(value => value / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
  let h = 0, s = 0; const l = (max + min) / 2;
  if (delta) {
    s = delta / (1 - Math.abs(2 * l - 1));
    if (max === r) h = 60 * (((g - b) / delta) % 6);
    else if (max === g) h = 60 * ((b - r) / delta + 2);
    else h = 60 * ((r - g) / delta + 4);
  }
  h = (h + 360) % 360;
  const rgbText = values.join(', ');
  const hslText = `${Math.round(h)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
  const luminance = values.map(value => { const c = value / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
  const contrastWhite = 1.05 / (luminance + 0.05);
  const contrastBlack = (luminance + 0.05) / 0.05;
  $('#color-rgb').textContent = rgbText; $('#color-hsl').textContent = hslText;
  $('#color-contrast').textContent = contrastWhite.toFixed(2) + ':1'; $('#color-contrast-dark').textContent = contrastBlack.toFixed(2) + ':1';
  $('#color-preview').style.background = normalized;
  $('#color-preview').style.color = luminance > 0.42 ? '#111' : '#fff';
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
      case 'generate-uuid': write('#uuid-output', createUuid()); setFeedback('UUID generado localmente.'); break;
      case 'generate-uuids': write('#uuid-output', Array.from({ length: 10 }, createUuid).join('\n')); setFeedback('Se generaron 10 UUID.'); break;
      case 'copy-uuid': await copyText(read('#uuid-output')); break;
      case 'copy-hex': await copyText(read('#color-hex').toUpperCase()); break;
      case 'copy-rgb': await copyText($('#color-rgb').textContent); break;
      case 'copy-hsl': await copyText($('#color-hsl').textContent); break;
      case 'test-regex': {
        const pattern = read('#regex-pattern'); const flags = read('#regex-flags');
        if (/[^dgimsuvy]/.test(flags) || new Set(flags).size !== flags.length) throw new Error('Las flags contienen caracteres no válidos o repetidos.');
        const regex = new RegExp(pattern, flags); const input = read('#regex-text'); const matches = Array.from(input.matchAll(new RegExp(regex.source, flags.includes('g') ? flags : flags + 'g')));
        $('#regex-output').textContent = matches.length ? matches.map((match, index) => `${index + 1}. "${match[0]}" — índice ${match.index}${match.length > 1 ? ` — grupos: ${match.slice(1).join(', ')}` : ''}`).join('\n') : 'No se encontraron coincidencias.';
        setFeedback(`${matches.length} coincidencia(s).`); break;
      }
      case 'copy-regex': await copyText($('#regex-output').textContent === 'El resultado aparecerá aquí…' ? '' : $('#regex-output').textContent); break;
      case 'date-to-timestamp': {
        const value = read('#date-input'); if (!value) throw new Error('Elige una fecha y hora.');
        const date = new Date(value); if (Number.isNaN(date.getTime())) throw new Error('La fecha no es válida.');
        write('#timestamp-seconds', Math.floor(date.getTime() / 1000)); write('#timestamp-ms', date.getTime());
        $('#timestamp-output').textContent = `Local: ${date.toLocaleString()}\nUTC: ${date.toISOString()}`; setFeedback('Fecha convertida.'); break;
      }
      case 'timestamp-to-date': {
        const seconds = read('#timestamp-seconds'); const millis = read('#timestamp-ms');
        const value = millis !== '' ? Number(millis) : Number(seconds) * 1000;
        if ((millis === '' && seconds === '') || !Number.isFinite(value)) throw new Error('Introduce un timestamp válido en segundos o milisegundos.');
        const date = new Date(value); if (Number.isNaN(date.getTime())) throw new Error('El timestamp está fuera del rango admitido.');
        write('#date-input', new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16));
        $('#timestamp-output').textContent = `Local: ${date.toLocaleString()}\nUTC: ${date.toISOString()}\nISO: ${date.toISOString()}`; setFeedback('Timestamp convertido.'); break;
      }
      case 'timestamp-now': {
        const date = new Date(); write('#date-input', new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16));
        write('#timestamp-seconds', Math.floor(date.getTime() / 1000)); write('#timestamp-ms', date.getTime());
        $('#timestamp-output').textContent = `Local: ${date.toLocaleString()}\nUTC: ${date.toISOString()}`; setFeedback('Hora actual cargada.'); break;
      }
    }
  } catch (error) { setFeedback(error.message || 'No se pudo procesar el contenido.', true); }
}
document.querySelectorAll('.tab').forEach(button => button.addEventListener('click', () => setTool(button.dataset.tool)));
panel.addEventListener('input', event => {
  if (event.target.id === 'text-input') updateTextStats();
  if (event.target.id === 'color-picker' && $('#color-hex')) { $('#color-hex').value = event.target.value; updateColor(); }
  if (event.target.id === 'color-hex') updateColor();
});
panel.addEventListener('click', event => { const button = event.target.closest('[data-action]'); if (button) runAction(button.dataset.action); });
const welcome = $('#welcome-screen');
const startButton = $('#start-app');
const appHeader = document.querySelector('.topbar');
const appMain = $('#inicio');
let uiSoundsEnabled = false;
let uiAudioContext = null;
try { uiSoundsEnabled = localStorage.getItem('amilcartools-sounds') === 'on'; } catch (_) {}
const soundToggle = $('#sound-toggle');
function updateSoundToggle() {
  if (!soundToggle) return;
  soundToggle.setAttribute('aria-pressed', String(uiSoundsEnabled));
  soundToggle.textContent = uiSoundsEnabled ? '🔊 Sonidos activados' : '🔇 Sonidos desactivados';
}
const uiSoundPresets=[
  {wave:'sine',notes:[660,880],length:.09,volume:.024},
  {wave:'triangle',notes:[520,760],length:.11,volume:.025},
  {wave:'sine',notes:[740,590],length:.10,volume:.022},
  {wave:'square',notes:[440,660],length:.065,volume:.012},
  {wave:'triangle',notes:[880,1175],length:.10,volume:.018},
  {wave:'sine',notes:[580,690,820],length:.13,volume:.022},
  {wave:'triangle',notes:[620,490],length:.10,volume:.022},
  {wave:'sine',notes:[920,720],length:.08,volume:.018},
  {wave:'square',notes:[330,495],length:.075,volume:.009},
  {wave:'triangle',notes:[700,940,700],length:.14,volume:.018},
  {wave:'sine',notes:[480,640],length:.12,volume:.024},
  {wave:'triangle',notes:[1040,780],length:.085,volume:.017},
  {wave:'sine',notes:[610,915],length:.11,volume:.021},
  {wave:'triangle',notes:[540,810,1080],length:.15,volume:.018},
  {wave:'sine',notes:[800,600,900],length:.14,volume:.020}
];
let lastUiSoundIndex=-1;
function playUiSound(kind = 'tap') {
  if (!uiSoundsEnabled) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!uiAudioContext) uiAudioContext = new AudioContextClass();
    if (uiAudioContext.state === 'suspended') uiAudioContext.resume();
    let index=Math.floor(Math.random()*uiSoundPresets.length);
    if(index===lastUiSoundIndex)index=(index+1+Math.floor(Math.random()*(uiSoundPresets.length-1)))%uiSoundPresets.length;
    lastUiSoundIndex=index;
    const preset=kind==='start'?{wave:'sine',notes:[520,660,880,1040],length:.24,volume:.035}:uiSoundPresets[index];
    const now=uiAudioContext.currentTime;
    const step=preset.length/preset.notes.length;
    preset.notes.forEach((frequency,i)=>{
      const oscillator=uiAudioContext.createOscillator();
      const gain=uiAudioContext.createGain();
      const at=now+i*step;
      oscillator.type=preset.wave;
      oscillator.frequency.setValueAtTime(frequency,at);
      gain.gain.setValueAtTime(.0001,at);
      gain.gain.exponentialRampToValueAtTime(preset.volume,at+.008);
      gain.gain.exponentialRampToValueAtTime(.0001,at+step*.92);
      oscillator.connect(gain);gain.connect(uiAudioContext.destination);
      oscillator.start(at);oscillator.stop(at+step);
    });
  } catch (_) {}
}
updateSoundToggle();
if (soundToggle) soundToggle.addEventListener('click', () => {
  uiSoundsEnabled = !uiSoundsEnabled;
  try { localStorage.setItem('amilcartools-sounds', uiSoundsEnabled ? 'on' : 'off'); } catch (_) {}
  updateSoundToggle();
  if (uiSoundsEnabled) playUiSound('start');
});
document.addEventListener('click', event => {
  const button = event.target.closest('button, .menu-item, .menu-favorite');
  if (button && button.id !== 'sound-toggle' && !button.disabled) playUiSound(button.id === 'start-app' ? 'start' : 'tap');
});
if (startButton) startButton.addEventListener('click', () => {
  if (welcome) welcome.hidden = true;
  if (appHeader) appHeader.hidden = false;
  if (appMain) appMain.hidden = false;
  document.body.classList.add('app-started');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
function applyTheme(theme) {
  const selected = theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = selected;
  document.querySelectorAll('[data-theme-toggle]').forEach(button => {
    if (button.id === 'theme-toggle') {
      button.innerHTML = selected === 'light' ? '<span aria-hidden="true">☾</span><span class="theme-toggle-label">Modo oscuro</span>' : '<span aria-hidden="true">☼</span><span class="theme-toggle-label">Luz blanca</span>';
    } else {
      button.textContent = selected === 'light' ? '🌙 Modo oscuro' : '☀️ Luz blanca';
    }
    button.setAttribute('aria-label', selected === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a luz blanca');
    button.setAttribute('aria-pressed', String(selected === 'light'));
  });
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = selected === 'light' ? '#f5f7fb' : '#101321';
  try { localStorage.setItem('amilcartools-theme', selected); } catch (_) {}
}
let savedTheme = 'dark';
try { savedTheme = localStorage.getItem('amilcartools-theme') || 'dark'; } catch (_) {}
applyTheme(savedTheme);
document.querySelectorAll('[data-theme-toggle]').forEach(button => button.addEventListener('click', () => {
  applyTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light');
}));
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
