const mongoose = require('mongoose')

const availabilityModel = mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    numberOfHours: {
        type: Number,
        default: 1
    },
    date: {
        type: Number
    },
    assignedWork: {
        type: String,
        default: ''
    },
    assignedBy: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Number
    },
    updatedAt: {
        type: Number
    }
})

module.exports = mongoose.model('Availability', availabilityModel, 'Availability')
