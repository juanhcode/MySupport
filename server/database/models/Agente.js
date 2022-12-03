const pool = require('../db.js');

const getTickets = async (desde, limite, agente_id) => {
    try {
        const query = await pool.query(`SELECT * FROM TICKET WHERE AGENTE_ID = $1 OFFSET $2 ROWS FETCH FIRST $3 ROW ONLY;`,
        [agente_id, desde, limite]);

        return query.rows;
    } catch (error) {
        console.log(error);
    }
}

const postComentario = async (ticket_id, comentario) => {
    try {
        const query = await pool.query(`INSERT INTO COMENTARIO (TICKET_ID, COMENTARIO) VALUES ($1,$2)`, [ticket_id, comentario]);

        return query;
    } catch (error) {
        console.log(error);
    }
}

const modificarEstadoTicket = async (ticket_id) => {
    try {
        const query = await pool.query(`UPDATE TICKET SET ESTADO_ID = 'C' WHERE TICKET_ID = $1`, [ticket_id]);

        return query;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getTickets,
    postComentario,
    modificarEstadoTicket
}