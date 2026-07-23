# KSA PRÁCTIKA — Condición de compra — Etapa 2/2 — Hardening final

- Las compras marcadas como Contado crean o actualizan un único pago automático ligado a la compra.
- El pago automático deja saldo C$0.00, estado Pagado, sin mora y sin bloqueo de cierre; Crédito conserva la lógica anterior.
- La edición, anulación, reactivación y cambio de condición reconcilian el pago automático sin duplicarlo y conservan trazabilidad.
- Integración completa con Pagos, Resumen, Flujo, históricos, Excel Consulta/Cierre, JSON y sincronización Firebase.
- Compatibilidad histórica: las compras anteriores no se migran ni modifican automáticamente.
- Versión/cache PWA: 0.18.63-condicion-compra-etapa2.

# KSA PRÁCTIKA — Sistema Global de Toast — Etapa 2/2

- Integración global del Toast en módulos operativos, Catálogos, Configuración, Calculadora, Excel, JSON, Firebase, PWA, cierres y respaldos.
- Procesos largos usan Toast azul persistente y el mismo mensaje se reemplaza por éxito, advertencia o error al finalizar.
- Se eliminaron duplicados entre mensajes superiores y Toast para avisos operativos simples.
- Confirmaciones, eliminaciones, cierre de período, preguntas Sí/No y bloqueos detallados permanecen fuera del sistema Toast.
- Hardening: deduplicación temporal, límite de pila, limpieza de temporizadores/nodos y preservación del scroll.
- Versión/cache PWA: 0.18.61-toast-etapa2.

# KSA PRÁCTIKA — Excel con nombre manual Etapa 2/2 — Hardening final

- El cierre mensual exige una exportación válida de tipo Cierre para el mismo mes/año, con ID, nombre manual, fecha, estado completado y snapshot consistente.
- El nombre exacto del archivo queda congelado en el cierre oficial y se muestra en Cierres recientes.
- Exportaciones Excel y Cierres Mensuales se incorporan a la cola parcial de “Guardar datos” para Firestore.
- La carga desde Firebase y la importación JSON reconcilian cierres/exportaciones sin duplicarlos ni reemplazar un nombre oficial local válido por datos remotos antiguos.
- Se conserva compatibilidad histórica, reexportación independiente y separación total entre Excel de Consulta, Excel de Cierre y consecutivo JSON.
- Versión/cache PWA: 0.18.58.

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
