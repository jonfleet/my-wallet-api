const express = require('express')
const router = express.Router()
const cors = require('cors')
const {User} = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.options('/auth', cors())

router.post('/auth', cors(), async (req, res) => {

    let user = await User.findOne({username: req.body.username})
    if (!user) return res.status(400).send("Invalid Email or Password")
    
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send("Invalid Password: Access Denied")

    const token = jwt.sign({_id: user._id}, "jwtPrivateKey")

    res.send(token)
})

module.exports = router