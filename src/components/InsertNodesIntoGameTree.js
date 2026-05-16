import fetchDefaultGameNodes from "./fetchDefaultGameNodes.js";
import fetchNode from "./fetchNode.js";
import createNewGameTree from "./createNewGameTree.js";
import GameTree from "../../game-tree.js"
import useStore from "./useStore.js";
import { getTraversalOrder } from "./traverseGameTree.js";

const insertNodesIntoGameTree = async () => {
    try {
        const url = '/api/newGame';
        const nodes = await fetchDefaultGameNodes();
        console.log('Nodes to insert into game tree:', nodes);
        const gameTree = new GameTree();
        nodes.forEach(node => gameTree.insertGameNode(node));
        const initialNodeIds = gameTree.nodes.map((n) => n._id);
        const initialRootId = gameTree.nodes[0]._id;
        const traversalMode = useStore.getState().traversalMode;
        const nodeOrder = getTraversalOrder(gameTree, traversalMode);
        const initialIndex = nodeOrder.length > 0 ? nodeOrder[0] : 0;
        const initialNodeId = gameTree.nodes[initialIndex]?._id;

        const lose = useStore.getState().lose;
        const win = useStore.getState().win;
        const sequelae = useStore.getState().sequelae;
        const carrots = useStore.getState().carrots;
        const score = useStore.getState().score;

        const gameToStart = {
            inProgress: true,
            nodes: initialNodeIds,
            root: initialRootId,
            lose: lose,
            win: win,
            sequelae: sequelae,
            carrots: carrots,
            score: score,
            traversalMode: traversalMode,
            currentNodeIndex: initialIndex,
            subGameStates: {},
        };
        const game = await createNewGameTree(url, gameToStart);
        const persistedId = game.gameId || game._id;
        if (persistedId) {
            localStorage.setItem('sliethGameId', persistedId);
        }
        console.log('Game tree after inserting nodes:', gameTree, 'New game created: ', game);
        return { gameTree, game };
    } catch (error) {
        console.error('Error fetching nodes:', error);
        throw error;
    }
};

export default insertNodesIntoGameTree;

// fetch preliminary nodes, 
// create new tree using them in game DB, 
// build tree logically, 
// display tree