const mongoose = require('mongoose')

const gameNodeSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: false
    },
    audioUrl: {
        type: String,
        required: false
    },
    videoUrl: {
        type: String,
        required: false
    },
    value: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('GameNodes', gameNodeSchema)