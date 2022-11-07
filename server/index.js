const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
const ticketsRouter = require('./v1/routes/ticket.route.js');
const login = require('./controllers/auth.controller.js');
//Middlewares
app.use(express.json());
app.use(morgan("dev"));

app.use('/v1/tickets',ticketsRouter);
app.use('/v1/login', login);



app.listen(process.env.PORT || 3000,()=>{
    console.log("Servidor prendido en el puerto " + process.env.PORT);
})