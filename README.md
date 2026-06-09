# KSA PRÁCTIKA — Post 12 Etapa 3/3

Webapp estática de control operativo. Esta etapa agrega **PWA / Actualizaciones** dentro de Configuración y endurece el Service Worker/cache sobre la base completa con Catálogos, Ventas / OC, Cobros, Proveedores / Compras, Pagos a proveedores, Gastos, Mora, Alertas, Historial, Resumen / Tablero, Importación/Exportación Excel, Cierre mensual, Roles, Respaldo JSON, condiciones de pago y modales de edición.

## Incluye

- Home / Menú principal conservado.
- Barra superior fija conservada.
- Módulo **Configuración** funcional.
- Parámetros generales: nombre visible, moneda principal, días de alerta próxima a vencer y archivo Excel de referencia.
- Roles básicos locales: **Administrador** y **Usuario normal**.
- Protección local por rol para acciones delicadas.
- Administrador puede editar Catálogos, anular/reactivar movimientos, importar Excel, exportar JSON, importar JSON y cambiar configuración.
- Usuario normal puede registrar operaciones y consultar tablero, con Catálogos en solo lectura y sin acciones de anulación/importación/exportación.
- Exportar respaldo JSON con `metadata`, `schemaVersion`, fecha de exportación, `appName`, conteos y registros.
- Importar JSON con validación previa fuerte.
- Vista previa de JSON antes de importar: versión, fecha, conteos de ventas, cobros, compras/proveedores, pagos, gastos, catálogos y cierres.
- Bloqueo de JSON inválido.
- Opciones controladas para **Reemplazar datos actuales** o **Fusionar datos**.
- Fusión con prevención de duplicados por IDs y claves naturales.
- Fechas de último respaldo y última importación en Configuración.
- Mensaje claro de que JSON es respaldo/traslado manual, no sincronización automática.
- Persistencia en `localStorage`.
- Manifest PWA básico.
- Service worker con cache versionado.
- Diseño responsive para desktop, iPad y navegador móvil, sin scroll horizontal global.

## No incluido

- Backend o Firebase.
- Login real complejo.

## Estructura localStorage

Clave principal:

`KSA_PRACTIKA_DATA_v1`

Bloques principales:

- clientes
- sucursales
- proveedores
- tiposGasto
- metodosPago
- cuentasBancos
- ventas
- cobros
- comprasProveedores
- pagosProveedores
- gastos
- cierresMensuales
- exportacionesExcel
- configuracion
- metadata

## Pruebas realizadas

- Sintaxis JavaScript validada con `node --check app.js`.
- Render básico validado en navegador Chromium.
- Navegación a Configuración validada.
- Exportación JSON validada.
- Importación JSON válido validada con vista previa.
- Reemplazo y fusión JSON validados con respaldo generado por la app.
- JSON inválido bloqueado.
- Cambio de rol básico validado.
- Permisos básicos de Administrador / Usuario normal validados en UI y acciones críticas.
- Módulos anteriores revisados para carga básica sin errores críticos.
- Validado que no hay scroll horizontal global en vistas principales.


## Etapa 12/12 — Excel, cierre mensual y hardening final

- Exportación Excel .xlsx local con JSZip incluido en `vendor/jszip.min.js`, sin CDN obligatorio.
- Hojas generadas: Resumen, Ventas, Proveedores, Gastos y Catálogos.
- Cierre mensual con obligación de exportar Excel para el mismo mes/año antes de cerrar.
- Registro local de exportaciones Excel y cierres mensuales dentro del respaldo JSON.
- Edición posterior de períodos cerrados bajo advertencia clara.
- Service Worker cache actualizado a la versión 0.12.1-etapa12-logo.
- Logotipo KSA integrado como asset local `assets/ksa-logo.png` en la barra superior, a la izquierda del nombre de la app.


## Post 12 — Etapa 1/2: Condiciones de pago

- Clientes y Proveedores ahora manejan condición de pago: Contado o Crédito.
- Días de crédito se valida como entero mayor que 0 cuando la condición es Crédito.
- Contado guarda días de crédito en 0.
- Ventas / OC sugiere fecha de vencimiento según la condición del Cliente.
- Proveedores / Compras sugiere fecha de vencimiento según la condición del Proveedor.
- La fecha de vencimiento manual se respeta cuando el usuario la ajusta.
- Exportación Excel agrega Condición de pago y Días de crédito en Catálogos para Clientes y Proveedores.
- Importación Excel y respaldo JSON mantienen compatibilidad con bases anteriores, completando Contado y 0 días cuando faltan campos.
- Service Worker cache actualizado a la versión 0.13.0-post12-etapa1-condiciones-pago.


## Post 12 — Etapa 3/3: PWA / Actualizaciones

- Se agregó en Configuración la sección **PWA / Actualizaciones**.
- Incluye estado actual, última búsqueda, última actualización, modo de uso y disponibilidad de Service Worker.
- Botón **Buscar actualizaciones** con `registration.update()` cuando Service Worker está disponible.
- Botón **Aplicar actualización** cuando existe un Service Worker en espera.
- Aplicación de actualización mediante mensaje seguro `KSA_PRACTIKA_SKIP_WAITING` y recarga protegida contra bucles.
- Persistencia de última búsqueda y última actualización dentro de `configuracion`, sin borrar `localStorage`.
- Service Worker actualizado a `v0_15_0_post12_etapa3_pwa_update`.
- Cache PWA incluye `index.html`, CSS, JS, manifest, logo, íconos y `vendor/jszip.min.js`.
- Se mantienen intactos JSON, Excel, importación, exportación, cierres y datos de negocio.
