const facebook = document.querySelector('#icon-facebook');
const instagram = document.querySelector('#icon-instagram');
const linkedin = document.querySelector('#icon-linkedin');
//ENLACE AL DOM LENGUAJE
const lenguajeInput = document.querySelector('#lenguaje');
const lenguajeLabel = document.querySelector('#label-lenguaje');
const spanish = document.querySelector('.spanEspañol');
const proyectoNav = document.querySelector('#proyecto-nav');
const servicioNav = document.querySelector('#servicio-nav');
const contactoNav = document.querySelector('#contacto-nav');
const eslogan = document.querySelector('#sloganPrincipal');
const footer = document.querySelector('#copyrights');
const navItems = document.querySelector('navItems');
const masServicios = document.querySelector('#masServicios');
const masProyectos = document.querySelector('#masProyectos');
const masContactos = document.querySelector('#masContactos');
const video1 = document.querySelector('#video1');
const video2 = document.querySelector('#video2');
const video3 = document.querySelector('#video3');
const loader = document.getElementById('loader');
const video = document.getElementById('video1');
const contenidoMains = document.getElementById('contenidoMains');
const contenedor = document.getElementById('idiomaContent');

// VARIABLES
const URL = './json/en.json';
let isCheckedLenguaje = lenguajeInput.checked;
// FUNCIONALIDADES
async function obtener() {
    try {
        const respuesta = await fetch(URL); // Esperar el resultado de la llamada a fetch
        if (!respuesta.ok) {
            throw new Error('No se pudo obtener la información solicitada. (' + respuesta.status + ')');
        }
        const data = await respuesta.json(); // Esperar la conversión a JSON
        cambiar(data); // Cambiar el idioma con los datos obtenidos
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
function guardarInfoDeLenguaje() {
    const infoLeng = {
        isCheckedLenguaje: lenguajeInput.checked,
    };
    localStorage.setItem('infoLeng', JSON.stringify(infoLeng));
}
// Función para cargar el estado de checkbox lenguaje desde localStorage
function cargarEstadoDeLenguaje() {
    const savedState = JSON.parse(localStorage.getItem('infoLeng')); // Obtener el objeto guardado
    if (savedState !== null) {
        lenguajeInput.checked = savedState.isCheckedLenguaje; // Actualizar el estado del checkbox
    }
}

function cambiar(data) {
    contenedor.classList.add('hidden');
    loader.style.display = 'block';
    setTimeout(() => {
        if (lenguajeInput.checked) {
            proyectoNav.textContent = data[0].navbar.liNavProyecto;
            servicioNav.textContent = data[0].navbar.liNavServicio;
            contactoNav.textContent = data[0].navbar.liNavContacto;
            spanish.textContent = 'ENGLISH';
            eslogan.textContent = data[0].index.sloganPrincipal;
            footer.textContent = data[0].footers.footer;
            masServicios.textContent = data[0].index.masServicios;
            masProyectos.textContent = data[0].index.masProyectos;
            masContactos.textContent = data[0].index.masContactos;
            video1.src = data[0].index.video1;
            video2.src = data[0].index.video2;
            video3.src = data[0].index.video3;
        } else {
            proyectoNav.textContent = 'PROYECTOS';
            servicioNav.textContent = 'SERVICIOS Y ESTUDIO';
            contactoNav.textContent = 'CONTACTOS';
            spanish.textContent = 'ESPAÑOL';
            eslogan.textContent = 'Diseñamos tus sueños, construimos tu realidad.';
            footer.textContent = 'Todos los derechos reservados.';
            masServicios.textContent = 'ver mas servicios';
            masProyectos.textContent = 'ver mas proyectos';
            masContactos.textContent = 'ver mas contactos';
            video1.src = './multimedia/index1.mp4';
            video2.src = './multimedia/index2.mp4';
            video3.src = './multimedia/index3.mp4';
        }

        contenedor.classList.remove('hidden');
        loader.style.display = 'none';
    }, 500);
}

// Escuchar cambios en el checkbox lenguaje
lenguajeInput.addEventListener('change', () => {
    isCheckedLenguaje = lenguajeInput.checked; // Actualizar variable
    guardarInfoDeLenguaje(); // Guardar en localStorage cada vez que cambia
    obtener(); // Cambiar el idioma al cambiar el checkbox
});

facebook.addEventListener('click', (e) => {
    // window.open('https://www.facebook.com/profile.php?id=100071002556214', '_blank');
});

instagram.addEventListener('click', (e) => {
    window.open('https://www.instagram.com/estudio.3_arq?igsh=MXhqMTZpb2Vtb3Focw==', '_blank');
});

async function esperarCargaVideos(video) {
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
    await esperarCargaVideos(video);
    // Ocultar el loader
    loader.style.display = 'none';

    // Mostrar el contenido con una transición suave
    contenidoMains.style.opacity = '1';
}

inicializarPagina();
cargarEstadoDeLenguaje();
guardarInfoDeLenguaje();
obtener();
