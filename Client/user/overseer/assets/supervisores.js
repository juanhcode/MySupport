const tbody = document.getElementById('tbodySupervisor')
// import { Data } from './modules/componentSupervisor.js'
document.addEventListener('DOMContentLoaded', async () => {
  const data = await getSupervisores()
  // data.result.forEach((supervisor)=>{
  //     const {id,nombre,apellidos,rol,email} = supervisor;
  //     Data(tbody,id,nombre,apellidos,rol,email)
  // })
  // const btnEdit = document.querySelectorAll('#edit');
  // calledModalls(btnEdit,data.result);
  console.log(data);
})

const calledModalls = (array, user) => {
  array.forEach((boton, index) => {
    boton.addEventListener('click', () => {
      localStorage.setItem('userSelect', JSON.stringify(user[index]))
      window.location.href = '../../../../../Client/user/public/editarUser.html'
    })
  })
}

const getSupervisores = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(
      'https://mysupport-production.up.railway.app/v1/supervisor/get/tickets/sinagente',
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = await response.json()
    console.log(data)
    if (response.status == 404) {
      console.log('Error')
    }
    return data
  } catch (error) {
    console.log(error)
  }
}
