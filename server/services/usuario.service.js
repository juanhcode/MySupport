const Usuario = require('../database/models/Usuario');
const creationUsuarios = async (newUsuario)=>{
    const UsuarioCreated = await Usuario.createdUsuarios(newUsuario);
    return UsuarioCreated;
}

const getPaginatedUsuarios = async (limite, desde) =>{
    const UsuariosList = await Usuario.readUsuarios(limite, desde);
    return UsuariosList;
}

const updateUsuario = async (updateUsuario) =>{
    const UsuariosList = await Usuario.updatingUsuario(updateUsuario);
    return UsuariosList;
}

const deleteUsuario = async (id) =>{
    const UsuarioDelete = await Usuario.deletingUsuario(id);
    return UsuarioDelete;
}

const loginByEmail = async (email)=>{
    const userLoggedIn = await Usuario.loginByEmail(email);
    return userLoggedIn;
}


module.exports = {
    creationUsuarios,
    loginByEmail,
    getPaginatedUsuarios,
    updateUsuario,
    deleteUsuario
}