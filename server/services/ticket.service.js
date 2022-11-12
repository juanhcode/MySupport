const Ticket = require('../database/models/Ticket.js');
const getAllOpenTickets = async ()=>{
    const tickets = await Ticket.getAllOpenTickets();
    return tickets;
}

const getAllClosedTickets = async ()=>{
    const tickets = await Ticket.getAllClosedTickets();
    return tickets;
}

const getAllApprovedTickets = async ()=>{
    const tickets = await Ticket.getAllApprovedTickets();
    return tickets;
}

const creationTickets = async (newTicket)=>{
    console.log("Service Ticket" + newTicket);
    const TicketCreated = await Ticket.creationTickets(newTicket);
    return TicketCreated;
}

module.exports = {
    getAllOpenTickets,
    getAllClosedTickets,
    getAllApprovedTickets,
    creationTickets
};