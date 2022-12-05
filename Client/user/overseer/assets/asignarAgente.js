const userProfile = JSON.parse(localStorage.getItem('user'));
const user = JSON.parse(localStorage.getItem('userSelectTicketSinAsignar'));
const fieldId = document.getElementById('id');
const fieldTitulo = document.getElementById('titulo')
const fieldDescripcion = document.getElementById('descripcion');
const fieldArea = document.getElementById('select');
const form = document.querySelector('form');
const spinner = document.getElementById('spinner');
const msgDescription = document.getElementById('descriptionModal');
console.log(fieldArea);
import {DataAgente} from '../../public/assets/js/modules/componentAgente.js';

document.addEventListener('DOMContentLoaded', async()=>{
  const {ticket_id,titulo,descripcion} = user;
  fieldId.value = ticket_id;
  fieldTitulo.value = titulo;
  fieldDescripcion.value = descripcion;
  const data = await getAgentes();
  console.log(data?.data.result);
  data?.data.result.forEach((agente,index)=>{
    const {id,nombre,apellidos} =  agente;
    DataAgente(fieldArea,nombre,id,apellidos);
  });
})

fieldArea.addEventListener('change',async ()=>{
  let estado = select.value;
  localStorage.setItem('IdSeleccionadoAgente',estado);
})

form.addEventListener('submit',async(e)=>{
  e.preventDefault();
  const resultado = await postAgentes();
  if(resultado.status == 200){
    spinner.style.display='none';
    msgDescription.textContent = resultado.data.message
  }
})

const getAgentes = async () => {
  const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        'https://mysupport-production.up.railway.app/v1/supervisor/get/tickets/supervisorxagente',
        {
          method:'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await response.json();
      console.log(response);
      return {
        data,
        status: response.status,
      }
    } catch (error) {
      return error
    }
  }


const postAgentes = async () => {
  let agenteID = localStorage.getItem('IdSeleccionadoAgente');
  const token = localStorage.getItem('token');
  const agente = {
    "agente_id":agenteID,
  }
  const agenteJson = JSON.stringify(agente);
  try {
    const response = await fetch(`https://mysupport-production.up.railway.app/v1/supervisor/post/tickets/asignar/${user.ticket_id}`,{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body:agenteJson
    })
    const data = await response.json();
        return {
          data,
          status: response.status,
        }
      } catch (error) {
        return error
      }
    }