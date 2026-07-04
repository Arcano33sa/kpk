# KSA PRÁCTIKA — Post12 Ventas / OC: Sucursal visible en OC registradas

- En el listado de OC registradas se agrega columna visible “Sucursal”.
- No se agrega columna Cliente porque el cliente ya se selecciona como contexto previo.
- Ajuste visual/operativo sin tocar cálculos, saldos, cobros, facturas, Excel, JSON, cierres, mora ni lógica de negocio.
- Versión/cache PWA actualizado a `0.17.80-post12-ventas-oc-sucursal-columna`.

## 0.17.79-post12-facturas-pagina-activa-busqueda-global

- Facturas conserva la página activa al guardar, editar, cerrar modal o borrar, con ajuste automático a la última página válida cuando el total cambia.
- La búsqueda por número revisa todas las facturas de la vista/período actual antes de paginar y muestra la página donde está cada resultado.
- Se agregó acción compacta para ir a la página del resultado encontrado, sin guardar estado visual en JSON ni localStorage de negocio.
- Se mantiene la retención temporal de Fecha, Cliente y Sucursal; no se toca Ventas / OC, Cobros, Excel, JSON, cierres ni saldos.
- Versión/cache PWA actualizado a `0.17.79-post12-facturas-pagina-activa-busqueda-global`.

## 0.17.78-post12-facturas-retencion-temporal-e2

- Facturas conserva temporalmente Fecha, Cliente y Sucursal en el formulario de nueva factura mientras el usuario permanece dentro del módulo.
- Al guardar una factura nueva, se limpian los campos variables y se mantienen los datos de captura repetitiva sin guardarlos en localStorage ni en JSON.
- Al salir de Facturas o recargar la app, la retención temporal desaparece; el modal de edición no modifica esta ayuda de captura.
- Se mantiene orden numérico natural, búsqueda, históricos por período, cierre general, Excel, JSON y conexión con Ventas / OC y Cobros.
- Versión/cache PWA actualizado a `0.17.78-post12-facturas-retencion-temporal-e2`.

## 0.17.70-post12-periodo-trabajo-etapa3-cierres-json-final

- Se blindó el selector global para reconciliar automáticamente el Período de trabajo después de cierres generales e importaciones JSON.
- Los períodos cerrados desde Excel / Cierre quedan fuera del selector editable; si el período activo se cierra, se selecciona el período abierto más reciente.
- JSON incluye metadata segura del Período de trabajo y al importar evita dejar seleccionados períodos cerrados o inexistentes.
- Se mantiene Facturas sin cierre propio: sus históricos siguen agrupándose visualmente por el cierre general de Excel.
- Versión/cache PWA actualizado a `0.17.70-post12-periodo-trabajo-etapa3-cierres-json-final`.

## 0.17.68-post12-periodo-trabajo-etapa1-selector

- Se agregó selector global de **Período de trabajo** con persistencia local segura.
- El selector muestra únicamente períodos trabajables detectados/operativos y excluye períodos cerrados desde Excel / Cierre.
- Se prepara la separación visual entre período de origen del documento y fecha real de cobros/pagos, sin cambiar cálculos ni lógica profunda de módulos.
- Versión/cache PWA actualizado a `0.17.68-post12-periodo-trabajo-etapa1-selector`.

## 0.17.67-post12-facturas-etapa3-cobros-historico-json-final

- Facturas queda conectada documentalmente con Cobros: cuando una OC queda totalmente cobrada, las facturas vinculadas pasan a `Pagada` sin tocar montos, saldos, retenciones ni recibido real.
- Se evita pisar estados delicados: `Anulada` y `Otro` no se actualizan automáticamente; las facturas intermedias por salto solo se marcan si fueron clasificadas fuera de `Otro`.
- Se agregó Histórico de Facturas agrupado por períodos cerrados, desplegable, con resumen, listado ordenado por fecha reciente y paginación de 20 por período.
- La búsqueda por No. de factura se mantiene global para período actual e históricos.
- Respaldo/importación JSON incluye el módulo Facturas como módulo propio, compatible con respaldo general y parcial, sin sobrescribir estados/observaciones existentes en fusiones.
- Versión/cache PWA actualizado a `0.17.67-post12-facturas-etapa3-cobros-historico-json-final`.

