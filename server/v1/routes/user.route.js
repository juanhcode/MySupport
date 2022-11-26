const {Router} = require('express');
const router = Router();
const auth = require('../../controllers/auth.controller.js');

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              nombre:
 *                  type: string
 *              apellidos:
 *                  type: string
 *              password:
 *                  type: string
 *              email:
 *                  type: string
 *              rol:
 *                  type: string
 *              estado:
 *                  type: boolean
 *          required:
 *              - id
 *              - nombre
 *              - apellidos
 *              - password
 *              - email
 *              - rol
 *              - estado
 *          example:
 *              id: 3
 *              nombre: Juan Manuel
 *              apellidos: Hoyos Contreras
 *              password: $2a$10$bEqiCtsGDHGUTYfsdfgyIUPcioQedPcvq8TSm29qZDhzknUYq9mfZWMEaz
 *              email: juanhoyos@apple.com
 *              estado: false
 */

//post usuario
/**
 * @swagger
 * /v1/user/post/:
 *  post:
 *      summary: crear usuario
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: Nuevo usuario creado.
 * 
 *      security:
 *             - bearerAuth : []
 */

//get usuario
/**
 * @swagger
 * /v1/user/get/:
 *  get:
 *      summary: retornar todos los usuarios
 *      tags: [User]
 *      responses:
 *          200:
 *              description: todos los usuarios
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *      security:
 *             - bearerAuth : []
 */

//put usuario
/**
 * @swagger
 * /v1/user/put/:id:
 *  put:
 *      summary: actualizar usuario
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: id del usuario
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: usuario actualizado
 *          404:
 *              description: usuario no
 * 
 *      security:
 *             - bearerAuth : []
 */

/**
 * @swagger
 * /v1/user/delete/:id:
 *  delete:
 *      summary: eliminar un usuario
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: id del usuario
 *      responses:
 *          200:
 *              description: usuario eliminado
 *          404:
 *              description: usuario no encontrado
 * 
 *      security:
 *        - bearerAuth : []
 */

/**
 * @swagger
 * /v1/login/:
 *  post:
 *      summary: Iniciar sesión
 *      tags: [User]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                       type: string
 *                      password:
 *                       type: string
 *      responses:
 *          200:
 *              description: Inicio de sesion Exitoso.
 *              content:
 *                  application/json:
 *                      schema:
 *                          example:
 *                              data:
 *                                  id: 3
 *                                  nombre: Juan Manuel
 *                                  apellidos: Hoyos Contreras
 *                                  password: $2a$10$bEqiCtsGDHGUTYfsdfgyIUPcioQedPcvq8TSm29qZDhzknUYq9mfZWMEaz
 *                                  email: juanhoyos@apple.com
 *                                  estado: false
 *                              tokenSession: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiRW1wbGVhZG8iLCJuYW1lIjoiU2ViYXN0aWFuIiwiZW1haWwiOiJzZWJhc0BlY29wZXRyb2wuY29tLmNvIiwiaWF0IjoxNjY4NDA3ODM0LCJleHAiOjE2Njg0MTUwMzR9.LGGEMX7nPhPrcMfdvooc8q4O8rwWHDPYqZka4FAsQEg
 *          404:
 *              description: No hay tickets abiertos.
 *              content:
 *                  application/json:
 *                      schema:
 *                          example:
 *                              error: User not found or Algo ha ocurrido
 *          409:
 *              description: Contraseña invalida
 *              content:
 *                  application/json:
 *                      schema:
 *                          example:
 *                              error: Invalid password
 */
router.post('/',auth);

module.exports = router;