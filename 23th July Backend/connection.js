const mongoose = require('mongoose');

require("dotenv").config()

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB Connected")
    }
    catch(err){
        console.error("MongoDB failed", err.message);
    }
}

module.exports = connectDB