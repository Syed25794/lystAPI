const mongoose = require("mongoose")
require('dotenv').config()

const connection =()=>{
    return mongoose.connect(process.env.MONGO_URL);
}

module.exports = {
    connection
}
