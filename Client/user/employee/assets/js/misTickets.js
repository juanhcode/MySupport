const select = document.getElementById('select');
const tbody = document.getElementById('tbodyEmpleado');
import {Data} from '../../../public/assets/js/modules/componentSupervisor.js';
const spinner = document.getElementById('spinner');
const spinnerModal = document.getElementById('spinnerModal');
const tabla = document.getElementById('tabla');
const btnAceptar = document.getElementById('btnAceptar');
const msgModal = document.getElementById('descriptionModal');
select.addEventListener('change',async ()=>{
    let estado = select.value;  
    if(estado == 'All'){
        const respuesta = await getAll(estado);
        respuesta.data.forEach((ticket)=>{
            const {titulo,descripcion,ticket_id} = ticket;
            Data(tbody,ticket_id,titulo,descripcion);
        })
        if(respuesta?.status == 200){
            spinner.style.display = 'none';
            tabla.style.display="block";
        }
    };

    if(estado == 'O'){
        await getAll(estado);
    };

    if(estado == 'A'){
        await getAll(estado);
    };

    if(estado == 'C'){
        await getAll(estado);
    };
})




const getAll = async (estado) => {
    const filterEstado = {
        "estado_id":estado
    }
    const filterEstadoJson = JSON.stringify(filterEstado);
    console.log(filterEstado);
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://mysupport-production.up.railway.app/v1/empleado/get/filter/tickets?desde=0&limite=10",
            {
                method:'GET',
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body:filterEstadoJson
            }
        );
        const data = await response.json();
        console.log(data);
        /*
        if (response.status == 404) {
            console.log("Error");
        }

        return {
            data,
            response,
        };
        */
    } catch (error) {
        console.log(error);
    }
}