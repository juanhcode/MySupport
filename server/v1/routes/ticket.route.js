const {Router} = require('express');
const router = Router();
const multer = require("multer");
const upload = multer({dest: 'uploads/'});
const express = require('express');
const ticketController = require('../../controllers/ticket.controller.js');
const checkAuth = require('../../middlewares/auth');

/**
 * @swagger
 * components:
 *  schemas:
 *      Ticket:
 *          type: object
 *          properties:
 *              empleado_id:
 *                  type: integer
 *                  description: El id del empleado
 *              titulo:
 *                  type: string
 *              descripcion:
 *                  type: string
 *              imagenURL:
 *                  type: string
 *              fecha_inicio:
 *                  type: date
 *          required:
 *              - empleado_id
 *              - titulo
 *              - descripcion
 *              - imagenURL
 *              - fecha_inicio
 *          example:
 *              empleado_id: 1
 *              titulo: Tengo problemas con el VScode
 *              descripcion: no me quiere cargar las extensiones del VScode
 *              imagenURL: https://user-images.githubusercontent.com/12737649/79440382-36f55c80-7fd6-11ea-996f-968d6b6a6029.jpg
 *              fecha_inicio: 13/11/2022
 *              estado: false
 *  securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 */



/**
 * @swagger
 * /v1/tickets/open:
 *  get:
 *      summary: Obtiene los tickets que estan abiertos.
 *      tags: [Ticket]
 *      requestBody:
 *        required: false
 *      responses:
 *          200:
 *              description: Listado de tickets abiertos.
 *              content:
 *                  application/json:
 *                      schema:
 *                          example:
 *                              ticket_id: 1
 *                              empleado_id: 1
 *                              agente_id: null
 *                              estado_id: O
 *                              titulo: Tengo problemas con el VScode
 *                              descripcion: no me quiere cargar las extensiones del VScode
 *                              imagenURL: https://user-images.githubusercontent.com/12737649/79440382-36f55c80-7fd6-11ea-996f-968d6b6a6029.jpg
 *                              fecha_inicio: 13-11-2022
 *                              fecha_final: null
 *                              estado: false
 *          202:
 *              description: No hay tickets abiertos.
 *              content:
 *                  application/json:
 *                      schema:
 *                          example:
 *                              message: No tienes casos
 *      security:
 *        - bearerAuth: []
 * 
 */

/**
 * @swagger
 * /v1/tickets/closed:
 *  get:
 *      summary: Obtiene los tickets que estan cerrados.
 *      tags: [Ticket]
 *      requestBody:
 *        required: false
 *      responses:
 *          200:
 *              description: Listado de tickets abiertos.
 *              content:
 *                  application/json:
 *                      schema:
 *                          example:
 *                              ticket_id: 2
 *                              empleado_id: 1
 *                              agente_id: null
 *                              estado_id: C
 *                              titulo: Tengo problemas con el VScode
 *                              descripcion: no me quiere cargar las extensiones del VScode
 *                              imagenURL: https://user-images.githubusercontent.com/12737649/79440382-36f55c80-7fd6-11ea-996f-968d6b6a6029.jpg
 *                              fecha_inicio: 13-11-2022
 *                              fecha_final: null
 *                              estado: false
 *          202:
 *              description: No hay tickets abiertos.
 *              content:
 *                  application/json:
 *                      schema:
 *                          example:
 *                              message: No tienes casos
 *      security:
 *        - bearerAuth: []
 */

/**
 * @swagger
 * /v1/tickets/approved:
 *  get:
 *      summary: Obtiene los tickets que estan aprobados.
 *      tags: [Ticket]
 *      requestBody:
 *        required: false
 *      responses:
 *          200:
 *              description: Listado de tickets abiertos.
 *              content:
 *                  application/json:
 *                      schema:
 *                          example:
 *                              ticket_id: 2
 *                              empleado_id: 1
 *                              agente_id: null
 *                              estado_id: A
 *                              titulo: Tengo problemas con el VScode
 *                              descripcion: no me quiere cargar las extensiones del VScode
 *                              imagenURL: https://user-images.githubusercontent.com/12737649/79440382-36f55c80-7fd6-11ea-996f-968d6b6a6029.jpg
 *                              fecha_inicio: 13-11-2022
 *                              fecha_final: null
 *                              estado: false
 *          202:
 *              description: No hay tickets abiertos.
 *              content:
 *                  application/json:
 *                      schema:
 *                          example:
 *                              message: No tienes casos
 *      security:
 *        - bearerAuth: []
 *  */



/**
 * @swagger
 * /v1/tickets/create:
 *  post:
 *      summary: Crea un Ticket
 *      tags: [Ticket]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Ticket'
 *      responses:
 *          201:
 *              description: Listado de tickets abiertos.
 *              content:
 *                  application/json:
 *                      schema:
 *                          example:
 *                              message: Caso Creado
 *          202:
 *              description: No hay tickets abiertos.
 *              content:
 *                  application/json:
 *                      schema:
 *                          example:
 *                              message: ¡Ups! Algo salió mal
 *      security:
 *        - bearerAuth : []
 */



/**
 * @swagger
 * /v1/tickets/saveImage:
 *  post:
 *      summary: Guarda un archivo relacionado con el ticket.
 *      tags: [Ticket]
 *      requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                fileName:
 *                  type: string
 *                  format: binary
 *      responses:
 *          201:
 *              description: Listado de tickets abiertos.
 *              content:
 *                  application/json:
 *                      schema:
 *                          example:
 *                              message: http://res.cloudinary.com/juanhoyos/image/upload/v1668230320/tickets/p5ybsmykqcuc9j9d6t7o.png
 *          202:
 *              description: No hay tickets abiertos.
 *              content:
 *                  application/json:
 *                      schema:
 *                          example:
 *                              message: ¡Ups! Algo salió mal
 *      security:
 *        - bearerAuth: []
 */
router.get('/open',checkAuth,ticketController.getAllOpenTickets);
router.get('/closed',checkAuth,ticketController.getAllClosedTickets);
router.get('/approved',checkAuth,ticketController.getAllApprovedTickets);
router.post('/create',checkAuth,ticketController.creationTickets);
router.post('/saveImage',checkAuth,express.urlencoded({extended:true}),upload.array("files"),ticketController.saveImage);
module.exports = router;