# Ficha de aplicación del proyecto

**Actividad:** APE 5, Fase 1. Del boceto a la interfaz web adaptable.  
**Integrantes:** William Martínez, Emilio Abril, Jonathan Gamboa, Pablo Lozada y Manuel Cusme.  
**Institución:** Universidad Técnica de Ambato, Ingeniería de Software.  
**Carpeta de la actividad:** `APE5_FASE1/`. Las rutas son relativas a esta carpeta.  
**Proyecto:** Aula Abierta, reserva de talleres de laboratorio.  
**Repositorio:** https://github.com/william-martinez5101/IHC_APE5  
**Pantalla:** `src/index.html`. **Referencia inicial:** `prototipos/prototipo-A.html`.

El repositorio contiene estos materiales dentro de `APE5_FASE1/`: el boceto de escritorio, la interfaz HTML/CSS/JS, la ficha de aplicación, las evidencias de distribución, los resultados técnicos y el informe corto en Word y PDF. El ejercicio parte del boceto base y del enfoque docente del repositorio G4; la implementación y esta ficha desarrollan la actividad de Fase 1.

## Secuencia de la tarea

| Elemento | Aplicación concreta |
|---|---|
| Actor | Estudiante universitario que necesita asistir a un taller práctico. |
| Tarea | Consultar los datos del taller, reservar un lugar y cancelar si lo necesita. |
| Dato decisivo | Jueves, de 14:00 a 16:00, Laboratorio 2. Estos datos aparecen antes del botón. |
| Acción principal | Activar «Reservar un lugar» con puntero, Enter o Espacio. |
| Estado final | «Reserva confirmada» con nombre del taller, día, horario y laboratorio. Reservar queda deshabilitado; Cancelar queda disponible y recibe foco. |
| Cómo deshacer | «Cancelar reserva» muestra la cancelación, habilita otra reserva y devuelve el foco al botón principal. |

## Requisito y regla de negocio

**RF-01.** El estudiante consulta horario y lugar y administra una reserva activa del taller desde móvil o escritorio, con confirmación textual y controles operables por teclado.

**Regla RN-01.** Solo existe una reserva activa en la instancia actual de esta página. Confirmar bloquea otra activación de Reservar; cancelar libera el estado local. La regla se limita a esta interfaz: no representa disponibilidad ni reservas compartidas entre personas.

## Criterios de aceptación medibles

| ID | Condición y resultado esperado | Evidencia |
|---|---|---|
| CA-01 | A 320, 360, 768 y 1366 px, `scrollWidth <= innerWidth` en B. | `resultados/pruebas.md`, capturas. |
| CA-02 | A 767 px hay una columna; a 768 px hay dos con fuente predeterminada de 16 px. | Medición de `.panel` y `src/estilos.css`. |
| CA-03 | Tab alcanza Reservar; Enter confirma; Reservar queda `disabled`; Cancelar aparece y recibe foco. | Prueba de estado y foco. |
| CA-04 | Enter en Cancelar libera la reserva, oculta ese control y devuelve el foco a Reservar. | Prueba de cancelación. |
| CA-05 | Después de reservar, redimensionar conserva la confirmación y su control de cancelación. | Prueba de redimensionamiento. |
| CA-06 | Título, horario, laboratorio, acción y estado permanecen en el HTML en ambos diseños. | `src/index.html` y revisión de semántica. |

## Decisión HCI justificada

El problema del boceto es que el ancho fijo de 960 px coloca «Mi reserva» fuera de los primeros 360 px visibles. La decisión es mantener primero la oferta y después el estado en el documento, utilizar una sola columna en móvil y distribuir los dos paneles en escritorio desde `48rem`. No se usa `order` ni se mueven elementos del DOM.

La jerarquía prioriza el taller y sus datos antes de confirmar. Los botones nativos permiten la interacción por teclado. El texto del estado comunica confirmación y cancelación sin depender solo del color; `role="status"` y `aria-atomic="true"` preparan su anuncio como región dinámica. Al deshabilitar u ocultar un botón, el foco se dirige al control válido para continuar. La compatibilidad con un lector de pantalla requiere comprobación específica en Fase 2.

## Alcance de la Fase 1

La solución funciona abriendo `src/index.html`, sin servidor ni instalación. El estado vive en memoria y se reinicia al recargar. No hay autenticación, base de datos ni validación de cupos entre usuarios. La Fase 2 evaluará comprensión del estado con personas y tecnologías de asistencia; no se atribuyen tiempos ni opiniones a participantes en esta entrega.

## Referencia de partida

- Material docente G4: https://github.com/Boris2403/HCI_2026_G4
- Boceto adjunto `prototipo-A.html`, conservado sin cambios en `prototipos/`.
- Consigna adjunta «APE 5 - Fase 1 Del boceto a la inte.txt».