## 0.17.66-post12-facturas-etapa2-ventas-consecutivos

- Módulo Facturas conectado con Ventas / OC: al guardar facturas en una OC se crean registros automáticos en Facturas.
- Control de saltos de consecutivo con conservación de ceros iniciales; las intermedias quedan en Estado “Otro” y pendientes de clasificar.
- Prevención de duplicados por No. de factura sin sobrescribir datos manuales.
- Versión/cache PWA actualizado a `0.17.66-post12-facturas-etapa2-ventas-consecutivos`.

# KSA PRÁCTIKA — Notas Etapa 3/3: Calendario, JSON y hardening final

Cambios principales de esta entrega:
- Recordatorios agrega exportación individual .ics con ícono 📅 y validación de fecha.
- Recordatorios agrega exportación global `KSA_Recordatorios_Todos.ics` solo para pendientes con fecha, excluyendo cumplidos/históricos y cancelados.
- Respaldo JSON incluye el módulo Notas como bloque separado (`notasModulo` / `moduloNotas`) sin mezclarlo con ventas, cobros, gastos ni cierres.
- Importación JSON reconoce Notas en respaldos completos y respaldos parciales de Notas, evitando duplicados por ID y sin borrar datos de negocio no incluidos.
- Versión/cache PWA actualizado a `0.17.64-post12-notas-etapa3-calendario-json-final`.

---

# KSA PRÁCTIKA — Post12 Resumen Retenciones

Cambios principales de esta entrega:
- Resumen agrega métrica superior “Retenciones” con el total del período filtrado.
- Resumen agrega bloque compacto “Retenciones por concepto”, agrupado desde Cobros.
- Las retenciones se filtran por fecha real de cobro y no se mezclan con gastos, utilidad, venta neta ni saldos.
- Versión/cache PWA actualizado a `0.17.57-post12-resumen-retenciones`.

# KSA PRÁCTIKA — Post12 Cobros: Retenciones desde Catálogos

- Cobros permite aplicar retención opcional desde Catálogos → Retenciones.
- El monto recibido real queda como dinero de caja/banco; recibido real + retención se aplica al saldo general de la OC.
- Se guardan snapshots de concepto, porcentaje, monto retenido, monto recibido real y monto aplicado a OC.
- El historial de cobros muestra retención compacta y mantiene búsqueda/selección por OC o factura relacionada.
- No se modifican venta neta, facturas relacionadas, compras, proveedores, pagos, gastos, Resumen, cierres, Excel, comparador ni Bdatos.
- Versión/cache PWA actualizado a `0.17.56-post12-cobros-retenciones`.

---

# KSA PRÁCTIKA — Post12 Cobros: OC completa y factura referida

- Cobros: al seleccionar resultado por OC o factura, se carga la OC madre completa.
- OC seleccionada muestra datos compactos, saldo general, estado, todas las facturas relacionadas y Factura referida cuando aplica.
- La factura referida queda como trazabilidad del cobro sin crear saldo ni documento operativo por factura.
- No se modifican cálculos, ventas, saldos, compras, pagos, gastos, cierres, Excel, comparador ni Bdatos.
- Versión/cache PWA actualizado a `0.17.55-post12-retenciones-catalogo`.
- Catálogos incorpora la sección Retenciones para administrar conceptos/porcentajes activos e inactivos sin conectar todavía Cobros ni Resumen.

---

# KSA PRÁCTIKA — Post12 Cobros: buscar por OC o factura

- Cobros: se agregó búsqueda por OC o factura relacionada, conservando `Ninguna` como valor inicial.
- La búsqueda muestra resultado(s) compactos con botón `Seleccionar`; no autoselecciona ni crea cobros.
- La factura relacionada funciona solo como llave para cargar la OC madre; el cobro sigue aplicándose al saldo general de la OC.
- Se conserva comparación textual para facturas, incluyendo ceros iniciales.
- Versión/cache PWA actualizado a `0.17.53-post12-cobros-buscar-oc-factura`.

