const pool = require("../db.js");

const getAgenteSupervisor = async (supervisor_id, desde, limite) => {
    try {
      const query = await pool.query(
        `
        SELECT U.NOMBRE, U.APELLIDOS, U.EMAIL FROM USUARIO U INNER JOIN AGENTE A ON U.ID = A.ID 
        INNER JOIN SUPERVISOR_ASIGNA_AGENTE SAA ON A.ID = SAA.AGENTE_ID WHERE SUPERVISOR_ID = $1 
        OFFSET $2 ROWS FETCH FIRST $3 ROW ONLY;
          `,
        [supervisor_id, desde, limite]
      );
      return query.rows;
    } catch (error) {
      console.log(error);
    }
  };

const getTicketsPorEmpresa = async (limite, desde, dominio) => {
  try {
    const totalTickets = await pool.query(
      `
        SELECT * FROM TICKET WHERE empresa like '%'||$1||'%' AND AGENTE_ID IS NULL OFFSET $2 ROWS FETCH FIRST $3 ROW ONLY;`,
      [dominio, desde, limite]
    );
    return totalTickets.rows;
  } catch (error) {
    console.log(error);
  }
};

const asignarTicketAgente = async (agente_id, ticket_id) => {
  try {
    const query1 = await pool.query(
      `UPDATE TICKET SET AGENTE_ID = $1, ESTADO_ID = 'A' WHERE TICKET_ID = $2;`,
      [agente_id, ticket_id]
    );

    return query1;
  } catch (error) {
    console.log(error);
  }
};

const cantidadDeTicketsConAgente = async (dominio, email) => {
  try {
    const query1 = await pool.query(
      `
        SELECT COUNT(*) AS CantidadTickets, U.NOMBRE, U.APELLIDOS, U.EMAIL 
        FROM TICKET T INNER JOIN SUPERVISOR_ASIGNA_AGENTE SAA ON T.AGENTE_ID = SAA.AGENTE_ID INNER JOIN USUARIO U ON U.ID = SAA.AGENTE_ID
        WHERE T.EMPRESA LIKE '%'||$1||'%' AND U.EMAIL = $2
        GROUP BY U.NOMBRE, U.APELLIDOS, U.EMAIL;`,
      [dominio, email]
    );

    return query1.rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getTicketsPorEmpresa,
  asignarTicketAgente,
  cantidadDeTicketsConAgente,
  getAgenteSupervisor
};
