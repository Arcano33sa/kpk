# BD ↔ Firestore — contrato E1.1

Estado: definición local; no implementa lecturas, escrituras ni publicación remota.
Alcance: productos informativos de Bdatos y su actualización de precios entre dispositivos.

## Ubicación y estructura

- Productos: `workspaces/ksa_practika/bdatos/{documentId}`.
- Control independiente: `workspaces/ksa_practika/metadata/bdatos`.
- Registro vigente: `id`, `codigo`, `descripcion`, `precio`, `createdAt`, `updatedAt` y metadata de sincronización existente.
- Conservar `appData.bdatos`, `bdatosUpdatedAt`, la clave local actual y la compatibilidad con respaldo JSON. No cambiar el esquema de los demás módulos.
- Código se conserva como texto, incluidos ceros iniciales. Coincidencia por código limpio, exacta y sensible a mayúsculas, como la validación actual.
- Precios finitos y no negativos; código y descripción obligatorios; rechazar códigos e IDs duplicados.

## Identidad

- Mantener el ID y la fecha de creación del producto que coincide por código.
- Documento identificado con el ID interno, usando la función existente de ID Firestore. Antes de guardar, rechazar colisiones entre IDs sanitizados; nunca sobrescribir dos productos en el mismo documento.
- En un dispositivo actualizado desde nube, adoptar los IDs remotos. No generar IDs diferentes para el mismo producto al descargarlo.
- La primera publicación toma como lista autoritativa la BD del dispositivo elegido por el usuario, incluida la lista de Excel ya importada. Los demás dispositivos deben actualizar desde nube antes de publicar modificaciones locales.
- Si un producto retirado vuelve a entrar por Excel, recuperar su ID remoto cuando sea identificable por código. Desactivar las marcas de retiro al escribirlo nuevamente.

## Retiro lógico

- No borrar documentos Firestore físicamente.
- Reutilizar las marcas existentes: `activo: false`, `_deleted: true`, `_cloudDeleted: true`, `eliminadoEnNube: true`, fechas y metadata de operación `eliminar`.
- Filtrar con `isCloudDeletedRecord` ANTES de `normalizeBdatosRecord`: el normalizador actual descarta las marcas de retiro.
- El reemplazo por Excel incluye retiros de productos vigentes remotos ausentes de la nueva lista, no solamente de los productos que todavía existen en la copia local.
- Conservar localmente la información necesaria para publicar los retiros pendientes, aunque los artículos ya no aparezcan en la tabla.

## Control: no inicializada, vacía y fallo

El documento de control debe distinguir:

- **No inicializada:** no existe marcador válido de primera publicación completa. Conservar BD local; una colección vacía por sí sola no autoriza vaciarla ni reemplazarla con productos iniciales.
- **Publicada:** `initialized: true`, `schemaVersion: 1`, `revision`, `updatedAt` y `activeCount`. Una lista publicada con cero productos es válida; debe permanecer vacía en descarga y recarga, sin reaplicar la semilla inicial.
- **Publicación incompleta:** no anunciar éxito ni aplicar la lista parcial en otro dispositivo. Conservar la copia local y los pendientes para reintentar.
- **Lectura fallida o inconsistente:** conservar BD local y reportar fallo del bloque BD; no convertirlo en lista vacía ni marcar actualización completa.

`revision` identifica una publicación completa, no sustituye los IDs de artículos. La lectura debe comprobar coherencia de control y productos; `activeCount` ayuda a detectar fallos, pero no basta por sí solo para validar una revisión.

## Escritura y concurrencia

- Integrar con Guardar Datos, conservando la acción explícita del usuario. No introducir subida automática al seleccionar un Excel.
- Registrar agregar, editar, borrar y reemplazar; reconstruir explícitamente la publicación inicial de la lista ya importada, sin exigir reimportarla.
- Mantener pendientes tras error y confirmarlos solamente cuando se complete la publicación.
- Comparar la revisión descargada con la remota antes de publicar. Ante cambios desde otro dispositivo, detener la publicación y solicitar actualización/revisión; no sobrescribir silenciosamente.
- No anunciar un reemplazo completo si únicamente se guardó parte de los productos. E1.2 debe implementar el protocolo de publicación y revisión considerando múltiples lotes y fallos; no basta añadir Bdatos al escritor genérico.
- Si no puede garantizarse una publicación coherente para el tamaño solicitado, rechazar antes de escribir y conservar datos y pendientes. No introducir límites silenciosos ni descargar una mezcla de revisiones.

