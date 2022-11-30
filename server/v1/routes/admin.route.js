const {Router} = require('express');
const router = Router();
const administradorControllers = require('../../controllers/admin.controller');
const checkAuth = require('../../middlewares/auth');

router.get('/get', checkAuth,administradorControllers.getUsuariosPorEmpresa);
module.exports = router;

