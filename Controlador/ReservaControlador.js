// ==========================================
// 3. EL CONTROLADOR (Controller)
// Responsabilidad: Es el "cerebro". Escucha los eventos del usuario, 
// pide datos a la Vista, se los pasa al Modelo y ejecuta la acción final.
// ==========================================
import { ReservaModelo } from '../modelo/ReservaModelo.js';
import { ReservaVista } from '../vista/ReservaVista.js';

export class ReservaControlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
        this.inicializarEventos();
    }

    inicializarEventos() {
        // Escuchar Formulario de Reservas
        this.vista.formularioReserva.addEventListener("submit", (e) => {
            e.preventDefault();
            this.procesarFormularioReserva();
        });
        // Escuchar Formulario de Sugerencias
        this.vista.formularioSugerencia.addEventListener("submit", (e) => {
            e.preventDefault();
            this.procesarFormularioSugerencia();
        });

        this.vista.btnMusica.addEventListener("click", () => {
            if (this.vista.audioAmbiental.paused) {
                this.vista.audioAmbiental.play().catch(error => {
                    console.log("Reproducción bloqueada por el navegador, se requiere interacción previa.");
                });
                this.vista.btnMusica.textContent = "⏸️";
            } else {
                this.vista.audioAmbiental.pause();
                this.vista.btnMusica.textContent = "🎵";
            }
        });

        this.vista.formularioReclamo.addEventListener("submit", (e) => {
            e.preventDefault();
            this.procesarFormularioReclamo();
        });

        window.reservar = (servicio) => {
            this.vista.hacerScroll();
            this.vista.mostrarMensaje(servicio);
        };
    }
    // Lógica para procesar la reserva
    procesarFormularioReserva() {
        const datos = this.vista.obtenerDatosReserva();
        const enlace = this.modelo.guardarYGenerarReserva(datos.nombre, datos.telefono, datos.fecha, datos.hora);
        window.open(enlace, '_blank');
    }
    // Lógica para procesar la sugerencia
    procesarFormularioSugerencia() {
        const datosSugerencia = this.vista.obtenerDatosSugerencia();
        this.modelo.guardarSugerencia(datosSugerencia);
        alert("¡Muchas gracias por tu sugerencia! La hemos recibido correctamente.");
        this.vista.formularioSugerencia.reset();
    }

    // Lógica para procesar el reclamo
    procesarFormularioReclamo() {
        const datosReclamo = this.vista.obtenerDatosReclamo();
        this.modelo.guardarReclamo(datosReclamo);
        alert("¡Hoja de Reclamación guardada con éxito en el sistema!");
        this.vista.formularioReclamo.reset(); // Limpia el formulario
    }
}
// Instanciar el MVC para que empiece a funcionar
const modelo = new ReservaModelo();
const vista = new ReservaVista();
const app = new ReservaControlador(modelo, vista);