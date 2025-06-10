const facebook = document.querySelector('#icon-facebook');
const instagram = document.querySelector('#icon-instagram');
const linkedin = document.querySelector('#icon-linkedin');
//ENLACE AL DOM LENGUAJE
const etiquetaTitle = document.querySelector('#title');
const proyectoNav = document.querySelector('#proyecto-nav');
const servicioNav = document.querySelector('#servicio-nav');
const contactoNav = document.querySelector('#contacto-nav');
const footer = document.querySelector('#copyrights');
const tituloPrincipal = document.querySelector('#tituloPrincipal');
const parrafoPrincipal = document.querySelector('#parrafoPrincipal');
const tituloServicio = document.querySelector('#tituloServicio');
const parrafoService = document.querySelector('#parrafoService');
const tituloInversion = document.querySelector('#tituloInversion');
const parrafoInversion = document.querySelector('#parrafoInversion');
const tituloAsesoria = document.querySelector('#tituloAsesoria');
const parrafoAsesoria = document.querySelector('#parrafoAsesoria');
const tituloRenovacion = document.querySelector('#tituloRenovacion');
const parrafoRenovacion = document.querySelector('#parrafoRenovacion');
const tituloElegirnos = document.querySelector('#tituloElegirnos');
const parrafoElegirnos = document.querySelector('#parrafoElegirnos');
const video1English = document.querySelector('#videoUnoService');
const video2English = document.querySelector('#videoDosService');

// VARIABLES
const URL = '../json/en.json';
// FUNCIONALIDADES
async function obtenerJson(checker) {
    try {
        const respuesta = await fetch(URL); // Esperar el resultado de la llamada a fetch
        if (!respuesta.ok) {
            throw new Error('No se pudo obtener la información solicitada. (' + respuesta.status + ')');
        }
        const data = await respuesta.json(); // Esperar la conversión a JSON

        cambiar(data, checker); // Cambiar el idioma con los datos obtenidos
    } catch (error) {
        Swal.fire({
            title: 'Error al obtener los datos del JSON',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true,
            confirmButtonColor: '#2a3a47',
        }); // Manejo de errores
    }
}

function cambiar(data, checker) {
    if (checker) {
        etiquetaTitle.textContent = data[0].title.servicio;
        proyectoNav.textContent = data[0].navbar.liNavProyecto;
        servicioNav.textContent = data[0].navbar.liNavServicio;
        contactoNav.textContent = data[0].navbar.liNavContacto;
        footer.textContent = data[0].footers.footer;
        tituloPrincipal.textContent = data[0].service.tituloPrincipal;
        parrafoPrincipal.textContent = data[0].service.parrafoPrincipal;
        tituloServicio.textContent = data[0].service.tituloServicio;
        parrafoService.textContent = data[0].service.parrafoService;
        tituloInversion.textContent = data[0].service.tituloInversion;
        parrafoInversion.textContent = data[0].service.parrafoInversion;
        tituloAsesoria.textContent = data[0].service.tituloAsesoria;
        parrafoAsesoria.textContent = data[0].service.parrafoAsesoria;
        tituloRenovacion.textContent = data[0].service.tituloRenovacion;
        parrafoRenovacion.textContent = data[0].service.parrafoRenovacion;
        tituloElegirnos.textContent = data[0].service.tituloElegirnos;
        parrafoElegirnos.textContent = data[0].service.parrafoElegirnos;
        video1English.src = data[0].service.video1English;
        video2English.src = data[0].service.video2English;
    } else {
        etiquetaTitle.textContent;
        proyectoNav.textContent;
        servicioNav.textContent;
        contactoNav.textContent;
        footer.textContent;
        tituloPrincipal.textContent;
        parrafoPrincipal.textContent;
        tituloServicio.textContent;
        parrafoService.textContent;
        tituloInversion.textContent;
        parrafoInversion.textContent;
        tituloAsesoria.textContent;
        parrafoAsesoria.textContent;
        tituloRenovacion.textConten;
        parrafoRenovacion.textContent;
        tituloElegirnos.textContent;
        parrafoElegirnos.textContent;
        video1English.src;
        video2English.src;
    }
}

function recuperarInfoDePreferences() {
    const infoDelLenguaje = JSON.parse(localStorage.getItem('infoLeng'));
    let checker = infoDelLenguaje.isCheckedLenguaje;
    obtenerJson(checker);
}

facebook.addEventListener('click', (e) => {
    window.open('https://www.facebook.com/profile.php?id=100071002556214', '_blank');
});

instagram.addEventListener('click', (e) => {
    window.open('https://www.instagram.com/estudio.3_arq?igsh=MXhqMTZpb2Vtb3Focw==', '_blank');
});

recuperarInfoDePreferences();
