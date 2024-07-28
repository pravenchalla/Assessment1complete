const express = require('express')
const router = express.Router()

const {protect, authorize} = require('../Middle/auth')

const eventController = require('../Controller/eventController')

router.post('/create', protect,authorize('Customer', 'Organizer'),eventController.createEvent)
router.put('/updateE/:id', protect, authorize('Customer'),eventController.editEventById)
router.get('/viewE', protect,authorize('Organizer'),eventController.getallEventdetails)
router.put('/deleteE/:id', protect, authorize('Organizer'),eventController.removeEvent)

module.exports = router