const mongoose = require('mongoose')
const User = require('./userModel')

const eventSchema = new mongoose.Schema ({
    eventTitle:{
        type: String,
        required: true
    },
    eventDate: {                               
        type: Date,
        default: null,
        required: true,
    },
    time: {
        type: String,
        default: '00:00:00',
        required: true
    },
    location:{
        type: String,
        required: true
    },
    bookedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    description:{
        type: [String],
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }

})

const Event = mongoose.model ('Event', eventSchema)

module.exports = Event