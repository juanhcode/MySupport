const user = JSON.parse(localStorage.getItem('TicketActualizar'));
//campos
const fieldId = document.getElementById('id');
const fieldNombre = document.getElementById('titulo')
const fieldApellido = document.getElementById('descripcion');
const fieldArea = document.getElementById('select');
const spinner = document.getElementById('spinner');
const msgDescription = document.getElementById('descriptionModal');
const comentario = document.getElementById('comentario');
if(msgDescription.textContent == '                        '){
    console.log("No hay nada");
}

const form = document.querySelector('form');

document.addEventListener('DOMContentLoaded',async()=>{
    const {ticket_id,titulo,descripcion} = user;
    fieldId.value = ticket_id;
    fieldNombre.value = titulo;
    fieldApellido.value = descripcion;
})

form.addEventListener('submit', async (e) => {
    const {ticket_id} = user;
    e.preventDefault();
    const updateUser = {
        "ticket_id": ticket_id,
        "comentario": comentario
    }
    const updateUserJson= JSON.stringify(updateUser);
    const response = await getArea(updateUserJson);
    await messageModal(response.status,response.data.message,msgDescription);

}) 

const messageModal = async (status,message, component) => {
    if (status == 200) {
        component.textContent = message;
        spinner.style.display="none"
    }
}

const getArea = async (user)=>{
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://mysupport-production.up.railway.app/v1/agente/post/comentario",
            {   
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: user
            }
        );
        const data = await response.json();
        return {
            data,
            status: response.status
        };
    } catch (error) {
        console.log(error);
    }
}


