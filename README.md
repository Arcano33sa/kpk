# KSA PRÁCTIKA — Etapa 12/12

Webapp estática de control operativo. Esta etapa implementa **Configuración, roles básicos locales y respaldo JSON validado** sobre la base anterior con Catálogos, Ventas / OC, Cobros, Proveedores / Compras, Pagos a proveedores, Gastos, Mora, Alertas, Historial, Resumen / Tablero operativo e Importación inicial desde Excel.

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