# KSA PRÁCTIKA — Post12 Ventas Logística Gasto Automático

- Conecta el bloque Gasto de Logística / Envío con registros reales del módulo Gastos.
- El gasto automático usa Fecha de embarque, Tipo de gasto = Transporte y vínculo interno con la Venta / OC.
- Al editar la venta se actualiza el mismo gasto vinculado; si el monto queda en 0 o la venta deja de requerir envío, el gasto se anula/deja sin efecto.
- Versión/cache PWA actualizado a `0.17.50-post12-ventas-logistica-gasto-automatico`.

# KSA PRÁCTIKA — Post12 Proveedores: Facturas sin Referencia visible

- En Proveedores / Compras se ocultó el campo visible **Referencia** del formulario principal.
- **Facturas relacionadas** queda como el lugar oficial para registrar una o varias facturas que respaldan la compra/deuda.
- Para compras nuevas, la referencia interna se genera desde la primera factura relacionada para conservar compatibilidad con pagos, listados, JSON e historial.
- Compras antiguas con referencia histórica siguen abriendo sin error y muestran esa referencia como factura relacionada al editar si no traían el nuevo campo.
- Listado de compras muestra la columna **Facturas** de forma compacta, sin ensanchar tarjetas ni crear scroll horizontal general.
- No se modifican pagos, saldos, mora, cierres, Excel, JSON operativo, metadata JSON, historial de importaciones, comparador ni Bdatos.
- Versión/cache PWA actualizado a `0.17.47-post12-proveedores-facturas-sin-referencia-visible`.

---

# KSA PRÁCTIKA — Post12 Referencia: teclado numérico

- En Proveedores / Compras, el campo Referencia conserva `type="text"` y ahora usa `inputmode="numeric"` para abrir teclado numérico en iPad/celular.
- El valor sigue guardándose como texto, sin convertir a número y sin eliminar ceros iniciales.
- No se modifican cálculos, saldos, mora, cierres, Excel, JSON operativo, Bdatos, catálogos ni estructura de almacenamiento.
- Versión/cache PWA actualizado a `0.17.44-post12-bitacora-desplegable`.

---

# KSA PRÁCTIKA — Identidad de equipo Etapa 4/4: Comparador JSON antes de importar

- Antes de confirmar una importación JSON se muestra “Comparación antes de importar” con Base local vs JSON seleccionado.
- La comparación incluye equipo actual, equipo origen, última actividad local, última actividad incluida, último respaldo exportado, última importación, fecha de exportación, versión de respaldo y conteos por módulo.
- Se agregó tabla compacta con Local / JSON / Diferencia para OC/Ventas, Cobros, Compras/Proveedores, Pagos, Gastos, Cierres, Catálogos y Bitácora.
- Se muestra advertencia informativa cuando el JSON parece más reciente, cuando la base local parece más reciente o cuando no se puede determinar.
- Fusionar y Reemplazar conservan la lógica anterior; solo se agregan textos claros de riesgo/alcance.
- Al importar correctamente se registra bitácora con modo usado, origen, fecha de exportación y conteos básicos; al cancelar no registra importación.
- Se actualiza el resumen local de última importación JSON con equipo origen, modo, conteos y última actividad del JSON.
- JSON antiguos sin metadata siguen importando y muestran advertencia de respaldo anterior/sin metadata.
- No se modifican cálculos, Excel, fórmulas, saldos, mora, cierres, catálogos ni estructura de negocio.
- Versión/cache PWA actualizado a `0.17.25-post12-identidad-equipo-etapa4-comparador-json`.

---

# KSA PRÁCTIKA — Post12 Ventas / OC: layout ajuste derecha

- Se reacomodó visualmente Ventas / OC en pantallas anchas: Crear venta / OC queda a la izquierda y, a la derecha, OC registradas arriba con Registrar ajuste debajo.
- OC registradas puede expandirse normalmente y Registrar ajuste baja de forma natural, sin superposición ni flotación rara.
- En iPad vertical y móvil se conserva el orden vertical: Crear venta / OC, Registrar ajuste, OC registradas.
- Cambio solo estético: no se alteran cálculos, lógica de negocio, almacenamiento, JSON, Excel, mora, cierre, resumen ni PWA salvo versión/cache.
- Se actualiza versión/cache PWA a `0.17.19-post12-ventas-layout-ajuste-derecha`.

