// Espera a que se cargue el DOM antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {

    const email = {
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
    }

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');        // Selecciona el input con el id 'email'
    const inputAsunto = document.querySelector('#asunto');      // Selecciona el input con el id 'asunto'
    const inputNombre = document.querySelector('#nombre');    // Selecciona el input con el id 'mensaje'
    const inputMensaje = document.querySelector('#mensaje');    // Selecciona el input con el id 'mensaje'
    const formulario = document.querySelector('#formulario');   // Selecionamos el formulario
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = this.querySelector('#spinner')


    // Asignar Eventos
    inputEmail.addEventListener('input', validarForm);           // Agrega un evento input al inputEmail que llamará a la función validarForm
    inputAsunto.addEventListener('input', validarForm);          // Agrega un evento input al inputAsunto que llamará a la función validarForm
    inputMensaje.addEventListener('input', validarForm);         // Agrega un evento input al inputMensaje que llamará a la función validarForm
    inputNombre.addEventListener('input', validarForm);          // Agrega un evento input al inputMensaje que llamará a la función validarForm

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        resetForm();
    })

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetForm();

            const mensajeExito = document.createElement('P');
            mensajeExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            mensajeExito.textContent = 'Mensaje enviando correctamente'
            formulario.appendChild(mensajeExito);
            setTimeout(() => {
                mensajeExito.remove();
            }, 3000);


        }, 3000);
    }

    // Definición de la función validarForm que se llamará cuando ocurra el evento input
    function validarForm(e) {
        // console.log(e.target.parentElement);                 // Podemos utilizar mas de un parentElement.
        if (e.target.value.trim() === '') {                     // Verifica si el valor del elemento que disparó el evento está vacío (trim elimina espacios en blanco)
            mostrarAlerta (`El campo ${e.target.id} es obligatorio`, e.target.parentElement); // Si está vacío, imprime mostrarAlerta
            email[e.target.name] = '';
            comprobarEmail();
             return;
        } 
        if (e.target.id === 'email' && !validarMail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement)
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement);

        // Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        console.log(email)
        // Comprobar el objeto

        comprobarEmail();
    }


    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);
        // Generar Alerta
        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2'); 

        referencia.appendChild(error) // appendChild añade un elemento al final del contenido del elemento padre, en este caso la funcion formnulario 
        // formulario.innerHTML = error.innerHTML; // Con innerHTML substituimos el contenido no se agrega
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        }
    }

    function validarMail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email)
        return resultado;
    }

    function comprobarEmail() {
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
        } else {
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        }
    }

    function resetForm() {
        email.nombre = '';
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }
});
