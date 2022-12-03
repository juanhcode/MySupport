const Empleado = require('../database/models/Empleado.js');

const creationTickets = async (newTicket)=>{
    const filter = await Empleado.creationTickets(newTicket);
    return filter;
}

const listTicketsEmpleados = async (desde, limite, id)=>{
    const filter = await Empleado.getTicketsEmpleado(desde, limite, id);
    return filter;
}

const filterTicketsEmpleados = async (desde, limite, id, estado_id)=>{
    const filter = await Empleado.filtrarTickets(desde, limite, id, estado_id);
    return filter;
}

const updateTickets = async (newTicket)=>{
    const filter = await Empleado.updateTickets(newTicket);
    return filter;
}

const eliminarTicket = async (ticket_id)=>{
    const filter = await Empleado.eliminarTicket(ticket_id);
    return filter;
}

module.exports = {
    creationTickets,
    listTicketsEmpleados,
    filterTicketsEmpleados,
    updateTickets,
    eliminarTicket
};