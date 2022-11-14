const pool = require('../db.js');

const getAllOpenTickets = async ()=>{
    try {
        const tickets = await pool.query(`SELECT * FROM TICKET WHERE ESTADO_ID= 'O'`);
        return tickets.rows;
    } catch (error) {
        console.log(error);
    }
}


const getAllClosedTickets = async ()=>{
    try {
        const tickets = await pool.query(`SELECT * FROM TICKET WHERE ESTADO_ID= 'C'`);
        return tickets.rows;
    } catch (error) {
        console.log(error);
    }
}

const getAllApprovedTickets = async ()=>{
    try {
        const tickets = await pool.query(`SELECT * FROM TICKET WHERE ESTADO_ID= 'A'`);
        return tickets.rows;
    } catch (error) {
        console.log(error);
    }
}


const creationTickets = async (Ticket)=>{
    const {ticket_id,empleado_id,titulo,descripcion,imagenURL,fecha_inicio,estado} = Ticket;
    //TODO: Decir que el id del Ticket es un uuid y el empleado ID se manda por el body del payload del frontend o modificar en la tabla para que sea autoincrementable
    try{
        const ticketCreated = await pool.query(`INSERT INTO TICKET (TICKET_ID,EMPLEADO_ID,titulo,descripcion,imagenURL,fecha_inicio,estado) VALUES ($1,$2,$3,$4,$5,$6,$7)`,[
            ticket_id,
            empleado_id,
            titulo,
            descripcion,
            imagenURL,
            fecha_inicio,
            estado
        ]);
        return ticketCreated;
    }catch (error){
        console.log(error);
    }
}



module.exports = {
    getAllOpenTickets,
    getAllClosedTickets,
    getAllApprovedTickets,
    creationTickets
};