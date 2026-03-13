import GameNode from './GameNode.model.js'
import mongoose from 'mongoose'

const createGameNode = async (req, res) => {
    const { imageUrl, audioUrl, videoUrl, value } = req.body
    try {
        const newGameNode = new GameNode({
            imageUrl,
            audioUrl,
            videoUrl,
            value
        })
        const savedGameNode = await newGameNode.save()
        console.log(savedGameNode)
        res.status(201).json(savedGameNode)
    } catch (error) {
        console.error('Error adding game node: ', error)
        res.status(500).json({error: 'Failed to add game node'})
    }
}

const updateGameNode = async (req, res) => {
    const gameNodeId = req.params.gameNodeId
    const { value } = req.body
    try {
        const updatedGameNode = await GameNode.findOneAndUpdate(
            { _id: gameNodeId },
            {
                value: value
            },
            { returnDocument: 'after' }
        )
        if(!updatedGameNode || !mongoose.Types.ObjectId.isValid(gameNodeId)){
            return res.status(404).json({error: 'Game node not found'})
        }
        console.log('Game node updated: ', updatedGameNode)
        res.status(200).json(updatedGameNode)
    } catch (error) {
        console.error('Error updating game node:', error)
        res.status(500).json({error: 'Failed to update game node'})
    }
}

const replaceGameNode = async (req, res) => {
    const gameNodeId = req.params.gameNodeId
    const { imageUrl, audioUrl, videoUrl, value } = req.body
    try {
        const replacedGameNode = await GameNode.findOneAndReplace({ _id: gameNodeId }, { imageUrl, audioUrl, videoUrl, value })
        if(!replacedGameNode || !mongoose.Types.ObjectId.isValid(gameNodeId)){
            return res.status(404).json({error: 'Game node not found'})
        }
        console.log('Game node replaced: ', replacedGameNode)
        res.status(200).json(replacedGameNode)
    } catch (error) {
        console.error('Error replacing game node:', error)
        res.status(500).json({error: 'Failed to replace game node'})
    }
}

const getGameNodeById = async (req, res) => {
    const gameNodeId = req.params.gameNodeId
    try {
        const gameNode = await GameNode.findOne({ _id: gameNodeId })
        if(!gameNode || !mongoose.Types.ObjectId.isValid(gameNodeId)){
            return res.status(404).json({error: 'Game node not found'})
        }   
        console.log(gameNode)
        res.status(200).json(gameNode)
    } catch (error) {
        console.error('Error getting game node by id:', error)
        res.status(500).json({error: 'Failed to get game node by id'})
    }
}

const getAllGameNodes = async (req, res) => {
    console.log('Getting all game nodes')
    let data = await GameNode.find({})
    if(!data){
        return res.status(404).json({error: 'No game nodes found'})
    }
    console.log(data)
    res.json(data)
}

const deleteGameNode = async (req, res) => {
    const gameNodeId = req.params.gameNodeId
    try {
        const deletedGameNode = await GameNode.findOneAndDelete({ _id: gameNodeId })
        if(!deletedGameNode || !mongoose.Types.ObjectId.isValid(gameNodeId)){
            return res.status(404).json({error: 'Game node not found'})
        }
        console.log(deletedGameNode)
        res.status(200).json({ message: 'Game node deleted', deletedGameNode })
    } catch (error) {
        console.error('Error deleting game node:', error)
        res.status(500).json({error: 'Failed to delete fame node'})
    }
}

const deleteAllGameNodes = async (req, res) => {
    try {
        const deletedGameNodes = await GameNode.deleteMany({})
        console.log('All game nodes deleted: ', deletedGameNodes)
        res.status(200).json({ message: 'All game nodes deleted', deletedGameNodes })
    } catch (error) {
        console.error('Error deleting all game nodes:', error)
        res.status(500).json({error: 'Failed to delete all game nodes'})
    }
}

export { createGameNode, getAllGameNodes, deleteGameNode, updateGameNode, getGameNodeById, replaceGameNode, deleteAllGameNodes }