const {Router} = require('express');
const router = Router();
const supervisorControllers = require('../../controllers/supervisor.controller');
const checkAuth = require('../../middlewares/auth');

router.get('/get/tickets/agente', checkAuth,supervisorControllers.listTicketsConAgente);
router.get('/get/tickets/sinagente', checkAuth,supervisorControllers.listTicketsSinAgente);
router.get('/get/tickets/supervisorxagente', checkAuth,supervisorControllers.listSupervisoresConAgente);
router.put('/post/tickets/asignar/:ticket_id', checkAuth,supervisorControllers.postTicketAgente);

module.exports = router;
