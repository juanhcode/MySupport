const titulo = document.getElementById("titulo-ticket");
const date = document.getElementById("date");
const descripcion = document.getElementById("msg");
const archivo = document.getElementById("files");
const formulario = document.querySelector("form");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  const crearTicket = {
    empleado_id: 1,
    titulo: titulo.value,
    descripcion: descripcion.value,
    imagenURL: "https://user-images.githubusercontent.com/12737649/79440382-36f55c80-7fd6-11ea-996f-968d6b6a6029.jpg",
    fecha_inicio: "13/11/2022",
    estado: false,
  };
  const crearTicketJson = JSON.stringify(crearTicket);

  const formulario = async () => {
    const data = new FormData();
    console.log(archivo);

    data.append("files", archivo.files);
    console.log(data)
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://mysupport-production.up.railway.app/v1/tickets/saveImage",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: data,
        }
      );
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };
  formulario();
});
