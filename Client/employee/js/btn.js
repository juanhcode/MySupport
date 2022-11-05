 const API_URL = "https://mocki.io/v1/1230ff03-b527-49e2-b70d-2162b2d961f4";

// const HTMLResponse = document.query("#username", "#password");

fetch(API_URL)
  .then((response) => response.json())
.then((data) => console.log(data))


// const xml = new XMLHttpRequest();

// function onRequestHandler(){
//   if(this.readyState == 4 && this.status == 200){
//     const data = JSON.parse(this.response);
//     const HTMLResponse = document.querySelector("#app");

//     const tpl = data.map((user) => '<li>${user.name} correo:${user.email}</li>');
//     HTMLResponse.innerHTML = '<ul>${tpl}</ul>'
//   }
// }
// xhr.addEventListener('load', onRequestHandler);
// xhr.open('GET', '${API_URL}/users');
// xhr.send();



// const username = document.getElementById('username')
// const password = document.getElementById('password')
// const button = document.getElementById("button")

// button.addEventListener('click', (e) => {
//   e.preventDefault()
//   const data = {
//     username: username.value,
//     password: password.value
//   }
//   console.log(data)
)
