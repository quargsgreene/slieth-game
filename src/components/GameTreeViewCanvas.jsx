import { useEffect } from "react";
import { DrawGameTree } from "./DrawGameTree";
// import insertNodesIntoGameTree from "./InsertNodesIntoGameTree";

// todo: actually make nodes, values, and connecting lines visible on canvas and make canvas responsive
export default function GameTreeViewCanvas() {
    useEffect(() => {
       const createGameTree = async () => {
            const gameTree = await insertNodesIntoGameTree();
            const drawGameTree = new DrawGameTree(gameTree);
            drawGameTree.bfs();
        };
        // fetchNodes();
        createGameTree();

    }, []);

    return (
        <canvas id="game-tree-canvas" width={1000} height={1000}></canvas>
    );
}