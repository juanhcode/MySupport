const pool = require("../db.js");
const {v4:uuidv4} = require('uuid');

let uuid = uuidv4();

const createdUsuarios = async (Usuario) => {
  let queryTwo;
  let query3;
  const { nombre, apellidos, passwordHash, email, rol, estado, area_id,supervisor_id} = Usuario;
  try {
    //Fetch all three queries in sequence
    let queryOne = await pool.query("INSERT INTO USUARIO (ID,nombre,apellidos,password,email,rol,estado) VALUES ($1,$2,$3,$4,$5,$6,$7);",
    [uuid, nombre, apellidos, passwordHash, email, rol, estado]);

    switch (rol) {
        case "agente":
            queryTwo = await pool.query("INSERT INTO AGENTE (ID) VALUES ($1)",[uuid]);
            query3 = await pool.query("INSERT INTO SUPERVISOR_ASIGNA_AGENTE (AGENTE_ID, SUPERVISOR_ID) VALUES ($1,$2)",[uuid, supervisor_id])
            break;
        case "supervisor":
            queryTwo = await pool.query("INSERT INTO SUPERVISOR (ID) VALUES ($1)",[uuid]);
            break;
        case "empleado":
            queryTwo = await pool.query("INSERT INTO EMPLEADO (ID,AREA_ID) VALUES ($1,$2)",[uuid, area_id]);
            break;
        case "administrador":
            console.log("Admin Creado");
            break;
        default:
            console.log("No hay rol por verificar");
            break;
    }

    //Return the responses from the function
    return [queryOne, queryTwo,query3];
  } catch (error) {
    console.log(error.code);
  }
};

const asignarSupervisorAgente = async (supervisor_id) => {
try {
  //Fetch all three queries in sequence
  let queryOne = await pool.query("INSERT INTO SUPERVISOR_ASIGNA_AGENTE (AGENTE_ID, SUPERVISOR_ID)",[uuid, supervisor_id]);

  //Return the responses from the function
  return queryOne;
} catch (error) {
  console.log(error.code);
}
};

const readUsuarios = async (limite, desde) => {
  try {
    const response = await pool.query(
      "SELECT * FROM USUARIO ORDER BY id OFFSET $1 ROWS FETCH FIRST $2 ROW ONLY",
      [desde, limite]
    );
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

const updatingUsuario = async (Usuario) => {
  const { id, nombre, apellidos, passwordHash, email, rol, estado, area_id } = Usuario;
  let empleadoUpdated;
  try {
    const usuarioUpdated = await pool.query(
      `UPDATE USUARIO
             SET nombre = $2,
             apellidos = $3,
             password = $4,
             email = $5,
             rol = $6,
             estado = $7
             WHERE id = $1`,
      [id, nombre, apellidos, passwordHash, email, rol, estado]
    );
    
    if (rol === "empleado") {
      empleadoUpdated = await pool.query(
        `UPDATE EMPLEADO
        SET AREA_ID = $1;`,[area_id]
      )
    }

    return [usuarioUpdated, empleadoUpdated];
  } catch (error) {
    console.log(error);
  }
};

const deletingUsuario = async (id) => {
  try {
    const usuarioDeleted = await pool.query(
      `DELETE FROM USUARIO WHERE id = $1`,
      [id]
    );
    return usuarioDeleted;
  } catch (error) {
    console.log(error);
  }
};

const loginByEmail = async (email) => {
  try {
    const user = await pool.query("SELECT * FROM usuario WHERE email = $1", [
      email,
    ]);
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createdUsuarios,
  loginByEmail,
  readUsuarios,
  updatingUsuario,
  deletingUsuario,
  asignarSupervisorAgente
};
