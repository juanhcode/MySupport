const boton  = document.getElementById("btn_acceder");
const password = document.getElementById("password");
const email = document.getElementById("email");
// console.log(password);
// console.log(email);
boton.addEventListener("click", function(e) {
  e.preventDefault();
  const user = {
    email: email.value,
    password: password.value
  }
  const userJson = JSON.stringify(user);
  console.log(userJson);

  const login = async()=> {
    try {
      const response = await fetch("http://localhost:4000/v1/login", {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: userJson
      }); 
      const data = await response.json();
      const {tokenSession } = data
      console.log(tokenSession)
      localStorage.setItem("token", tokenSession)
      /*
      if(response.status == 200){
        window.location.href = "menu_Principal.html"
      }*/
    } catch (error) {
      console.log(error);
    }
  }
  login();
})


