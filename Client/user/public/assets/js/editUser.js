const user = JSON.parse(localStorage.getItem('userSelect'));
//campos
const fieldId = document.getElementById('id');
const fieldNombre = document.getElementById('nombre')
const fieldApellido = document.getElementById('apellido');
const fieldEmail = document.getElementById('email');
const fieldArea = document.getElementById('select');
const fieldPassword = document.getElementById('password');
import {DataArea} from './modules/componentArea.js';
const spinner = document.getElementById('spinner');
const msgDescription = document.getElementById('descriptionModal');
if(msgDescription.textContent == '                        '){
    console.log("No hay nada");
}

const form = document.querySelector('form');

document.addEventListener('DOMContentLoaded',async()=>{
    const {id,nombre,apellidos,rol,email} = user;
    fieldId.value = id;
    fieldNombre.value = nombre;
    fieldApellido.value = apellidos;
    fieldEmail.value = email;
    if(rol == 'empleado'){
        area.style.display = 'block';
        const data = await getArea();
        data.paginatedQuery.forEach((area,index) => {
            const {nombre,area_id} = area;
            DataArea(fieldArea,nombre,area_id);
        });
    }
})

const getArea = async ()=>{
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:4000/v1/empresa/get/areas",
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

form.addEventListener('submit', async (e) => {
    const {id,rol,} = user;
    e.preventDefault();
    const updateUser = {
        nombre:fieldNombre.value,
        apellidos:fieldApellido.value,
        password:fieldPassword.value,
        email:fieldEmail.value,
        rol,
        estado:false,
        area_id: Number(fieldArea.value),
    }
    const updateUserJson= JSON.stringify(updateUser);
    const response = await updateUserFunction(id,updateUserJson);
    await messageModal(response.status,response.data.message,msgDescription);

})

const updateUserFunction = async (id,userJson) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`http://localhost:4000/v1/user/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: userJson,
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

const messageModal = async (status,message, component) => {
    if (status == 200) {
        component.textContent = message;
        spinner.style.display="none"
    }
}
