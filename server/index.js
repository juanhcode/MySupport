const express = require('express');
const app = express();
require('dotenv').config();

//Middlewares
app.use(express.json());





app.listen(process.env.PORT || 3000,()=>{
    console.log("Servidor prendido en el puerto " + process.env.PORT);
})