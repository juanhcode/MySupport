const supervisorService = require("../services/supervisor.service");
const {getDomain, getId} = require ("../helpers/getDomain");

const listTicketsSinAgente = async (req, res) => {
  const { authorization } = req.headers;
  const domain = await getDomain(authorization);
  const { limite = 5, desde = 0 } = req.query;

  const result = await supervisorService.getTicketsSinAgente(limite, desde, domain);

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

const postTicketAgente = async (req, res) => {
    const {ticket_id} = req.params;
    const {agente_id} = req.body;
  
    const result = await supervisorService.asignarTicketAgente(agente_id, ticket_id);
  
    if(!result.rowCount == 1){
        res.status(500).send({
            message:"¡Ups! Algo salió mal"
        });
        return;
    }
    res.status(200).send({
        message:"Agente Asignado"
    });
}

const listTicketsConAgente = async (req, res) => {
    const { authorization } = req.headers;
    const domain = await getDomain(authorization);
    const { email } = req.body;
  
    const result = await supervisorService.cantidadTicketsConAgente(domain, email);
  
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

  const listSupervisoresConAgente = async (req, res) => {
    const { authorization } = req.headers;
    const supervisor_id = await getId(authorization);
    const { limite = 5, desde = 0 } = req.params;
    console.log(supervisor_id + "----------------------------------------------");
    const result = await supervisorService.getSupervisores_Agentes(supervisor_id, desde, limite);
  
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

module.exports = {
    listTicketsConAgente,
    listTicketsSinAgente,
    postTicketAgente,
    listSupervisoresConAgente
  };