const validarFormulario = () => {
    let nombre = document.querySelector('#nombre').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let confirmarPassword = document.querySelector('#confirmar-password').value;

    let errores = [];

    if (nombre === "") {
        errores.push("El nombre es obligatorio");
    }
    if (!validarEmail(email)) {
        errores.push("El email no es válido");
    }
    if (password.length < 6) {
        errores.push("La longitud de la contraseña no es válida");
    }
    if (!validarPassword(password)) {
        errores.push("La contraseña debe tener al menos una letra minúscula, una letra mayúscula y un número");
    }
    if (password !== confirmarPassword) {
        errores.push("Las contraseñas no son iguales");
    }
    if (errores.length > 0) {
        mostrarErrores(errores);
        return false;
    }
    mostrarExito();
    return false; 
}

const validarEmail = (email) => {
    let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regexEmail.test(email);
}

const validarPassword = (password) => {
    let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/; 
    return regexPassword.test(password);
}

const mostrarErrores = (errores) => {
    let errorList = document.querySelector('#errorList');
    errorList.innerHTML = ''; 
    errores.forEach(error => {
        let li = document.createElement('li');
        li.classList.add('list-group-item', 'list-group-item-danger');
        li.textContent = error;
        errorList.appendChild(li);
    });

    let errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    errorModal.show();
}

const mostrarExito = () => {
    let successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
}

