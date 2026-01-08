const helmet = require('helmet')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const GameNode = require('./GameNode.model')
const app = express()
const port = 3002

mongoose.connect('mongodb://localhost:27017/slieth')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/gameNodes', async (req, res) => {
    console.log('Getting all game nodes')
    let data = await GameNode.find({})
    console.log(data)
    res.json(data)
})

app.post('/addGameNode', async (req, res) => {
    try {
        const newGameNode = new GameNode({
            imageUrl: 'jkl',
            audioUrl: 'mno',
            videoUrl: 'pqr',
            value: 1
        })
        const savedGameNode = await newGameNode.save()
        console.log(savedGameNode)
        res.status(201).json(savedGameNode)
    } catch (error) {
        console.error('Error adding game node: ', error)
        res.status(500).json({error: 'Failed to add game node'})
    }
})

app.post('/updateGameNode/:gameNodeId', async (req, res) => {
    const gameNodeId = req.params.gameNodeId
    try {
        const updatedGameNode = await GameNode.findByIdAndUpdate(
            gameNodeId,
            {value: 2}
        )

        if(!updatedGameNode){
            return res.status(404).json({error: 'Game node not found'})
        }
        console.log('Game node updated: ', updatedGameNode)
        res.status(200).json(updatedGameNode)

    } catch (error) {
        console.error('Error updating game node:', error)
        res.status(500).json({error: 'Failed to update game node'})
    }
})

app.delete('/deleteGameNode/:gameNodeId', async (req, res) => {
    const gameNodeId = req.params.gameNodeId
    try {
        const deletedGameNode = await GameNode.findByIdAndDelete(gameNodeId)
        if(!deletedGameNode){
            return res.status(404).json({error: 'Game node not found'})
        }
        console.log(deletedGameNode)
        res.status(200).json('Game node deleted', deletedGameNode)
    } catch (error) {
        console.error('Error deleting game node:', error)
        res.status(500).json({error: 'Failed to delete fame node'})
    }
})

app.use(express.static('image-assets'))

app.use(helmet({
    contentSecurityPolicy:{
        directives: {
            "img-src": ["'self'"]
        },
    },
}));



app.listen(port, () => {
    console.log(`Slieth listening on port ${port}`)
})



