const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.querySelector('form');
const btnSubmit = document.getElementById('btn-submit');
const msgDescription = document.getElementById('descriptionModal');
const btnRadio = document.querySelectorAll('input[name="accountType"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const valueRadio = getValueRadio(btnRadio);
    const user = {
        nombre: nombre.value,
        apellidos: apellido.value,
        email: email.value,
        password: password.value,
        rol: valueRadio,
        estado: false
    }
    const userJson = JSON.stringify(user);
    const response = await crearUsuario(userJson);
    console.log(response);
    await messageModal(response, msgDescription);

})

const crearUsuario = async (user) => {
    console.log(user);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiRW1wbGVhZG8iLCJuYW1lIjoiU2ViYXN0aWFuIiwiZW1haWwiOiJzZWJhc0BlY29wZXRyb2wuY29tLmNvIiwiaWF0IjoxNjY5NzAwMDU3LCJleHAiOjE2Njk3MDcyNTd9.3cZV_5eFQqg-YATBHlb1Dr0udMkVwkRHTFC8Wh9ywVs';
    try {
        const response = await fetch('http://localhost:4000/v1/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: user,
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

const messageModal = (message, component) => {
    const { status, data } = message;
    if (status == 200) {
        component.textContent = data.message;
    }
}

const getValueRadio = (radioArray) => {
    let data = '';
    radioArray.forEach(elemento => {
        if (elemento.checked) {
            data = elemento.value;
        }
    })
    return data;
}