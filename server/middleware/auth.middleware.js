const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next) => {
    console.log(req.headers)
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
     
    if(!token){
        return res.status(401).json({message: 'Access Denied: NO Token Provided'})
    } 

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();      
    } catch (error) {
        return res.status(403).json({message:'Invalid or Expired Token'})
    }
}

module.exports = authMiddleware