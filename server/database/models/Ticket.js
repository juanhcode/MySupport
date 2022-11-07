const pool = require('../db.js');

const getAllOpenTickets = async ()=>{
    try {
        const tickets = await pool.query(`SELECT * FROM TICKET WHERE estadoDelTicket = 'O'`);
        return tickets.rows;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllOpenTickets,
};