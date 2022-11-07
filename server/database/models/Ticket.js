const pool = require('../db.js');

const getAllTickets = async ()=>{
    try {
        const tickets = await pool.query('SELECT * FROM TICKET');
        return tickets.rows;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllTickets,
};