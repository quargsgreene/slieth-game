import { connect } from 'mongoose'
import gameNodesRouter from './game-nodes.js'
import express from 'express'
import dotenv from 'dotenv/config.js'

const app = express()
const port = process.env.PORT || 3002

app.use(express.json())

connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Slieth listening on port ${port}`)
    })
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error)
  })

// Mount all game node routes under /api
app.use('/api', gameNodesRouter)






