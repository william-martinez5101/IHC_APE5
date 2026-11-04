# Distribución de archivos entre los integrantes

**Actividad grupal:** APE 5, Fase 1. **Carpeta:** `APE5_FASE1/`.  
**Integrantes:** William Martínez, Emilio Abril, Jonathan Gamboa, Pablo Lozada y Manuel Cusme.  
**Repositorio:** https://github.com/william-martinez5101/IHC_APE5

El repositorio contiene la actividad dentro de `APE5_FASE1/`. Jonathan Gamboa figura como integrante y no tiene una parte de archivos asignada para la carga. Las cuatro partes cubren los 27 archivos de la carpeta sin repetir archivos.

## Resumen de las cuatro partes

| Parte | Integrante | Contenido | Archivos |
|---|---|---|---:|
| 01 | William Martínez | Coordinación, ficha, documentación e informe | 9 |
| 02 | Emilio Abril | Boceto, HTML y diagnóstico | 4 |
| 03 | Pablo Lozada | CSS y evidencias de distribución | 5 |
| 04 | Manuel Cusme | JavaScript, pruebas y resultados | 9 |

## Organización del ZIP principal

- `APE5_FASE1/`: versión completa de la actividad, para ejecutar y consultar.
- `PARTES_POR_INTEGRANTE/`: cuatro ZIP independientes. Cada uno contiene únicamente los archivos asignados, dentro de la ruta `APE5_FASE1/`.
- `LEER_PRIMERO.txt`: instrucciones del paquete.

Para un aporte individual se utiliza el ZIP de la persona, conservando sus rutas. La carpeta `PARTES_POR_INTEGRANTE/`, sus ZIP y `LEER_PRIMERO.txt` son material de organización del paquete; no forman parte de los archivos asignados al repositorio. La carpeta completa permite revisar el resultado integrado y no constituye una quinta parte.

## Procedimiento común

1. Clonar el repositorio o actualizar la copia local de `main`.
2. Crear la rama de la persona desde `main` y extraer su parte en la raíz del clon. Debe quedar una sola carpeta `APE5_FASE1/`; evitar anidarla dentro de otra carpeta con el mismo nombre.
3. Añadir solo los archivos de la lista individual y realizar el commit sugerido desde la cuenta del integrante.
4. Publicar la rama y abrir un Pull Request hacia `main` con el resumen de la parte y su evidencia. La asignación no acredita commits hasta que estén registrados.
5. Una vez integradas las cuatro partes, abrir `APE5_FASE1/src/index.html`, revisar los enlaces de `APE5_FASE1/README.md` y contrastar `docs/verificacion_fase1.md`.

## Parte 01 de William Martínez

**Paquete:** `01_William_Martinez.zip`. **Responsabilidad:** Coordinación, ficha, documentación e informe.

Rutas exactas desde la raíz del repositorio:

- `APE5_FASE1/README.md`
- `APE5_FASE1/docs/proyecto.md`
- `APE5_FASE1/docs/equipo.md`
- `APE5_FASE1/docs/distribucion.md`
- `APE5_FASE1/docs/verificacion_fase1.md`
- `APE5_FASE1/docs/entrega-en-linea.txt`
- `APE5_FASE1/docs/consigna_fase1.txt`
- `APE5_FASE1/docs/Informe_APE5_Fase1.docx`
- `APE5_FASE1/docs/Informe_APE5_Fase1.pdf`

Comandos sugeridos desde la raíz del clon. Extraer la parte después de crear la rama y antes de ejecutar git add:

```sh
git switch main
git pull origin main
git switch -c feature/ape5-fase1-william
# Extraer aqui el ZIP individual, conservando la carpeta APE5_FASE1.
git add APE5_FASE1/README.md APE5_FASE1/docs/proyecto.md APE5_FASE1/docs/equipo.md APE5_FASE1/docs/distribucion.md APE5_FASE1/docs/verificacion_fase1.md APE5_FASE1/docs/entrega-en-linea.txt APE5_FASE1/docs/consigna_fase1.txt APE5_FASE1/docs/Informe_APE5_Fase1.docx APE5_FASE1/docs/Informe_APE5_Fase1.pdf
git commit -m "docs: documenta la fase 1 y la organizacion del equipo"
git push -u origin feature/ape5-fase1-william
```

**PR sugerido:** `Coordinación, ficha, documentación e informe de APE5 Fase 1`. Destino: `main`.

## Parte 02 de Emilio Abril

