const user = JSON.parse(localStorage.getItem('user'));
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.querySelector('form');
const btnSubmit = document.getElementById('btn-submit');
const spinner = document.getElementById('spinner');
const supervisor = document.getElementById('supervisor');
const fieldArea = document.getElementById('select');
const msgDescription = document.getElementById('descriptionModal');
import { DataArea } from './modules/componentSAsignar.js';
const btnRadio = document.querySelectorAll('input[name="accountType"]');
if (msgDescription.textContent == '                        ') {
    console.log("No hay nada");
}

btnRadio.forEach(elemento => {
    elemento.addEventListener('click', async (e) => {
        if (e.target.value == 'agente') {
            console.log('Aqui se colcoa todo');
            supervisor.style.display = "block";
            const data = await getSupervisor();
            data.result.forEach((supervisor, index) => {
                const { id, nombre, apellidos } = supervisor;
                DataArea(fieldArea, nombre, apellidos, id);
            });
        } else {
            supervisor.style.display = "none";
        }
    })
})

select.addEventListener('change', async () => {
    let estado = select.value;
    localStorage.setItem('supervisorAsignar', estado);
})

const getSupervisor = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://mysupport-production.up.railway.app/v1/admin/get/supervisores",
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
const diSupervisor = localStorage.getItem('supervisorAsignar');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const valueRadio = getValueRadio(btnRadio);
    const user = {
        nombre: nombre.value,
        apellidos: apellido.value,
        email: email.value,
        password: password.value,
        rol: valueRadio,
        estado: false,
        "area_id":2,
        "supervisor_id": diSupervisor
    }
    const userJson = JSON.stringify(user);
    const response = await crearUsuario(userJson);
    console.log(response);
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

const asignarSupervisor = async (user) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch('https://mysupport-production.up.railway.app/v1/user/asignar/supervisor', {
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