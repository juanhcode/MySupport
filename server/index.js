const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const ticketsRouter = require('./v1/routes/ticket.route.js');
const login = require('./v1/routes/user.route');
const usuarios = require('./v1/routes/usuarios.route');
const administrador = require('./v1/routes/admin.route');
const empresa = require('./v1/routes/empresa.route');
const supervisor = require('./v1/routes/supervisor.route')
const path = require("path");
//Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerSpec = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"MySupport API",
            version:"1.0.0"
        },
        servers:[
            {
                url:'https://mysupport-production.up.railway.app/'
            }
        ],
    },
    apis: [`${path.join(__dirname,"./v1/routes/*.js")}`]
}

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/v1/doc",swaggerUI.serve,swaggerUI.setup(swaggerJsDoc(swaggerSpec)));
app.use('/v1/tickets',ticketsRouter);
app.use('/v1/login', login);
app.use('/v1/user', usuarios);
app.use('/v1/admin', administrador);
app.use('/v1/empresa', empresa);
app.use('/v1/supervisor', supervisor);




app.listen(process.env.PORT || 3000,()=>{
    console.log("Servidor prendido en el puerto " + process.env.PORT);
})