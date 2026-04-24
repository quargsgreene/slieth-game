import { useEffect, useRef } from "react";
import useStore from "./useStore";

export default function GameTreeViewCanvas() {
    const canvasRef = useRef(null);
    const gameTree = useStore((state) => state.gameTree);
    const setGameTreeDisplayObj = useStore((state) => state.setGameTreeDisplayObj);

    useEffect(() => {
        if (!gameTree?.nodes || !canvasRef.current) return;
        setGameTreeDisplayObj(canvasRef.current);
    }, [gameTree, setGameTreeDisplayObj]);

    return (
        <div className="game-tree-container">
            <canvas id="game-tree-canvas" ref={canvasRef} width={1200} height={900}></canvas>
        </div>
    );
}