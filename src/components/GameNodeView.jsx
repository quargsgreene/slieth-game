import Button from './Button';
import hydrateGameNode from './hydrateGameNode';
import { useEffect, useState } from 'react';

export default function GameNodeView({ gameNode }) {
    const mkUrl = (u) => (u ? (u.startsWith('http') ? u : `http://${u}`) : null);

    return (
        <div className="game-node">
            <h1>{gameNode?.value}</h1>
            {gameNode?.audioUrl && <audio src={mkUrl(gameNode.audioUrl)} controls />}
            {gameNode?.imageUrl && <img src={mkUrl(gameNode.imageUrl)} alt={gameNode.imageUrl.substring(gameNode.imageUrl.lastIndexOf('/') + 1)} />}
            {gameNode?.videoUrl && <video src={mkUrl(gameNode.videoUrl)} controls />}
        </div>
    );
}

