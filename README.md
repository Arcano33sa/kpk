# KSA PRÁCTIKA — Post12 Casa Etapa 2

- Se agregó resumen interno de Casa con “Utilidad KPK”, “Total global Casa” y “Disponible después de Casa”.
- Se agregó desglose de totales individuales por Categoría Casa, respetando filtros de mes, año y categoría.
- Casa sigue separado de Resumen productivo, Ventas, Compras, Gastos productivos, Flujo, Excel Consulta y Excel Cierre.
- Se actualizó versión/cache PWA para refrescar la entrega.


Fix Casa: Utilidad KPK usa el período de trabajo activo por defecto y cache bump 0.17.99.


## Bloque A — Etapa 1/6

Se agregó KSADataLayer como capa preparatoria local/nube. En esta etapa la app sigue operando únicamente en modo local, sin Firebase, sin login real y sin migración de datos.

## Bloque A / Etapa 2
- Agregado bloque visible en Configuración para mostrar modo de datos/sincronización.
- Estado actual queda en modo local, con Firebase pendiente de configuración.
- No se conecta Firebase, no se migra información y no se modifica el almacenamiento operativo.


Bloque A / Etapa 3/6: se agregó una pantalla de acceso preparada para Firebase Auth, sin conexión real y con continuidad en modo local.


## Bloque A / Etapa 5
- Agregado contrato interno para estructura futura de Cloud Firestore bajo workspaces/{workspaceId}.
- Preparadas referencias de colecciones, relaciones, política de IDs, consecutivos separados, usuarios, cierres e importación JSON futura.
- Se mantiene operación 100% local: sin Firebase real, sin migración, sin cambios de datos y sin consumo de consecutivos.

## Bloque A / Etapa 6
- Agregado `firebase-config.js` con `KSA_FIREBASE_CONFIG` vacío como punto claro para pegar el firebaseConfig real en una etapa posterior.
- Agregado `KSAFirebaseAdapter` con stubs seguros para initFirebase, estado, Auth, usuario actual, rol, lectura/escritura futura de Firestore e importación inicial futura.
- La app reporta Firebase/Auth/Firestore/Workspace como pendientes, no carga SDK real, no conecta Firebase, no migra datos y mantiene operación local.

## Casa / Etapa 1/2 — Fecha según período de trabajo
- El formulario de nuevo gasto Casa ahora sugiere la Fecha según el período visible de Casa: si mes/año son específicos usa ese período; si coincide con el mes real usa la fecha del día; si no coincide usa el día 01 del período.
- Si Casa está en Todos o el período no tiene mes/año claros, conserva la fecha real del día.
- La edición de gastos Casa conserva la fecha guardada y solo cambia si el usuario la modifica manualmente.
- No se modificó Excel Consulta, Excel Cierre, Firebase, usuarios, cierres, JSON, consecutivos ni lógica productiva.
- Cache PWA actualizado a 0.18.06.

## Bloque C / Etapa 2/5 — Login real con administrador inicial
- Activado Firebase Authentication real con correo y contraseña mediante SDK modular.
- Reconocido `atencion@arcano33.com` como Administrador inicial.
- Agregado inicio/cierre de sesión real y estado visible en Configuración → Usuarios.
- Firestore queda preparado / pendiente de reglas y workspace; no se leen ni escriben datos en nube.
- Modo de datos se mantiene en Local, sin migración, sin limpieza de localStorage y sin alterar JSON, Excel ni consecutivos.
- Cache PWA actualizado a 0.18.09.

## Bloque C / Etapa 3/5 — Reglas Firestore y workspace base
- Agregados `FIRESTORE_RULES_KSA_PRACTIKA.rules` y `GUIA_APLICAR_REGLAS_FIRESTORE.txt`.
- Configuración → Usuarios ahora muestra guía/reglas, permite copiar instrucciones, verificar Firestore e inicializar `workspaces/ksa_practika` con usuario administrador inicial.
- La inicialización es idempotente: si el workspace ya existe, no duplica ni migra datos operativos.
- Modo de datos sigue Local; base en línea queda preparada, no activa.
- No se modificaron JSON, Excel, consecutivos ni módulos operativos.
- Cache PWA actualizado a 0.18.10.

## Bloque C / Etapa 4/5 — Importación inicial JSON a Firestore
- Agregada herramienta manual en Configuración → Usuarios → Base en línea para seleccionar JSON maestro, validar estructura, IDs, relaciones y conteos antes de importar.
- La importación a Firestore crea solo documentos faltantes, omite existentes por documentId y registra metadata en `workspaces/ksa_practika/importaciones/{importId}`.
- Actualiza `workspaces/ksa_practika/metadata/sistema` con `fuentePrincipal: "local"`, `datosMigrados: true` y `cloudDataReady: true`, sin activar operación online.
- Se conserva modo Local; no borra localStorage, no modifica JSON local, Excel, consecutivos ni datos productivos locales.
- Cache PWA actualizado a 0.18.11.

