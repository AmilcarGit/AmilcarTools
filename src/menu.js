(()=>{'use strict';
const toggle=document.getElementById('menu-toggle'),menu=document.getElementById('tool-menu'),host=document.getElementById('menu-categories');
if(!toggle||!menu||!host)return;
toggle.addEventListener('click',()=>{const opening=menu.hidden;menu.hidden=!opening;toggle.setAttribute('aria-expanded',String(opening));toggle.setAttribute('aria-label',opening?'Cerrar menú de herramientas':'Abrir menú de herramientas');document.body.classList.toggle('menu-open',opening);if(opening)document.getElementById('menu-search')?.focus({preventScroll:true})});
const groups=[
['Herramientas básicas',[['text','Analizador de texto','basic'],['json','Formateador JSON','basic'],['password','Generador de contraseñas','basic'],['base64','Codificador Base64','basic'],['url','Codificador URL','basic'],['hash','Generador SHA-256','basic'],['uuid','Generador UUID','basic'],['color','Conversor de colores','basic'],['regex','Probador Regex','basic'],['timestamp','Fecha y Unix','basic']]],
['Código y desarrollo',[['editor','Editor HTML / CSS / JS','advanced'],['xml','XML ↔ JSON','extra'],['sql','Formateador SQL','extra'],['htmlvalidate','Validador HTML','extra'],['jsinspect','Inspector JavaScript','extra'],['regexpro','Regex PRO','extra'],['css','Formateador CSS','advanced'],['html','Codificador HTML','advanced'],['svg','Editor y optimizador SVG','extra'],['schema','Validador JSON Schema','extra']]],
['Texto y datos',[['wordpro','Contador de palabras PRO','extra'],['diff','Comparador de textos','advanced'],['diffpro','Comparador de textos PRO','extra'],['csv','Conversor CSV ↔ JSON','advanced'],['csvclean','Limpiador CSV','extra'],['jwt','Decodificador JWT','advanced'],['list','Limpiador de listas','advanced'],['markdown','Editor Markdown','advanced'],['lorem','Generador Lorem Ipsum','extra']]],
['Diseño e imágenes',[['images','Compresor de imágenes','advanced'],['palette','Paletas de colores','extra'],['gradient','Generador de degradados','extra'],['favicon','Generador de favicon','extra'],['extractcolors','Extractor de colores','extra'],['resize','Redimensionador de imágenes','extra'],['ascii','Imagen a ASCII','extra'],['qr','Generador QR personalizable','advanced']]],
['Seguridad y utilidades',[['hashpro','Generador de hashes','extra'],['totp','Generador TOTP 2FA','extra'],['passcheck','Analizador de contraseñas','extra'],['seo','Generador SEO / Open Graph','extra'],['robots','Generador robots.txt','extra'],['timepro','Conversor avanzado de fechas','extra'],['calculator','Calculadora avanzada','extra']]]
];
const icons={'Herramientas básicas':'▦','Código y desarrollo':'⌘','Texto y datos':'≡','Diseño e imágenes':'◈','Seguridad y utilidades':'◉'};
const toolIcons={text:'Aa',json:'{}',password:'⚿',base64:'64',url:'↗',hash:'#',uuid:'⊞',color:'◉',regex:'.*',timestamp:'◷',editor:'</>',xml:'XML',sql:'SQL',htmlvalidate:'✓',jsinspect:'JS',regexpro:'.+',css:'CSS',html:'<>',svg:'◇',schema:'✓',wordpro:'Aa',diff:'⇄',diffpro:'⇆',csv:'▤',csvclean:'≋',jwt:'JWT',list:'☷',markdown:'M↓',lorem:'¶',images:'▧',palette:'◒',gradient:'◩',favicon:'✦',extractcolors:'◉',resize:'↔',ascii:'▦',qr:'▦',hashpro:'#+',totp:'◷',passcheck:'✓',seo:'⌕',robots:'R',timepro:'◴',calculator:'±'};
const storageKey='amilcartools-menu-v2';
let favorites=new Set(),recent=[];
try{const saved=JSON.parse(localStorage.getItem(storageKey)||'{}');favorites=new Set(Array.isArray(saved.favorites)?saved.favorites:[]);recent=Array.isArray(saved.recent)?saved.recent.filter(x=>typeof x==='string').slice(0,5):[]}catch(_){}
let filter='all',lastFocused=null;
const allItems=groups.flatMap(([group,items])=>items.map(([id,label,type])=>({id,label,type,group})));
function save(){try{localStorage.setItem(storageKey,JSON.stringify({favorites:[...favorites],recent:recent.slice(0,5)}))}catch(_){}}
function makeTool(item){const row=document.createElement('div');row.className='menu-item-row';row.dataset.menuRow='';row.dataset.menuSearch=normalize(item.label+' '+item.group);const b=document.createElement('button');b.type='button';b.className='menu-item';b.dataset.menuId=item.id;b.dataset.menuType=item.type;const glyph=document.createElement('span');glyph.className='menu-tool-icon';glyph.setAttribute('aria-hidden','true');glyph.textContent=toolIcons[item.id]||'✦';const title=document.createElement('span');title.className='menu-tool-label';title.textContent=item.label;b.append(glyph,title);const star=document.createElement('button');star.type='button';star.className='menu-favorite';star.dataset.favoriteId=item.id;star.setAttribute('aria-label',favorites.has(item.id)?'Quitar de favoritos: '+item.label:'Añadir a favoritos: '+item.label);star.setAttribute('aria-pressed',String(favorites.has(item.id)));star.textContent=favorites.has(item.id)?'★':'☆';row.append(b,star);return row}
const toolsById=new Map(allItems.map(item=>[item.id,item]));
function renderTools(container,items,emptyText){container.replaceChildren();if(!items.length){const empty=document.createElement('p');empty.className='menu-empty';empty.textContent=emptyText;container.append(empty);return}items.forEach(item=>container.append(makeTool(item)))}
const toolDescriptions={
text:'Cuenta palabras, caracteres y líneas mientras escribes.',
json:'Ordena, valida y da formato a datos JSON.',
password:'Crea contraseñas seguras con opciones personalizables.',
base64:'Codifica y decodifica texto en Base64.',
url:'Codifica o decodifica texto para direcciones URL.',
hash:'Calcula el resumen SHA-256 localmente.',
uuid:'Genera identificadores únicos al instante.',
color:'Convierte colores entre HEX, RGB y HSL.',
regex:'Prueba expresiones regulares con coincidencias.',
timestamp:'Convierte fechas y marcas de tiempo Unix.',
editor:'Escribe HTML, CSS y JavaScript con vista previa.',
xml:'Convierte datos XML y JSON.',
sql:'Ordena consultas SQL para leerlas mejor.',
htmlvalidate:'Revisa la estructura y los errores comunes de HTML.',
jsinspect:'Inspecciona JavaScript sin enviar código fuera del dispositivo.',
regexpro:'Prueba expresiones regulares con herramientas avanzadas.',
css:'Formatea y ordena código CSS.',
html:'Escapa o decodifica entidades HTML.',
svg:'Edita y optimiza gráficos SVG.',
schema:'Comprueba datos JSON contra un esquema.',
wordpro:'Analiza palabras, frases y estadísticas del texto.',
diff:'Compara dos textos y destaca los cambios.',
diffpro:'Compara contenido con opciones avanzadas.',
csv:'Convierte tablas CSV y JSON.',
csvclean:'Limpia filas y valores de archivos CSV.',
jwt:'Decodifica cabecera y contenido de tokens JWT localmente.',
list:'Elimina duplicados y ordena listas.',
markdown:'Escribe Markdown y revisa su vista previa.',
lorem:'Genera texto de ejemplo rápidamente.',
images:'Edita, redimensiona y comprime imágenes en tu dispositivo.',
palette:'Explora paletas de colores.',
gradient:'Diseña degradados CSS personalizados.',
favicon:'Genera iconos favicon para tus páginas.',
extractcolors:'Extrae colores dominantes de una imagen.',
resize:'Cambia dimensiones de imágenes.',
ascii:'Convierte imágenes en arte ASCII.',
qr:'Genera y descarga códigos QR.',
hashpro:'Calcula distintos tipos de hashes.',
totp:'Genera códigos temporales TOTP de autenticación.',
passcheck:'Evalúa la fortaleza de una contraseña.',
seo:'Prepara metadatos SEO y Open Graph.',
robots:'Crea reglas para robots.txt.',
timepro:'Convierte y calcula fechas y horas.',
calculator:'Realiza cálculos en una herramienta rápida.'
};
const controls=document.createElement('div');controls.className='menu-tools-controls';controls.innerHTML='<section class="menu-tool-preview" id="menu-tool-preview" aria-live="polite"><div class="menu-preview-icon">✦</div><div class="menu-preview-copy"><span class="menu-preview-kicker">TU ESPACIO DE HERRAMIENTAS</span><strong id="menu-preview-title">¿Qué quieres crear hoy?</strong><p id="menu-preview-description">Elige una categoría o busca una herramienta. Todo se procesa localmente en tu dispositivo.</p><span class="menu-preview-tags"><i>⚡ Rápido</i><i>◈ Privado</i><i>✓ Gratis</i></span></div></section><label class="menu-search-label" for="menu-search">Buscar herramienta</label><div class="menu-search-wrap"><input id="menu-search" class="menu-search" type="search" placeholder="Ej.: JSON, imágenes, contraseña…" autocomplete="off" aria-describedby="menu-result-count"><button type="button" id="menu-search-clear" class="menu-search-clear" aria-label="Limpiar búsqueda" hidden>×</button></div><p id="menu-result-count" class="menu-result-count" role="status" aria-live="polite"></p><div class="menu-filter-row"><button type="button" class="menu-filter active" data-menu-filter="all" aria-pressed="true">Todas</button><button type="button" class="menu-filter" data-menu-filter="favorites" aria-pressed="false">★ Favoritas</button></div><section class="menu-shortcut-section menu-quick-section" id="menu-quick-section"><h3>Accesos rápidos <span>6 herramientas</span></h3><div id="menu-quick" class="menu-shortcuts"></div></section><section class="menu-shortcut-section" id="menu-recent-section"><h3>Usadas recientemente</h3><div id="menu-recent" class="menu-shortcuts"></div></section><section class="menu-shortcut-section" id="menu-favorites-section" hidden><h3>Tus favoritas</h3><div id="menu-favorites" class="menu-shortcuts"></div></section>';
host.before(controls);
const search=controls.querySelector('#menu-search'),clearSearch=controls.querySelector('#menu-search-clear'),resultCount=controls.querySelector('#menu-result-count'),previewTitle=controls.querySelector('#menu-preview-title'),previewDescription=controls.querySelector('#menu-preview-description'),previewIcon=controls.querySelector('.menu-preview-icon'),quickHost=controls.querySelector('#menu-quick'),recentHost=controls.querySelector('#menu-recent'),favoriteHost=controls.querySelector('#menu-favorites'),quickSection=controls.querySelector('#menu-quick-section'),recentSection=controls.querySelector('#menu-recent-section'),favoriteSection=controls.querySelector('#menu-favorites-section');
const categoryNodes=[];
for(const [title,items] of groups){const d=document.createElement('details');d.className='menu-group';d.open=title==='Herramientas básicas';d.dataset.menuGroup=title;const s=document.createElement('summary');s.innerHTML='<span class="menu-group-icon" aria-hidden="true">'+icons[title]+'</span><span class="menu-group-title">'+title+'</span><span class="menu-count" aria-label="'+items.length+' herramientas">'+items.length+'</span>';d.append(s);const list=document.createElement('div');list.className='menu-items';items.forEach(([id,label,type])=>list.append(makeTool({id,label,type,group:title})));d.append(list);host.append(d);categoryNodes.push(d)}
function showPreview(item){if(!item){previewTitle.textContent='¿Qué quieres crear hoy?';previewDescription.textContent='Elige una categoría o busca una herramienta. Todo se procesa localmente en tu dispositivo.';previewIcon.textContent='✦';return}previewTitle.textContent=item.label;previewDescription.textContent=toolDescriptions[item.id]||'Abre esta herramienta para ver sus opciones.';previewIcon.textContent=toolIcons[item.id]||'✦'}
function refreshShortcuts(){renderTools(quickHost,['text','json','password','images','qr','editor'].map(id=>toolsById.get(id)).filter(Boolean),'No hay accesos rápidos.');renderTools(recentHost,recent.map(id=>toolsById.get(id)).filter(Boolean),'Todavía no has abierto herramientas.');renderTools(favoriteHost,allItems.filter(item=>favorites.has(item.id)),'Pulsa ☆ junto a una herramienta para guardarla.');recentSection.hidden=recent.length===0;favoriteSection.hidden=filter!=='favorites'}
function normalize(value){return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase()}
function applyFilter(){const q=normalize(search.value.trim());let total=0;for(const group of categoryNodes){let visible=0;group.querySelectorAll('[data-menu-row]').forEach(row=>{const fav=favorites.has(row.querySelector('[data-menu-id]').dataset.menuId);const show=(!q||row.dataset.menuSearch.includes(q))&&(filter!=='favorites'||fav);row.hidden=!show;if(show){visible++;total++}});group.hidden=visible===0;const count=group.querySelector('.menu-count');if(count){const all=group.querySelectorAll('[data-menu-row]').length;count.textContent=q||filter==='favorites'?visible+'/'+all:String(all);count.setAttribute('aria-label',visible+' de '+all+' herramientas visibles')}if(q&&visible)group.open=true}clearSearch.hidden=!search.value;resultCount.textContent=total+' herramienta'+(total===1?'':'s')+' encontrada'+(total===1?'':'s');quickSection.hidden=!!q||filter==='favorites';favoriteSection.hidden=filter!=='favorites';recentSection.hidden=!!q||filter==='favorites'||recent.length===0}
function close(){if(menu.hidden)return;menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú de herramientas');document.body.classList.remove('menu-open');if(lastFocused&&typeof lastFocused.focus==='function')lastFocused.focus();else toggle.focus()}
function open(){lastFocused=document.activeElement;menu.hidden=false;toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Cerrar menú de herramientas');document.body.classList.add('menu-open');search.focus({preventScroll:true})}
function selectTool(b){const id=b.dataset.menuId,item=toolsById.get(id);if(!item)return;showPreview(item);let target;if(item.type==='basic')target=document.querySelector('.tool-tabs [data-tool="'+id+'"]');else if(item.type==='advanced')target=document.querySelector('#tool-registry [data-advanced-tool="'+id+'"]');else target=document.querySelector('#tool-registry [data-extra-tool="'+id+'"]');if(!target){const status=document.getElementById('advanced-feedback')||document.getElementById('feedback');if(status){status.textContent='No se encontró el botón de esta herramienta. Recarga la página e inténtalo de nuevo.';status.classList.add('error')}return}target.click();recent=[id,...recent.filter(x=>x!==id)].slice(0,5);save();refreshShortcuts();applyFilter();close();(item.type==='basic'?document.querySelector('.workspace'):document.querySelector('.advanced-workspace'))?.scrollIntoView({behavior:'smooth',block:'start'})}
search.addEventListener('input',applyFilter);clearSearch.addEventListener('click',()=>{search.value='';applyFilter();search.focus()});
controls.addEventListener('pointerover',e=>{const b=e.target.closest('[data-menu-id]');if(b)showPreview(toolsById.get(b.dataset.menuId))});
controls.addEventListener('focusin',e=>{const b=e.target.closest('[data-menu-id]');if(b)showPreview(toolsById.get(b.dataset.menuId))});
controls.addEventListener('click',e=>{e.stopPropagation();const f=e.target.closest('[data-menu-filter]');if(f){filter=f.dataset.menuFilter;controls.querySelectorAll('[data-menu-filter]').forEach(x=>{const active=x===f;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active))});applyFilter();return}const star=e.target.closest('[data-favorite-id]');if(star){const id=star.dataset.favoriteId;if(favorites.has(id))favorites.delete(id);else favorites.add(id);save();refreshShortcuts();applyFilter();return}const b=e.target.closest('[data-menu-id]');if(b)selectTool(b)});
menu.addEventListener('click',e=>{if(e.target.closest('[data-menu-close]')){close();return}const star=e.target.closest('[data-favorite-id]');if(star){const id=star.dataset.favoriteId;if(favorites.has(id))favorites.delete(id);else favorites.add(id);save();refreshShortcuts();applyFilter();return}const b=e.target.closest('[data-menu-id]');if(b)selectTool(b)});
document.addEventListener('keydown',e=>{if(menu.hidden)return;if(e.key==='Escape'){e.preventDefault();close();return}if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();search.focus()}});
refreshShortcuts();
applyFilter();
})();