const Joi = require('joi')

const validate = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.body);
    if(error){
    res.status(401).json({
      success: false,
      message: error.message  
    })
    }else{
        next();
    }
}

module.exports = {validate}