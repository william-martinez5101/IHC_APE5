import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { createHash } from 'node:crypto';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, 'evidencias');
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true,
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
  ...(process.env.CHROMIUM_ARGS ? { args: JSON.parse(process.env.CHROMIUM_ARGS) } : {}) });
const context = await browser.newContext({ deviceScaleFactor: 1 });
const page = await context.newPage();
const errors = [], checks = [], measures = [], hashes = {};
page.on('pageerror', e => errors.push(e.message));
page.on('requestfailed', r => errors.push(r.url() + ': ' + r.failure()?.errorText));
const check = (name, ok) => { assert.ok(ok, name); checks.push({ prueba: name, resultado: 'Cumple' }); };
const url = pathToFileURL(path.join(root, 'src/index.html')).href;
const screenshot = name => page.screenshot({ path: path.join(out, name), fullPage: true });
async function measure(width, height, state) {
  const m = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth,
    innerWidth, columnas: getComputedStyle(document.querySelector('.panel')).gridTemplateColumns.split(' ').length,
    escala: visualViewport.scale, foco: document.activeElement.id }));
  m.ancho = width; m.alto = height; m.estado = state;
  m.desborde = Math.max(0, m.scrollWidth - m.innerWidth);
  measures.push(m);
  check(`Sin desborde ${width}px ${state}`, m.scrollWidth <= m.innerWidth);
  check(`Columnas ${width}px ${state}`, m.columnas === (width < 768 ? 1 : 2));
  check(`Escala efectiva 1 ${width}px ${state}`, m.escala === 1);
  return m;
}
try {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto(pathToFileURL(path.join(root, 'prototipos/prototipo-A.html')).href);
  const a = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth }));
  check('A conserva ancho fijo y desborde de 600px', a.scrollWidth === 960 && a.innerWidth === 360);
  await page.screenshot({ path: path.join(out, 'A-360.png'), fullPage: false });
  for (const [width, height] of [[320,720], [360,800], [768,1024], [1366,768]]) {
    await page.setViewportSize({ width, height });
    await page.goto(url);
    await measure(width, height, 'disponible');
    await screenshot(`B-${width}.png`);
    const structure = await page.evaluate(() => ({
      semantic: ['header','main','section','article','dl','button','p[role="status"]'].every(s => document.querySelector(s)),
      status: document.querySelector('#estado').getAttribute('aria-atomic') === 'true',
      noPositiveTab: [...document.querySelectorAll('[tabindex]')].every(e => e.tabIndex <= 0),
      first: document.querySelector('.panel').firstElementChild.querySelector('#reservar') !== null,
      height: document.querySelector('#reservar').getBoundingClientRect().height,
      hidden: document.querySelector('#cancelar').hidden
    }));
    check(`Semántica y región de estado ${width}px`, structure.semantic && structure.status);
    check(`Orden DOM y sin tabindex positivo ${width}px`, structure.noPositiveTab && structure.first);
    check(`Objetivo táctil >=44px ${width}px`, structure.height >= 44);
    check(`Cancelar oculto inicialmente ${width}px`, structure.hidden);
    await page.keyboard.press('Tab');
    check(`Tab alcanza Reservar ${width}px`, await page.evaluate(() => document.activeElement.id === 'reservar'));
    check(`Contorno de foco visible ${width}px`, await page.evaluate(() => {
      const s = getComputedStyle(document.activeElement); return s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 3;
    }));
    await page.keyboard.press('Enter');
    check(`Confirmación y foco ${width}px`, await page.evaluate(() =>
      document.querySelector('#reservar').disabled && !document.querySelector('#cancelar').hidden &&
      document.activeElement.id === 'cancelar' && document.querySelector('#estado').textContent.includes('Reserva confirmada')));
    check(`Cancelar táctil >=44px ${width}px`, await page.locator('#cancelar').evaluate(e => e.getBoundingClientRect().height >= 44));
    await measure(width, height, 'confirmada');
    await screenshot(`B-${width}-confirmada.png`);
    const before = await page.locator('#estado').textContent();
    await page.evaluate(() => { document.querySelector('#reservar').click(); document.querySelector('#reservar').click(); });
    check(`Doble activación bloqueada ${width}px`, before === await page.locator('#estado').textContent() && await page.locator('#reservar').isDisabled());
    await page.keyboard.press('Enter');
    check(`Cancelación y devolución del foco ${width}px`, await page.evaluate(() =>
      !document.querySelector('#reservar').disabled && document.querySelector('#cancelar').hidden &&
      document.activeElement.id === 'reservar' && document.querySelector('#estado').textContent.includes('Reserva cancelada')));
    await measure(width, height, 'cancelada');
    await screenshot(`B-${width}-cancelada.png`);
    await page.keyboard.press('Space');
    check(`Espacio vuelve a reservar ${width}px`, await page.locator('#reservar').isDisabled());
  }
  for (const width of [767,768]) {
    await page.setViewportSize({ width, height: 1024 });
    check(`Punto de corte ${width}px`, await page.locator('.panel').evaluate((e,w) =>
      getComputedStyle(e).gridTemplateColumns.split(' ').length === (w < 768 ? 1 : 2), width));
    check(`Redimensionar conserva estado ${width}px`, await page.locator('#reservar').isDisabled());
  }
  await page.setViewportSize({ width: 320, height: 720 });
  await page.evaluate(() => document.querySelector('#taller').textContent = 'Taller ' + 'Accesibilidad'.repeat(10));
  check('Título extenso sin desborde a 320px', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await screenshot('B-320-titulo-extenso.png');
  await page.reload();
  check('Recargar reinicia estado local', !(await page.locator('#reservar').isDisabled()) && !(await page.locator('#cancelar').isVisible()));
  const css = await readFile(path.join(root,'src/estilos.css'),'utf8');
  check('CSS sin order ni ocultación del desborde', !/\border\s*:|overflow-x\s*:\s*hidden/.test(css));
  const noJS = await browser.newContext({ javaScriptEnabled: false });
  const noPage = await noJS.newPage(); await noPage.goto(url);
  check('Sin JavaScript se informa y no se promete reserva', await noPage.locator('#reservar').isDisabled() && await noPage.locator('noscript p').isVisible());
  await noJS.close();
  check('Sin errores de JavaScript ni recursos fallidos', errors.length === 0);
  for (const f of ['src/index.html','src/estilos.css','src/interaccion.js','prototipos/prototipo-A.html','pruebas/verificar.mjs']) {
    hashes[f] = createHash('sha256').update(await readFile(path.join(root,f))).digest('hex');
  }
  const result = { fechaUTC: new Date().toISOString(), navegador: `Chromium ${browser.version()}`,
    metodo: 'Playwright headless, documento local file://, viewport CSS y deviceScaleFactor 1. visualViewport.scale=1. Sin participantes humanos.',
    original: { ...a, desborde: a.scrollWidth-a.innerWidth }, mediciones: measures, comprobaciones: checks, errores: errors, sha256: hashes };
  await writeFile(path.join(root,'resultados/mediciones.json'), JSON.stringify(result,null,2)+'\n');
  const rows = measures.map(m=>`| ${m.ancho} × ${m.alto} | ${m.estado} | ${m.scrollWidth} | ${m.innerWidth} | ${m.columnas} | ${m.desborde} |`).join('\n');
  const tests = checks.map((c,i)=>`| ${i+1} | ${c.prueba} | ${c.resultado} |`).join('\n');
  await writeFile(path.join(root,'resultados/pruebas.md'), `# Resultados técnicos del Grupo 6\n\nFecha UTC: ${result.fechaUTC}. Navegador: ${result.navegador}.\n\n${result.metodo}\n\n## Método\n\nSe evaluó la versión integrada de esta carpeta en los cuatro tamaños exactos de la consigna. Cada fila corresponde a una medición ejecutada. Se captura la página completa para B y solo el viewport inicial para A. El zoom efectivo fue 1, sin emulación táctil ni cambio de escala. Repetir manualmente con zoom 100 % en DevTools del equipo de aula. No se oculta el desborde mediante CSS.\n\nA: scrollWidth=${a.scrollWidth}, innerWidth=${a.innerWidth}, desborde=${a.scrollWidth-a.innerWidth}px.\n\n## Mediciones de B\n\n| Viewport CSS | Estado | scrollWidth px | innerWidth px | Columnas | Desborde px |\n|---|---|---|---|---|---|\n${rows}\n\n## Comprobaciones\n\n${checks.length} comprobaciones correctas.\n\n| N | Comprobación | Resultado |\n|---|---|---|\n${tests}\n\n## Evidencias y límites\n\nB-ANCHO.png muestra Disponible. B-ANCHO-confirmada.png y B-ANCHO-cancelada.png muestran los otros estados. A-360.png documenta el recorte. B-320-titulo-extenso.png prueba texto largo. Las huellas SHA-256 en mediciones.json identifican los archivos ejecutados.\n\nEstas pruebas verifican geometría, comportamiento, semántica básica y foco en Chromium. No acreditan comprensión humana, sesión con G3, compatibilidad con lector de pantalla, todos los navegadores ni conformidad integral WCAG. Ver checklist.md y docs/preguntas.md. No se comparan tiempos de reserva contra A porque su botón está deshabilitado.\n\n## Reproducción\n\nDesde APE5_FASE2: npm install, npx playwright install chromium, npm test. El script regenera resultados y capturas. Repetir sobre main integrado antes de entregar.\n`);
  console.log(JSON.stringify({ checks: checks.length, navegador: result.navegador, rows: measures.length, errors }));
} finally { await browser.close(); }
