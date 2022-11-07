const {Router} = require('express');
const router = Router();
const ticketController = require('../../controllers/ticket.controller.js');

router.get('/',ticketController.getAllTickets);


module.exports = router;