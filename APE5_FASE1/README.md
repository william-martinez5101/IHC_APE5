# APE 5 Fase 1

**Del boceto a la interfaz web adaptable.**  
Universidad Técnica de Ambato · Ingeniería de Software · Interacción Humano Computador.  
**Actividad grupal. Integrantes:** William Martínez, Emilio Abril, Jonathan Gamboa, Pablo Lozada y Manuel Cusme.  
**Fecha:** 4 de noviembre de 2026. **Carpeta de la actividad:** `APE5_FASE1/`.  
**Repositorio:** https://github.com/william-martinez5101/IHC_APE5

El repositorio contiene la carpeta **APE5_FASE1**, correspondiente a la Fase 1 del proyecto **Aula Abierta**, una pantalla de reserva de talleres de laboratorio. Incluye el diagnóstico del boceto, la ficha de aplicación, la interfaz HTML5/CSS/JS, evidencias en móvil y escritorio, resultados técnicos y el informe en Word y PDF. Las rutas de este documento son relativas a esa carpeta.

## Equipo y distribución de archivos

Los cinco integrantes constan en [docs/equipo.md](docs/equipo.md). La carga de archivos se distribuye en cuatro partes, sin asignar archivos a Jonathan Gamboa:

| Integrante | Parte | Responsabilidad |
|---|---|---|
| William Martínez | 01 | Coordinación, ficha, documentación e informe Word/PDF. |
| Emilio Abril | 02 | Boceto, estructura HTML y diagnóstico inicial. |
| Pablo Lozada | 03 | CSS adaptable y capturas de distribución. |
| Manuel Cusme | 04 | JavaScript, interacción, pruebas y resultados. |

El [reparto detallado](docs/distribucion.md) identifica cada archivo, la rama y el commit sugeridos. La [verificación de la consigna](docs/verificacion_fase1.md) distingue los entregables terminados de las comprobaciones que requieren participación del grupo o registro en GitHub.

## Ejecución

1. Abrir [`src/index.html`](src/index.html) en un navegador. No requiere instalación, base de datos ni servidor.
2. Consultar el horario y el laboratorio. Pulsar Tab para enfocar «Reservar un lugar» y Enter para confirmar.
3. El botón inicial queda deshabilitado, aparece la confirmación y el foco pasa a «Cancelar reserva».
4. Pulsar Enter para cancelar. Se habilita Reservar y el foco regresa a ese control. Espacio también permite activar los botones.
5. Cambiar el ancho del navegador: una columna antes de `48rem` y dos desde ese punto (768 px con fuente predeterminada de 16 px).

El estado es local a la página y se reinicia al recargar. No representa cupos compartidos ni reservas guardadas en servidor.

## Desarrollo de la actividad

| Punto solicitado | Implementación y evidencia |
|---|---|
| Diagnóstico a 360 px | [Diagnóstico](docs/diagnostico.md), [boceto A](prototipos/prototipo-A.html), [captura](evidencias/A-360.png). |
| Actor, tarea, dato, acción y estado | [Ficha completa](docs/proyecto.md), regla RN-01 y criterios CA-01 a CA-06. |
| HTML5 semántico | [index.html](src/index.html): header, main, section, article, dl, button y role="status". |
| CSS Mobile-First | [estilos.css](src/estilos.css): una columna base y dos desde 48rem, sin cambiar el orden HTML. |
| Disponible, confirmada y cancelada | [reserva.js](src/reserva.js): estado local, disabled, mensaje y traslado de foco. |
| Dos capturas preliminares | [Móvil 360 px](evidencias/B-360.png) y [escritorio 1366 px](evidencias/B-1366.png). También hay capturas a 320 y 768 px y de confirmación/cancelación. |
| Hipótesis para Fase 2 | [Problema, hipótesis y protocolo de revisión entre pares](docs/fase2.md). |
| Documento corto | [Informe PDF](docs/Informe_APE5_Fase1.pdf) y [Word editable](docs/Informe_APE5_Fase1.docx). |

## Resultados verificados

Se ejecutaron **34 comprobaciones técnicas correctas** en Chromium 153.0.8010.0: geometría, punto de corte, teclado, foco, confirmación, cancelación, nueva reserva, conservación del estado al redimensionar y reinicio al recargar.

El boceto A mide 960 px en un viewport de 360 px y desborda 600 px. En B el ancho del documento coincide con 320, 360, 767, 768 y 1366 px. El cambio de una a dos columnas se comprobó entre 767 y 768 px.

Detalle: [pruebas.md](resultados/pruebas.md) y [mediciones.json](resultados/mediciones.json). Son comprobaciones técnicas; no se han medido tiempos humanos ni ejecutado pruebas con participantes o lectores de pantalla. El protocolo correspondiente está preparado para la Fase 2. El boceto A tiene un botón deshabilitado, por lo que no se comparan tiempos de reserva A/B.

## Repetir las pruebas técnicas

La aplicación se abre directamente. Solo para regenerar pruebas y capturas se necesita Node.js y ejecutar, desde la carpeta `APE5_FASE1/`:

```sh
npm install
npx playwright install chromium
npm test
```

El script [pruebas/verificar.mjs](pruebas/verificar.mjs) regenera las capturas y las mediciones.

## Organización

| Ruta | Contenido |
|---|---|
| `src/` | Interfaz funcional: HTML, CSS y JavaScript. |
| `prototipos/` | Boceto original adjunto, conservado sin modificaciones. |
| `docs/` | Diagnóstico, ficha, hipótesis, informe Word/PDF y texto para la entrega en línea. |
| `evidencias/` | Siete capturas PNG de la implementación y el boceto. |
| `resultados/` | Resultados técnicos y mediciones en JSON. |
| `pruebas/` | Verificación reproducible con Playwright. |

## Referencia y autoría

El punto de partida es el boceto adjunto y la actividad docente del [repositorio HCI_2026_G4](https://github.com/Boris2403/HCI_2026_G4), de Vladimir González, Boris Vinces, Sebastián Acaro y Santiago Mora. Se conserva su boceto como referencia; se desarrolla una versión B con presentación propia, ficha aplicada, evidencias nuevas y resultados reproducibles. El repositorio de esta entrega es [IHC_APE5](https://github.com/william-martinez5101/IHC_APE5).
