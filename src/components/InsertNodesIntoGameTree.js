import fetchDefaultGameNodes from "./fetchDefaultGameNodes";
import GameTree from "../../game-tree"

const insertNodesIntoGameTree = async () => {
    try {
        const nodes = await fetchDefaultGameNodes();
        console.log('Nodes to insert into game tree:', nodes);
        const gameTree = new GameTree();
        nodes.forEach(node => gameTree.insertGameNode(node));
        console.log('Game tree after inserting nodes:', gameTree);
        return gameTree;
    } catch (error) {
        console.error('Error fetching nodes:', error);
    }
};

export default insertNodesIntoGameTree;