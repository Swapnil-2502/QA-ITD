const jwt = require("jsonwebtoken")

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message: "No Header present"})
    }

    const token = authHeader.split(" ")[1]

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET,{expiresIn: '1h'})
        console.log(decoded)
        req.user = {name: decoded.name, email: decoded.email} 
    }
    catch(error){
        return res.status(401).json({message: "Invalid or expired Token"})
    }

    next()
}

module.exports = {authMiddleware}