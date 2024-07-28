const Event = require('../Model/eventModel')

exports.createEvent = async (req,res) => {
    try{
        const {eventTitle, eventDate, time, location, bookedBy, description } = req.body
        const event = new Event ({
            eventTitle: eventTitle,
            eventDate: eventDate,
            time: time,
            location: location,
            bookedBy: bookedBy,
            description: description
        })
        await event.save()
        res.status(201).json({
            success: true,
            data: event
        })
    }catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
exports.editEventById = async (req, res) => {
    const {id} = req.params
    const {eventTitle, eventDate, time, location, description} = req.body
    try{
        const event = await Event.findByIdAndUpdate(id, {eventTitle: eventTitle,eventDate:eventDate, time:time, location: location, description: description})
        res.status(201).json({
            success: true,
            data: event
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
exports.getallEventdetails = async (req,res) => {
    try{
        const events = await Event.find({isDeleted: false})
        res.status(201).json({
            success: true,
            data: events
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
exports.removeEvent = async (req,res) => {
    const {id} = req.params
    try{
        const event = await Event.findById(id)
        event.isDeleted = true,
        event.save()
        res.status(201).json({
            success: true,
            data: event
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}