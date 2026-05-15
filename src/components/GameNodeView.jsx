import Button from './Button';
import useStore from './useStore';
import currentGameStatus from '../pages/CurrentGameStatus';
import CountAndFeelCharsUI from '../components/games/CountAndFeelCharsUI';
import { useEffect } from 'react';
import { useNavigate } from "react-router";

export default function GameNodeView() {

    const navigate = useNavigate();
    const mkUrl = (u) => (u ? (u.startsWith('http') ? u : `http://${u}`) : null);
    const currentNodeIndex = useStore((state) => state.currentNodeIndex);
    const gameTree = useStore((state) => state.gameTree);
    const gameTreeDisplayObj = useStore((state) => state.gameTreeDisplayObj);
    const advanceTraversal = useStore((state) => state.advanceTraversal);

    console.log("Rendering GameNodeView with currentNodeIndex:", currentNodeIndex, "and gameTree:", gameTree);

    const viewGameStatus = () => {
        navigate('/status');
    }

    useEffect(() => {
        if (!gameTreeDisplayObj || !gameTree?.nodes?.[currentNodeIndex]) return;
        gameTreeDisplayObj.markCurrentNode(currentNodeIndex, '#ff0000');
    }, [currentNodeIndex, gameTree, gameTreeDisplayObj]);

    return (
        <div className="game-node">
            <h1>{gameTree?.nodes?.[currentNodeIndex]?.value}</h1>
            <Button id="next-node" label="Next Node" onClick={advanceTraversal} />
            <Button id="status" label="Status" onClick={viewGameStatus} />
            {gameTree?.nodes?.[currentNodeIndex]?.audioUrl && <audio id="game-audio" src={mkUrl(gameTree.nodes[currentNodeIndex].audioUrl)} controls />}
            {gameTree?.nodes?.[currentNodeIndex]?.imageUrl && <img id="game-image" src={mkUrl(gameTree.nodes[currentNodeIndex].imageUrl)} alt={gameTree.nodes[currentNodeIndex].imageUrl.substring(gameTree.nodes[currentNodeIndex].imageUrl.lastIndexOf('/') + 1)} />}
            {gameTree?.nodes?.[currentNodeIndex]?.videoUrl && <video id="game-video" src={mkUrl(gameTree.nodes[currentNodeIndex].videoUrl)} controls />}
            <CountAndFeelCharsUI key={gameTree?.nodes?.[currentNodeIndex]?._id} />
        </div>
    );
}

