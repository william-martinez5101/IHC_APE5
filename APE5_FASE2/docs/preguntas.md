# Defensa QA y UX del Grupo 6

Proyecto Aula Abierta. Grupo retador indicado en la consigna: G3. Este archivo desarrolla las respuestas y el registro de un ejercicio académico de defensa. No transcribe una sesión real ni atribuye intervenciones verificadas al grupo G3.

## Pregunta técnica 1

¿Qué cambia al cruzar 48rem y cómo se conserva el orden con Tab?

La regla base `.panel { display: grid; gap: 1.5rem; align-items: start; }` dispone los dos paneles en una columna implícita. En `@media (min-width: 48rem)` se añade `grid-template-columns: 3fr 2fr` y se ajustan separaciones, márgenes y padding. `.datos` también pasa a tres columnas para mostrar día, horario y lugar. Con fuente inicial de 16 px, 48rem corresponde a 768 px. A 767 px sigue una columna.

El DOM conserva primero la oferta y después Mi reserva. No usamos `order`, `grid-area` que cambie la secuencia, `tabindex` positivo ni movimientos del DOM. El único control de tarea inicialmente habilitado es Reservar. Confirmado, solo Cancelar queda disponible. La distribución visual no introduce un orden de tabulación alternativo. `:focus-visible` añade un contorno de 3 px y desplazamiento de 4 px para identificar el control activo. Ver `src/estilos.css` y `src/index.html`.

Demostración: abrir B, fijar 767 px, pulsar Tab; pasar a 768 px e inspeccionar la cuadrícula. Confirmar y cancelar con Enter, sin hacer clic para corregir el foco.

## Pregunta técnica 2

¿Cómo evitan acciones repetidas y dónde queda el foco?

`src/interaccion.js` mantiene `reservaActiva`. El manejador comienza con `if (reservaActiva) return`. En el primer clic cambia ese indicador a true y pone `reservar.disabled = true`. El botón nativo deja de admitir activación normal por teclado o puntero. El estado no se basa únicamente en un cambio de color. Como no hay petición asíncrona, la transición se completa dentro del mismo manejador.

Al confirmar se actualiza el mensaje, se muestra Cancelar y se ejecuta `cancelar.focus()`. Al cancelar se comprueba la existencia de una reserva activa, se libera el indicador, se habilita Reservar, se oculta Cancelar, se actualiza el estado y se ejecuta `reservar.focus()`. Estas operaciones evitan perder el foco sobre un elemento oculto o deshabilitado.

Demostración: Tab, Enter, Enter y Espacio. Mostrar en consola `document.activeElement.id` y `document.querySelector('#reservar').disabled`. La prevención es local. Un futuro backend necesitará unicidad o idempotencia y validación de concurrencia.

## Objeción de diseño

«Que la pantalla no desborde no significa que el usuario entienda la interfaz».

Aceptamos la objeción. `scrollWidth <= innerWidth` demuestra que el documento cabe horizontalmente en un viewport. La observación de una persona debe mostrar si encuentra el laboratorio, distingue la confirmación de la cancelación y completa el recorrido sin ayuda. Por ello se registran tiempo, errores, ayudas y reconocimiento verbal antes de cancelar. La región de estado y el foco apoyan la interacción, pero su presencia en el código no garantiza comprensión ni anuncio correcto en todas las tecnologías de asistencia.

El conjunto E01 a E05 contiene datos de ejemplo con origen identificado y obtiene 4/5 casos sin ayuda y con reconocimiento. Ese cálculo ilustra el criterio de comprensión y no acredita una mejora empírica de tiempos o comprensión. A tiene un botón deshabilitado y no permite comparar tiempos de reserva con B. Si la hipótesis de reconocimiento no se respalda, acercaremos el mensaje a la acción o revisaremos su texto y repetiremos la observación con condiciones documentadas.


## Equipo participante y distribución de intervenciones

William Martínez coordina la exposición; Emilio Abril explica el boceto y el HTML; Pablo Lozada desarrolla CSS y JavaScript; Manuel Cusme presenta la evidencia técnica; Jonathan Gamboa coordina usabilidad, preguntas y registro de acuerdos.

## Registro del ejercicio de defensa

Naturaleza del registro: ejercicio académico resuelto a partir de las preguntas de la consigna. G3 es el grupo retador indicado en el material docente, sin atribución de asistentes, opiniones o aprobación reales.

| Momento del ejercicio | Intervención desarrollada | Sustento |
|---|---|---|
| Pregunta técnica 1 | El cambio a dos columnas conserva el orden de lectura y tabulación. | index.html; media query de 48rem; ausencia de order y tabindex positivo |
| Pregunta técnica 2 | disabled y reservaActiva impiden duplicados locales; el foco queda en Cancelar o Reservar según la transición. | interaccion.js; 13 comprobaciones de lógica |
| Objeción sobre comprensión | Ajuste visual y comprensión se evalúan por separado. Los datos de ejemplo explican el protocolo sin presentarse como evidencia humana. | pruebas.md; checklist.md; origen de usuarios.csv |
| Decisión del ejercicio | Mantener el orden semántico, la confirmación textual, los controles nativos y la cancelación reversible. | RF-01, RN-01 y criterios de proyecto.md |
| Límite reconocido | La reserva es local, se reinicia al recargar y no controla cupos entre usuarios. | Código de interacción sin persistencia ni servidor |
| Proyección del producto | Contrastar reconocimiento del estado en uso real y ampliar persistencia cuando exista backend. | Recomendaciones y alcance del proyecto |

Este registro completa la preparación y el análisis de defensa del paquete. No contiene firma, aprobación o asistencia atribuida a evaluadores externos.
