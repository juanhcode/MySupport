const fechaNueva = document.getElementById('date');
const titulo = document.getElementById('titulo');
const message = document.getElementById('message');
const password = document.getElementById('password');
const form = document.getElementById('form');
const spinner = document.getElementById('spinner');
const msgDescription = document.getElementById('descriptionModal');
if(msgDescription.textContent == '                        '){
    console.log("No hay nada");
}
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const date = new Date();
    const fecha =   date.getFullYear() +"/" + (date.getMonth() + 1) +"/" + date.getDate();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const Ticket = {
        empleado_id: user?.id, //TODO sacar ID de LocalStorage
        agente_id: null,
        estado_id: "O",
        titulo: titulo.value,
        descripcion: message.value,
        "imagenURL": '',
        "fecha_inicio": fecha,
        "estado_borrado": false,
        "empresa": await getDomain(user?.email)
    }
    const newTicket = JSON.stringify(Ticket);
    const responseTicket = await fetch('https://mysupport-production.up.railway.app/v1/tickets/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: newTicket,
    });
    const data = await responseTicket.json();
    const codigo = responseTicket.status;
    await messageModal(codigo,data.message,msgDescription);
});

const getDomain = async (email) => {
    const array = email.split("@")[1].split('.')[0];
    return array;
};

const postImage = async (formData,token) => {
    /*
    const file = document.getElementById('files');
    const formData = new FormData();
    for (let i = 0; i < file.files.length; i++) {
        formData.append("files", file.files[i]);
    }
    const informacion = await postImage(formData,token);
    console.log(informacion);*/
    const response = await fetch("http://localhost:4000/v1/tickets/saveImage", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData,
    });
    const data = response.json();
    return data;
}

const messageModal = async (status,message, component) => {
    if (status == 201) {
        component.textContent = message;
        spinner.style.display="none"
    }
}

const recargar= ()=>{
    console.log("Siuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
}

