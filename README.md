# KSA PRÁCTIKA — Post12 Ventas / OC: facturas múltiples y captura rápida

- Ventas / OC permite varias facturas dentro de una misma OC, cada una con número y fecha.
- El bloque Facturas funciona como mini-lista compacta: agregar, editar y borrar antes de guardar.
- La fecha de factura se precarga con Fecha OC y reutiliza la última fecha capturada dentro del bloque.
- Después de guardar una OC nueva, el formulario retiene cliente, sucursal y fecha OC para captura rápida.
- Al salir de Ventas / OC se limpia la captura rápida para evitar arrastres entre módulos.
- Edición de OC carga, modifica y guarda facturas sin duplicarlas.
- Se mantiene compatibilidad defensiva con facturas antiguas simples.
- No se cambian cobros, proveedores/compras, pagos, compras de contado, mora, cierre, cálculos, Excel ni JSON salvo compatibilidad documental.
- Versión/cache PWA actualizado a 0.16.8-post12-ventas-oc-facturas-multiples-captura-rapida.

# KSA PRÁCTIKA — Post12 Compras de contado Etapa 2/2

- Las compras de contado crean automáticamente su pago en Pagos a proveedores.
- El pago automático queda ligado a proveedor, factura/referencia y compra origen con `origen: "compra_contado"`, `compraIdOrigen` y `autoGenerado: true`.
- Al editar una compra de contado, el pago automático existente se sincroniza sin duplicarse.
- Si la compra pasa a crédito o se anula, el pago automático relacionado se anula de forma controlada.
- Compras de contado quedan pagadas, con saldo C$0.00, sin mora falsa y sin bloquear cierre mensual.
- Pagos manuales de compras de crédito se conservan sin cambios.
- JSON, Excel, acordeones, columnas esenciales y scrollbar superior sticky se mantienen.
- Versión/cache PWA actualizado a 0.16.7-post12-compras-contado-pago-automatico.

# KSA PRÁCTIKA — Post12 Compras de contado Etapa 1/2

- Preparación de Proveedores / Compras para detectar proveedor Contado o Crédito.
- Bloque compacto “Pago de contado” visible solo para compras de contado.
- Validación de método de pago y banco/cuenta cuando el método lo requiere.
- No se crean pagos automáticos todavía; saldos, mora, alertas, cierre, Excel y JSON se mantienen sin cambios de lógica.
- Versión/cache PWA actualizado a 0.16.6-post12-compras-contado-preparacion.

# KSA PRÁCTIKA — Post12 Listados Compactos: columnas esenciales visibles en acordeones

- En Compras se oculta la columna Proveedor dentro del grupo porque el acordeón ya identifica al proveedor.
- En Pagos se oculta la columna Proveedor dentro del grupo.
- En Cobros se oculta la columna Cliente dentro del grupo y se conserva la sucursal bajo el documento cuando aplica.
- En Gastos se oculta la columna Tipo dentro del grupo y se muestra observación breve como columna compacta.
- Las columnas monetarias quedan priorizadas y sin truncado visual por puntos suspensivos.
- Se acortan encabezados para iPad horizontal: Factura / ref., Compra, Vence, Total, Pagado, Saldo.
- Se mantiene el scrollbar horizontal superior sticky y la sincronización con la tabla.
- No se modifican cálculos, saldos, mora, alertas, cierre mensual, JSON ni Excel.
- Se actualiza versión/cache PWA a `0.16.5-post12-acordeones-columnas-esenciales`.

---

# KSA PRÁCTIKA — Post12 Listados Compactos Etapa 2/2

## Captura rápida en Proveedores / Compras y hardening final

- Después de guardar una compra/deuda nueva, el formulario mantiene proveedor y fecha de compra dentro del mismo flujo de captura.
- Se conservan días de crédito y vencimiento sugerido/recalculado según proveedor y fecha.
- Se limpian factura/referencia, total compra/deuda y observación para evitar arrastrar datos de la factura anterior.
- Al salir de Proveedores / Compras hacia cualquier otro módulo, el formulario vuelve a modo nuevo limpio al regresar.
- La memoria de captura rápida es temporal en RAM; no se guarda como preferencia permanente en localStorage.
- La edición de compras existentes sigue separada del flujo rápido para evitar duplicados.
- Se mantienen los listados compactos por columnas en Compras, Pagos, Cobros y Gastos.
- No se modifican cálculos, saldos, estados, mora, cierre mensual, JSON ni Excel.
- Se actualiza versión/cache PWA a `0.16.1-post12-listados-compactos-e2`.

---

# KSA PRÁCTIKA — Post12 Listados Compactos Etapa 1/2

## Listados compactos por columnas

- Proveedores / Compras ahora muestra compras/deudas en tabla compacta por columnas.
- Pagos a proveedores ahora muestra pagos en tabla compacta por columnas.
- Cobros de clientes ahora muestra cobros en tabla compacta por columnas.
- Gastos ahora muestra gastos en tabla compacta por columnas.
- Se conservan acciones existentes: editar, anular/reactivar, pagar, historial e ir al módulo relacionado.
- No se alteran cálculos, saldos, estados, mora, cierre mensual, JSON ni Excel.
- Se actualiza versión/cache PWA a `0.16.0-post12-listados-compactos-e1`.

---

# KSA PRÁCTIKA — Post12 Métodos/Bancos Etapa 3/3

Blindaje final de Bancos por Tipo contra JSON, Excel, cierre mensual, Resumen / Tablero, Historial, Mora, Alertas y PWA.

