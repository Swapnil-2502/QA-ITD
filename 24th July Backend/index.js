const express = require("express")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const bcrypt = require('bcrypt');

const connectDB = require("./connect")
const User = require("./user")

const app = express();

require("dotenv").config()

const PORT = process.env.PORT_NUMBER

app.use(cors())
app.use(express.json())

//Connect to DB
connectDB()

app.get("/", (req,res)=>{
    console.log("HLLLxs")
    res.send("From GET Route")
})

app.post("/register",async(req,res)=>{
    const {name,email,password} = req.body

    try{
        const existinguser = await User.findOne({email})
        if(existinguser) return res.send("Email already exist try with another email")

        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({name,email,password: hashedPassword})
        await newUser.save()

        const token = jwt.sign({id:newUser._id, name, email}, process.env.JWT_SECRET)
        res.json({Token: token})
    }
    catch(err){
        console.log("Error:",err)
        res.json({Error:err})
    }
})

app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT}`)
})