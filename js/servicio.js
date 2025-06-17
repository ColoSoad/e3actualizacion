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
const video3English = document.querySelector('#videoTresService');
const video4English = document.querySelector('#videoCuatroService');
const video5English = document.querySelector('#videoCincoService');
const loader = document.getElementById('loader');
const contenidoMains = document.querySelector('.mainServices');

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
        video3English.src = data[0].service.video3English;
        video4English.src = data[0].service.video4English;
        video5English.src = data[0].service.video5English;
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
        video3English.src;
        video4English.src;
        video5English.src;
    }
}

function recuperarInfoDePreferences() {
    const infoDelLenguaje = JSON.parse(localStorage.getItem('infoLeng'));
    let checker = infoDelLenguaje.isCheckedLenguaje;
    obtenerJson(checker);
}

facebook.addEventListener('click', (e) => {
    // window.open('https://www.facebook.com/profile.php?id=100071002556214', '_blank');
});

instagram.addEventListener('click', (e) => {
    window.open('https://www.instagram.com/estudio.3_arq?igsh=MXhqMTZpb2Vtb3Focw==', '_blank');
});

async function esperarCargaVideos(video1English) {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            if (video1English.buffered.length > 0 && video1English.duration) {
                let porcentajeCargado = (video1English.buffered.end(0) / video1English.duration) * 100;

                if (porcentajeCargado >= 50) {
                    clearInterval(interval); // Detener el intervalo
                    resolve(); // Continuar con la ejecución
                }
            }
        }, 100);
    });
}

async function inicializarPagina() {
    // Espera a que el video cargue al menos al 50%
    await esperarCargaVideos(video1English);
    // Ocultar el loader
    loader.style.display = 'none';

    // Mostrar el contenido con una transición suave
    contenidoMains.style.opacity = '1';
}

inicializarPagina();
recuperarInfoDePreferences();
