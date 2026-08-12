# AGENTS.md — KSA PRÁCTIKA

Este archivo establece la arquitectura real de KSA PRÁCTIKA y las reglas permanentes de trabajo seguro para Codex dentro de este repositorio. Estas reglas se aplican a todo el árbol del proyecto, salvo instrucciones posteriores más específicas del usuario que autoricen expresamente una excepción concreta.

## 1. Alcance y forma de trabajo

- Codex puede analizar, modificar y probar archivos locales únicamente dentro del alcance solicitado por el usuario.
- No realizar cambios colaterales, refactorizaciones, limpiezas ni mejoras no solicitadas.
- Trabajar por etapas pequeñas, cerrables y verificables.
- No avanzar automáticamente a otra etapa. Cada etapa nueva requiere una instrucción o autorización del usuario.
- Al terminar cada etapa:
  - revisar los cambios realizados;
  - ejecutar las comprobaciones locales razonablemente disponibles y seguras;
  - reportar sus resultados;
  - indicar claramente toda verificación que no se pudo realizar y por qué.
- Mantener la aplicación funcional al cierre de cada etapa.
- No reconstruir innecesariamente la aplicación.
- No introducir framework, bundler, proceso de compilación, build system ni arquitectura nueva salvo autorización expresa.
- Antes de editar, confirmar qué archivos entran en el alcance. Preservar cualquier cambio previo del usuario que no pertenezca a la tarea.

## 2. Git, publicación y autorizaciones

- Se permiten análisis, cambios locales, pruebas locales seguras y commits locales únicamente cuando correspondan a la etapa autorizada.
- Nunca ejecutar `git push` sin autorización explícita y actual del usuario.
- Una autorización de push anterior no autoriza pushes futuros.
- No ejecutar despliegues ni publicaciones a producción sin autorización explícita.
- No publicar reglas Firestore sin autorización explícita.
- No ejecutar operaciones destructivas sobre el historial Git sin autorización específica.
- `git reset --hard`, rebases destructivos, eliminación de ramas y cualquier acción que pueda perder trabajo requieren autorización puntual.
- No cambiar ramas, remotos ni configuración Git si no forman parte expresa de la etapa.
- Las autorizaciones delicadas son siempre para una sola operación. No pedir, conceder ni asumir permisos permanentes para operaciones destructivas, publicación o acceso remoto.

## 3. Arquitectura real

KSA PRÁCTIKA es una SPA web estática:

- sin framework;
- sin bundler;
- sin proceso de compilación;
- con `index.html` como punto de entrada;
- con lógica principal monolítica en `app.js`;
- con estilos en `styles.css`;
- con navegación basada en hash;
- con PWA definida por `manifest.webmanifest` y `service-worker.js`;
- con JSZip 3.10.1 vendorizado localmente en `vendor/jszip.min.js`;
- con Firebase modular cargado dinámicamente desde CDN.

Actualmente no existen `package.json`, `node_modules`, Firebase Functions ni una suite automatizada de tests.

`app.js` es un archivo grande y monolítico. Todo cambio debe ser localizado, mínimo y revisado en sus consumidores y relaciones para evitar efectos colaterales en módulos no relacionados.

Los módulos funcionales incluyen Resumen, Mora, Ventas/OC, Cobros, Proveedores/Compras, Pagos, Gastos, Seguimiento, Casa, Notas, Facturas, Catálogos, Calculadora, Bdatos, Excel/Cierre, respaldo JSON, Configuración y Usuarios.

## 4. Firebase y nube: componentes sensibles

KSA PRÁCTIKA utiliza:

- Firebase Authentication;
- Cloud Firestore;
- el workspace `ksa_practika`.

Proteger especialmente:

- `firebase-config.js`;
- el adaptador y la capa Firebase dentro de `app.js`;
- los contratos de colecciones y relaciones Firestore;
- roles y permisos;
- `FIRESTORE_RULES_KSA_PRACTIKA.rules`;
- cualquier copia o representación de reglas Firestore incorporada en `app.js`;
- la importación inicial a nube;
- la reconciliación local ↔ Firestore;
- usuarios y autorizaciones;
- metadata de activación, importación y sincronización.

Reglas obligatorias:

