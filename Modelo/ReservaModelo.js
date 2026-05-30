// ==========================================
// 1. EL MODELO (Model)
// Responsabilidad: Manejar la lógica de negocio y los datos.
// ==========================================
export class ReservaModelo {
    constructor() {
        this.telefonoBarberia = "51981340253";
    }

    guardarYGenerarReserva(nombre, telefono, fecha, hora) {
        const nuevaReserva = { nombre, telefono, fecha, hora, estado: 'pendiente' };
        let reservasGuardadas = JSON.parse(localStorage.getItem('reservasBarberia')) || [];
        reservasGuardadas.push(nuevaReserva);
        localStorage.setItem('reservasBarberia', JSON.stringify(reservasGuardadas));

        let mensaje = `Hola, quiero hacer una reserva:%0A- Nombre: ${nombre}%0A- Teléfono: ${telefono}%0A- Fecha: ${fecha}%0A- Hora: ${hora}`;
        return `https://wa.me/${this.telefonoBarberia}?text=${mensaje}`;
    }

    // NUEVO: Método para persistir los Reclamos en el LocalStorage
    guardarReclamo(objetoReclamo) {
        let reclamosGuardados = JSON.parse(localStorage.getItem('reclamosBarberia')) || [];
        reclamosGuardados.push(objetoReclamo);
        localStorage.setItem('reclamosBarberia', JSON.stringify(reclamosGuardados));
        console.log("Historial de Libro de Reclamaciones actualizado:", reclamosGuardados);
    }
    // Método para persistir las Sugerencias
    guardarSugerencia(objetoSugerencia) {
        let sugerenciasGuardadas = JSON.parse(localStorage.getItem('sugerenciasBarberia')) || [];
        sugerenciasGuardadas.push(objetoSugerencia);
        localStorage.setItem('sugerenciasBarberia', JSON.stringify(sugerenciasGuardadas));
        console.log("Historial de Sugerencias actualizado:", sugerenciasGuardadas);
    }
}