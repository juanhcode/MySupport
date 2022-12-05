const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.querySelector('form');
const btnSubmit = document.getElementById('btn-submit');
const spinner = document.getElementById('spinner');
const msgDescription = document.getElementById('descriptionModal');
const btnRadio = document.querySelectorAll('input[name="accountType"]');
if (msgDescription.textContent == '                        ') {
    console.log("No hay nada");
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const valueRadio = getValueRadio(btnRadio);
    const user = {
        nombre: nombre.value,
        apellidos: apellido.value,
        email: email.value,
        password: password.value,
        rol: valueRadio,
        estado: false
    }
    const userJson = JSON.stringify(user);
    const response = await crearUsuario(userJson);
    console.log(response);
    console.log(response.status);
    await messageModal(response.status, response.data.message, msgDescription);;

})

const crearUsuario = async (user) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch('https://mysupport-production.up.railway.app/v1/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: user,
        });
        const data = await response.json();
        return {
            data,
            status: response.status
        };
    } catch (error) {
        return error;
    }
}

const messageModal = async (status, message, component) => {
    if (status == 201) {
        component.textContent = message;
        spinner.style.display = "none"
    }
    if (status == 400) {
        component.textContent = 'Debe introducir todos los datos';
        spinner.style.display = "none"
    }
    if (status == 500) {
        component.textContent = message;
        spinner.style.display = "none"
    }
}

const recargar = () => {
    const valueRadio = getValueRadio(btnRadio);
    switch (valueRadio) {
        case 'empleado':
            window.location.href = "../../../../../Client/user/public/empleadosTable.html";
            break;
        case 'agente':
            window.location.href = "../../../../../Client/user/public/agenteTable.html";
            break;
        case 'supervisor':
            window.location.href = "../../../../../Client/user/public/supervisoresTable.html";
            break;
        default:
            window.location.href = "../../../../../Client/user/public/index.html";
            break;
    }
}

const getValueRadio = (radioArray) => {
    let data = '';
    radioArray.forEach(elemento => {
        if (elemento.checked) {
            data = elemento.value;
        }
    })
    return data;
}