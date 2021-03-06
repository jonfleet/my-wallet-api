const express = require('express')
const router = express.Router()
const config = require('config')
const {User} = require('../models/user')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

if(!process.env.MY_WALLET_JWTPRIVATEKEY){
    console.error('Fatal Error. jwtPrivateKey is not definded');
    process.exit(1);
}

router.post('/auth', async (req, res) => {

    let user = await User.findOne({username: req.body.username})
    if (!user) return res.status(400).send("User not registered")
    
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(401).send("Invalid Password")

    const token = user.generateAuthToken()
    // const token = jwt.sign({_id: user._id}, config.get("jwtPrivateKey"))

    res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(_.pick(user, ["username"]))
})

module.exports = router