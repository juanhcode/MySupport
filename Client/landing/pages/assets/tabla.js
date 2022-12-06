const email = document.getElementById('email');
const table = document.getElementById('tabla');
const message = document.getElementById('message');

table.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const newUser ={
        email: email.value,
    }
    const empresa = {

    }
    const userJson = JSON.stringify(newUser);
    const empresaJson = JSON.stringify(empresa);
    const responseUser = await sendData(userJson);
    const responseEmpresa = await sendData(empresaJson);
    if(responseUser.staus == 200 && responseEmpresa.staus == 200){
        //message.textContent
    }
})


const sendData = async (user)=>{
    const token = localStorage.getItem("token");
    try {
        const response = await fetch('https://mysupport-production.up.railway.app/v1/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: Bearer ${token}
            },
            body: user,
        });
        const dataU = await response.json();
        return {
            data,
            status: response.status
        };
    } catch (error) {
        return error;
    }
}


const sendEmpresa =async(empresa)=>{
    const token = localStorage.getItem("token");
    try {
        const response = await fetch('https://mysupport-production.up.railway.app/v1/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: Bearer ${token}
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