## Bloque C / Etapa 5/5 — Operación online controlada con Firestore
- Firestore puede quedar como fuente principal cuando la metadata importada confirma datosMigrados, cloudDataReady e importacionInicialCompletada.
- Configuración → Usuarios muestra Nube activa, fuente Firestore, workspace ksa_practika, proyecto ksakpk, última sincronización y datos migrados.
- Se agregó acción Actualizar datos para refrescar desde Firestore y acción Activar nube reservada para Administrador.
- Las operaciones guardan en local como respaldo operativo y sincronizan snapshot controlado hacia Firestore cuando la nube está activa.
- JSON queda como respaldo auxiliar y exporta desde la fuente activa visible en la app.
- Reglas Firestore actualizadas: sin borrado físico, usuarios/importación reservados para Administrador y usuarios activos con escritura operativa.
- Cache PWA actualizado a 0.18.12.

## Bloque D / Etapa 2/4 — Usuarios autorizados por UID
- Configuración → Usuarios ahora incluye el subbloque “Usuarios autorizados”.
- La app lista autorizaciones desde `workspaces/ksa_practika/usuarios/{uid}` en Firestore.
- Permite agregar autorización por UID, editar nombre, editar rol, activar/desactivar y refrescar listado.
- No crea cuentas Firebase Auth, no pide contraseña y no usa creación de usuarios desde la app.
- `atencion@arcano33.com` queda protegido como Administrador principal: no se puede desactivar ni bajar a Usuario normal.
- No se tocaron módulos operativos, datos productivos, Excel, JSON auxiliar ni consecutivos.
- Cache PWA actualizado a 0.18.14.


## Bloque D / Etapa 3/4 — Permisos por rol en la app

- Se aplicaron permisos de app para los roles únicos Administrador y Usuario normal.
- Se protegieron acciones críticas con validación visual e interna: Usuarios, diagnóstico online, importación JSON maestro a nube, herramientas Firestore, cierre de período, Excel Cierre, configuración delicada, catálogos y anulaciones.
- Usuario normal conserva operación diaria: módulos operativos, lectura de datos, búsqueda global, Facturas, Casa, Catálogos en consulta, actualización de datos y Excel Consulta.
- El administrador principal atencion@arcano33.com queda protegido para evitar desactivación, pérdida de rol o sistema sin administrador.
- Cache PWA actualizado a 0.18.15.

## Bloque D / Etapa 4/4 — JSON auxiliar desde nube

- En modo “Nube activa”, la exportación JSON auxiliar se arma leyendo Firestore como fuente principal, no datos locales viejos.
- El JSON exportado incluye metadata de fuente, workspace, projectId, usuario exportador, conteos, `fuentePrincipal: "cloud"` y `respaldoTipo: "auxiliar"`.
- Se reforzaron advertencias anti-reimportación cuando ya existe importación inicial completada o nube activa.
- La importación JSON local queda bloqueada visual e internamente cuando Firestore está activo como fuente principal.
- Se agregó `GUIA_JSON_AUXILIAR_NUBE_KSA_PRACTIKA.txt`.
- Consecutivo JSON permanece separado de Excel Consulta y Excel Cierre; no avanza si se cancela o falla la exportación.
- Cache PWA actualizado a 0.18.16.

## Histórico heredado — Sincronización Inteligente — Etapa 5/5 — Hardening final
> Referencia de la base anterior. El comportamiento vigente de esta entrega está definido en la Etapa 2/5 al final del documento.

- “Actualizar datos” usa metadata y sincronización incremental por defecto; si no existen cambios muestra “Los datos ya están actualizados.” sin descargar colecciones.
- Eliminado el fallback automático a sincronización completa durante actualizaciones normales. Si la metadata no permite una fusión incremental segura, la app informa el bloqueo y no descarga toda la base silenciosamente.
- También se eliminó la lectura completa automática de módulos individuales cuando falta cursor, falla la consulta `syncUpdatedAt` o una revisión no devuelve delta; esos casos quedan bloqueados para diagnóstico/recuperación administrativa.
- La sincronización completa queda controlada por motivo: primer uso, migración, importación, diagnóstico o recuperación; la acción manual visible es exclusiva del Administrador y exige confirmación.
- El inicio de sesión y el arranque usan incremental cuando el equipo ya posee una base válida; solo el primer uso sin línea base permite una carga completa inicial.
- Los mensajes informan registros aplicados, módulos afectados y conflictos protegidos. Se mantienen cola de cambios, tombstones, limpieza de Facturas, IDs, consecutivos, JSON y fusión segura.
- La lectura completa incluye Bdatos, catálogos, Ventas, Cobros, Compras, Pagos, Gastos, Casa, Facturas, Notas, cierres, exportaciones, bitácora, configuración y consecutivos.
- Cache PWA actualizado a 0.18.48.


