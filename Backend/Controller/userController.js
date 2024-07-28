const User = require('../Model/userModel')
const jwt = require('jsonwebtoken')
const secretkey = 'celzeneP'

const generateToken = (id, role) => {
    return jwt.sign({id: id, role: role}, secretkey,{expiresIn: '24h'})
}

exports.createUser = async (req,res) => {
    try{
        const {Name, age, role, email, password} = req.body
        const user = new User ({
            Name: Name,
            age: age,
            role: role,
            email: email,
            password: password
        })
        await user.save();
        const token = generateToken(user._id, user.role)
        res.status(500).json({
            success: true,
            token: token,
            data: user
        })


    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
exports.userLogIn = async (req,res) => {
    const {email, password} = req.body
    try{
        const user = await User.findOne({email: email, isDeleted: false})
        if(user && (await user.matchPassword(password))) {
            const token = generateToken(user._id,user.role);
            res.status(201).json({
                success: true,
                token: token,
                data: user
            })
        }
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
exports.updateUserDetails = async (req,res) => {
    const {id} = req.params
    const {Name, age, role, email, password} = req.body
    try{
        const user = await User.findByIdAndUpdate(id, {Name: Name, age: age, role: role, email: email, password: password})
        res.status(201).json({
            success: true,
            data: user
        })
    }catch(err) {
        res.status(500).json({
        success: false,
        message: err.message
    })
    }
}
exports.getAllUserData = async (req,res) => {
    try{
        const {page,limit} = req.query
        const user = await User.find({isDeleted: false,}).limit(limit).skip((page-1)*limit).exec()
        res.status(201).json({
            success: true,
            data: user
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
exports.softDelUser = async (req,res) => {
    const {id} = req.params
    try{
        const user = await User.findById(id)
        user.isDeleted = true;
        user.save();

        res.status(201).json({
            success: true,
            data: user
        })


    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}