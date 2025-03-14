const facebook = document.querySelector('#icon-facebook');
const instagram = document.querySelector('#icon-instagram');
const linkedin = document.querySelector('#icon-linkedin');
const divs = document.querySelectorAll('.clickable-div');
const closeModalButtons = document.querySelectorAll('.btn-Close-Modal');
const dialogs = {
    dialog1: document.getElementById('dialog1'),
    dialog2: document.getElementById('dialog2'),
    dialog3: document.getElementById('dialog3'),
    dialog4: document.getElementById('dialog4'),
    dialog5: document.getElementById('dialog5'),
    dialog6: document.getElementById('dialog6'),
    dialog7: document.getElementById('dialog7'),
    dialog8: document.getElementById('dialog8'),
    dialog9: document.getElementById('dialog9'),
};

//ENLACE AL DOM LENGUAJE
const proyectoNav = document.querySelector('#proyecto-nav');
const servicioNav = document.querySelector('#servicio-nav');
const contactoNav = document.querySelector('#contacto-nav');
const footer = document.querySelector('#copyrights');
const tituloPrincipal = document.querySelector('#tituloPrincipal');
const año = document.querySelectorAll('.año');
const ubicacion = document.querySelectorAll('.ubicacion');
const superficie = document.querySelectorAll('.superficie');
const casa = document.querySelectorAll('.textCasa');
const baño = document.querySelector('#baño');
const cabaña = document.querySelector('#textoCabaña');
const ampliacion = document.querySelectorAll('.textoAmpliacion');
const remodelacion = document.querySelector('#textoRemodelacion');
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
        tituloPrincipal.textContent = data[0].projects.tituloPrincipal;
        etiquetaTitle.textContent = data[0].title.proyecto;
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
        casa.forEach((casaElement) => {
            if (checker) {
                casaElement.textContent = data[0].projects.casa;
            } else {
                casaElement.textContent;
            }
        });
        ampliacion.forEach((ampliacionElement) => {
            if (checker) {
                ampliacionElement.textContent = data[0].projects.ampliacion;
            } else {
                ampliacionElement.textContent;
            }
        });
        baño.textContent = data[0].projects.baño;
        cabaña.textContent = data[0].projects.cabaña;
        remodelacion.textContent = data[0].projects.remodelacion;
    } else {
        proyectoNav.textContent;
        servicioNav.textContent;
        contactoNav.textContent;
        footer.textContent;
        tituloPrincipal.textContent;
        año.textContent;
        ubicacion.textContent;
        superficie.textContent;
        baño.textContent;
        etiquetaTitle.textContent;
        cabaña.textContent;
        remodelacion.textContent;
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

divs.forEach((div) => {
    div.addEventListener('click', () => {
        const dialogId = div.getAttribute('data-dialog');
        const dialog = dialogs[dialogId];
        if (dialog) {
            dialog.showModal();
        }
    });
});

closeModalButtons.forEach((button) => {
    button.addEventListener('click', () => {
        button.closest('dialog').close();
    });
});

recuperarInfoDePreferences();
