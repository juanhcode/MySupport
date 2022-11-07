const ticketService = require('../services/ticket.service.js');
const getAllTickets = async (req,res)=>{
    const tickets = await ticketService.getAllTickets();
    res.status(200).send(tickets);
}

module.exports = {
    getAllTickets,
}