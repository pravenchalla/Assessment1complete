const Joi = require('joi')

const createUserSchema = Joi.object({
    Name: Joi.string().min(4).max(20).required(),
    age: Joi.required(),
    role:Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
})

const logInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
})

module.exports = {createUserSchema, logInSchema}