# Pruebas Realizadas

Se distinguen tres fuentes de evidencia: ejecución de la lógica y revisión estática en Node, registros de navegador conservados de Fase 1 y una matriz de ensayo geométrico para el cierre. Los valores de ensayo no se presentan como mediciones nuevas de navegador.

## Ejecución de código

- 13 comprobaciones de lógica: inicialización, confirmación, bloqueo de repetición, mensaje, foco solicitado, cancelación y nueva reserva.
- 16 comprobaciones estáticas: semántica, viewport, región de estado, controles nativos, carga diferida, punto de corte, dimensiones táctiles y preservación del orden.
- Análisis ejecutado de cinco escenarios académicos, con origen de los datos identificado.

Los registros se conservan en revision_codigo.md, revision_estructura.json y analisis_usabilidad.json. Los dobles de controles usados en Node verifican llamadas y transiciones; no equivalen a un navegador ni a una persona.

## Registro geométrico de Fase 1

| Versión | Viewport registrado | scrollWidth | innerWidth | Desborde |
|---|---|---|---|---|
| A | 360 × 800 | 960 | 360 | 600 px |
| B | 320 × 720 | 320 | 320 | 0 px |
| B | 360 × 800 | 360 | 360 | 0 px |
| B | 768 × 1024 | 768 | 768 | 0 px |
| B | 1366 × 900 | 1366 | 1366 | 0 px |

Fuente: referencia_fase1.json, Chromium 153.0.8010.0, 4 de noviembre de 2026. Las capturas se conservan en evidencias/referencia_fase1. Son registros de la primera versión y no una nueva ejecución de Fase 2.

## Matriz de ensayo del cierre

| Viewport de ensayo | Ancho documento esperado | Ancho disponible | Desborde esperado | Columnas |
|---|---|---|---|---|
| 320 × 720 | 320 px | 320 px | 0 px | 1 |
| 360 × 800 | 360 px | 360 px | 0 px | 1 |
| 768 × 1024 | 768 px | 768 px | 0 px | 2 |
| 1366 × 768 | 1366 px | 1366 px | 0 px | 2 |

El modelo considera fuente inicial de 16 px, contenedor min(70rem, 100% - 2.5rem), contenido con min-width:0 y ajuste de palabras. A 768 px hay 728 px de contenedor; restados 32 px de separación, la relación 3:2 produce 417,6 y 278,4 px. A 1366 px el contenedor se limita a 1120 px y las columnas resultan de 652,8 y 435,2 px. Cambiar la altura de 900 a 768 px no cambia esas reglas horizontales, aunque el modelo no reemplaza una lectura efectiva de scrollWidth.

mediciones.json contiene las doce combinaciones de tamaño y estado, con origen modelo_geometrico_css. El criterio de aceptación geométrica es scrollWidth <= innerWidth. No se esconde contenido con overflow-x:hidden.

## Reproducción

Desde APE5_FASE2: npm install; npm run test:estado; npm run test:estructura; npm run test:ejercicio. Para una ejecución completa de navegador: npx playwright install chromium y npm test. El script verificar.mjs genera mediciones, capturas, fecha, navegador y huellas de los archivos ensayados.

La comprensión humana y el anuncio efectivo en lectores de pantalla tienen un alcance diferente al análisis estático. El conjunto de ejemplo se documenta en checklist.md.
