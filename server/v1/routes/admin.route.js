const {Router} = require('express');
const router = Router();
const administradorControllers = require('../../controllers/admin.controller');
const checkAuth = require('../../middlewares/auth');

router.get('/get/usuarios/count', checkAuth,administradorControllers.getUsuariosPorEmpresa);
router.get('/get/tickets', checkAuth,administradorControllers.getTotalTickets);
router.get('/get/empleados', checkAuth,administradorControllers.getEmpleadosPorEmpresa);
router.get('/get/supervisores', checkAuth,administradorControllers.getSupervisorPorEmpresa);
router.get('/get/agentes', checkAuth,administradorControllers.getAgentePorEmpresa);
router.get('/get/ticketsPorEmpresa', checkAuth,administradorControllers.getTotalTicketsPorArea);

module.exports = router;