**Paquete:** `02_Emilio_Abril.zip`. **Responsabilidad:** Boceto, HTML y diagnóstico.

Rutas exactas desde la raíz del repositorio:

- `APE5_FASE1/prototipos/prototipo-A.html`
- `APE5_FASE1/src/index.html`
- `APE5_FASE1/docs/diagnostico.md`
- `APE5_FASE1/evidencias/A-360.png`

Comandos sugeridos desde la raíz del clon. Extraer la parte después de crear la rama y antes de ejecutar git add:

```sh
git switch main
git pull origin main
git switch -c feature/ape5-fase1-emilio
# Extraer aqui el ZIP individual, conservando la carpeta APE5_FASE1.
git add APE5_FASE1/prototipos/prototipo-A.html APE5_FASE1/src/index.html APE5_FASE1/docs/diagnostico.md APE5_FASE1/evidencias/A-360.png
git commit -m "feat: incorpora el boceto y la estructura HTML semantica"
git push -u origin feature/ape5-fase1-emilio
```

**PR sugerido:** `Boceto, HTML y diagnóstico de APE5 Fase 1`. Destino: `main`.

## Parte 03 de Pablo Lozada

**Paquete:** `03_Pablo_Lozada.zip`. **Responsabilidad:** CSS y evidencias de distribución.

Rutas exactas desde la raíz del repositorio:

- `APE5_FASE1/src/estilos.css`
- `APE5_FASE1/evidencias/B-320.png`
- `APE5_FASE1/evidencias/B-360.png`
- `APE5_FASE1/evidencias/B-768.png`
- `APE5_FASE1/evidencias/B-1366.png`

Comandos sugeridos desde la raíz del clon. Extraer la parte después de crear la rama y antes de ejecutar git add:

```sh
git switch main
git pull origin main
git switch -c feature/ape5-fase1-pablo
# Extraer aqui el ZIP individual, conservando la carpeta APE5_FASE1.
git add APE5_FASE1/src/estilos.css APE5_FASE1/evidencias/B-320.png APE5_FASE1/evidencias/B-360.png APE5_FASE1/evidencias/B-768.png APE5_FASE1/evidencias/B-1366.png
git commit -m "feat: aplica CSS mobile first y documenta la distribucion"
git push -u origin feature/ape5-fase1-pablo
```

**PR sugerido:** `CSS y evidencias de distribución de APE5 Fase 1`. Destino: `main`.

## Parte 04 de Manuel Cusme

**Paquete:** `04_Manuel_Cusme.zip`. **Responsabilidad:** JavaScript, pruebas y resultados.

Rutas exactas desde la raíz del repositorio:

- `APE5_FASE1/src/reserva.js`
- `APE5_FASE1/pruebas/verificar.mjs`
- `APE5_FASE1/package.json`
- `APE5_FASE1/.gitignore`
- `APE5_FASE1/resultados/pruebas.md`
- `APE5_FASE1/resultados/mediciones.json`
- `APE5_FASE1/evidencias/B-360-confirmada.png`
- `APE5_FASE1/evidencias/B-360-cancelada.png`
- `APE5_FASE1/docs/fase2.md`

Comandos sugeridos desde la raíz del clon. Extraer la parte después de crear la rama y antes de ejecutar git add:

```sh
git switch main
git pull origin main
git switch -c feature/ape5-fase1-manuel
# Extraer aqui el ZIP individual, conservando la carpeta APE5_FASE1.
git add APE5_FASE1/src/reserva.js APE5_FASE1/pruebas/verificar.mjs APE5_FASE1/package.json APE5_FASE1/.gitignore APE5_FASE1/resultados/pruebas.md APE5_FASE1/resultados/mediciones.json APE5_FASE1/evidencias/B-360-confirmada.png APE5_FASE1/evidencias/B-360-cancelada.png APE5_FASE1/docs/fase2.md
git commit -m "feat: conecta reserva y cancelacion con pruebas de teclado"
git push -u origin feature/ape5-fase1-manuel
```

**PR sugerido:** `JavaScript, pruebas y resultados de APE5 Fase 1`. Destino: `main`.

## Control de integración

Las ramas aportan rutas distintas, por lo que ninguna parte reemplaza los archivos de otra. El funcionamiento completo requiere las cuatro partes integradas: el HTML referencia la hoja CSS de Pablo y el JavaScript de Manuel; el informe de William usa las evidencias de Emilio, Pablo y Manuel. La revisión entre pares debe registrarse con sus resultados reales y no sustituirse por el reparto de archivos.
