const jwt = require('jsonwebtoken')
const secretkey = 'celzeneP'

const protect = async (req,res,next) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, secretkey)
            req.user = decoded
            next();
        }catch(err){
            res.status(401).json({
                success: false,
                message: err.message
            })
        }
    }
    if(!token){
        res.status(401).json({
            message: "Token invallid"
        })
    }
}
const authorize = (role) => {
    return (req,res,next) => {
      if (req.user.role == role) {
        next();
      } else{
        res.status(401).json({
            success: false,
            message: "There is no permission to you"
        })
      }
    }
}

module.exports = {protect, authorize}