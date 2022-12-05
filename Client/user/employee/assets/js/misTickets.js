const select = document.getElementById('select');
const tbody = document.getElementById('tbodyEmpleado');
import {Data} from '../../../public/assets/js/modules/componentTicketSinAtender.js';
import {DataCerrada} from '../../../public/assets/js/modules/componentCerrado.js';
import {DataAprobada} from '../../../public/assets/js/modules/componentAprobado.js';
const spinner = document.getElementById('spinner');
const spinnerModal = document.getElementById('spinnerModal');
const tabla = document.getElementById('tabla');
const information = document.getElementById('information');
const btnAceptar = document.getElementById('btnAceptar');
const msgModal = document.getElementById('descriptionModal');

select.addEventListener('change',async ()=>{
    spinner.style.display = 'block';
    tabla.style.display="none";
    information.style.display="none";
    let estado = select.value;
    console.log(estado);
    if(estado == 'all'){
        //console.log("siuuu");
        const respuesta = await getAllTickets();
        console.log(respuesta);
        /*
        respuesta.data.result.forEach((ticket)=>{
            const {titulo,descripcion,ticket_id} = ticket;
            Data(tbody,ticket_id,titulo,descripcion);
        })
        if(respuesta?.status == 200){
            spinner.style.display = 'none';
            tabla.style.display="block";
        }*/

    };

    if(estado == 'O'){
        tbody.innerHTML="";
        const respuesta = await getAll(estado);
        respuesta.data.result.forEach((ticket)=>{
            const {titulo,descripcion,ticket_id} = ticket;
            Data(tbody,ticket_id,titulo,descripcion);
        })
        if(respuesta?.status == 200){
            spinner.style.display = 'none';
            tabla.style.display="block";
        }
    };

    if(estado == 'A'){
        tbody.innerHTML="";
        const respuesta = await getAll(estado);
        if(respuesta.data.result.length == 0){
            spinner.style.display = 'none';
            tabla.style.display="none";
            information.style.display="block";
        }else{
            respuesta.data.result.forEach((ticket)=>{
                const {titulo,descripcion,ticket_id} = ticket;
                DataAprobada(tbody,ticket_id,titulo,descripcion);
            })
            if(respuesta?.status == 200){
                spinner.style.display = 'none';
                tabla.style.display="block";
            }
        }
    };

    if(estado == 'C'){
        tbody.innerHTML="";
        const respuesta = await getAll(estado);
        if(respuesta.data.result.length == 0){
            spinner.style.display = 'none';
            tabla.style.display="none";
            information.style.display="block";
        }else {
            respuesta.data.result.forEach((ticket)=>{
                const {titulo,descripcion,ticket_id} = ticket;
                DataCerrada(tbody,ticket_id,titulo,descripcion);
            })
            if(respuesta?.status == 200){
                spinner.style.display = 'none';
                tabla.style.display="block";
            }
        }
    };
})
const getAllTickets = async () => {
    const token = localStorage.getItem("token");
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/v1/empleado/get/tickets?desde=0&limite=10`,
            {
                method:'GET',
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        const data = await response.json();
        console.log(data);
        return {
            data,
            status: response.status
        };
    } catch (error) {
        console.log(error);
    }
}


const getAll = async (estado) => {
    const token = localStorage.getItem("token");
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://mysupport-production.up.railway.app/v1/empleado/get/filter/tickets/${estado}?desde=0&limite=10`,
            {
                method:'GET',
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        const data = await response.json();
        console.log(data);
        if (response.status == 404) {
            console.log("Error");
        }

        return {
            data,
            status: response.status
        };
    } catch (error) {
        console.log(error);
    }
}