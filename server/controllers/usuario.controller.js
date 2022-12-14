const usuarioService = require('../services/usuario.service');
const {encrypt} = require('../helpers/configBcrypt');

const creationUsuarios = async (req,res)=>{
    const {nombre,apellidos,password,email,rol,estado, area_id,supervisor_id} = req.body;
    const passwordHash =  await encrypt(password);
    const Usuario = {
        nombre,
        apellidos,
        passwordHash,
        email,
        rol,
        estado,
        area_id,
        supervisor_id
    }
    //TODO:validar de que si llega algun campo vacio responder con un status diferente y enviar ¡Ups! Algo salió mal
    const usuarioCreated = await usuarioService.creationUsuarios(Usuario);
    if(!usuarioCreated.rowCount == 2 || !usuarioCreated.rowCount == 3 || !usuarioCreated.rowCount == 1 || usuarioCreated.rowCount == undefined){
        res.status(500).send({
            message:"¡Ups! Algo salió mal"
        });
        return;
    }
    res.status(201).send({
        message:"Usuario Creado",
    });
}

const usuariosGet = async (req, res) => {
    //Recibiendo un query en la url
    //Ejemplo de URL: http://localhost:8080/api/users?apellido1=cifuentes&apellido2=florez
    const { limite = 5, desde = 0 } = req.query;

    const paginatedQuery = await usuarioService.getPaginatedUsuarios(limite, desde);

    res.json({
      paginatedQuery
    });
  };

const updateUsuarios = async (req,res)=>{
    const {id} = req.params;
    const {nombre,apellidos,password,email,rol,estado, area_id} = req.body;
    const passwordHash =  await encrypt(password);
    const Usuario = {
        id,
        nombre,
        apellidos,
        passwordHash,
        email,
        rol,
        estado,
        area_id
    }
    //TODO:validar de que si llega algun campo vacio responder con un status diferente y enviar ¡Ups! Algo salió mal
    const usuarioUpdated = await usuarioService.updateUsuario(Usuario);
    if(!usuarioUpdated.rowCount == 2){
        res.status(500).send({
            message:"¡Ups! Algo salió mal",
        });
        return;
    }
    res.status(200).send({
        message:"Usuario Actualizado",
    });
}

const deleteUsuario = async (req,res)=>{
    const {id} = req.params;
    console.log(id);
    const usuarioDeleted = await usuarioService.deleteUsuario(id);
    if(!usuarioDeleted.rowCount == 1){
        res.status(500).send({
            message:"¡Ups! Algo salió mal",
        });
        return;
    }
    res.status(200).send({
        message: `Usuario ${id} eliminado satisfactoriamente`,
    });
}

const postAsignarAgenteSupervisor = async (req,res)=>{
    const {supervisor_id} = req.body;
    //TODO:validar de que si llega algun campo vacio responder con un status diferente y enviar ¡Ups! Algo salió mal
    const asignacion = await usuarioService.postAsignaSupervisor(supervisor_id);
    if(!asignacion.rowCount == 1){
        res.status(500).send({
            message:"¡Ups! Algo salió mal",
        });
        return;
    }
    res.status(200).send({
        message: `Supervisor ${supervisor_id} asignado satisfactoriamente`,
    });
}


module.exports = {
    creationUsuarios,
    usuariosGet,
    updateUsuarios,
    deleteUsuario,
    postAsignarAgenteSupervisor
}