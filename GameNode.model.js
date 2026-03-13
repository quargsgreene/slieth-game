import { Schema, model } from 'mongoose';

const gameNodeSchema = new Schema({
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
}, {timestamps: true});

export default model('GameNodes', gameNodeSchema)