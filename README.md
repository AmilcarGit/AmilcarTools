# AmilcarTools

**Herramientas útiles. Sin cuentas. Sin APIs externas. En tu dispositivo.**

AmilcarTools es una colección gratuita de herramientas web para texto, datos, código, imágenes, colores y tareas cotidianas. Funciona como sitio estático: no necesita un backend propio ni servicios de pago.

🌐 **Web:** https://amilcartools.vercel.app  
📦 **Código fuente:** https://github.com/AmilcarGit/AmilcarTools

[Español](#español) · [English](#english)

---

## Español

### ✨ Características principales

- **Gratis y local:** no necesitas una cuenta ni un servidor de AmilcarTools.
- **Sin APIs externas:** las herramientas se ejecutan en el navegador y no requieren claves de API.
- **Menú organizado:** pulsa el botón de tres líneas para explorar las herramientas por categorías.
- **Adaptado a móviles:** interfaz diseñada también para Android.
- **PWA:** puede instalarse desde navegadores compatibles y almacena recursos de la aplicación en caché.
- **Código abierto:** puedes revisar el código, proponer mejoras y adaptar el proyecto.

### 🧭 Cómo usar el menú

1. Abre [AmilcarTools](https://amilcartools.vercel.app).
2. Pulsa el botón **☰** de la parte superior.
3. Usa los accesos rápidos o abre la categoría que necesitas; cada herramienta tiene su propio icono y las categorías muestran cuántas opciones hay.
4. Selecciona una herramienta.
5. Usa sus controles para procesar, copiar o descargar resultados cuando esas opciones estén disponibles.

Las categorías son **Herramientas básicas**, **Código y desarrollo**, **Texto y datos**, **Diseño e imágenes** y **Seguridad y utilidades**.

### 🧰 Herramientas disponibles

#### Herramientas básicas
- **Analizador de texto:** cuenta caracteres, palabras y líneas; limpia espacios y cambia mayúsculas/minúsculas.
- **JSON:** valida, formatea y minifica JSON.
- **Generador de contraseñas:** longitud y grupos de caracteres configurables mediante `crypto.getRandomValues`.
- **Base64 y URL:** codifica y decodifica texto, incluido texto Unicode en Base64.
- **SHA-256 y UUID v4:** calcula hashes de texto y genera identificadores.
- **Colores:** convierte HEX, RGB y HSL y muestra contraste aproximado.
- **Regex:** prueba patrones y visualiza coincidencias.
- **Fecha y Unix:** convierte fechas locales y timestamps.

#### Código y desarrollo
- **Editor HTML/CSS/JS:** permite escribir código y verlo en una vista previa aislada.
- **XML ↔ JSON:** convierte estructuras compatibles entre ambos formatos.
- **Formateador SQL:** mejora la legibilidad de consultas habituales.
- **Validador HTML e inspector JavaScript:** detectan algunos errores frecuentes.
- **Regex PRO:** prueba expresiones y resalta coincidencias.
- **Formateador CSS:** ordena o minifica CSS habitual.
- **Codificador HTML:** codifica caracteres especiales y decodifica entidades.
- **Editor y optimizador SVG:** previsualiza y optimiza SVG con controles básicos.
- **Validador JSON Schema:** comprueba estructuras dentro del subconjunto implementado.

#### Texto y datos
- **CSV ↔ JSON:** convierte CSV con encabezados a JSON y listas de objetos JSON a CSV.
- **Limpiador CSV:** limpia espacios, filas vacías y encabezados.
- **Contador de palabras PRO:** cuenta palabras, caracteres y frases, y estima el tiempo de lectura.
- **Comparador de textos PRO:** ayuda a identificar diferencias entre dos textos.
- **Limpiador de listas:** elimina líneas vacías y duplicados, recorta espacios y puede ordenar elementos.
- **Editor Markdown:** muestra una vista previa y permite descargar archivos Markdown.
- **Generador Lorem Ipsum:** crea texto de prueba.
- **Decodificador JWT:** muestra el encabezado y el contenido de un token.

#### Diseño e imágenes
- **Compresor y convertidor de imágenes:** trabaja con WebP, JPEG y PNG, ajusta la calidad y redimensiona imágenes de hasta 25 MB.
- **Generador QR:** crea códigos QR SVG localmente y permite personalizar los colores.
- **Paletas de colores y degradados CSS:** crea combinaciones y estilos de color.
- **Generador de favicon:** crea iconos a partir de texto o imágenes, según los controles disponibles.
- **Extractor de colores:** obtiene una paleta aproximada desde una imagen.
- **Redimensionador de imágenes:** prepara imágenes para dimensiones habituales.
- **Imagen a ASCII:** convierte una imagen en caracteres.

#### Seguridad y utilidades
- **Generador de hashes avanzados:** calcula algoritmos disponibles en el navegador.
- **Generador TOTP:** genera códigos temporales a partir de un secreto compatible.
- **Analizador de contraseñas:** ofrece una evaluación orientativa de longitud y patrones débiles.
- **Generador SEO:** crea etiquetas `title`, `description` y Open Graph.
- **Generador robots.txt:** construye reglas básicas para rastreadores.
- **Fecha y Unix avanzado:** convierte fechas y timestamps.
- **Calculadora avanzada:** calcula porcentajes, descuentos, regla de tres y propinas.

### 🚀 Ejecutar localmente

No necesitas instalar paquetes npm, configurar una base de datos ni crear un backend.

**Opción 1: abrir directamente**
1. Descarga el repositorio como ZIP desde GitHub.
2. Extrae los archivos.
3. Abre `index.html` en un navegador moderno.

**Opción 2: servidor estático local**

Si tienes Python instalado, ejecuta desde la carpeta del proyecto:

```bash
python -m http.server 8000
```

Después abre http://localhost:8000.

Algunas funciones del navegador, como Web Crypto o la instalación de una PWA, pueden requerir HTTPS o `localhost`.

### 📲 Instalar como aplicación (PWA)

1. Abre https://amilcartools.vercel.app en un navegador compatible.
2. Abre el menú del navegador.
3. Selecciona **Instalar aplicación** o **Añadir a pantalla de inicio**, si aparece la opción.
4. Si ya la tenías instalada y no ves los cambios, cierra y vuelve a abrir la aplicación. Si persiste, abre la web en el navegador para actualizar los recursos almacenados.

La instalación y el modo sin conexión dependen del navegador y de su soporte para PWA.

### 🔐 Privacidad y limitaciones

El proyecto no necesita enviar el contenido a un servidor propio ni llamar a APIs externas. Aun así, evita introducir secretos en dispositivos compartidos o comprometidos.

- El decodificador JWT **no verifica la firma** ni confirma que el token sea auténtico.
- El analizador de contraseñas es orientativo; no garantiza que una contraseña sea segura.
- Los validadores de HTML, JavaScript y JSON Schema comprueban los casos implementados; no sustituyen herramientas completas de análisis.
- El formateador SQL está orientado a consultas habituales, no a todos los dialectos SQL.
- El generador QR admite textos de hasta **106 bytes UTF-8** en la implementación actual. Mantén un contraste alto entre el código y el fondo.
- Las funciones disponibles dependen del navegador. Ninguna herramienta debe considerarse una auditoría de seguridad.

### 🧪 Pruebas y contribuciones

El repositorio incluye pruebas automatizadas y un flujo de integración continua. Antes de proponer cambios, revisa la sintaxis de los archivos modificados y ejecuta las pruebas configuradas.

Las contribuciones son bienvenidas: abre un [issue](https://github.com/AmilcarGit/AmilcarTools/issues) o envía un pull request. Explica qué cambia y añade pruebas cuando corresponda. Procura mantener el proyecto ligero, local y sin dependencias externas innecesarias.

### 📄 Licencia

El proyecto se distribuye bajo la licencia MIT. Consulta [LICENSE](LICENSE) para conocer sus condiciones.

---

## English

AmilcarTools is a free collection of browser tools for text, data, code, images, colors and everyday tasks. It is designed to run as a static website without an AmilcarTools backend, paid services, accounts or external API keys.

- **Website:** https://amilcartools.vercel.app
- **Source code:** https://github.com/AmilcarGit/AmilcarTools
- **Navigation:** use the three-line menu to browse Basic Tools, Code & Development, Text & Data, Design & Images, and Security & Utilities.
- **Text and data:** text analysis, JSON formatting, Base64/URL encoding, CSV ↔ JSON, CSV cleanup, Markdown, Lorem Ipsum, JWT decoding and text comparison.
- **Development:** HTML/CSS/JavaScript editor, XML ↔ JSON, SQL formatting, basic HTML/JavaScript inspection, Regex testing, SVG tools and basic JSON Schema validation.
- **Design and images:** image conversion and resizing, customizable QR colors, color palettes, CSS gradients, favicon creation, image color extraction and ASCII art.
- **Security and utilities:** browser-supported hashing, TOTP codes, password analysis, SEO metadata, robots.txt, Unix time conversion and calculator.
- **Privacy-minded:** processing happens in the browser; no external API key or project backend is required.
- **PWA support:** installable on compatible browsers, with cached application assets where supported.

### Run locally

Download the repository and open `index.html` in a modern browser. Alternatively, run a static server from the project directory:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000. No npm installation, database or backend is required. Some browser APIs and PWA features require HTTPS or localhost.



### Menu and navigation

The tools menu supports accent-insensitive search, live result counts, category grouping with visible-item counters, a dedicated icon for each tool, quick access to six common tools, favorites and recent tools stored locally in the browser. The search can be cleared with one tap; Escape closes the menu, the slash key focuses search when appropriate, and focus returns to the previous control after closing. The layout includes mobile adjustments and reduced-motion preferences.

### Image Studio

The image tool works locally in your browser and supports WebP, JPEG and PNG export, quality adjustment, maximum dimensions that preserve aspect ratio, presets for square posts, stories/statuses, landscape images and social posts, and batch processing for up to 20 images (25 MB per file). Each processed file gets its own download link; files are not uploaded to a server. Animated GIFs are exported as a static image. Browser support for formats may vary.

### Important limitations

- JWT decoding does not verify signatures.
- Password analysis is advisory, not a security guarantee.
- HTML, JavaScript and JSON Schema checks cover the cases implemented by this project, not every part of their standards.
- SQL formatting targets common queries, not every SQL dialect.
- The current QR implementation supports text up to 106 UTF-8 bytes.
- Browser capabilities vary by device and browser version.

### Contributing

Bug reports and pull requests are welcome. Please explain the change, test modified code, and add regression tests where appropriate. Keep the project lightweight and avoid unnecessary external services.

### License

MIT. See [LICENSE](LICENSE).
