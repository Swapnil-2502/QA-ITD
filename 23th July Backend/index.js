const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const connectDB = require('./connection')
const bcrypt = require('bcrypt');
const user = require('./user')


require('dotenv').config()

const PORT = process.env.PORT_NUMBER

app.use(express.json());
app.use(cors())

connectDB();

app.get('/',(req,res)=>{
    res.send("From GET route")
})

app.post('/register', async (req,res)=>{
    const {name, email, password} = req.body

    try{

        const userexist = await user.findOne({email})

        if(userexist) return res.json({error: "user already exists"})
        
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new user({name,email,password: hashedPassword})
        await newUser.save()



        const token = jwt.sign({id: newUser._id,name,email},process.env.JWT_SECRET)
        res.json({"Token": token})
    }
    catch(err){
        console.log(err)
    }

    
   
})

app.listen(PORT,()=>{
    console.log(`Sever running on PORT ${PORT}`)
})