const pool = require('../db.js');
const createdUsuarios = async (Usuario)=>{
    const {id,nombre,apellidos,passwordHash,email,rol,estado} = Usuario;
    try{
        const usuarioCreated = await pool.query(`INSERT INTO USUARIO (ID,nombre,apellidos,password,email,rol,estado) VALUES ($1,$2,$3,$4,$5,$6,$7)`,[
            id,
            nombre,
            apellidos,
            passwordHash,
            email,
            rol,
            estado
        ]);
        return usuarioCreated;
    }catch (error){
        console.log(error);
    }
}

const readUsuarios = async (limite, desde) => {
    try {
        const response = await pool.query('SELECT * FROM USUARIO ORDER BY id OFFSET $1 ROWS FETCH FIRST $2 ROW ONLY', [desde, limite]);
        return response.rows;
    } catch (error) {
        console.log(error);
    }
}

const updatingUsuario = async (Usuario)=>{
    const {id,nombre,apellidos,passwordHash,email,rol,estado} = Usuario;
    try{
        const usuarioUpdated = await pool.query(
            `UPDATE USUARIO
             SET nombre = $2,
             apellidos = $3,
             password = $4,
             email = $5,
             rol = $6,
             estado = $7
             WHERE id = $1`,
        [
            id,
            nombre,
            apellidos,
            passwordHash,
            email,
            rol,
            estado
        ]);
        return usuarioUpdated;
    }catch (error){
        console.log(error);
    }
}

const deletingUsuario = async (id)=>{
    try{
        const usuarioDeleted = await pool.query(`DELETE FROM USUARIO WHERE id = $1`,[id]);
        return usuarioDeleted;
    }catch (error){
        console.log(error);
    }
}


const loginByEmail = async (email) =>{
    try{
        const user = await pool.query('SELECT * FROM usuario WHERE email = $1',[email]);
        return user;
    }catch(error){
        return error;
    }
}

module.exports = {
    createdUsuarios,
    loginByEmail,
    readUsuarios,
    updatingUsuario,
    deletingUsuario
}