const facebook = document.querySelector('#icon-facebook');
const instagram = document.querySelector('#icon-instagram');
const linkedin = document.querySelector('#icon-linkedin');
//ENLACE AL DOM LENGUAJE
const proyectoNav = document.querySelector('#proyecto-nav');
const estudioNav = document.querySelector('#estudio-nav');
const servicioNav = document.querySelector('#servicio-nav');
const contactoNav = document.querySelector('#contacto-nav');
const footer = document.querySelector('#copyrights');
const tituloPrincipal = document.querySelector('#h1contact');
const h1Consulta = document.querySelector('#h1Consulta');
const form = document.querySelector('#form');
const h3Contacto = document.querySelector('#h3Contacto');
const arquitecto = document.querySelectorAll('.arquitecto');
const matricula = document.querySelector('#matricula');
const matricula2 = document.querySelector('#matricula2');
//LITERALS
const formEnglish = `<form id="form" action="https://formspree.io/f/mknleraq" method="post"
                enctype="application/x-www-form-urlencoded" netlify>
                <label class="box" for="Nombre"></label><input type="text" class="form-control" name="Nombre"
                required placeholder="Name" />
                <label class="box" for="Apellido"></label><input type="text" class="form-control" required
                    name="Apellido" placeholder="Last Name" />
                <label class="box" for="Email"></label><input type="email" class="form-control" id="email"
                    name="Email" required placeholder="Email" />
                <div class="areatext mb-3">
                    <label for="Mensaje"></label>
                    <textarea class="mb-3 form-control" name="Mensaje" required placeholder="Submit your question!"
                        id="floatingTextarea2" style="height: 200px"></textarea>
                </div>
                <div class="d-grid">
                    <input type="submit" class="btn btn-secondary btn-block" value="Send">
                </div>
            </form>`;

const formEspañol = `<form id="form" action="https://formspree.io/f/mknleraq" method="post"
                enctype="application/x-www-form-urlencoded" netlify>
                <label class="box" for="Nombre"></label><input type="text" class="form-control" name="Nombre"
                required placeholder="Nombre" />
                <label class="box" for="Apellido"></label><input type="text" class="form-control" required
                    name="Apellido" placeholder="Apellido" />
                <label class="box" for="Email"></label><input type="email" class="form-control" id="email"
                    name="Email" required placeholder="Email" />
                <div class="areatext mb-3">
                    <label for="Mensaje"></label>
                    <textarea class="mb-3 form-control" name="Mensaje" required placeholder="Déjanos tu consulta!"
                        id="floatingTextarea2" style="height: 200px"></textarea>
                </div>
                <div class="d-grid">
                    <input type="submit" class="btn btn-secondary btn-block" value="Enviar">
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
        tituloPrincipal.textContent = data[0].aboutUs.tituloPrincipal;
        h1Consulta.textContent = data[0].aboutUs.consulta;
        form.innerHTML = formEnglish;
        h3Contacto.textContent = data[0].aboutUs.siguenos;
        // arquitecto.textContent = data[0].aboutUs.arquitectos;
        matricula.textContent = data[0].aboutUs.matriculas;
        matricula2.textContent = data[0].aboutUs.matriculas;
        arquitecto.forEach((arquitectoElement) => {
            if (checker) {
                arquitectoElement.textContent = data[0].aboutUs.arquitectos;
            } else {
                arquitectoElement.textContent;
            }
        });
    } else {
        proyectoNav.textContent;
        estudioNav.textContent;
        servicioNav.textContent;
        contactoNav.textContent;
        footer.textContent;
        tituloPrincipal.textContent;
        h1Consulta.textContent;
        form.innerHTML = formEspañol;
        h3Contacto.textContent;
        arquitecto.textContent;
        matricula.textContent;
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
