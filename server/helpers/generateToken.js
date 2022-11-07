const jwt = require('jsonwebtoken');
require('dotenv').config();
const tokenSign = async (user)=>{
    const {empleado_id,rol_id,nombre} = user;
    return jwt.sign(
        {
            _id:empleado_id,
            role:rol_id,
            nombre,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"2h"
        }
    );
}

module.exports = {
    tokenSign
}