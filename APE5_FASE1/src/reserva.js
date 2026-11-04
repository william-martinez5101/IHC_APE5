const reservar = document.querySelector('#reservar');
const cancelar = document.querySelector('#cancelar');
const estado = document.querySelector('#estado');
const resumen = document.querySelector('.resumen');
let reservaActiva = false;

// Confirmar y cancelar actualizan los controles y el mensaje juntos.
function actualizarReserva(activa) {
  reservaActiva = activa;
  reservar.disabled = activa;
  reservar.textContent = activa ? 'Lugar reservado' : 'Reservar un lugar →';
  cancelar.hidden = !activa;
  resumen.dataset.estado = activa ? 'confirmada' : 'cancelada';
  estado.textContent = activa
    ? 'Reserva confirmada para Interfaces web accesibles. Jueves, de 14:00 a 16:00, en Laboratorio 2.'
    : 'Reserva cancelada. Tu lugar fue liberado y puedes volver a reservar.';

  // Al deshabilitar u ocultar un botón, el foco pasa al control disponible.
  (activa ? cancelar : reservar).focus();
}

reservar.addEventListener('click', () => {
  if (!reservaActiva) actualizarReserva(true);
});
cancelar.addEventListener('click', () => actualizarReserva(false));
