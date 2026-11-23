PDF.js 5.6.205 — Mozilla
Origen: paquete pdfjs-dist 5.6.205 incluido en el runtime local de Codex.
Proyecto: https://github.com/mozilla/pdf.js
Distribución: https://www.npmjs.com/package/pdfjs-dist/v/5.6.205
Licencia: Apache-2.0; texto completo en LICENSE.

Archivos build/pdf.min.mjs y build/pdf.worker.min.mjs copiados sin modificaciones.
Solo se usa extracción de texto, no visor, renderizado, OCR ni ejecución de scripts PDF.
Carga diferida al seleccionar un documento. No hay CDN ni envío del PDF a servicios.
El worker debe servirse con un MIME JavaScript para la extensión .mjs.
Al actualizar, mantener ambos archivos en la misma versión y revisar APP_SHELL.
