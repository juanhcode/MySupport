const {tokenSign} = require('../helpers/generateToken.js');
const pool = require('../database/db.js');
const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email){
            res.status(404)
            res.send({ error: 'User not found' })
        }
        const user = await pool.query('SELECT * FROM empleado WHERE email = $1 and password = $2',[email,password]);
        const tokenSession = await tokenSign(user.rows[0]);
        res.send({
            data:user.rows,
            tokenSession
        });
    }catch(e){
        console.log(e);
    }
}

const register = async (req, res) => {
    try{

    }catch(error){

    }
}

module.exports = login;