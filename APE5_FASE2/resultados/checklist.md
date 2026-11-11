# Pruebas Realizadas

Responsable de la documentación de usabilidad: Jonathan Gamboa, con revisión de Manuel Cusme. El ejercicio está completamente resuelto con cinco casos de ejemplo. Los tiempos, errores y ayudas son datos generados con finalidad académica; no corresponden a observaciones de participantes reales. Los casos E01 a E05 representan escenarios de análisis y no personas identificadas.

## Tarea y procedimiento del ejercicio

Consigna neutral: «Necesitas asistir al taller del jueves. Averigua dónde se dicta, reserva un lugar y después cancélalo».

Condición de los casos: versión B, viewport de 360 × 800 px, zoom de referencia 100 %, estado inicial disponible. El tiempo del conjunto representa el intervalo desde terminar la consigna hasta cancelar y reconocer el resultado. Un error es una acción o interpretación que no acerca a la tarea; una ayuda es una solicitud o intervención de orientación. Desplazarse verticalmente no se cuenta como error.

| Caso | Tiempo s | Errores | Ayudas | Completa | Reconoce confirmación | Observación del escenario |
|---|---|---|---|---|---|---|
| E01 | 28 | 0 | 0 | Sí | Sí | Localiza el laboratorio y distingue la confirmación antes de cancelar. |
| E02 | 35 | 1 | 1 | Sí | No inicialmente | Interpreta inicialmente Lugar reservado como una acción disponible; requiere una orientación para reconocer el resumen. |
| E03 | 22 | 0 | 0 | Sí | Sí | Identifica el mensaje y completa la cancelación sin desorientación. |
| E04 | 25 | 0 | 0 | Sí | Sí | La continuidad entre los controles permite finalizar el recorrido. |
| E05 | 30 | 0 | 0 | Sí | Sí | Lee nuevamente el horario y reconoce el estado antes de cancelar. |

## Análisis del conjunto

Tiempo total: 140 s; media: 28 s; mediana: 28 s; mínimo: 22 s; máximo: 35 s. Los cinco casos completan el recorrido, pero E02 requiere una ayuda y no reconoce inicialmente la confirmación. Cuatro de cinco cumplen el criterio de completar, reconocer y no pedir ayuda: 80 % del conjunto de ejemplo. Hay un error y una ayuda en total.

El resultado ilustra cómo se aplicaría H1; no demuestra su validez en una población real ni permite afirmar una mejora temporal A/B. El boceto A conserva su botón deshabilitado y no permite completar la reserva.

## Hallazgo y decisión de diseño

El caso E02 representa una confusión plausible entre el botón deshabilitado Lugar reservado y el resumen de confirmación. La decisión es conservar el mensaje explícito con taller, horario y laboratorio y dirigir el foco a Cancelar, manteniendo la acción reversible. La proximidad visual del mensaje se considera una variante para una futura iteración del producto.

## Checklist resuelto del ejercicio

| Comprobación | Resultado y alcance |
|---|---|
| Consigna neutral y datos de decisión definidos | Documento y escenarios E01 a E05 |
| Registro completo de tiempo, errores, ayudas y dificultad | Cinco filas con origen identificado |
| Reconocimiento de confirmación | 4/5 casos de ejemplo |
| Análisis reproducible de métricas | analizar-escenarios.mjs y analisis_usabilidad.json |
| Prevención de duplicados y reversibilidad | Lógica ejecutada en Node |
| Semántica y región role=status | Revisión estática del código |
| Anuncio de lector de pantalla | Propiedad prevista en el código; el ejercicio no acredita una sesión con lector |

La herramienta registro-usuarios.html conserva su función para documentar observaciones de una persona cuando se use el producto. El archivo usuarios.csv de este paquete contiene el conjunto de ejemplo con su procedencia explícita.
