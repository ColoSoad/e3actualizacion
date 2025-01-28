const facebook = document.querySelector('#icon-facebook');
const instagram = document.querySelector('#icon-instagram');
const linkedin = document.querySelector('#icon-linkedin');
//ENLACE AL DOM LENGUAJE
const proyectoNav = document.querySelector('#proyecto-nav');
const estudioNav = document.querySelector('#estudio-nav');
const servicioNav = document.querySelector('#servicio-nav');
const contactoNav = document.querySelector('#contacto-nav');
const footer = document.querySelector('#copyrights');
const h1Servicio = document.querySelector('#h1Servicio');
const parrafoService = document.querySelector('#pServicio');

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
        alert('Error al obtener los datos del JSON:', error); // Manejo de errores
    }
}

function cambiar(data, checker) {
    if (checker) {
        proyectoNav.textContent = data[0].navbar.liNavProyecto;
        estudioNav.textContent = data[0].navbar.liNavEstudio;
        servicioNav.textContent = data[0].navbar.liNavServicio;
        contactoNav.textContent = data[0].navbar.liNavContacto;
        footer.textContent = data[0].footers.footer;
        h1Servicio.textContent = data[0].service.tituloPrincipal;
        parrafoService.textContent = data[0].service.parrafoPrincipal;
    } else {
        proyectoNav.textContent;
        estudioNav.textContent;
        servicioNav.textContent;
        contactoNav.textContent;
        footer.textContent;
        h1Servicio.textContent;
        parrafoService.textContent;
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