---

# KSA PRÁCTIKA — Post12 Ventas / OC: formulario orden visual

- Se reordenó visualmente el bloque principal de Crear venta / OC: Número OC / Fecha OC, Cliente / Sucursal, Fecha de entrega / Fecha vencimiento, Subtotal / Descuento y Días de crédito al final.
- El cambio es solo visual: no altera cálculos, almacenamiento, JSON, Excel, mora, cierre, resumen ni vencimientos.
- Días de crédito conserva la lógica vigente: usa Fecha de entrega cuando existe y Fecha OC como respaldo.
- Se actualiza versión/cache PWA a `0.17.18-post12-ventas-formulario-orden-visual`.

---

# KSA PRÁCTIKA — Post12 Ventas / OC: captura masiva inteligente de facturas

- Ventas / OC permite varias facturas dentro de una misma OC, cada una solo con número de factura.
- El bloque Facturas funciona como captura masiva compacta: un solo campo acepta varias facturas por coma, punto y coma, salto de línea o espacios cuando son códigos simples.
- Se eliminó la fecha de factura del flujo visible y operativo; la fecha documental válida es Fecha OC.
- Después de guardar una OC nueva, el formulario retiene cliente, sucursal y fecha OC para captura rápida.
- Al salir de Ventas / OC se limpia la captura rápida para evitar arrastres entre módulos.
- Edición de OC carga todos los números en el campo masivo para agregar, modificar o quitar facturas sin duplicarlas.
- Se mantiene compatibilidad defensiva con facturas antiguas que pudieran traer fecha, operando solo con número.
- No se cambian cobros, proveedores/compras, pagos, compras de contado, mora, cierre, cálculos, Excel ni JSON salvo compatibilidad documental.
- Versión/cache PWA actualizado a 0.17.0-post12-ventas-oc-facturas-captura-masiva.

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
- Service Worker actualizado a `v0_17_0_post12_ventas_oc_facturas_captura_masiva`.
- Cache PWA incluye `index.html`, CSS, JS, manifest, logo, íconos y `vendor/jszip.min.js`.
- Se mantienen intactos JSON, Excel, importación, exportación, cierres y datos de negocio.


## Post12 Mejoras — Etapa 1 Facturas
- Se agregó bloque Facturas en Ventas / OC.
- Cada OC guarda varias facturas con número, sin fecha individual de factura.
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

## 0.17.1 — Ajustes / Notas en Proveedores / Compras

- Proveedores / Compras permite registrar ajustes ligados a compras/facturas existentes.
- Los ajustes reducen el total ajustado y el saldo por pagar sin crear pagos, caja ni banco.
- La compra conserva el monto original y muestra ajustes, total ajustado, pagado y saldo.
- El historial de compra incorpora ajustes/notas y permite eliminación controlada con confirmación.
- Pagos a proveedores, Mora, Alertas, Cierre mensual, JSON y Excel usan saldos recalculados.
- Se mantiene el listado compacto por acordeones, columnas esenciales y scrollbar superior sticky.
- Service Worker/cache actualizado a `v0_17_1_post12_ajustes_proveedores_compras`.

## 0.17.2 — Ajustes / Notas en Ventas / OC

- Ventas / OC permite registrar ajustes/notas ligados a OC existentes.
- Los ajustes reducen saldo por cobrar sin crear cobros, caja ni bancos.
- Excel, JSON y PWA actualizados para incluir ajustes de clientes.
- Service Worker/cache actualizado a `v0_17_2_post12_ajustes_ventas_oc`.

## 0.17.3 — Integración general de Ajustes

