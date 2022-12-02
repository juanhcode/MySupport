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

const getEmpleadosPorEmpresa = async (dominio) => {

    try {
        const selectEmpleadosPorEmpresa = await pool.query(`
        SELECT * FROM USUARIO WHERE email like '%'||$1||'%' and rol = 'empleado';`, [dominio])
        return selectEmpleadosPorEmpresa.rows;
    } catch (error) {
        console.log(error);
    }
}

const getSupervisorPorEmpresa = async (dominio) => {

    try {
        const selectSupervisorPorEmpresa = await pool.query(`
        SELECT * FROM USUARIO WHERE email like '%'||$1||'%' and rol = 'supervisor';`, [dominio])
        return selectSupervisorPorEmpresa.rows;
    } catch (error) {
        console.log(error);
    }
}

const getAgentePorEmpresa = async (dominio) => {

    try {
        const selectAgentePorEmpresa = await pool.query(`
        SELECT * FROM USUARIO WHERE email like '%'||$1||'%' and rol = 'agente';`, [dominio])
        return selectAgentePorEmpresa.rows;
    } catch (error) {
        console.log(error);
    }
}

const getTicketsPorArea = async (area) => {

    try {
        const selectTicketsPorArea = await pool.query(`
        SELECT T.TITULO, T.DESCRIPCION FROM TICKET T INNER JOIN EMPLEADO E ON T.EMPLEADO_ID = E.ID
        INNER JOIN AREA A ON E.AREA_ID = A.AREA_ID WHERE A.nombre = $1;`, [area])
        return selectTicketsPorArea.rows;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllUsers,
    getTicketsPorEmpresa,
    getEmpleadosPorEmpresa,
    getSupervisorPorEmpresa,
    getAgentePorEmpresa,
    getTicketsPorArea
}