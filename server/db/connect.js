const mongoose = require("mongoose")
require('dotenv').config()

const connectDB =  (uri) =>{
return mongoose.connect(uri)
}

module.exports = connectDB