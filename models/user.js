const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = mongoose.Schema({
    username: String,
    password: String
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, username: this.username}, config.get("jwtPrivateKey"))
    return token
}   

const User = mongoose.model('User', userSchema)

exports.User = User