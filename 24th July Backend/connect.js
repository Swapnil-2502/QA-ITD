const mongoose = require("mongoose")

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB connected")
    }
    catch(err){
        console.log("error:",err)
        res.json({Error: "Could not connect to MongoDB"})
    }
}

module.exports = connectDB