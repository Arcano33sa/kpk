# KSA PRÁCTIKA — Notas y Recordatorios Etapa 3/3

- Integración condicional de Notas y Recordatorios pendientes dentro de Resumen.
- Se reutilizan los mismos registros y acciones del módulo Notas, sin colecciones ni estados paralelos.
- Ubicación: después de indicadores/movimientos y antes de Períodos Pendientes de Cierre.
- Versión/cache PWA actualizada a 0.18.51.

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


## Cierres mensuales / Etapa 1/2 — Persistencia local, Firebase y Guardar datos
- `cierresMensuales` y `exportacionesExcel` quedaron integrados a la cola parcial de “Guardar datos”.
- La cola pendiente se conserva localmente para soportar navegación, recarga y operación offline hasta confirmación real de Firestore.
- Los cierres usan el período `YYYY-MM` como ID estable del documento remoto; las exportaciones conservan su ID y tipo Consulta/Cierre.
- La carga desde Firestore preserva cierres y exportaciones locales que todavía están pendientes de confirmación, evitando reabrir el período por una versión remota atrasada.
- La cola elimina únicamente escrituras confirmadas por Firestore; los fallos permanecen pendientes y no muestran éxito falso.
- Cache PWA actualizado a 0.18.57.


## Cierres mensuales / Etapa 2/2 — Consecutivo oficial, reconciliación y hardening final
- El consecutivo de Excel de Cierre ahora se consume únicamente cuando el período se cierra oficialmente.
- Las reexportaciones del mismo período reutilizan el mismo nombre, consecutivo y registro de exportación.
- Se agregó reserva única por período abierto para evitar que dos períodos diferentes utilicen el mismo consecutivo.
- La reconciliación calcula el próximo número desde el mayor consecutivo oficial válido, corrige valores inflados por pruebas y conserva secuencias históricas legítimas no continuas.
- La migración idempotente consolida exportaciones de prueba duplicadas, conserva Excel Consulta y JSON independientes y deja tombstones pendientes para limpiar duplicados remotos sin borrar datos operativos.
- “Guardar datos” incluye el documento `consecutivos/excelCierre`, junto con cierres y exportaciones, manteniendo los fallos pendientes y sin mostrar éxito falso.
- Cache PWA actualizado a 0.18.58.

## Cierres mensuales / Reparación Etapa 1/3 — Arranque seguro
- Se eliminó la referencia fuera de alcance a `normalizeSessionChangeModuleKey` y se reutiliza el normalizador central de cambios de sesión.
- La reconciliación de cierres/consecutivos dejó de ejecutarse como requisito previo al primer render.
- El Menú se muestra primero y la inspección de arranque se ejecuta después, sobre una copia sin modificar datos, reservas ni consecutivos.
- Las reconciliaciones posteriores desde Firestore cuentan con rollback local y registro contextual si fallan.
- Las migraciones y validaciones no críticas de arranque ya no pueden derribar la interfaz completa.
- Cache PWA actualizado a 0.18.59.

## Cierres mensuales / Reparación Etapa 2/3 — Consecutivo oficial por período
- Se centralizó la clave canónica del período para reconocer `YYYY-MM`, `MM-YYYY`, nombres de mes y variantes históricas sin duplicar registros.
- Los períodos cerrados conservan `consecutivoCierre` y `nombreExcelOficial` como vínculo oficial permanente.
- Mayo de 2026 se repara a `0001- Mayo 2026.xlsx` cuando los datos confirman el caso legado de la Etapa 1 y continúa cerrado.
- Las reservas 0002/0003 incompatibles con mayo se conservan como historial ignorado, sin borrarlas ni contarlas para el próximo cierre.
- El próximo consecutivo se calcula solo desde cierres oficiales reales; Consulta y JSON permanecen independientes.
- La migración v3 es idempotente, conserva exportaciones históricas y prepara cambios para “Guardar datos” sin crear sincronización incremental.
- Cache PWA actualizado a 0.18.60.

## Cierres mensuales / Reparación Etapa 3/3 — Reconciliación Firebase y hardening final
- La hidratación desde Firestore fusiona cierres y exportaciones por evidencia oficial del período, sin permitir que un contador remoto aislado sustituya un cierre válido.
- Mayo de 2026 conserva `0001- Mayo 2026.xlsx` como nombre y consecutivo oficiales cuando es el primer cierre real; el próximo cierre queda en `0002`.
- Los valores remotos inflados se convierten en correcciones pendientes para “Guardar datos”, en lugar de sobrescribir la base local reparada.
- Las escrituras críticas de cierre, exportación oficial y consecutivo se verifican mediante lectura posterior de Firestore antes de retirar sus cambios pendientes.
- Las reexportaciones reutilizan el registro oficial del período; Excel Consulta y JSON mantienen numeraciones independientes.
- La carga local continúa primero y la reconciliación remota permanece protegida para no bloquear el Menú ni provocar pantalla vacía.
- Cache PWA actualizado a 0.18.61.
