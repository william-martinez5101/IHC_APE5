// Prueba de la lógica con dobles de los controles. No ejecuta un navegador.
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile, writeFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
let foco = '';
function control(id) {
  return { disabled: id==='reservar', hidden: id==='cancelar', textContent:'', dataset:{},
    listeners:{}, addEventListener(tipo,fn){ this.listeners[tipo]=fn; }, focus(){ foco=id; } };
}
const reservar=control('reservar'),cancelar=control('cancelar'),estado=control('estado'),resumen=control('resumen');
const elementos={'#reservar':reservar,'#cancelar':cancelar,'#estado':estado,'.resumen':resumen};
const sandbox={document:{querySelector:selector=>elementos[selector]}};
const checks=[];
const check=(name,value)=>{assert.ok(value,name);checks.push(name);};
vm.runInNewContext(await readFile(new URL('src/interaccion.js',root),'utf8'),sandbox);
check('La inicialización habilita Reservar',reservar.disabled===false);
check('Cancelar comienza oculto',cancelar.hidden===true);
reservar.listeners.click();
check('Confirmar bloquea Reservar',reservar.disabled===true);
check('Confirmar muestra Cancelar',cancelar.hidden===false);
check('Confirmar solicita foco en Cancelar',foco==='cancelar');
check('Confirmar incluye taller y laboratorio',estado.textContent.includes('Interfaces web accesibles') && estado.textContent.includes('Laboratorio 2'));
check('Confirmar actualiza data-estado',resumen.dataset.estado==='confirmada');
const previo=estado.textContent;foco='testigo';reservar.listeners.click();
check('La guarda ignora una segunda invocación',estado.textContent===previo && foco==='testigo');
cancelar.listeners.click();
check('Cancelar habilita Reservar y se oculta',reservar.disabled===false && cancelar.hidden===true);
check('Cancelar solicita foco en Reservar',foco==='reservar');
check('Cancelar informa y actualiza data-estado',estado.textContent.includes('Reserva cancelada') && resumen.dataset.estado==='cancelada');
foco='testigo';cancelar.listeners.click();
check('Cancelar sin reserva no repite transición',foco==='testigo');
reservar.listeners.click();
check('Es posible volver a reservar',reservar.disabled===true && resumen.dataset.estado==='confirmada');
const md=`# Revisión de lógica sin navegador\n\nFecha UTC: ${new Date().toISOString()}. Motor: ${process.version}.\n\nSe ejecutó el archivo real src/interaccion.js en Node VM con dobles de los controles. ${checks.length} comprobaciones correctas:\n\n${checks.map(x=>'- '+x+'.').join('\n')}\n\nEsta comprobación verifica las transiciones y las llamadas de foco en la lógica. No mide dimensiones, no representa eventos de teclado en navegador ni demuestra foco visual, anuncios accesibles o comprensión humana. La geometría se documenta mediante los registros de referencia y la matriz de ensayo; este archivo acredita únicamente la lógica ejecutada en Node.\n`;
await writeFile(new URL('resultados/revision_codigo.md',root),md);
console.log(`${checks.length} comprobaciones de lógica correctas, sin navegador.`);
