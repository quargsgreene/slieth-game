import express from 'express';
import { getGameTreeById, getGameTreeByGameId, createNewGameTree, updateGameTreeState, abortGame } from './game-tree-controller.js'

const treeRouter = express.Router()

treeRouter.get('/game/:gameTreeId', getGameTreeById);
treeRouter.get('/game/external/:gameId', getGameTreeByGameId);

treeRouter.post('/newGame', createNewGameTree);

treeRouter.patch('/updateGameTreeState/:gameTreeId', updateGameTreeState);

treeRouter.delete('/abortGame/:gameTreeId', abortGame);

export default treeRouter;