import { useEffect } from "react";
import { DrawGameTree } from "./DrawGameTree";
import useStore from "./useStore";

export default function GameTreeViewCanvas() {
    const gameTree = useStore((state) => state.gameTree);

    useEffect(() => {
        if (gameTree && gameTree.nodes && gameTree.nodes.length > 0) {
            const drawGameTree = new DrawGameTree(gameTree);
            // clear canvas before drawing
            if (drawGameTree && drawGameTree.ctx && drawGameTree.domCanvas) {
                drawGameTree.ctx.clearRect(0, 0, drawGameTree.domCanvas.width, drawGameTree.domCanvas.height);
            }
            drawGameTree.bfs();
        }
    }, [gameTree]);

    return (
        <canvas id="game-tree-canvas" width={1000} height={1000}></canvas>
    );
}