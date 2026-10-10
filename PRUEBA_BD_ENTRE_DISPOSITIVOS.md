# E2.3 — comprobación entre equipos físicos

Estado: protocolo preparado; pendiente de identificar y conectar dos equipos al entorno de pruebas. La prueba anterior usó perfiles separados en una sola Mac, con SDK y emuladores oficiales.

## Condiciones previas

- Usar exclusivamente datos ficticios y el entorno de pruebas elegido. No ejecutar este protocolo sobre la BD productiva.
- Ambos equipos deben abrir la misma versión de la app y apuntar al mismo proyecto/workspace de pruebas. Versión local preparada: `0.18.139-bdatos-e2-validacion`.
- Los cambios de integración siguen locales, sin commit ni push; la aplicación publicada anteriormente no sirve para comprobar estas funciones nuevas.
- Para un emulador en otra computadora se necesita una conexión de red explícitamente preparada. Los emuladores actuales estuvieron limitados a `127.0.0.1` y ya se apagaron. No exponer puertos del emulador ni cambiar reglas/configuración de producción como atajo.
- Equipo A: usuario Administrador de pruebas. Equipo B: usuario de pruebas con permiso de consulta, o un segundo Administrador si se comprobará conflicto.

## Archivo controlado

Primera lista Excel, hoja BD:

| Código | Descripción | Precio |
| --- | --- | ---: |
| PRUEBA-001 | Artículo de prueba A | 10 |
| PRUEBA-002 | Artículo de prueba B | 25 |

Segunda lista: mantener `PRUEBA-001` con precio 15, retirar `PRUEBA-002` e incluir `PRUEBA-003` con precio 30.

No usar el Excel real de precios ni respaldos del usuario para generar estos archivos.

## Secuencia y resultados esperados

1. En A, seleccionar el primer Excel en BD, revisar y confirmar el reemplazo. Debe quedar pendiente de Guardar Datos; B aún no debe mostrar cambios.
2. En A, pulsar Guardar Datos. Debe finalizar sin errores y retirar los pendientes de BD.
3. En B, pulsar Actualizar Datos. Debe mostrar exactamente dos productos, con los precios 10 y 25.
4. Recargar B, o cerrar y abrir nuevamente su navegador. Debe conservar la lista descargada y sus precios. Si se usa una PWA, comprobar también su versión; esta validación no se realizó en una PWA física.
5. En A, importar y guardar la segunda lista. En B, actualizar: deben aparecer solo `PRUEBA-001` a 15 y `PRUEBA-003` a 30. El artículo retirado no debe reaparecer al recargar.
6. En B, buscar por código y descripción, y copiar un artículo. La copia debe contener código y descripción. Si B tiene rol de consulta, agregar/editar/borrar/importar/recuperar/restaurar deben continuar restringidos.
7. Si ambos son Administradores: tras descargar la misma lista, A cambia y guarda un precio. B modifica su copia anterior e intenta guardar: debe detectar conflicto y conservar sus pendientes. Recuperar BD publicada debe pedir confirmación y preservar la copia anterior; restaurarla debe cambiar solo BD local y dejarla pendiente.
8. Probar desconexión de B antes de actualizar: debe reportar el fallo y conservar la lista local. Al reconectar y reintentar, debe descargar la publicación completa.

## Evidencia mínima

Registrar para cada equipo: nombre/tipo de dispositivo, navegador o PWA, versión, usuario/rol de prueba y resultado de cada paso. No registrar contraseñas, tokens ni configuración sensible.

La etapa física solo se considera completada cuando ambos equipos confirman los resultados; perfiles o vistas móviles de una misma Mac no equivalen a esa evidencia.
