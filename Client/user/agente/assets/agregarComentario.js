const tbody = document.getElementById('tbodySupervisor');
import {Data} from '../../public/assets/js/modules/componentTicketSinAtender.js';
const spinner = document.getElementById('spinner');
const spinnerModal = document.getElementById('spinnerModal');
const tabla = document.getElementById('tabla');
const token = localStorage.getItem('token');
document.addEventListener("DOMContentLoaded", async () => {
    const data = await getSupervisores();
    console.log(data);
    data?.data.result.forEach((supervisor)=>{
        const {titulo,descripcion,ticket_id} = supervisor;
        Data(tbody,ticket_id,titulo,descripcion)
    })
    if(data?.status == 200){
        spinner.style.display = 'none';
        tabla.style.display="block";
    }
    const btnEdit = document.querySelectorAll('#edit');
    console.log(btnEdit);
    calledModalls(btnEdit,data.data.result);
});


const calledModalls = (array,user)=>{
  array.forEach((boton,index)=>{
      boton.addEventListener('click',()=>{
          localStorage.setItem('TicketActualizar',JSON.stringify(user[index]));
          window.location.href = "../../../../../Client/user/agente/formulario.html";
      })
  })
}


const getSupervisores = async (user) => {
  try {
    const response = await fetch(
      'https://mysupport-production.up.railway.app/v1/agente/get/tickets',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = await response.json();
    console.log(data);  
    return {
      data,
      status: response.status,
    }
  } catch (error) {
    return error
  }
}