- Resumen / Tablero usa ventas y compras ajustadas sin inflar cobros, pagos ni flujo.
- Mora, Alertas, Cierre mensual y Períodos Pendientes de Cierre calculan saldos reales después de ajustes.
- Historial muestra ajustes compactos en Ventas / OC y Proveedores / Compras.
- Excel general y Excel obligatorio antes del cierre reflejan originales, ajustes, totales ajustados, cobros/pagos reales y saldos.
- Respaldo JSON e importación validada incluyen ajustes sin duplicarlos y conservan compatibilidad con registros antiguos.
- Facturas múltiples, acordeones, columnas esenciales y scrollbar horizontal superior sticky se mantienen.
- Service Worker/cache actualizado a `v0_17_3_post12_ajustes_integracion_general`.

## Post12 — Cierre Detalle Bloqueo Compacto

- Cerrar Período conserva el desplegable “Ver detalle del bloqueo”.
- Clientes y Proveedores pendientes ahora se muestran como líneas compactas con columnas informativas.
- Se retiraron las tarjetas grandes y las acciones operativas dentro del detalle de bloqueo.
- Se agregó tabla con scrollbar horizontal interno/sticky cuando el ancho no alcanza.
- No se modificaron cálculos, saldos ajustados, mora, alertas, cierre, Excel, JSON ni datos de negocio.
- Versión PWA/cache: 0.17.4-post12-cierre-detalle-bloqueo-compacto.

## 0.17.15 — Ventas / OC: Fecha de entrega

- Se agregó el campo opcional **Fecha de entrega** en el formulario de Ventas / OC, cerca de Fecha OC y Días de crédito.
- Cada OC guarda y carga `fechaEntrega` al editar sin afectar OCs antiguas que no tengan ese dato.
- No se modifican vencimiento, mora, alertas, cierre, utilidad, Excel ni la fórmula Subtotal - Descuento = Total.
- Service Worker/cache actualizado a `v0_17_15_post12_ventas_fecha_entrega`.

## 0.17.16 — Ventas / OC: Fecha de entrega para crédito, vencimiento y mora

- La fecha base de crédito de clientes ahora usa **Fecha de entrega** cuando existe y **Fecha OC** solo como respaldo.
- El vencimiento de Ventas / OC se recalcula como fecha base de crédito + días de crédito.
- Mora de clientes, días de mora, alertas de vencidos y próximos a vencer usan el vencimiento basado en Fecha de entrega.
- Cierre mensual y períodos pendientes muestran saldos de clientes con la nueva fecha de vencimiento, sin adelantar mora antes de la entrega.
- No se modifica la lógica de utilidad, cobros, pagos, proveedores, fórmula de Ventas / OC, Excel, JSON ni localStorage.
- Service Worker/cache actualizado a `v0_17_16_post12_ventas_fecha_entrega_credito_mora`.


## 0.17.17 — Fecha de entrega en Excel, JSON y hardening final

- Exportación Excel agrega **Fecha entrega** en la hoja Ventas y conserva la columna sin romper OCs antiguas sin ese dato.
- Resumen de mora en Excel incluye Entrega para clientes cuando aplica.
- Respaldo JSON mantiene `fechaEntrega` en cada Venta / OC mediante normalización; respaldos antiguos sin el campo siguen importando con valor vacío.
- Importación desde Excel reconoce encabezados compatibles de Fecha entrega para rondas futuras de ida/vuelta.
- Versión PWA/cache actualizada a `v0_17_17_post12_ventas_fecha_entrega_excel_json_hardening`.

## 0.17.51-post12-cobros-oc-ninguna-facturas

- Cobros: el selector OC inicia con opción `Ninguna` como estado predeterminado.
- Cobros: con `Ninguna` no se habilitan fecha, monto, método, banco ni cobro completo para evitar cobros accidentales.
- Cobros: al seleccionar una OC, el bloque `OC seleccionada` usa una distribución compacta más clara.
- Cobros: el bloque muestra `Facturas relacionadas` únicamente con los números de factura, sin fechas.
- PWA: actualización de versión y cache.
## 0.17.52-post12-scrollbars-superiores-permanentes
- Refuerzo visual global de scrollbars superiores permanentes en tablas/listados compactos con scroll horizontal interno.
- Riel superior visible aun cuando el sistema oculte scrollbars nativos, sincronizado con el contenido y sin scroll horizontal general.

