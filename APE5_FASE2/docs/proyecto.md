# Ficha de aplicación del proyecto

Grupo 6. Universidad Técnica de Ambato, FISEI, carrera de Software, quinto nivel. Proyecto: Aula Abierta. Pantalla: consulta de un taller de laboratorio, confirmación y cancelación de una reserva. Repositorio: https://github.com/william-martinez5101/IHC_APE5.

## Diagnóstico de la versión A

El boceto `prototipos/prototipo-A.html`, conservado desde Fase 1, fija `body { width: 960px }` y usa columnas de `580px 360px` con `gap: 20px`. En 360 px el documento ocupa 960 px: 960 - 360 = 600 px fuera del ancho visible. El panel «Mi reserva» se ubica a la derecha de la tarjeta, fuera del primer viewport. El estudiante debe desplazar horizontalmente la página para localizarlo. Se perjudican la jerarquía visual y el acceso al estado de la tarea. La captura A-360 muestra el viewport inicial, sin ampliar artificialmente el área visible.

A es un boceto estático con su botón deshabilitado. No confirma reservas. No se le atribuye una confirmación invisible ni se compara un tiempo de reserva A/B. Las tareas comunes válidas son localizar horario, laboratorio y panel de estado.

## Secuencia aplicada a nuestro proyecto

| Elemento | Definición |
|---|---|
| Actor | Estudiante universitario que desea asistir a un taller práctico. |
| Tarea principal | Consultar los datos del taller, reservar un lugar y cancelarlo si lo necesita. |
| Dato que decide la acción | Taller Interfaces web accesibles, jueves de 14:00 a 16:00 en Laboratorio 2. |
| Acción principal | Activar Reservar un lugar con puntero, Enter o Espacio. |
| Resultado visible | Texto Reserva confirmada con taller, horario y laboratorio. Reservar deshabilitado y Cancelar disponible. |
| Mecanismo de corrección | Cancelar reserva libera el estado local, informa el resultado y permite reservar otra vez. |

## Requisito y reglas de interacción

RF-01: el estudiante consulta los datos y administra una reserva desde móvil o escritorio con controles nativos y confirmación textual.

RN-01: existe como máximo una reserva activa por instancia de la página. `reservaActiva` y `reservar.disabled` bloquean una segunda confirmación. La cancelación habilita una nueva reserva. La transición ocurre de forma sincrónica en el navegador.

RN-02: al confirmar el foco pasa explícitamente a `cancelar.focus()`; al cancelar regresa a `reservar.focus()`. No se deja sobre un botón deshabilitado u oculto.

El estado se mantiene en memoria y se pierde al recargar. No hay persistencia, autenticación, validación de cupos ni reserva compartida entre usuarios. Si se añade un servidor, deberá validar duplicados y concurrencia por sí mismo.

## Criterios de aceptación

| ID | Criterio medible | Evidencia |
|---|---|---|
| CA-01 | `scrollWidth <= innerWidth` en 320×720, 360×800, 768×1024 y 1366×768, en los tres estados. | resultados/mediciones.json y capturas. |
| CA-02 | Una columna a 767 px y dos a 768 px con configuración de fuente predeterminada de 16 px. | Pruebas del punto de corte. |
| CA-03 | Tab alcanza Reservar, Enter confirma, Reservar se deshabilita y Cancelar recibe foco. | Registro automatizado y comprobación manual. |
| CA-04 | Enter cancela, oculta Cancelar, habilita Reservar y le devuelve foco. Espacio vuelve a reservar. | Registro de estados y foco. |
| CA-05 | Botones visibles con altura mínima de 44 px y foco visible. | Medición de controles y capturas. |
| CA-06 | No hay `tabindex` positivo, `order` ni reordenamiento de elementos del DOM. | Inspección del código y orden observado. |
| CA-07 | Al redimensionar se conserva la reserva; al recargar se reinicia. | Pruebas de continuidad y reinicio. |
| CA-08 | Al menos 4 de 5 participantes completan toda la tarea sin ayuda y reconocen verbalmente la confirmación. | Ejercicio E01 a E05 con origen de datos identificado en checklist.md. |

## Decisión HCI y construcción de B

La base móvil muestra oferta y resumen en una columna. A partir de `@media (min-width: 48rem)` la cuadrícula usa `3fr 2fr`. Las proporciones reparten el espacio disponible sin fijar 960 px. `box-sizing: border-box`, `min-width: 0` y el ajuste de palabras evitan que el contenido fuerce los paneles. No se oculta el desborde con `overflow-x: hidden`: se corrige su causa.

El HTML conserva título, datos, acción y estado en el mismo orden. Los botones nativos aportan activación por teclado. El texto comunica el estado sin depender del color. La región `role="status"` con `aria-atomic="true"` expone el cambio para tecnologías de asistencia. Su anuncio efectivo debe verificarse con lector de pantalla y navegador identificados. El enfoque de foco puede desplazar verticalmente la vista para mostrar Cancelar, por lo que la comprensión debe observarse con personas.

## Hipótesis y alcance de la conclusión

H técnica: B no presenta desborde horizontal en los cuatro viewports exigidos y permite el ciclo por teclado. Basta un ancho con desborde para refutar la parte geométrica.

H de comprensión, heredada de Fase 1: a 360 px al menos cuatro de cinco compañeros ajenos al desarrollo localizan el laboratorio, confirman, reconocen verbalmente la confirmación y cancelan sin ayuda. El conjunto E01 a E05 ilustra el cálculo con datos generados para el ejercicio y obtiene 4/5 casos sin ayuda y con reconocimiento. No se presenta como contraste empírico de la hipótesis con personas reales.

El diseño incorpora visibilidad del estado, prevención de errores y control del usuario. Las mediciones técnicas no prueban por sí solas comprensión ni conformidad integral con WCAG.
