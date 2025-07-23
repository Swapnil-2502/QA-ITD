const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message: "No Header present"})
    }

    const token = authHeader.split(" ")[1]

    
}