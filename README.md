# AmilcarTools

**Herramientas pequeñas, privacidad grande.** Una colección gratuita de utilidades web que procesa el contenido en tu propio dispositivo. Sin cuenta, sin backend, sin API externa y sin dependencias de ejecución.

[Español](#español) · [English](#english)

## Español

### Herramientas incluidas

- **Analizador de texto:** caracteres, caracteres sin espacios, palabras, líneas, mayúsculas, minúsculas y limpieza de espacios.
- **JSON:** validar, formatear y minificar JSON.
- **Contraseñas:** generación con `crypto.getRandomValues`, longitud configurable y grupos de caracteres seleccionables.
- **Base64:** codificación y decodificación compatible con texto Unicode.
- **URL:** codificar y decodificar componentes de URL.
- **SHA-256:** generar el hash de texto con Web Crypto.
- **UUID v4:** generar uno o diez identificadores únicos mediante el generador criptográfico del navegador.
- **Colores:** elegir HEX, ver RGB/HSL y calcular el contraste aproximado con blanco y negro.
- **Regex:** probar expresiones regulares, flags, coincidencias, índices y grupos.
- **Tiempo Unix:** convertir fecha local a segundos/milisegundos y timestamps a fecha local/UTC.
- **Editor HTML/CSS/JS:** escribir código y ejecutarlo en una vista previa aislada del resto de la aplicación.
- **Imágenes:** convertir entre WebP, JPEG y PNG, ajustar calidad y redimensionar archivos de hasta 25 MB.
- **Códigos QR:** generar y descargar QR como SVG, con codificación local para textos de hasta 106 bytes UTF-8.
- **Comparador de textos/código:** mostrar líneas añadidas, eliminadas y sin cambios.
- **Editor Markdown:** vista previa de títulos, listas, enlaces, énfasis y bloques de código, además de descargar archivos .md.\n- **CSV ↔ JSON:** convierte CSV con encabezados a JSON y listas de objetos JSON a CSV.\n- **Decodificador JWT:** muestra la cabecera y el payload de un token sin verificar la firma.\n- **Codificador HTML:** escapa caracteres especiales y decodifica entidades HTML.\n- **Limpiador de listas:** recorta espacios, elimina líneas vacías y duplicados, y ordena elementos.\n- **Formateador CSS:** embellece o minifica CSS habitual sin enviar código a servidores.
- **XML ↔ JSON, SQL, validador HTML e inspector JavaScript:** conversión y comprobaciones locales.
- **Regex PRO, paletas, degradados y Lorem Ipsum:** patrones, colores y texto de prueba.
- **Hashes avanzados, TOTP y analizador de contraseñas:** procesamiento local y evaluación orientativa.
- **Contador/comparador PRO, limpiador CSV y validador JSON Schema:** utilidades de texto y datos.
- **Favicon, SVG, extracción de colores, redimensionado e imagen ASCII:** herramientas visuales.
- **Generador SEO, robots.txt, fecha/Unix avanzado y calculadora:** utilidades web y cálculos.

### Uso

1. Descarga o clona el repositorio.
2. Abre `index.html` en un navegador moderno.
3. Para instalar la PWA y utilizar el modo sin conexión, publica los archivos en un sitio estático con HTTPS (por ejemplo, GitHub Pages) y abre la página una vez.
4. SHA-256 y algunas funciones de instalación requieren HTTPS o `localhost`, según el navegador.

No necesita `npm install`, base de datos ni servidor propio. Para probar el proyecto localmente puedes usar cualquier servidor estático, por ejemplo `python -m http.server 8000`.

### Privacidad

El contenido que escribes se procesa en el navegador. No se envía a un servidor de AmilcarTools. El código no incluye analítica, anuncios, cuentas ni llamadas a APIs externas. Ten en cuenta que el navegador, las extensiones o el sistema operativo siguen estando fuera del control de este proyecto.

### Contribuir

Las contribuciones son bienvenidas. Abre un issue con una propuesta concreta o envía un pull request. Mantén las herramientas sin dependencias externas innecesarias y añade pruebas para los cambios.

### Licencia

MIT. Consulta [`LICENSE`](LICENSE).

## English

### Included tools

- **Text analyzer:** character, non-whitespace character, word and line counts, plus case conversion and whitespace cleanup.
- **JSON:** validate, pretty-print and minify JSON.
- **Password generator:** configurable length and character groups, using `crypto.getRandomValues`.
- **Base64:** encode and decode Unicode text.
- **URL component:** encode and decode URL components.
- **SHA-256:** hash text with the Web Crypto API.
- **UUID v4:** generate one or ten random identifiers using the browser's cryptographic generator.
- **Colors:** choose HEX, view RGB/HSL, and calculate contrast against white and black.
- **Regex tester:** test patterns, flags, matches, indexes, and capture groups.
- **Unix time:** convert local dates to seconds/milliseconds and timestamps to local/UTC dates.
- **HTML/CSS/JS editor:** edit code and run it in a sandboxed preview iframe.
- **Image converter:** convert WebP, JPEG and PNG, adjust quality and resize images up to 25 MB.
- **QR generator:** create and download QR codes as SVG locally (up to 106 UTF-8 bytes).
- **Text/code diff:** show added, removed and unchanged lines.
- **Markdown editor:** preview headings, lists, links, emphasis and code blocks, and download .md files.\n- **CSV ↔ JSON:** convert CSV with headers to JSON and JSON object arrays to CSV.\n- **JWT decoder:** display a token header and payload without verifying its signature.\n- **HTML encoder:** escape special characters and decode HTML entities.\n- **List cleaner:** trim spaces, remove blank lines and duplicates, and sort items.\n- **CSS formatter:** pretty-print or minify common CSS locally.
- **XML/JSON, SQL, HTML/JavaScript inspection, Regex PRO, palettes, gradients and Lorem Ipsum.
- **Advanced hashes, local TOTP, password analysis, word counter/diff, CSV cleanup and basic JSON Schema validation.
- **Favicon, SVG optimization, image color extraction/resizing and ASCII art.
- **SEO and robots.txt generators, advanced Unix timestamps and calculator.

### Run it

Download or clone the repository and open `index.html` in a modern browser. For installable PWA/offline support, serve the files over HTTPS, open the page once, then use your browser's install option. No package installation, database, backend or external API is required. Some browser features require HTTPS or localhost.

### Privacy

Text is processed in your browser and is not sent to an AmilcarTools server. The project includes no analytics, ads, accounts or external API calls. Browser extensions and the operating system are outside the project's control.

### License

MIT. See [`LICENSE`](LICENSE).
