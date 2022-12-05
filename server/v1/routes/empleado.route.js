const {Router} = require('express');
const router = Router();
const multer = require("multer");
const upload = multer({dest: 'uploads/'});
const express = require('express');
const empleadoControllers = require('../../controllers/empleado.controllers');
const checkAuth = require('../../middlewares/auth');

router.get('/get/tickets/', checkAuth,empleadoControllers.listTicketsEmpleado);
router.get('/get/filter/tickets/:estado_id', checkAuth,empleadoControllers.listTicketsFilter);
router.put('/update/ticket/:ticket_id', checkAuth,empleadoControllers.updateTicket);
router.delete('/delete/ticket/:ticket_id', checkAuth,empleadoControllers.deleteTicket);
router.post('/create/ticket',checkAuth,empleadoControllers.creationTickets);
router.post('/saveImage',checkAuth,express.urlencoded({extended:true}),upload.array("files"),empleadoControllers.saveImage);

module.exports = router;
