const mongoose = require("mongoose")


module.exports = function () {
    mongoose.connect(process.env.MY_WALLET_DB, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => console.log("Connected to Database"))
.catch( (er) => console.log("Connection Error: " + er))
} 


// module.exports = function () {
//     mongoose.connect(config.get('db') , {useNewUrlParser: true})
// .then( () => console.log("Connected to Database"))
// .catch( (er) => console.log("Connection Error: " + er))
// } 
