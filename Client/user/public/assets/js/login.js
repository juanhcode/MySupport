const email = document.getElementById('email')
const password = document.getElementById('password')
const form = document.querySelector('form')
const message = document.querySelector('.message')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const user = {
    email: email.value,
    password: password.value,
  }
  const newUser = JSON.stringify(user)
  await login(newUser)
})

const login = async (user) => {
  try {
    const response = await fetch('http://localhost:4000/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: user,
    })
    const data = await response.json()
    localStorage.setItem('user', JSON.stringify(data?.data))
    const rol = data.data?.rol
    const { tokenSession } = data
    localStorage.setItem('token', tokenSession)
    if (response.status == 404) {
      message.textContent = data?.error
    }
    if (response.status == 409) {
      message.textContent = data?.error
    }
    if (response.status == 200 && rol == 'administrador') {
      window.location.href = '../../../../../Client/user/public/index.html'
    } else if (response.status == 200 && rol == 'empleado') {
      window.location.href = '../../../../../Client/user/employee/index.html'
    } else if (response.status == 200 && rol == 'supervisor') {
      //window.location.href = '../../../../../Client/user/employee/index.html';
    }
  } catch (error) {
    console.log(error)
  }
}
