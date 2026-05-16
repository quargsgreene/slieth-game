import { Schema, model } from 'mongoose';
import { randomUUID } from 'crypto';

const gameNodeTreeSchema = new Schema({
    gameId: {
        type: String,
        required: true,
        unique: true,
        default: randomUUID
    },
    inProgress: {
        type: Boolean,
        required: true
    },
    nodes: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'GameNodes'
    }],
    root: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'GameNodes'
    },
    // currentNode: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'GameNode'
    // },
    lose: {
        type: Boolean,
        required: true
    },
    win: {
        type: Boolean,
        required: true
    },
    sequelae: {
        type: Number,
        required: true
    },
    carrots: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        required: false,
        default: 0
    },
    traversalMode: {
        type: String,
        required: true
    },
    currentNodeIndex: {
        type: Number,
        required: true
    },
    subGameStates: {
        type: Schema.Types.Mixed,
        required: false,
        default: {}
    }
}, {timestamps: true, minimize: false});

export default model('GameNodeTrees', gameNodeTreeSchema);