const {verifyToken} = require('../helpers/generateToken');
const checkAuth = async (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
        if(tokenData.email){
            next()
        }else{
            res.status(409);
            res.send({error:"Unauthorized"});
        }
    } catch (error) {
        res.status(409);
        res.send({error:"Unauthorized"})
    }
}

module.exports = checkAuth