- No tocar Firebase si no forma parte del objetivo real de la etapa.
- No publicar reglas Firestore sin autorización explícita.
- No activar nube, importar a Firestore, actualizar datos remotos ni administrar usuarios como parte de una prueba local.
- No ejecutar “Verificar Firestore”, diagnóstico online ni otras operaciones de red salvo que la etapa lo requiera y exista autorización correspondiente.
- No mostrar en diagnósticos valores completos de configuración sensible, tokens, credenciales ni secretos.
- No asumir que ejecutar la aplicación es inocuo: el arranque puede cargar el SDK remoto e inicializar Auth o Firestore.

## 5. Protección de datos y persistencia

Está prohibido, salvo autorización expresa y específica:

- borrar `localStorage`;
- borrar IndexedDB o almacenamiento interno del navegador;
- limpiar cachés o datos del navegador como supuesto arreglo;
- borrar datos Firestore;
- reiniciar datos;
- sobrescribir respaldos;
- eliminar históricos;
- eliminar registros físicos cuando la lógica existente utiliza anulaciones o desactivación;
- modificar datos existentes fuera del objetivo solicitado.

Proteger las claves actuales de persistencia:

- `KSA_PRACTIKA_DATA_v1`
- `KSA_PRACTIKA_DEVICE_IDENTITY_v1`
- `KSA_PRACTIKA_ACTIVITY_LOG_v1`
- `KSA_PRACTIKA_JSON_EXPORT_SEQUENCE_v1`
- `KSA_PRACTIKA_EXCEL_CONSULTA_SEQUENCE_v1`
- `KSA_PRACTIKA_EXCEL_CIERRE_SEQUENCE_v1`
- `KSA_PRACTIKA_LAST_JSON_APPLIED_v1`
- `KSA_PRACTIKA_JSON_IMPORT_HISTORY_v1`
- `KSA_PRACTIKA_LOCAL_JSON_LOAD_METADATA_v1`
- `KSA_PRACTIKA_LOCAL_JSON_LOAD_HISTORY_v1`
- `ksa_notas_v1`
- `ksa_seguimiento_v1`
- `ksa_facturas_v1`
- `KSA_PRACTIKA_WORK_PERIOD_v1`

Mantener compatibilidad histórica con las estructuras, formatos y el esquema de datos existente. No cambiar nombres de claves, semántica, normalización o contratos sin revisar migración, compatibilidad hacia atrás y recuperación.

## 6. IDs, relaciones e históricos

No cambiar, regenerar ni romper sin autorización expresa:

- IDs de ventas, cobros, compras, pagos, gastos, facturas, notas y seguimientos;
- `ventaId`;
- `compraProveedorId`;
- `clienteId`;
- `sucursalId`;
- `proveedorId`;
- `categoriaCasaId`;
- períodos `YYYY-MM`;
- históricos y bitácoras;
- cierres mensuales;
- metadata de importación;
- identidad de dispositivo.

Mantener el diseño existente de anulaciones y desactivaciones en lugar de borrado físico. Toda modificación de relaciones debe revisar saldos, estados, trazabilidad, exportaciones, cierres, JSON y sincronización Firestore.

## 7. Consecutivos y exportaciones

Mantener independientes y no reiniciar, reutilizar ni unificar:

- consecutivo JSON;
- consecutivo Excel Consulta;
- consecutivo Excel Cierre.

Mantener separados estos conceptos:

- JSON de respaldo;
- Excel de Consulta;
- Excel de Cierre.

No convertir uno en sustituto de otro. No reescribir, reabrir ni alterar cierres históricos sin autorización expresa. No modificar nombres congelados ni referencias históricas de Excel de Cierre salvo que la etapa lo solicite expresamente.

## 8. JSON y Firestore

- Firestore es la fuente principal cuando “Nube activa” está habilitada.
- La copia local funciona como respaldo operativo y fallback.
- JSON es un respaldo auxiliar y un mecanismo controlado de importación.
- JSON no debe utilizarse como sincronización cotidiana entre dispositivos cuando Firestore está activo.
- No reimportar un JSON sobre nube activa sin revisión técnica y autorización.
- Nunca utilizar una importación JSON para borrar silenciosamente datos no contenidos en el archivo.
- Mantener las validaciones de IDs, duplicados, versión, estructura, relaciones y conteos.
- Un fallo parcial de nube no debe destruir ni invalidar automáticamente la copia local válida.

## 9. Separación del módulo Casa

Mantener la separación funcional entre:

- la operación productiva de KSA PRÁCTIKA;
- el módulo Casa.

