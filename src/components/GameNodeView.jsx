import Button from './Button';
import useStore from './useStore';
import { useEffect } from 'react';

export default function GameNodeView() {
    const mkUrl = (u) => (u ? (u.startsWith('http') ? u : `http://${u}`) : null);
    const currentNodeIndex = useStore((state) => state.currentNodeIndex);
    const gameTree = useStore((state) => state.gameTree);
    const gameTreeDisplayObj = useStore((state) => state.gameTreeDisplayObj);
    const advanceTraversal = useStore((state) => state.advanceTraversal);

    console.log("Rendering GameNodeView with currentNodeIndex:", currentNodeIndex, "and gameTree:", gameTree);

    useEffect(() => {
        if (!gameTreeDisplayObj || !gameTree?.nodes?.[currentNodeIndex]) return;
        gameTreeDisplayObj.markCurrentNode(currentNodeIndex, '#ff0000');
    }, [currentNodeIndex, gameTree, gameTreeDisplayObj]);

    return (
        <div className="game-node">
            <h1>{gameTree?.nodes?.[currentNodeIndex]?.value}</h1>
            <Button id="next-node" label="Next Node" onClick={advanceTraversal} />
            {gameTree?.nodes?.[currentNodeIndex]?.audioUrl && <audio src={mkUrl(gameTree.nodes[currentNodeIndex].audioUrl)} controls />}
            {gameTree?.nodes?.[currentNodeIndex]?.imageUrl && <img src={mkUrl(gameTree.nodes[currentNodeIndex].imageUrl)} alt={gameTree.nodes[currentNodeIndex].imageUrl.substring(gameTree.nodes[currentNodeIndex].imageUrl.lastIndexOf('/') + 1)} />}
            {gameTree?.nodes?.[currentNodeIndex]?.videoUrl && <video src={mkUrl(gameTree.nodes[currentNodeIndex].videoUrl)} controls />}
        </div>
    );
}

