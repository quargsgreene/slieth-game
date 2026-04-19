import { Schema, model } from 'mongoose';
import GameNode from './game-node';

const gameNodeTreeSchema = new Schema({
    nodes: [{
        type: GameNode
    }]
}, {timestamps: true});

export default model('GameNodeTrees', gameNodeTreeSchema);