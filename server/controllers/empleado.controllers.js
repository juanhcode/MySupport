const empleadoService = require("../services/empleado.service");
const cloudinary = require("../helpers/configCloudinary");
const {getId} = require ("../helpers/getDomain");

//Subir archivos a cloudinary
const saveImage = async (req, res) => {
  //TODO: validar que el file no este vacio y responder con un 400 y su mensaje
  const result = await cloudinary.v2.uploader.upload(req.files[0].path, {
    folder: "tickets",
  });
  res.status(201).send({ message: result.url });
};
//Creacion de tickets
const creationTickets = async (req, res) => {
  const { authorization } = req.headers;
  const empleado_id = await getId(authorization);
  const {
    estado_id,
    titulo,
    descripcion,
    imagenURL,
    fecha_inicio,
    fecha_final,
    estado_borrado,
    empresa,
  } = req.body;
  //TODO:validar que los campos no sean vacios y si lo son responder con un mensaje de error o algo asi xd
  const Ticket = {
    empleado_id,
    estado_id,
    titulo,
    descripcion,
    imagenURL,
    fecha_inicio,
    fecha_final,
    estado_borrado,
    empresa,
  };
  const tickets = await empleadoService.creationTickets(Ticket);
  if (tickets) {
    if (tickets.rowCount == 1) {
      res.status(201).send({
        message: "Caso Creado",
      });
      return;
    }
  } else {
    res.status(202).send({
      message: "¡Ups! Algo salió mal",
    });
  }
};

const listTicketsEmpleado = async (req, res) => {
  const { authorization } = req.headers;
  const empleado_id = await getId(authorization);
  const { limite = 5, desde = 0 } = req.params;

  const result = await empleadoService.listTicketsEmpleados(desde, limite, empleado_id);

  if (result === null) {
    res.status(404).send({
      message: "No hay registros en la DB",
    });
    return;
  }
  res.status(200).send({
    result,
  });
};

const listTicketsFilter = async (req, res) => {
  const { authorization } = req.headers;
  const empleado_id = await getId(authorization);
  const { limite = 5, desde = 0 } = req.params;
  const { estado_id } = req.body;

  const result = await empleadoService.filterTicketsEmpleados(desde, limite, empleado_id, estado_id);

  if (result === null) {
    res.status(404).send({
      message: "No hay registros en la DB",
    });
    return;
  }
  res.status(200).send({
    result,
  });
};

const updateTicket = async (req, res) => {
  const { ticket_id } = req.params;
  const { titulo, descripcion, imagenURL } = req.body;
  const Ticket = {
    ticket_id,
    titulo,
    descripcion,
    imagenURL,
  };
  //TODO:validar de que si llega algun campo vacio responder con un status diferente y enviar ¡Ups! Algo salió mal
  const ticketUpdated = await empleadoService.updateTickets(Ticket);
  if (!ticketUpdated.rowCount == 1) {
    res.status(500).send({
      message: "¡Ups! Algo salió mal",
    });
    return;
  }
  res.status(200).send({
    message: "Ticket Actualizado",
  });
};

const deleteTicket = async (req,res)=>{
    const {ticket_id} = req.params;
    const ticketDeleted = await empleadoService.eliminarTicket(ticket_id);
    if(!ticketDeleted.rowCount == 1){
        res.status(500).send({
            message:"¡Ups! Algo salió mal",
        });
        return;
    }
    res.status(200).send({
        message: `Ticket ${ticket_id} eliminado satisfactoriamente`,
    });
}

module.exports = {
  creationTickets,
  saveImage,
  listTicketsEmpleado,
  listTicketsFilter,
  updateTicket,
  deleteTicket
};
