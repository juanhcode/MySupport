const {Router} = require('express');
const router = Router();
const agenteControllers = require('../../controllers/agente.controller');
const checkAuth = require('../../middlewares/auth');

router.get('/get/tickets', checkAuth, agenteControllers.listTicketsAgente);
router.post('/post/comentario', checkAuth, agenteControllers.postComentario);
router.put('/put/estado/ticket/:ticket_id', checkAuth, agenteControllers.updateEstadoTicket);

module.exports = router;