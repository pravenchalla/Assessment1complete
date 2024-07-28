const express = require('express');
const router = express.Router();

const userController = require('../Controller/userController')

const {protect, authorize} = require('../Middle/auth')
const {validate} = require('../Middle/validate')
const {createUserSchema, logInSchema} = require('../Middle/validationSchema')

router.post('/createU',validate(createUserSchema),userController.createUser)
router.get('/view', protect, authorize('Organizer'), userController.getAllUserData)
router.post('/log', validate(logInSchema), userController.userLogIn)
router.put('/update/:id', protect, authorize('Customer'),userController.updateUserDetails)
router.put('/delete/:id',userController.softDelUser)

module.exports = router