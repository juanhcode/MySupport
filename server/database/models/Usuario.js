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
    loginByEmail
    
}