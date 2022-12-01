const bcrypt = require('bcryptjs');

//TODO: Encriptacion
const encrypt = async (texto)=>{
    const hash = await bcrypt.hash(texto,10);
    return hash;
}

//Todo: Comparamos!!
const compare = async (newPassword,hashPassword)=>{
    return await bcrypt.compare(newPassword,hashPassword);
}

module.exports = {encrypt, compare}