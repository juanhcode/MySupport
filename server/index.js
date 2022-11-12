const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const ticketsRouter = require('./v1/routes/ticket.route.js');
const login = require('./v1/routes/user.route');
const usuarios = require('./v1/routes/usuarios.route');
//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use('/v1/tickets',ticketsRouter);
app.use('/v1/login', login);
app.use('/v1/user', usuarios);




app.listen(process.env.PORT || 3000,()=>{
    console.log("Servidor prendido en el puerto " + process.env.PORT);
})