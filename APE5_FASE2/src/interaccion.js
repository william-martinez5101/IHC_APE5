const reservar = document.querySelector('#reservar');
const cancelar = document.querySelector('#cancelar');
const estado = document.querySelector('#estado');
const resumen = document.querySelector('.resumen');
let reservaActiva = false;

// El HTML deja la reserva bloqueada si JavaScript no está disponible.
reservar.disabled = false;

reservar.addEventListener('click', () => {
  if (reservaActiva) return; // Segunda barrera frente a activaciones repetidas.
  reservaActiva = true;
  reservar.disabled = true;
  reservar.textContent = 'Lugar reservado';
  cancelar.hidden = false;
  resumen.dataset.estado = 'confirmada';
  estado.textContent = 'Reserva confirmada para Interfaces web accesibles. Jueves, de 14:00 a 16:00, en Laboratorio 2.';
  cancelar.focus();
});

cancelar.addEventListener('click', () => {
  if (!reservaActiva) return;
  reservaActiva = false;
  reservar.disabled = false;
  reservar.textContent = 'Reservar un lugar →';
  cancelar.hidden = true;
  resumen.dataset.estado = 'cancelada';
  estado.textContent = 'Reserva cancelada. Tu lugar fue liberado y puedes volver a reservar.';
  reservar.focus();
});