## Lectura y permisos

- Añadir un bloque independiente BD a Actualizar Datos; reemplazar solamente `bdatos` y su fecha tras lectura válida y completa.
- No afectar ventas, compras, cobros, cierres, Casa, consecutivos ni históricos.
- Mantener edición/publicación en Administrador y consulta en los roles actuales.
- Las reglas locales actuales permiten lectura y creación/actualización a usuarios activos del workspace, y prohíben borrado físico. Eso no demuestra qué reglas están desplegadas. No modificar ni publicar reglas en E1.1.
- La restricción Administrador actual es de interfaz; no afirmar que las reglas remotas la imponen específicamente a BD. Evaluar cualquier endurecimiento por separado.

## Criterios para las siguientes subetapas

E1.2: cola, publicación inicial, altas/ediciones/retiros, coherencia de revisión, reintentos y fallos; ninguna escritura remota durante pruebas locales.

E1.3: lectura validada, revisión coherente, filtro de retirados, vacío publicado, prevención de semilla y conservación local ante fallos.

E1.4: mensajes, permisos actuales y revisión de todos los consumidores afectados.

E2: pruebas aisladas primero; una prueba con Firestore real requiere autorización específica. Este contrato no autoriza publicación, cambios remotos, push ni despliegue.

## Implementación local E1.2

- BD tiene escritor dedicado dentro de Guardar Datos. Agregar, editar, borrar y reemplazar Excel registran pendientes; la intención de publicar sobrevive a una recarga.
- El botón Preparar BD actual para Guardar Datos permite incluir la lista que ya fue importada antes de esta integración.
- Cada publicación escribe la lista completa, los retiros y el control en una sola transacción. El límite explícito es 450 documentos de productos afectados (vigentes más retiros), además del control. Se rechaza un exceso antes de cualquier escritura remota; no se divide en lotes parciales.
- Cada producto escrito lleva `bdRevision`. El control contiene `initialized`, `schemaVersion: 1`, `revision`, `activeCount` y fechas. La futura lectura debe validar la revisión de todos los productos vigentes, además del conteo.
- `metadata.bdatosCloudRevision` conserva localmente la revisión base. `bdatosCloudPending` conserva la intención pendiente y `bdatosCloudAttempt` permite reconocer un commit propio si se perdió su respuesta o falló la persistencia local posterior.
- La comparación de revisión y el commit son transaccionales. Una publicación ajena exige descargar antes de escribir. Los cambios locales realizados durante el guardado permanecen pendientes.
- Pruebas locales con Firestore simulado: publicación inicial, precios, retiro/vacío, recuperación de ID, permisos, conflictos, duplicados/colisiones, fallos, reintento tras recarga y límites 450/451. Verificada también la separación del escritor BD respecto de otros módulos y limpieza de Facturas.
- No se ejecutaron escrituras reales ni se modificaron reglas. La lectura de BD y su coherencia entre dispositivos siguen pendientes de E1.3; esta subetapa todavía no completa la sincronización.

## Implementación local E1.3

