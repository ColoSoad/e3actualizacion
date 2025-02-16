const facebook = document.querySelector('#icon-facebook');
const instagram = document.querySelector('#icon-instagram');
const linkedin = document.querySelector('#icon-linkedin');
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

//LITERALS
const formEnglish = `<form id="form" action="https://formsubmit.co/4fae83c50e2a0e78e8125e300c0cb633" method="post">
                    <label class="box" for="nombre"></label>
                    <input type="text" id="nombre" class="form-control" name="Nombre"
                    required placeholder="Name" />
                    <label class="box" for="apellido"></label>
                    <input type="text" id="apellido" class="form-control" required
                        name="Apellido" placeholder="Last Name" />
                    <label class="box" for="email"></label><input type="email" class="form-control" id="email"
                        name="Email" required placeholder="Email" autocomplete="email" />
                    <div class="areatext mb-3">
                        <label for="floatingTextarea2"></label>
                        <textarea class="mb-3 form-control" name="Mensaje" required placeholder="Leave us your comments!"
                            id="floatingTextarea2" style="height: 200px"></textarea>
                    </div>
                    <div class="d-grid">
                        <input type="submit" class="btn btn-secondary btn-block" value="Send">
                        <input type="hidden" name="_next" value="http://127.0.0.1:5501/pages/contacto.html">
                        <input type="hidden" name="_captcha" value="false">
                    </div>
                </form>`;

const formEspañol = `<form id="form" action="https://formsubmit.co/4fae83c50e2a0e78e8125e300c0cb633" method="post">
                    <label class="box" for="nombre"></label>
                    <input type="text" id="nombre" class="form-control" name="Nombre"
                    required placeholder="Nombre" />
                    <label class="box" for="apellido"></label>
                    <input type="text" id="apellido" class="form-control" required
                        name="Apellido" placeholder="Apellido" />
                    <label class="box" for="email"></label><input type="email" class="form-control" id="email"
                        name="Email" required placeholder="Email" autocomplete="email" />
                    <div class="areatext mb-3">
                        <label for="floatingTextarea2"></label>
                        <textarea class="mb-3 form-control" name="Mensaje" required placeholder="Déjanos tu consulta!"
                            id="floatingTextarea2" style="height: 200px"></textarea>
                    </div>
                    <div class="d-grid">
                        <input type="submit" class="btn btn-secondary btn-block" value="Enviar">
                        <input type="hidden" name="_next" value="http://127.0.0.1:5501/pages/contacto.html">
                        <input type="hidden" name="_captcha" value="false">
                    </div>
                </form>`;

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
        form.innerHTML = formEnglish;
        h3Contacto.textContent = data[0].aboutUs.siguenos;
        arquitecto.forEach((arquitectoElement) => {
            if (checker) {
                arquitectoElement.textContent = data[0].aboutUs.arquitectos;
            } else {
                arquitectoElement.textContent;
            }
        });
    } else {
        proyectoNav.textContent;
        servicioNav.textContent;
        contactoNav.textContent;
        footer.textContent;
        tituloPrincipal.textContent;
        h1Consulta.textContent;
        form.innerHTML = formEspañol;
        h3Contacto.textContent;
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

const video = document.getElementById('bg-video');
const source = video.querySelector('source');

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
        }, 100); // Verificamos cada 100ms
    });
}

async function inicializarPagina() {
    recuperarInfoDePreferences();
    const video = document.getElementById('bg-video');
    const contenidoMain = document.getElementById('contenidoMain');
    const loader = document.getElementById('loader');

    // Espera a que el video cargue al menos al 50%
    await esperarCargaVideo(video);

    // Ocultar el loader
    loader.style.display = 'none';

    // Mostrar el contenido con una transición suave
    contenidoMain.style.opacity = '1';
}

// Llamamos a la función para iniciar la espera
inicializarPagina();
