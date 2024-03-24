// Espera a que se cargue el DOM antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');        // Selecciona el input con el id 'email'
    const inputAsunto = document.querySelector('#asunto');      // Selecciona el input con el id 'asunto'
    const inputNombre = document.querySelector('#nombre');    // Selecciona el input con el id 'mensaje'
    const inputMensaje = document.querySelector('#mensaje');    // Selecciona el input con el id 'mensaje'
    const formulario = document.querySelector('#formulario');   // Selecionamos el formulario

    // Asignar Eventos
    inputEmail.addEventListener('blur', validarForm);           // Agrega un evento blur al inputEmail que llamará a la función validarForm
    inputAsunto.addEventListener('blur', validarForm);          // Agrega un evento blur al inputAsunto que llamará a la función validarForm
    inputMensaje.addEventListener('blur', validarForm);         // Agrega un evento blur al inputMensaje que llamará a la función validarForm
    inputNombre.addEventListener('blur', validarForm);          // Agrega un evento blur al inputMensaje que llamará a la función validarForm

    // Definición de la función validarForm que se llamará cuando ocurra el evento blur
    function validarForm(e) {
        console.log(e.target.parentElement);                    // Podemos utilizar mas de un parentElement.
        if (e.target.value.trim() === '') {                     // Verifica si el valor del elemento que disparó el evento está vacío (trim elimina espacios en blanco)
             mostrarAlerta (`El campo ${e.target.id} es obligatorio`, e.target.parentElement); // Si está vacío, imprime mostrarAlerta
             return;
        } 
        if (!validarMail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement)
            return;
        }
        limpiarAlerta(e.target.parentElement);
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
});
