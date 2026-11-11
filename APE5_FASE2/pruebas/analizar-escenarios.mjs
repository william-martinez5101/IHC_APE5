// Analiza datos de ejemplo identificados como ejercicio académico.
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const source = JSON.parse(await readFile(new URL('resultados/escenarios_usabilidad.json', root),'utf8'));
const rows = source.registros;
assert.equal(rows.length,5);
assert.equal(new Set(rows.map(r=>r.codigo)).size,5);
for (const r of rows) {
  assert.equal(r.origen,'datos_de_ejemplo_academico');
  assert.ok(Number.isFinite(r.tiempo_s) && r.tiempo_s>0);
  assert.ok(Number.isInteger(r.errores) && r.errores>=0);
  assert.ok(Number.isInteger(r.ayudas) && r.ayudas>=0);
}
const success=rows.filter(r=>r.completa && r.reconoce_confirmacion && r.ayudas===0).length;
const sum=rows.reduce((s,r)=>s+r.tiempo_s,0);
const sorted=rows.map(r=>r.tiempo_s).sort((a,b)=>a-b);
const result={titulo:'Pruebas Realizadas',origen:'datos_de_ejemplo_academico',
  alcance:'Análisis de cinco escenarios generados. No acredita sesiones con personas ni valida empíricamente H1.',
  cantidad:rows.length,tiempo_total_s:sum,promedio_s:sum/rows.length,mediana_s:sorted[2],minimo_s:sorted[0],maximo_s:sorted.at(-1),
  completan:rows.filter(r=>r.completa).length,reconocen_sin_ayuda:success,porcentaje_sin_ayuda:success/rows.length*100,
  errores_totales:rows.reduce((s,r)=>s+r.errores,0),ayudas_totales:rows.reduce((s,r)=>s+r.ayudas,0),
  criterio_del_ejercicio:success>=4?'Se alcanza 4 de 5 en el conjunto de ejemplo.':'No se alcanza 4 de 5 en el conjunto de ejemplo.'};
await writeFile(new URL('resultados/analisis_usabilidad.json',root),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result));
