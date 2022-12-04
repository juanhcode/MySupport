const Supervisor = require('../database/models/Supervisor');

const getTicketsSinAgente = async (limite, desde, dominio)=>{
    const filter = await Supervisor.getTicketsPorEmpresa(limite, desde, dominio);
    return filter;
}

const asignarTicketAgente = async (agente_id, ticket_id)=>{
    const filter = await Supervisor.asignarTicketAgente(agente_id, ticket_id);
    return filter;
}

const cantidadTicketsConAgente = async (dominio, email)=>{
    const filter = await Supervisor.cantidadDeTicketsConAgente(dominio, email);
    return filter;
}

const getSupervisores_Agentes = async (supervisor_id, desde, limite)=>{
    const filter = await Supervisor.getAgenteSupervisor(supervisor_id, desde, limite);
    return filter;
}

module.exports = {
    getTicketsSinAgente,
    asignarTicketAgente,
    cantidadTicketsConAgente,
    getSupervisores_Agentes
}