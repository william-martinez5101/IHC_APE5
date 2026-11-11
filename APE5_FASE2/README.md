# APE5 Fase 1 y Fase 2 del Grupo 6

Aula Abierta es una interfaz de consulta, reserva y cancelación de talleres de laboratorio. La documentación integra el diagnóstico de Fase 1 y el cierre de Fase 2 en el formato APE de la Universidad Técnica de Ambato.

## Aplicación

Abrir src/index.html en un navegador. La aplicación no requiere servidor, autenticación ni base de datos. Tab enfoca Reservar, Enter confirma y dirige el foco a Cancelar; Enter cancela y devuelve el foco a Reservar. Espacio permite volver a reservar. El estado se reinicia al recargar.

## Contenido

- docs/proyecto.md: diagnóstico, ficha y criterios.
- docs/Informe_APE5_Fase2_Grupo6.docx y .pdf: informe integrado en formato APE.
- resultados/pruebas.md: Pruebas Realizadas, con origen y alcance de cada evidencia.
- resultados/checklist.md: ejercicio académico de cinco casos y análisis de usabilidad.
- docs/preguntas.md: preguntas QA/UX y registro del ejercicio de defensa.
- docs/distribucion.md y participacion.md: responsabilidades de los cinco integrantes.
- presentacion/defensa_grupo6.html: presentación con notas y navegación.

Las cifras de usuarios son datos de ejemplo identificados. Los registros de navegador de Fase 1 y las pruebas de código se distinguen de la matriz de ensayo del cierre. Esto permite interpretar los resultados sin confundir procedencias.

## Reproducción de pruebas

Con Node.js y npm, desde APE5_FASE2:

```powershell
npm install
npm run test:estado
npm run test:estructura
npm run test:ejercicio
```

La ejecución completa de navegador utiliza `npx playwright install chromium` y `npm test`. La herramienta pruebas/registro-usuarios.html permite registrar observaciones de uso. Los cinco paquetes personales y las instrucciones de GitHub organizan la incorporación del contenido en las ramas indicadas.
