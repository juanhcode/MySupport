const {tokenSign} = require('../helpers/generateToken.js');
const {compare} = require('../helpers/configBcrypt');
const usuarioService = require('../services/usuario.service');
//login de MySupport
const login = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await usuarioService.loginByEmail(email);
        if(user.rowCount == 0){
            res.status(404)
            res.send({ error: 'User not found' });
            return;
        }
        const checkPassword = await compare(password,user.rows[0].password);
        const tokenSession = await tokenSign(user.rows[0]);
        if(checkPassword){
            res.status(200).send({
                data:user.rows[0],
                tokenSession
            });
            return;
        }
        if(!checkPassword){
            res.status(409);
            res.send({
                error: 'Invalid password'
            });
            return;
        }
    }catch(err){
        res.status(404)
        res.send({ error: 'Algo ha ocurrido' });
    }
}

module.exports = login;