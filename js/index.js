const facebook = document.querySelector('#icon-facebook');
const instagram = document.querySelector('#icon-instagram');
const linkedin = document.querySelector('#icon-linkedin');
//ENLACE AL DOM LENGUAJE
const lenguajeInput = document.querySelector('#lenguaje');
const lenguajeLabel = document.querySelector('#label-lenguaje');
const spanish = document.querySelector('.spanEspañol');
const proyectoNav = document.querySelector('#proyecto-nav');
const estudioNav = document.querySelector('#estudio-nav');
const servicioNav = document.querySelector('#servicio-nav');
const contactoNav = document.querySelector('#contacto-nav');
const eslogan = document.querySelector('#sloganPrincipal');
const footer = document.querySelector('#copyrights');

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
        alert('ERROR AL INTENTAR TRAER INFORMACION DEL LENGUAJE SELECCIONADO... POR FAVOR RECARGA EL SITIO'); // Manejo de errores
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
// Función para cambiar el idioma del párrafo
function cambiar(data) {
    if (lenguajeInput.checked) {
        // Cambiar al idioma del JSON
        proyectoNav.textContent = data[0].navbar.liNavProyecto;
        estudioNav.textContent = data[0].navbar.liNavEstudio;
        servicioNav.textContent = data[0].navbar.liNavServicio;
        contactoNav.textContent = data[0].navbar.liNavContacto;
        spanish.textContent = 'ENGLISH';
        eslogan.textContent = data[0].index.sloganPrincipal;
        footer.textContent = data[0].footers.footer;
    } else {
        // Cambiar de nuevo al español
        proyectoNav.textContent = 'PROYECTOS';
        estudioNav.textContent = 'ESTUDIO';
        servicioNav.textContent = 'SERVICIOS';
        contactoNav.textContent = 'CONTACTOS';
        footer.textContent = 'Todos los derechos reservados.';
        spanish.textContent = 'ESPAÑOL';
        eslogan.textContent = 'Diseñamos tus sueños, construimos tu realidad.';
    }
}

// Escuchar cambios en el checkbox lenguaje
lenguajeInput.addEventListener('change', () => {
    isCheckedLenguaje = lenguajeInput.checked; // Actualizar variable
    guardarInfoDeLenguaje(); // Guardar en localStorage cada vez que cambia
    obtener(); // Cambiar el idioma al cambiar el checkbox
});

// Llamar a la función para cargar el estado al iniciar la página
cargarEstadoDeLenguaje();
obtener(); // Llamamos obtener inicialmente para ajustar el texto según el estado actual del checkbox

facebook.addEventListener('click', (e) => {
    window.open('https://www.facebook.com/profile.php?id=100071002556214', '_blank');
});

instagram.addEventListener('click', (e) => {
    window.open('https://www.instagram.com/estudio.3_arq?igsh=MXhqMTZpb2Vtb3Focw==', '_blank');
});

// EVENTO PARA SABER BIEN LAS DIMENSIONES

// window.addEventListener('resize', () => {
//     if (window.innerWidth < window.innerHeight) {
//         alert(`Pantalla en landscape: ${window.innerWidth}px x ${window.innerHeight}px`);
//     }
// });
