const {Router} = require('express');
const router = Router();
const administradorControllers = require('../../controllers/admin.controller');
const checkAuth = require('../../middlewares/auth');

router.get('/get/usuarios', checkAuth,administradorControllers.getUsuariosPorEmpresa);
router.get('/get/tickets', checkAuth,administradorControllers.getTotalTickets);
module.exports = router;

