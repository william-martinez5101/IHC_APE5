// Pruebas técnicas reproducibles. La aplicación funciona sin estas dependencias.
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const raiz = fileURLToPath(new URL('../', import.meta.url));
const capturas = path.join(raiz, 'evidencias');
await mkdir(capturas, { recursive: true });
const navegador = await chromium.launch({
  headless: true,
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
  ...(process.env.CHROMIUM_ARGS ? { args: JSON.parse(process.env.CHROMIUM_ARGS) } : {})
});
const pagina = await navegador.newPage({ deviceScaleFactor: 1 });
const errores = [];
pagina.on('pageerror', e => errores.push(e.message));
const urlB = pathToFileURL(path.join(raiz, 'src/index.html')).href;
const urlA = pathToFileURL(path.join(raiz, 'prototipos/prototipo-A.html')).href;
const filas = [];
const controles = [];
const guardar = nombre => pagina.screenshot({ path: path.join(capturas, nombre), fullPage: true });
const comprobar = (nombre, condicion) => { assert.ok(condicion, nombre); controles.push({ prueba: nombre, resultado: 'Cumple' }); };

try {
  await pagina.setViewportSize({ width: 360, height: 800 });
  await pagina.goto(urlA);
  const anchoA = await pagina.evaluate(() => document.documentElement.scrollWidth);
  filas.push({ version: 'A', ancho: 360, alto: 800, documento: anchoA, columnas: 2, desborde: anchoA > 360 });
  // Solo el viewport: evidencia de la información que queda fuera de la vista.
  await pagina.screenshot({ path: path.join(capturas, 'A-360.png'), fullPage: false });

  for (const [ancho, alto] of [[320,720],[360,800],[767,900],[768,1024],[1366,900]]) {
    await pagina.setViewportSize({ width: ancho, height: alto });
    await pagina.goto(urlB);
    const medida = await pagina.evaluate(() => ({
      documento: document.documentElement.scrollWidth,
      viewport: innerWidth,
      columnas: getComputedStyle(document.querySelector('.panel')).gridTemplateColumns.split(' ').length
    }));
    comprobar(`Sin desborde a ${ancho}px`, medida.documento <= medida.viewport);
    comprobar(`Columnas a ${ancho}px`, medida.columnas === (ancho < 768 ? 1 : 2));
    filas.push({ version: 'B', ancho, alto, documento: medida.documento, columnas: medida.columnas, desborde: medida.documento > medida.viewport });
    if (ancho !== 767) await guardar(`B-${ancho}.png`);

    await pagina.keyboard.press('Tab');
    comprobar(`Tab alcanza Reservar a ${ancho}px`, await pagina.evaluate(() => document.activeElement.id === 'reservar'));
    await pagina.keyboard.press('Enter');
    comprobar(`Confirmación y foco a ${ancho}px`, await pagina.evaluate(() =>
      document.querySelector('#reservar').disabled && !document.querySelector('#cancelar').hidden &&
      document.activeElement.id === 'cancelar' && document.querySelector('#estado').textContent.includes('Reserva confirmada')));
    if (ancho === 360) await guardar('B-360-confirmada.png');
    // Enter actúa sobre el foco que dejó la confirmación, sin dirigirlo por código.
    await pagina.keyboard.press('Enter');
    comprobar(`Cancelación y foco a ${ancho}px`, await pagina.evaluate(() =>
      !document.querySelector('#reservar').disabled && document.querySelector('#cancelar').hidden &&
      document.activeElement.id === 'reservar' && document.querySelector('#estado').textContent.includes('Reserva cancelada')));
    if (ancho === 360) await guardar('B-360-cancelada.png');
    await pagina.keyboard.press('Space');
    comprobar(`Espacio permite volver a reservar a ${ancho}px`, await pagina.locator('#reservar').isDisabled());
  }

  await pagina.setViewportSize({ width: 360, height: 800 });
  comprobar('Redimensionar conserva reserva y foco', await pagina.evaluate(() =>
    document.querySelector('#reservar').disabled && document.activeElement.id === 'cancelar'));
  await pagina.setViewportSize({ width: 1366, height: 900 });
  comprobar('Redimensionar a escritorio conserva estado', (await pagina.locator('#estado').textContent()).includes('Reserva confirmada'));
  await pagina.reload();
  comprobar('Recargar restablece el estado local', !(await pagina.locator('#reservar').isDisabled()) && !(await pagina.locator('#cancelar').isVisible()));
  comprobar('No hay errores de JavaScript', errores.length === 0);

  const resultado = {
    fecha: new Date().toISOString(), navegador: `Chromium ${navegador.version()}`,
    metodo: 'Playwright, documento local file://, deviceScaleFactor 1, capturas PNG sin escalado. Pruebas técnicas; sin participantes humanos.',
    filas, controles, errores
  };
  await writeFile(path.join(raiz, 'resultados/mediciones.json'), JSON.stringify(resultado, null, 2) + '\n');
  const tabla = filas.map(f => `| ${f.version} | ${f.ancho} × ${f.alto} | ${f.documento} px | ${f.columnas} | ${f.desborde ? 'Sí' : 'No'} |`).join('\n');
  const checks = controles.map(c => `| ${c.prueba} | ${c.resultado} |`).join('\n');
  await writeFile(path.join(raiz, 'resultados/pruebas.md'), `# Resultados técnicos de la Fase 1\n\nFecha UTC: ${resultado.fecha}. Navegador: ${resultado.navegador}.\n\n${resultado.metodo}\n\n## Distribución\n\n| Versión | Viewport CSS | Ancho del documento | Columnas | Desborde |\n|---|---|---|---|---|\n${tabla}\n\nEl desborde de A es deliberado: permite diagnosticar el boceto de escritorio. Las imágenes B muestran la página completa; A-360 muestra solo el viewport inicial para evidenciar el recorte.\n\n## Interacción y estado\n\n| Prueba | Resultado |\n|---|---|\n${checks}\n\n## Límites\n\nEstas comprobaciones verifican geometría, estado, teclado y foco en el navegador indicado. No miden comprensión, tiempo humano ni compatibilidad con lector de pantalla. Las pruebas con compañeros y su protocolo están descritos en [docs/fase2.md](../docs/fase2.md). A y B no se comparan en tiempo de reserva porque A no permite completar esa acción.\n\n## Reproducción\n\nPara usar la aplicación basta abrir src/index.html. Para repetir estas pruebas con Node.js: npm install; npx playwright install chromium; npm test. Las capturas y mediciones se regeneran en evidencias/ y resultados/.\n`);
  console.log(`${controles.length} comprobaciones correctas. ${resultado.navegador}.`);
} finally {
  await navegador.close();
}
