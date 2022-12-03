const agenteService = require("../services/agente.service");
const { getId } = require("../helpers/getDomain");

const listTicketsAgente = async (req, res) => {
  const { authorization } = req.headers;
  const agente_id = await getId(authorization);
  const { limite = 5, desde = 0 } = req.params;

  const result = await agenteService.getTickets(desde, limite, agente_id);

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

const postComentario = async (req, res) => {
    const {ticket_id, comentario} = req.body
  
    const result = await agenteService.createComentario(ticket_id, comentario);
  
    if(!result.rowCount == 1){
        res.status(500).send({
            message:"¡Ups! Algo salió mal"
        });
        return;
    }
    res.status(200).send({
        message:"Comentario creado"
    });
  };

  const updateEstadoTicket = async (req, res) => {
    const {ticket_id} = req.params
  
    const result = await agenteService.updateEstadoTicket(ticket_id);
  
    if(!result.rowCount == 1){
        res.status(500).send({
            message:"¡Ups! Algo salió mal"
        });
        return;
    }
    res.status(200).send({
        message:"Ticket Cerrado"
    });
  };

module.exports = {
    listTicketsAgente,
    postComentario,
    updateEstadoTicket
}
