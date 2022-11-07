const Ticket = require('../database/models/Ticket.js');
const getAllTickets = async ()=>{
    const tickets = await Ticket.getAllOpenTickets();
    return tickets;
}

module.exports = {
    getAllTickets,
};