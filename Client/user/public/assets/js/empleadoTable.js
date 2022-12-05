const tbody = document.getElementById('tbodyEmpleado');
import {Data} from './modules/componentSupervisor.js';
const spinner = document.getElementById('spinner');
const spinnerModal = document.getElementById('spinnerModal');
const tabla = document.getElementById('tabla');
const btnAceptar = document.getElementById('btnAceptar');
const msgModal = document.getElementById('descriptionModal');
document.addEventListener("DOMContentLoaded", async () => {
    const data = await getSupervisores();
    data?.data.result.forEach((supervisor)=>{
        const {id,nombre,apellidos,rol,email} = supervisor;
        Data(tbody,id,nombre,apellidos,rol,email)
    })
    if(data?.response.status == 200){
        spinner.style.display = 'none';
        tabla.style.display="block";
    }
    const btnEdit = document.querySelectorAll('#edit');
    const btnDelete = document.querySelectorAll('#delete');
    calledModalls(btnEdit,data.data.result);
    calledDelete(btnDelete,data.data.result);
});
btnAceptar.addEventListener('click', async()=>{
    let id = localStorage.getItem('userDelete');
    spinnerModal.style.display="block";
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:4000/v1/user/delete/${id}`,
            {
                method:"DELETE",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        if (response.status == 200) {
            spinnerModal.style.display="none";
            msgModal.textContent = data.message;
            setTimeout(() => {
                window.location.href = "../../../../../Client/user/public/supervisoresTable.html";           
            }, 1000);
        }
    } catch (error) {
        console.log(error);
    }
    spinnerModal.style.display="none";
});


const calledModalls = (array,user)=>{
    array.forEach((boton,index)=>{
        boton.addEventListener('click',()=>{
            localStorage.setItem('userSelect',JSON.stringify(user[index]));
            window.location.href = "../../../../../Client/user/public/editarUser.html";
        })
    })
}
const calledDelete = (array,user)=>{
    localStorage.removeItem('userDelete');
    array.forEach((boton,index)=>{
        boton.addEventListener('click',()=>{
            localStorage.setItem('userDelete',user[index]?.id);
        })
    })
}

const getSupervisores = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://mysupport-production.up.railway.app/v1/admin/get/empleados",
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        if (response.status == 404) {
            console.log("Error");
        }
        return {
            data,
            response,
        };
    } catch (error) {
        console.log(error);
    }
}