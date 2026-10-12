const jwt = require("jsonwebtoken")

const authMiddleware = (req,res,next)=>{
    const header = req.headers.authorization // "Bearer ejknv......"

    if(!header || !header.startsWith("Bearer ")){
        return res.status(401).json({
            success: false,
            messagae: "No token provided"
        })
    }

    const token = header.split(" ")[1] //Just the token part

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId // save user id on the request
        next() // go to the next function
    }
    catch(err){
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        })
    }
}

module.exports = authMiddleware