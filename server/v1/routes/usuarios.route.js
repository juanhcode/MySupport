const {Router} = require('express');
const router = Router();
const {createValidator} = require('express-joi-validation');
const  {post_put_UsuarioSchema, usuarioParamSchema} = require('../../schemas/schemas');
const usuariosControllers = require('../../controllers/usuario.controller');
const validator = createValidator();

router.post('/create', validator.body(post_put_UsuarioSchema) ,usuariosControllers.creationUsuarios);
router.get('/get',usuariosControllers.usuariosGet);
router.put('/update/:id', validator.body(post_put_UsuarioSchema), validator.params(usuarioParamSchema) ,usuariosControllers.updateUsuarios);
router.delete('/delete/:id', validator.params(usuarioParamSchema), usuariosControllers.deleteUsuario);
router.post('/asignar/supervisor', usuariosControllers.postAsignarAgenteSupervisor);

module.exports = router;