- Respaldo JSON conserva `cuentasBancos` con `tipo` y agrega snapshot compatible `cuentaBancoTipo` en cobros, pagos y gastos cuando puede resolverse desde Catálogos.
- Importación JSON conserva bancos antiguos sin tipo; no los destruye ni fuerza limpieza. Se avisa para completar el tipo desde Catálogos → Bancos.
- Fusión JSON ahora respeta bancos duplicados por combinación **Nombre + Tipo** y remapea bancos/métodos en cobros y pagos.
- Importación Excel tolera bancos sin tipo y conserva el formato operativo sin exigir columnas nuevas.
- Exportación Excel se mantiene fiel: no se agregaron columnas nuevas que alteren el formato actual.
- Cierre mensual, tarjeta Períodos Pendientes de Cierre, Resumen, Historial, Mora y Alertas quedan compatibles con la nueva estructura.
- PWA actualizada a `0.15.9-post12-bancos-hardening` y cache `v0_15_9_post12_bancos_hardening`.

---

- Etapa 2/3: Cobros, Pagos a proveedores y Gastos filtran bancos por Tipo según método seleccionado.
# KSA PRÁCTIKA — Post12 Métodos/Bancos Etapa 1/3

Webapp estática de control operativo. Esta etapa actualiza **Catálogos → Bancos** para manejar **Nombre del banco + Tipo**, manteniendo intactos módulos, datos de negocio, JSON, Excel, cierre mensual y PWA.

## Post12 Métodos/Bancos — Etapa 1/3: Catálogo de Bancos con Tipo

- Bancos ahora maneja **Nombre del banco** y **Tipo**.
- Tipos disponibles: **Transferencia**, **Depósito** y **Tarjeta**.
- Se permite registrar el mismo banco en tipos diferentes, por ejemplo BAC — Transferencia y BAC — Tarjeta.
- Se bloquea duplicado exacto de Nombre del banco + Tipo.
- Métodos de pago/cobro queda como catálogo simple.
- La lógica visual anterior de **Requiere banco** ya no controla el modelo final.
- Bancos anteriores sin tipo se conservan y se muestran como **Sin tipo** hasta que el usuario los edite.
- Service Worker cache actualizado a `0.15.8-post12-bancos-movimientos`.

---

# KSA PRÁCTIKA — Post 12 Mejoras Etapa 2/3

Webapp estática de control operativo. Esta etapa agrega **Logística / Envío condicional** en Ventas / OC mediante checkbox **Requiere envío**, manteniendo la base completa con Catálogos, Ventas / OC, Cobros, Proveedores / Compras, Pagos a proveedores, Gastos, Mora, Alertas, Historial, Resumen / Tablero, Importación/Exportación Excel, Cierre mensual, Roles, Respaldo JSON, condiciones de pago, modales de edición, PWA / Actualizaciones y Facturas.


## Post12 Mejoras — Etapa 2/3: Logística / Envío

- Se agregó checkbox **Requiere envío** en Ventas / OC.
- El bloque **Logística / Envío** permanece oculto cuando el checkbox está desmarcado.
- Al marcarlo, muestra únicamente: Transportista, Fecha de embarque, Fecha estimada, Fecha real y Guía.
- Los datos se guardan dentro de cada OC como `requiereEnvio` y `logistica`.
- OCs anteriores sin esos campos se interpretan como `requiereEnvio: false` y logística vacía.
- Exportación Excel de Ventas incluye columnas simples de logística sin alterar saldos, cobros ni mora.
- Importación Excel tolera archivos sin columnas de logística.
- Service Worker cache actualizado a `0.15.3-post12-mejoras-etapa3-metodos-bancos`.

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
- Sintaxis Service Worker validada con `node --check service-worker.js`.
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
- Service Worker actualizado a `v0_15_1_post12_mejoras_etapa1_facturas`.
- Cache PWA incluye `index.html`, CSS, JS, manifest, logo, íconos y `vendor/jszip.min.js`.
- Se mantienen intactos JSON, Excel, importación, exportación, cierres y datos de negocio.


## Post12 Mejoras — Etapa 1 Facturas
- Se agregó bloque Facturas en Ventas / OC.
- Cada OC guarda varias facturas con número y fecha.
- Compatibilidad legacy: OCs sin facturas se normalizan con lista vacía.
- Exportación Excel incluye resumen simple de facturas en la hoja Ventas sin alterar saldos.


## Post12 Mejoras — Etapa 3/3: Métodos de pago y Bancos

- Métodos de pago/cobro continúan editables desde Catálogos con agregar, editar y borrado seguro mediante inactivación.
- Bancos queda visible como catálogo editable, reutilizando la estructura interna compatible `cuentasBancos` para no romper respaldos ni históricos.
- Cobros, Pagos a proveedores y Gastos muestran Banco únicamente cuando el método seleccionado es Transferencia o Tarjeta.
- Banco no es obligatorio para Efectivo u otros métodos; si Transferencia/Tarjeta no tiene bancos disponibles, la app muestra aviso claro para agregarlos en Catálogos.
- Se conserva compatibilidad con JSON, Excel, cierre mensual, Service Worker y PWA.



## 0.16.4 — Acordeones por entidad

- Agrupa Compras por proveedor, Pagos por proveedor, Cobros por cliente y Gastos por tipo de gasto.
- Mantiene listados compactos por columnas dentro del grupo abierto.
- Conserva scrollbar horizontal superior sticky dentro de cada tabla desplegada.
- No altera cálculos, saldos, mora, alertas, cierre mensual, Excel ni JSON.

## 0.16.3 — Scrollbar superior sticky

- Se agregó scrollbar horizontal superior sticky sincronizado para Compras, Pagos, Cobros y Gastos.
- Se actualizó Service Worker/cache para detección PWA de nueva versión.
