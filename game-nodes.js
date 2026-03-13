import express from 'express';
import { deleteGameNode, createGameNode, getAllGameNodes, updateGameNode, deleteAllGameNodes, getGameNodeById, replaceGameNode } from './slieth-controller.js';

const router = express.Router()

router.get('/gameNodes', getAllGameNodes)

router.get('/gameNode/:gameNodeId', getGameNodeById)

router.post('/addGameNode', createGameNode)

router.patch('/updateGameNode/:gameNodeId', updateGameNode)

router.delete('/deleteAllGameNodes', deleteAllGameNodes)

router.delete('/deleteGameNode/:gameNodeId', deleteGameNode)

router.put('/replaceGameNode/:gameNodeId', replaceGameNode)

export default router