## Sincronización Inteligente — Etapa 1/5 — Contrato y compatibilidad
- Se reforzó de forma idempotente el contrato ya existente de sincronización sin desactivar ni retroceder las capacidades incrementales presentes en la base cargada.
- Se agregó una auditoría interna de preparación por módulo, campos canónicos, tombstones, compatibilidad legacy y metadata de revisiones.
- Los documentos antiguos continúan funcionando sin migración masiva: reciben campos de sincronización únicamente al volver a modificarse.
- No se modificaron interfaz, reglas Firestore, firebaseConfig, relaciones, consecutivos, JSON ni comportamiento visible de los controles de sincronización.
- Cache PWA actualizado a 0.18.53.


## Sincronización Inteligente — Etapa 2/5 — Verificación rápida antes de descargar
- “Actualizar datos” consulta primero únicamente la metadata de sincronización en Firestore.
- Si la revisión local y la revisión de nube coinciden, no descarga colecciones y muestra “Los datos ya están actualizados.”
- Si las revisiones difieren o no pueden compararse con seguridad, mantiene la descarga completa existente; todavía no descarga módulos de forma incremental.
- Se conservan Guardar datos, Subir pendientes, Facturas, JSON, Diagnóstico, protección de cambios locales y comportamiento sin conexión.
- Cache PWA actualizado a 0.18.54.

## Sincronización Inteligente — Etapa 3/5 — Descarga incremental por módulos
- “Actualizar datos” conserva la verificación rápida de metadata antes de leer colecciones.
- Cuando existen diferencias, consulta solamente los módulos cuya revisión cambió y únicamente documentos posteriores al cursor local mediante `syncUpdatedAt`.
- La app fusiona registros modificados sin sustituir `appData` completo y conserva módulos no afectados intactos.
- Se incluyen Catálogos/Retenciones, Ventas, Facturas, Cobros, Compras, Pagos, Gastos, Casa, Notas, Configuración, marcadores de limpieza, consecutivos y tombstones según el contrato existente.
- Configuración se consulta como documento único; Facturas y Notas mantienen sus reconstrucciones y limpiezas específicas.
- “Actualizar datos” no ejecuta descarga completa automática si falta baseline, cursor o metadata comparable; esos casos quedan en Diagnóstico para recuperación administrativa.
- Cache PWA actualizado a 0.18.55.


## Sincronización Inteligente — Etapa 4/5 — Fusión segura, conflictos y eliminaciones
- La cola de cambios locales pendientes ahora se persiste en `localStorage` y se recupera tras recargar o cerrar la PWA, manteniendo la base de comparación original por registro.
- La descarga incremental y la sincronización completa preservan registros con cambios locales pendientes y bloquean el avance del cursor del módulo cuando existe un conflicto real.
- Los reintentos son idempotentes: si Firestore ya contiene el mismo estado operativo por una escritura previamente confirmada pero cuya respuesta se perdió, el cambio se reconoce como aplicado sin duplicar ni sobrescribir.
- Los tombstones se conservan también durante la fusión completa; una creación o edición local con el mismo ID queda protegida como conflicto y no restaura automáticamente un registro eliminado en Firestore.
- La limpieza de Facturas conserva su tratamiento independiente, sus eliminaciones pendientes y sus confirmaciones sin bloquear guardados operativos válidos.
- Guardar datos, Actualizar datos, Subir pendientes, Diagnóstico, Facturas, JSON, IDs, consecutivos, orden descendente y Vista GLOBAL permanecen compatibles.
- Cache PWA actualizado a 0.18.56.


## Sincronización Inteligente — Etapa 5/5 — Hardening final
- “Actualizar datos” mantiene la sincronización incremental como ruta normal y no activa una descarga completa automática ante diferencias, cursores faltantes ni errores de metadata.
- La sincronización completa queda como respaldo administrativo para primer uso, migración, importación, diagnóstico o recuperación.
- La lectura completa se ejecuta por grupos concurrentes controlados y dispone de un tiempo de espera independiente de 90 segundos; la confirmación de baseline dispone de 45 segundos.
- Antes de aplicar una fotografía completa, la app vuelve a verificar la metadata. Si Firestore cambió durante la lectura, descarta la fotografía y exige reintento para evitar una base inconsistente.
- Cuando Firestore ya posee un baseline confirmado, un equipo nuevo lo adopta localmente sin reescribir la metadata global ni generar revisiones artificiales.
- Los reintentos incrementales omiten registros idénticos ya aplicados y tombstones repetidos, reduciendo escrituras locales y conteos inflados.
- La fusión segura conserva cambios locales pendientes, conflictos, eliminaciones, limpieza de Facturas, Notas, bitácora, consecutivos, JSON y datos históricos.
- Diagnóstico muestra registros descargados, aplicados, sin cambios, tombstones, módulos bloqueados y cursores.
- Cache PWA actualizado a 0.18.57.
