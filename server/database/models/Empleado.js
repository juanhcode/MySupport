const pool = require('../db.js');
const {v4:uuidv4} = require('uuid');

const getTicketsEmpleado = async (desde, limite, id) => {
    try {
        const query = await pool.query(`SELECT * FROM TICKET WHERE EMPLEADO_ID = $1 ORDER BY TICKET_ID OFFSET $2 ROWS FETCH FIRST $3 ROW ONLY;`,
        [id, desde, limite]);

        return query.rows;
    } catch (error) {
        console.log(error);
    }
}

const filtrarTickets = async (desde, limite, id, estado_id) => {
    try {
        const query = await pool.query(`SELECT * FROM TICKET WHERE EMPLEADO_ID = $1 AND ESTADO_ID = $2 ORDER BY TICKET_ID OFFSET $3 ROWS FETCH FIRST $4 ROW ONLY;`,
        [id, estado_id, desde, limite]);

        return query.rows;
    } catch (error) {
        console.log(error);
    }
}


const creationTickets = async (Ticket)=>{
    const {empleado_id, estado_id, titulo,descripcion,imagenURL,fecha_inicio, fecha_final, estado_borrado, empresa} = Ticket;
    //TODO: Decir que el id del Ticket es un uuid y el empleado ID se manda por el body del payload del frontend o modificar en la tabla para que sea autoincrementable
    try{
        const ticketCreated = await pool.query(`
        INSERT INTO TICKET 
        (TICKET_ID,EMPLEADO_ID, ESTADO_ID, titulo, descripcion, imagenURL, fecha_inicio, fecha_final, estado_borrado, empresa) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);`,
        [
            uuidv4(),
            empleado_id,
            estado_id,
            titulo,
            descripcion,
            imagenURL,
            fecha_inicio,
            fecha_final,
            estado_borrado,
            empresa
        ]);
        return ticketCreated;
    }catch (error){
        console.log(error);
    }
}

const updateTickets = async (Ticket)=>{
    const {titulo,descripcion,imagenURL, ticket_id} = Ticket;
    try{
        const ticketCreated = await pool.query(`
        UPDATE TICKET SET TITULO = $1, DESCRIPCION = $2, IMAGENURL = $3 WHERE ESTADO_ID = 'O' AND TICKET_ID = $4`,
        [
            titulo,
            descripcion,
            imagenURL,
            ticket_id
        ]);
        return ticketCreated;
    }catch (error){
        console.log(error);
    }
}

const eliminarTicket = async (ticket_id)=>{
    try{
        const ticketCreated = await pool.query(`
        DELETE FROM TICKET WHERE ESTADO_ID = 'O' AND TICKET_ID = $1`,
        [
            ticket_id
        ]);
        return ticketCreated;
    }catch (error){
        console.log(error);
    }
}

module.exports = {
    getTicketsEmpleado,
    filtrarTickets,
    creationTickets,
    eliminarTicket,
    updateTickets
};