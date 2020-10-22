const mongoose = require("mongoose")
const config = require('config')


module.exports = function () {
    mongoose.connect(config.get('db') , {useNewUrlParser: true})
.then( () => console.log("Connected to Database"))
.catch( (er) => console.log("Connection Error: " + er))
} 


// module.exports = function () {
//     mongoose.connect(config.get('db') , {useNewUrlParser: true})
// .then( () => console.log("Connected to Database"))
// .catch( (er) => console.log("Connection Error: " + er))
// } 
