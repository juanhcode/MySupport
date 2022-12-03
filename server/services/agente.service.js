const Agente = require('../database/models/Agente');

const getTickets = async (desde, limite, agente_id)=>{
    const filter = await Agente.getTickets(desde, limite, agente_id);
    return filter;
}

const createComentario = async (ticket_id, comentario)=>{
    const filter = await Agente.postComentario(ticket_id, comentario);
    return filter;
}

const updateEstadoTicket = async (ticket_id)=>{
    const filter = await Agente.modificarEstadoTicket(ticket_id);
    return filter;
}

module.exports = {
    createComentario,
    updateEstadoTicket,
    getTickets
}
