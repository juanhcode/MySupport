const Usuario = require('../database/models/Usuario');
const creationUsuarios = async (newUsuario)=>{
    const UsuarioCreated = await Usuario.createdUsuarios(newUsuario);
    return UsuarioCreated;
}

const loginByEmail = async (email)=>{
    const userLoggedIn = await Usuario.loginByEmail(email);
    return userLoggedIn;
}


module.exports = {
    creationUsuarios,
    loginByEmail
}