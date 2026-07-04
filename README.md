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