- Actualizar Datos incluye un bloque independiente `bdatos`, con progreso, fallos y reintento propios.
- El control se lee antes y después de los productos. Ambas lecturas deben concordar en inicialización, contrato, revisión y cantidad; los productos vigentes deben pertenecer a esa revisión.
- Las lecturas de control y productos de BD exigen respuesta del servidor (`getDocFromServer` / `getDocsFromServer`), también al preparar una publicación. No se acepta automáticamente una copia de caché como información vigente. Un fallo conserva los datos locales.
- Los retiros se filtran antes de normalizar. Se validan campos, precios, fechas, cantidad, códigos y colisiones de IDs.
- Una BD aún no publicada conserva su lista local. Una BD publicada vacía se descarga como vacía y queda marcada como inicializada, sin reaplicar productos de semilla al recargar.
- Los cambios locales pendientes bloquean únicamente la descarga de BD. Se protege además la lista si cambia mientras se leen otros bloques, o si falla el almacenamiento local; la actualización se reporta parcial.
- Un reintento de otros bloques conserva la lista local actual y su metadata de sincronización, incluyendo pendientes e intentos de publicación.
- Pruebas aisladas y de integración de las funciones de actualización con Firestore simulado: revisión, validación, retiros, vacío, recarga, falta de inicialización, offline, pendientes, cambios concurrentes y fallo de almacenamiento. Repetidas las pruebas del escritor E1.2.
- Pendientes: revisión conjunta E1.4 y pruebas de navegador/Firestore real de E2. No se contactó Firebase, no se publicaron reglas ni se ejecutó despliegue.

## Revisión conjunta E1.4

- BD muestra su estado local y si existen pendientes. Los errores específicos del escritor BD se conservan en el resultado de Guardar Datos, en lugar de mostrar solamente el mensaje genérico de fallo.
- Se resolvió el bloqueo entre conflicto de revisión y pendientes mediante una acción explícita: Recuperar BD publicada conservando copia local. Lee una publicación validada, solicita confirmación y persiste una copia anterior en `metadata.bdatosRecoveryHistory` antes de reemplazar BD y retirar solamente sus pendientes.
- Las copias anteriores se conservan sin sobrescribirlas. Restaurar una copia guarda también la lista actual, conserva los IDs vigentes para códigos coincidentes y deja la restauración pendiente de Guardar Datos. No escribe en Firestore por sí misma.
- Recuperación y publicación de BD no pueden ejecutarse simultáneamente. Una recuperación fallida, cancelada, sin publicación remota o con cambios concurrentes conserva la lista y los pendientes locales.
- Preparar, publicar, recuperar y restaurar BD mantienen la restricción Administrador. Consulta y las acciones actuales conservan sus permisos. No se modificaron las reglas Firestore; sigue vigente la limitación de permisos remotos indicada en el contrato.
- Se incluyó BD en el catálogo de contratos utilizado por diagnósticos locales. Se mantuvo su escritor dedicado: la importación inicial general y el escritor parcial de otros módulos no publican BD por separado de su control.
- El respaldo JSON añade metadata opcional de semilla para conservar una lista vacía al restaurarla; no exporta la cola, la revisión operativa ni intentos pendientes. El formato anterior sigue siendo legible. La carga local de JSON invalida los campos operativos de sincronización de BD y conserva las copias anteriores existentes del dispositivo, sin registrar publicaciones automáticas.
- Revisión de consumidores: productos informativos independientes, acciones de tabla/formulario, cola de sesión, lectura y escritura Firebase, diagnósticos, JSON y ciclo de semilla. Sin cambios en ventas, compras, saldos, Casa, cierres, consecutivos ni reglas.
- Pruebas locales: permisos, cancelación, recuperación/restauración, preservación de copias y pendientes ajenos, fallos, concurrencia y compatibilidad JSON; repetidas las pruebas aisladas de escritura/lectura y su integración. Las verificaciones de navegador, SDK real y múltiples dispositivos continúan en E2.

## Verificación E2.1 — navegador aislado

