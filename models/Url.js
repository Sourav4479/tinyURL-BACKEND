const mongoose = require('mongoose')

const Url = mongoose.Schema({
    hash: {
        type: String,
        required: true
    },
    originalUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
    
})

module.exports = mongoose.model('Url', Url);