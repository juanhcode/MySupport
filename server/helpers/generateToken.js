const jwt = require('jsonwebtoken');
require('dotenv').config();
const tokenSign = async (user)=>{
    const {nombre,email,rol} = user;
    return jwt.sign(
        {
            role:rol,
            name:nombre,
            email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"2h"
        }
    );
}


const verifyToken = async (token) => {
    try {
        return jwt.verify(token,process.env.JWT_SECRET);
    } catch (e) {
        return null;
    }
}

const decodeSign = (token)=>{
    return jwt.decode(token,null);
}

module.exports = {
    tokenSign,
    verifyToken,
    decodeSign
}