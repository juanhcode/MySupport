const tbody = document.getElementById('tbodyEmpleado');
import {Data} from './modules/componentSupervisor.js';
document.addEventListener("DOMContentLoaded", async () => {
    const data = await getSupervisores();
    data.result.forEach((supervisor)=>{
        const {id,nombre,apellidos,rol,email} = supervisor;
        Data(tbody,id,nombre,apellidos,rol,email)
    })
    const btnEdit = document.querySelectorAll('#edit');
    calledModalls(btnEdit,data.result);
});

const calledModalls = (array,user)=>{
    array.forEach((boton,index)=>{
        boton.addEventListener('click',()=>{
            localStorage.setItem('userSelect',JSON.stringify(user[index]));
            window.location.href = "../../../../../Client/user/public/editarUser.html";
        })
    })
}


const getSupervisores = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:4000/v1/admin/get/empleados",
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
        return data;
    } catch (error) {
        console.log(error);
    }
}