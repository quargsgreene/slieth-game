import GameNodeTree from "./GameNodeTree.model.js";
import mongoose from "mongoose";

const createNewGameTree = async (req, res) => {
   const {
        nodes,
        root,
        inProgress,
        lose,
        win,
        sequelae,
        carrots,
        traversalMode,
        currentNodeIndex,
        gameId
   } = req.body;

    try {
        const gameTreeData = {
            inProgress: typeof inProgress === 'boolean' ? inProgress : true,
            nodes,
            root,
            lose,
            win,
            sequelae,
            carrots,
            traversalMode,
            currentNodeIndex
        };

        if (gameId) {
            gameTreeData.gameId = gameId;
        }

        const newGameTree = new GameNodeTree(gameTreeData);

        const savedGameTree = await newGameTree.save();
        console.log(savedGameTree);
        res.status(201).json(savedGameTree);
    } catch (error) {
        console.error("Error starting new game: ",error);
        if (error?.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({error: "Failed to create new game tree"});
    }
}

const getGameTreeById = async (req, res) => {
    const gameTreeId = req.params.gameTreeId;
    if (!mongoose.Types.ObjectId.isValid(gameTreeId)) {
        return res.status(400).json({ error: 'Invalid game tree id' });
    }

    try {
        const gameTree = await GameNodeTree.findById(gameTreeId)
            .populate('nodes')
            .populate('root');
        if (!gameTree) {
            return res.status(404).json({ error: 'Game tree not found' });
        }
        console.log(gameTree);
        res.status(200).json(gameTree);
    } catch (error) {
        console.error('Error getting game Tree by id:', error);
        res.status(500).json({error: 'Failed to get game tree by id'});
    }
};

const getGameTreeByGameId = async (req, res) => {
    const { gameId } = req.params;
    try {
        const gameTree = await GameNodeTree.findOne({ gameId })
            .populate('nodes')
            .populate('root');
        if (!gameTree) {
            return res.status(404).json({ error: 'Game tree not found' });
        }
        console.log(gameTree);
        res.status(200).json(gameTree);
    } catch (error) {
        console.error('Error getting game tree by gameId:', error);
        res.status(500).json({ error: 'Failed to get game tree by gameId' });
    }
};

const updateGameTreeState = async (req, res) => {
    const gameTreeId = req.params.gameTreeId;
    if (!mongoose.Types.ObjectId.isValid(gameTreeId)) {
        return res.status(400).json({ error: 'Invalid game tree id' });
    }

    const updateFields = {};
    const allowedFields = [
        'nodes',
        // 'currentNode',
        'lose',
        'win',
        'sequelae',
        'carrots',
        'traversalMode',
        'currentNodeIndex'
    ];

    allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
            updateFields[field] = req.body[field];
        }
    });

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: 'No valid fields provided to update' });
    }

    try {
        const updatedGameTree = await GameNodeTree.findOneAndUpdate(
            { _id: gameTreeId },
            updateFields,
            {
                returnDocument: 'after',
                runValidators: true,
            }
        );

        if (!updatedGameTree) {
            return res.status(404).json({ error: 'Game tree not found' });
        }
        console.log('Game tree updated: ', updatedGameTree);
        res.status(200).json(updatedGameTree);
    } catch (error) {
        console.error('Error updating game tree: ', error);
        res.status(500).json({ error: 'Failed to update game tree' });
    }
};

const abortGame = async (req, res) => {
    const gameTreeId = req.params.gameTreeId
    try {
        const deletedGameTree = await GameNodeTree.findOneAndDelete({ _id: gameTreeId })
        if(!deletedGameTree || !mongoose.Types.ObjectId.isValid(gameTreeId)){
            return res.status(404).json({error: 'Game Tree not found'})
        }
        console.log(deletedGameTree)
        res.status(200).json({ message: 'Game tree deleted', deletedGameTree })
    } catch (error) {
        console.error('Error deleting game tree:', error)
        res.status(500).json({error: 'Failed to delete game tree'})
    }
}

export { createNewGameTree, getGameTreeById, getGameTreeByGameId, updateGameTreeState, abortGame };
