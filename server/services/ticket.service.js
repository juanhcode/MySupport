const Ticket = require('../database/models/Ticket.js');
const getAllTickets = async ()=>{
    const tickets = await Ticket.getAllTickets();
    return tickets;
}

module.exports = {
    getAllTickets,
};