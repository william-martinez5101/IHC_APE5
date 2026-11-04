# Resultados técnicos de la Fase 1

Fecha UTC: 2026-11-04T16:33:16.170Z. Navegador: Chromium 153.0.8010.0.

Playwright, documento local file://, deviceScaleFactor 1, capturas PNG sin escalado. Pruebas técnicas; sin participantes humanos.

## Distribución

| Versión | Viewport CSS | Ancho del documento | Columnas | Desborde |
|---|---|---|---|---|
| A | 360 × 800 | 960 px | 2 | Sí |
| B | 320 × 720 | 320 px | 1 | No |
| B | 360 × 800 | 360 px | 1 | No |
| B | 767 × 900 | 767 px | 1 | No |
| B | 768 × 1024 | 768 px | 2 | No |
| B | 1366 × 900 | 1366 px | 2 | No |

El desborde de A es deliberado: permite diagnosticar el boceto de escritorio. Las imágenes B muestran la página completa; A-360 muestra solo el viewport inicial para evidenciar el recorte.

## Interacción y estado

| Prueba | Resultado |
|---|---|
| Sin desborde a 320px | Cumple |
| Columnas a 320px | Cumple |
| Tab alcanza Reservar a 320px | Cumple |
| Confirmación y foco a 320px | Cumple |
| Cancelación y foco a 320px | Cumple |
| Espacio permite volver a reservar a 320px | Cumple |
| Sin desborde a 360px | Cumple |
| Columnas a 360px | Cumple |
| Tab alcanza Reservar a 360px | Cumple |
| Confirmación y foco a 360px | Cumple |
| Cancelación y foco a 360px | Cumple |
| Espacio permite volver a reservar a 360px | Cumple |
| Sin desborde a 767px | Cumple |
| Columnas a 767px | Cumple |
| Tab alcanza Reservar a 767px | Cumple |
| Confirmación y foco a 767px | Cumple |
| Cancelación y foco a 767px | Cumple |
| Espacio permite volver a reservar a 767px | Cumple |
| Sin desborde a 768px | Cumple |
| Columnas a 768px | Cumple |
| Tab alcanza Reservar a 768px | Cumple |
| Confirmación y foco a 768px | Cumple |
| Cancelación y foco a 768px | Cumple |
| Espacio permite volver a reservar a 768px | Cumple |
| Sin desborde a 1366px | Cumple |
| Columnas a 1366px | Cumple |
| Tab alcanza Reservar a 1366px | Cumple |
| Confirmación y foco a 1366px | Cumple |
| Cancelación y foco a 1366px | Cumple |
| Espacio permite volver a reservar a 1366px | Cumple |
| Redimensionar conserva reserva y foco | Cumple |
| Redimensionar a escritorio conserva estado | Cumple |
| Recargar restablece el estado local | Cumple |
| No hay errores de JavaScript | Cumple |

## Límites

Estas comprobaciones verifican geometría, estado, teclado y foco en el navegador indicado. No miden comprensión, tiempo humano ni compatibilidad con lector de pantalla. Las pruebas con compañeros y su protocolo están descritos en [docs/fase2.md](../docs/fase2.md). A y B no se comparan en tiempo de reserva porque A no permite completar esa acción.

## Reproducción

Para usar la aplicación basta abrir src/index.html. Para repetir estas pruebas con Node.js: npm install; npx playwright install chromium; npm test. Las capturas y mediciones se regeneran en evidencias/ y resultados/.
