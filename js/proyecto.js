const facebook = document.querySelector('#icon-facebook');
const instagram = document.querySelector('#icon-instagram');
const linkedin = document.querySelector('#icon-linkedin');
const openModal = document.querySelector('#btnOpenModal');
const closeModal = document.querySelector('#btnCloseModal');
//ENLACE AL DOM LENGUAJE
const proyectoNav = document.querySelector('#proyecto-nav');
const estudioNav = document.querySelector('#estudio-nav');
const servicioNav = document.querySelector('#servicio-nav');
const contactoNav = document.querySelector('#contacto-nav');
const footer = document.querySelector('#copyrights');
const tituloPrincipal = document.querySelector('#tituloPrincipal');
const año = document.querySelectorAll('.año');
const ubicacion = document.querySelectorAll('.ubicacion');
const superficie = document.querySelectorAll('.superficie');
const baño = document.querySelector('#baño');

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
        tituloPrincipal.textContent = data[0].projects.tituloPrincipal;
        año.forEach((añoElement) => {
            if (checker) {
                añoElement.textContent = data[0].projects.año;
            } else {
                añoElement.textContent;
            }
        });
        ubicacion.forEach((ubicacionElement) => {
            if (checker) {
                ubicacionElement.textContent = data[0].projects.ubicacion;
            } else {
                ubicacionElement.textContent;
            }
        });
        superficie.forEach((superficieElement) => {
            if (checker) {
                superficieElement.textContent = data[0].projects.superficie;
            } else {
                superficieElement.textContent;
            }
        });
        baño.textContent = data[0].projects.baño;
    } else {
        proyectoNav.textContent;
        estudioNav.textContent;
        servicioNav.textContent;
        contactoNav.textContent;
        footer.textContent;
        tituloPrincipal.textContent;
        año.textContent;
        ubicacion.textContent;
        superficie.textContent;
        baño.textContent;
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

openModal.addEventListener('click', (e) => {
    modal.showModal();
});
closeModal.addEventListener('click', () => {
    modal.close();
});

recuperarInfoDePreferences();
