const usuarioService = require('../services/usuario.service');
const {encrypt} = require('../helpers/configBcrypt');
const creationUsuarios = async (req,res)=>{
    const {id,nombre,apellidos,password,email,rol,estado} = req.body;
    const passwordHash =  await encrypt(password);
    const Usuario = {
        id,
        nombre,
        apellidos,
        passwordHash,
        email,
        rol,
        estado
    }
    //TODO:validar de que si llega algun campo vacio responder con un status diferente y enviar ¡Ups! Algo salió mal
    const usuarioCreated = await usuarioService.creationUsuarios(Usuario);
    if(!usuarioCreated.rowCount == 1){
        res.status(200).send({
            message:"¡Ups! Algo salió mal",
        });
        return;
    }
    res.status(200).send({
        message:"Usuario Creado",
    });
}

module.exports = {
    creationUsuarios,
}