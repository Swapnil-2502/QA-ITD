const express = require("express")
const jwt = require("jsonwebtoken")
const {authMiddleware} = require('./middleware')


const app = express()

require("dotenv").config()

const PORT = process.env.PORT

//middleware
app.use(express.json())

app.get("/",authMiddleware,(req,res)=>{
    res.send(`Welcome ${req.user.name} and ${req.user.email}`)
})

app.post("/register",(req,res)=>{
    const {name,email} = req.body

    const token = jwt.sign({name,email},process.env.JWT_SECRET)
    
    res.json({"Token": token})
})

app.listen(PORT,()=>{
    console.log(`Server started on PORT ${PORT}`)
})