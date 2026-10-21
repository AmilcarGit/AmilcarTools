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

### Run it

Download or clone the repository and open `index.html` in a modern browser. For installable PWA/offline support, serve the files over HTTPS, open the page once, then use your browser's install option. No package installation, database, backend or external API is required. Some browser features require HTTPS or localhost.

### Privacy

Text is processed in your browser and is not sent to an AmilcarTools server. The project includes no analytics, ads, accounts or external API calls. Browser extensions and the operating system are outside the project's control.

### License

MIT. See [`LICENSE`](LICENSE).
