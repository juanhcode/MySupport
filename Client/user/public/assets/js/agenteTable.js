const tbody = document.getElementById('tbodyAgente');
import {Data} from './modules/componentSupervisor.js';
document.addEventListener("DOMContentLoaded", async () => {
    const data = await getSupervisores();
    data.result.forEach((supervisor)=>{
        const {id,nombre,apellidos,rol,email} = supervisor;
        Data(tbody,id,nombre,apellidos,rol,email)
    })
});


const getSupervisores = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://mysupport-production.up.railway.app/v1/admin/get/agentes",
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