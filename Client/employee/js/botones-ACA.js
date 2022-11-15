const container = document.querySelector(".container-tablas");
console.log(container);

// for (let i = 0; i < 10; i++){
//     container.innerHTML += '<table> <tr class= "borde-superior"> <th> #475689823 <th> Resuelto </th> </th> </tr> <tr> <th>Caso</th> <td>#987643563</td> </tr> <tr> <th>Fecha</th> <td>14/11/2022</td> </tr> <tr> <th>titulo</th> <td>My support</td> </tr> <tr class = "borde-inferior"> <th><a class = "etiquetaA" href="/">Ver caso</a></th> </tr></table>'
// }

const btnAbierto = document.getElementById("btn-abierto");

btnAbierto.addEventListener("click", async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    "https://mysupport-production.up.railway.app/v1/tickets/open",
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "X-Custom-Header": "header value",
      },
    }
  );
  const tickets = await response.json();
  pintarTickets(tickets);
});
const pintarTickets = (tickets) => {
  for (let i = 0; i < tickets.length; i++) {
    const { ticket_id, titulo, descripcion, fecha_inicio } = tickets[i];
    container.innerHTML += `<table> <tr class= "borde-superior"> <th> ${ticket_id} <th> Resuelto </th> </th> </tr> <tr> <th>Titulo</th> <td> ${titulo} </td> </tr> <tr> <th>Fecha</th> <td>${fecha_inicio.split('T')[0]}</td> </tr> <tr> <th>Descripción</th> <td>${descripcion}</td> </tr> <tr class = "borde-inferior"> <th><a class = "etiquetaA" href="/">Ver caso</a></th> </tr></table>`;
  }

  const bordeSuperior = document.querySelectorAll(".borde-superior");
  console.log(bordeSuperior);
  for (let i = 0; i < bordeSuperior.length; i++) {
    bordeSuperior[i].style.borderBottom = "1px solid var(--very-light-pink)";
  }
  const bordeInferior = document.querySelectorAll(".borde-inferior");
  for (let i = 0; i < bordeInferior.length; i++) {
    bordeInferior[i].style.borderTop = "1px solid var(--very-light-pink)";
  }

  const eliminarEtiqueta = document.querySelectorAll(".etiquetaA");
  for (let i = 0; i < eliminarEtiqueta.length; i++) {
    eliminarEtiqueta[i].style.textDecoration = "none";
    eliminarEtiqueta[i].style.color = "var(--black)";
  }
};
