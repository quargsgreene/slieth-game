import fetchDefaultGameNodes from "./fetchDefaultGameNodes";
import { GameNodeInternal } from "./GameNodeInternal";

const hydrateGameNode = async () => {
    try {
        const nodes = await fetchDefaultGameNodes();
        const gameNode = new GameNodeInternal(nodes[0].imageUrl, nodes[0].audioUrl, nodes[0].videoUrl, nodes[0].value);
        console.log('gameNode hydrate:', gameNode);
        return gameNode;
    } catch (error) {
        console.error('Error hydrating node:', error);
    }
};

export default hydrateGameNode;