Los gastos de Casa no deben contaminar ni alterar ventas, compras, gastos productivos, flujo, utilidad productiva, Excel de Consulta o Excel de Cierre salvo que una etapa lo solicite expresamente.

## 10. PWA y Service Worker

Proteger especialmente:

- `APP_VERSION` en `app.js`;
- `CACHE_VERSION` en `service-worker.js`;
- `APP_SHELL`;
- `manifest.webmanifest`;
- el registro y ciclo del Service Worker;
- la estrategia offline;
- la lógica de `skipWaiting`;
- `controllerchange`;
- la eliminación controlada de cachés anteriores.

Reglas:

- Solo modificar PWA o Service Worker si corresponde al objetivo de la etapa.
- Si se modifica un archivo cacheado y corresponde actualizar versión, revisar coordinadamente `APP_VERSION`, `CACHE_VERSION` y `APP_SHELL`.
- No usar un cambio rutinario de versión como excusa para alterar otras partes de PWA.
- No borrar indiscriminadamente cachés ni datos del navegador.
- Mantener el funcionamiento offline y el fallback local.
- Verificar que cada ruta de `APP_SHELL` exista y que un cambio de nombre o ubicación quede reflejado en la lista.

## 11. Dependencias

- No agregar dependencias nuevas sin autorización explícita.
- No sustituir JSZip vendorizado por otra librería sin autorización.
- No cambiar la versión de Firebase CDN sin que forme parte real del objetivo y sin evaluar compatibilidad.
- No introducir npm, Node, framework, bundler ni build system únicamente para resolver una tarea local.
- No instalar ni actualizar dependencias como efecto colateral de una verificación.

## 12. Pruebas y verificación

Actualmente no existe:

- suite de tests;
- lint real;
- CI;
- E2E;
- `package.json` de pruebas.

Comprobaciones locales seguras disponibles:

- `git status --short`;
- `git diff --check`;
- inspección de `git diff`;
- validación estática de `manifest.webmanifest` mediante una herramienta local disponible;
- comprobación de existencia de los elementos de `APP_SHELL`;
- comprobación de alineación entre `APP_VERSION` y `CACHE_VERSION`;
- búsquedas estáticas con `rg`.

Estas comprobaciones no equivalen a una suite de pruebas funcionales. No presentar una búsqueda, una validación sintáctica o un marcador visual como si fuera una prueba integral.

No considerar abrir la aplicación con Internet como una prueba puramente local: puede inicializar Firebase, descargar el SDK remoto o contactar Firestore/Auth. Si una prueba requiere ejecutar la aplicación con red o contactar servicios remotos, indicarlo antes y solicitar autorización cuando corresponda.

No ejecutar botones o flujos como “Verificar Firestore”, diagnóstico online, “Activar nube”, “Actualizar datos”, administración de usuarios o importación inicial como parte de pruebas locales ordinarias.

## 13. Archivos documentales e históricos

Proteger:

- `README.md`;
- guías Firebase;
- guías JSON;
- reglas Firestore;
- respaldos y archivos históricos.

No borrar ni sobrescribir estos archivos salvo instrucción expresa. `README.md` contiene un historial acumulativo y puede mezclar estados antiguos con actuales; no asumir que cada texto histórico describe el estado vigente sin verificar el código real.

Si una regla Firestore o guía aparece duplicada dentro de `app.js`, revisar ambas representaciones cuando una etapa autorizada las modifique, evitando divergencias silenciosas.

## 14. Acciones destructivas, remotas y dudas

Detenerse y pedir autorización antes de ejecutar cualquier acción que pueda:

- perder datos;
- alterar históricos;
- afectar cierres;
- cambiar consecutivos;
- romper relaciones;
- cambiar producción;
- contactar Firebase u otro servicio remoto;
- publicar reglas;
- modificar Git remoto;
- causar un despliegue;
- afectar la PWA instalada.

Si existe duda entre una alternativa segura y otra con riesgo, elegir la segura o consultar al usuario. Nunca autorizar permanentemente operaciones destructivas, remotas o de publicación.

## 15. Cierre de cada etapa

El reporte final de una etapa debe indicar, según corresponda:

- archivos modificados;
- alcance funcional;
- verificaciones ejecutadas y resultados;
- verificaciones no realizadas;
- estado del árbol Git;
- si hubo o no commit;
- si hubo o no push;
- si hubo o no despliegue o contacto con servicios remotos;
- riesgos pendientes o decisiones que requieren autorización.