- Ejecutada la interfaz completa de la aplicación con HTML, CSS, JSZip y lógica real de `app.js`, en dos perfiles temporales de Chrome. Solo Auth/SDK Firebase y su servidor se sustituyeron por una simulación compartida; se omitió la instalación de Service Worker y la pantalla de autenticación real. Todas las solicitudes externas estuvieron bloqueadas.
- Verificados: Excel válido/inválido, cancelación y reemplazo, pendientes recuperados tras recarga, botón Guardar Datos, descarga de precios en el segundo perfil, alta/edición/búsqueda/borrado, copia real al portapapeles, permisos de consulta, conflicto de revisión, recuperación con copia/restauración, fallos y reintentos, retiros, desconexión y BD vacía sin reaplicar semilla.
- Comprobada la conservación de los datos ajenos a BD y ausencia de errores JavaScript no controlados. La simulación no prueba la sesión Auth real, las reglas desplegadas, el SDK remoto, la PWA instalada ni dos dispositivos físicos.
- Revisada la presentación a 1280 px y 390 px. Se corrigió únicamente en BD la visibilidad del aviso de filtro vacío: `.empty-state` anulaba el comportamiento visual de `hidden`. La comprobación verifica que aparece sin coincidencias y desaparece con productos visibles.
- Prueba reproducible de esta sesión: `/tmp/kpk-e2-browser.cjs`. Capturas locales: `/tmp/kpk-e2-bd-desktop.png` y `/tmp/kpk-e2-bd-mobile.png`. Son archivos temporales, no una suite instalada en el repositorio.
- Repetidas las verificaciones aisladas de E1.2–E1.4. Sin contacto con Firebase, publicaciones de reglas, commit, push ni despliegue.
- E2.2 y E2.3 siguen pendientes: requieren definir el entorno y autorizar la prueba específica con Firestore real antes de escribir productos o retiros fuera de la simulación.

## Verificación E2.2 / E2.3 — entorno de pruebas local

El usuario eligió entorno de pruebas. Se utilizaron los emuladores oficiales Auth y Firestore, proyecto ficticio `demo-kpk-bd-e2`, puertos de localhost y tres perfiles temporales de navegador. No se creó un proyecto Firebase alojado ni se accedió a producción.

- SDK oficial 12.15.0, misma versión configurada por la app, descargado para la prueba; Auth y Firestore conectados a sus emuladores únicamente en la copia de código servida para pruebas. Se mantuvieron las implementaciones reales de autenticación, lectura, escritura, permisos y eventos de la app.
- Reglas cargadas desde `FIRESTORE_RULES_KSA_PRACTIKA.rules`, sin modificarlas ni desplegarlas. Cuentas y productos ficticios, con dos usuarios Administrador y un usuario de consulta registrados solo en el emulador.
- Publicación inicial por Excel y Guardar Datos mediante la transacción real del SDK; lectura en un segundo perfil autenticado, actualización de precios, conflicto de revisión y recuperación con copia local: correctos.
- Retiro lógico y descarga sin reaparición; publicación vacía y recarga sin semilla: correctos. Las reglas rechazaron el borrado físico de un producto y la lectura sin sesión.
- Una publicación de 450 productos más su control completó correctamente. La lista de 451 se rechazó antes de escribir, conservando su revisión previa y sus pendientes; se recuperó la publicación anterior.
- El usuario de consulta descargó la lista publicada y mantuvo bloqueados el importador y las acciones administrativas.
- No hubo errores JavaScript no controlados ni solicitudes externas de la app durante la prueba. Los canales locales abortados por cancelación/cierre del SDK no se trataron como fallos funcionales.
- Las descargas de Java 21, emulador y SDK fueron autorizadas y quedaron en `/tmp/kpk-e2-emulator`; no se añadieron dependencias al proyecto ni se cambió Java del sistema. Se verificó el checksum oficial del emulador. El servidor HTTP y ambos emuladores se detuvieron al finalizar.
- Script de la sesión: `/tmp/kpk-e2-emulator/test.cjs`; log local: `/tmp/kpk-e2-emulator/firestore.log`.

E2 queda verificada en el entorno de pruebas elegido. No equivale a una prueba de Cloud Firestore alojado, reglas desplegadas, PWA instalada ni dispositivos físicos. La configuración de producción sigue intacta. Sin commit, push, publicación de reglas ni despliegue.

## Seguimiento E2.3 — equipos físicos

Tras la nueva instrucción de proceder con E2.3, se revisaron los dispositivos accesibles. Solo está disponible esta Mac; no hay acceso a un segundo equipo físico. Los perfiles anteriores no sustituyen esa prueba.

Se preparó `PRUEBA_BD_ENTRE_DISPOSITIVOS.md` con requisitos, datos ficticios y resultados esperados. Falta identificar los dos equipos y hacer accesible el entorno de pruebas para ambos. No se expusieron emuladores en red, no se contactó producción y no se publicó la versión local para resolver esa falta de acceso.
