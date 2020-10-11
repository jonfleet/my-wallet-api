const mongoose = require("mongoose")


module.exports = function () {
    mongoose.connect('mongodb://localhost/my-wallet' , {useNewUrlParser: true})
.then( () => console.log("Connected to Database"))
.catch( (er) => console.log("Connection Error: " + er))
} 
