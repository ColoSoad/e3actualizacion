const facebook = document.querySelector('#icon-facebook');
const instagram = document.querySelector('#icon-instagram');
const linkedin = document.querySelector('#icon-linkedin');
const video = document.getElementById('bg-video');

const source = video.querySelector('source');
const contenidoMain = document.getElementById('contenidoMain');
const loader = document.getElementById('loader');
//ENLACE AL DOM LENGUAJE
const proyectoNav = document.querySelector('#proyecto-nav');
const servicioNav = document.querySelector('#servicio-nav');
const contactoNav = document.querySelector('#contacto-nav');
const footer = document.querySelector('#copyrights');
const tituloPrincipal = document.querySelector('#h1contact');
const h1Consulta = document.querySelector('#h1Consulta');
const form = document.querySelector('#form');
const h3Contacto = document.querySelector('#h3Contacto');
const arquitecto = document.querySelectorAll('.arquitecto');
const inputNombre = document.querySelector('#nombre');
const inputApellido = document.querySelector('#apellido');
const inputEmail = document.querySelector('#email');
const textArea = document.querySelector('#floatingTextarea2');
const btnEnviar = document.querySelector('#enviar');
const etiquetaTitle = document.querySelector('#title');

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
        proyectoNav.textContent = data[0].navbar.liNavProyecto;
        servicioNav.textContent = data[0].navbar.liNavServicio;
        contactoNav.textContent = data[0].navbar.liNavContacto;
        footer.textContent = data[0].footers.footer;
        tituloPrincipal.textContent = data[0].aboutUs.tituloPrincipal;
        h1Consulta.textContent = data[0].aboutUs.consulta;
        inputNombre.placeholder = data[0].aboutUs.nombre;
        inputApellido.placeholder = data[0].aboutUs.apellido;
        inputEmail.placeholder = data[0].aboutUs.email;
        textArea.placeholder = data[0].aboutUs.textarea;
        btnEnviar.value = data[0].aboutUs.btnEnviar;
        h3Contacto.textContent = data[0].aboutUs.siguenos;
        etiquetaTitle.textContent = data[0].title.contacto;
        arquitecto.forEach((arquitectoElement) => {
            if (checker) {
                arquitectoElement.textContent = data[0].aboutUs.arquitectos;
            } else {
                arquitectoElement.textContent;
            }
        });
    } else {
        inputNombre.placeholder;
        inputApellido.placeholder;
        inputEmail.placeholder;
        textArea.placeholder;
        btnEnviar.value;
        proyectoNav.textContent;
        servicioNav.textContent;
        contactoNav.textContent;
        footer.textContent;
        tituloPrincipal.textContent;
        h1Consulta.textContent;
        h3Contacto.textContent;
        etiquetaTitle.textContent;
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

// Función para cambiar el video según la orientación
function cambiarVideoSegunOrientacion() {
    const esPortrait = window.matchMedia('(orientation: portrait)').matches;
    const nuevoSrc = esPortrait ? '../multimedia/videos/videoPortrait.mp4' : '../multimedia/videos/videoLandscape.mp4';

    if (source.getAttribute('src') !== nuevoSrc) {
        source.setAttribute('src', nuevoSrc);
        video.load(); // Recargar el video con la nueva fuente
    }
}

// Detectar orientación al cargar la página
document.addEventListener('DOMContentLoaded', cambiarVideoSegunOrientacion);

// Detectar cambios de orientación en tiempo real
window.addEventListener('resize', cambiarVideoSegunOrientacion);

async function esperarCargaVideo(video) {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            if (video.buffered.length > 0 && video.duration) {
                let porcentajeCargado = (video.buffered.end(0) / video.duration) * 100;

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
    await esperarCargaVideo(video);
    // Ocultar el loader
    loader.style.display = 'none';
    // Mostrar el contenido con una transición suave
    contenidoMain.style.opacity = '1';
}
recuperarInfoDePreferences();
// Llamamos a la función para iniciar la espera
inicializarPagina();
