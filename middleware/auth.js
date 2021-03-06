const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function login(req, res, next){
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send("Access Denied. No token provided")

    try{
        const decoded = jwt.verify(token , process.env.MY_WALLET_JWTPRIVATEKEY)        
        req.user = decoded;
        next()
    } catch(ex) {
        res.status(400).send('Invalid Token.')
    }
}

