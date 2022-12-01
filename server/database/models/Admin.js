const pool = require('../db.js');

const getAllUsers = async (dominio) => {
    try {
        const usuariosPorEmpresa = await pool.query(`SELECT count(*) FROM USUARIO WHERE email like '%'||$1||'%' `, [dominio]);
        return usuariosPorEmpresa.rows; 
    } catch (error) {
        console.log(error);
    }
}

const getTicketsPorEmpresa = async (dominio) => {

    try {
        const totalTickets = await pool.query(`SELECT COUNT(*) FROM TICKET WHERE empresa like '%'||$1||'%';`, [dominio])
        return totalTickets.rows;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllUsers,
    getTicketsPorEmpresa
}