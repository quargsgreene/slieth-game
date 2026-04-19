import Button from './Button';
import hydrateGameNode from './hydrateGameNode';
import { useEffect, useState } from 'react';

export default function GameNodeView(){
    const [gameNodeInternal, setGameNodeInternal] = useState(null);
    useEffect(() => {
       
       const createGameNode = async () => {
            const gameNode = await hydrateGameNode();
            console.log("I ran!");
            console.log("fetched game node: ", gameNode);
            setGameNodeInternal(gameNode);
     };
     createGameNode();

    }, []);

    return (
        <div className="game-node">
            {<h1>{gameNodeInternal?.value}</h1>}
            {<audio src={"http://" + gameNodeInternal?.audioUrl} controls />}
            {<img src={"http://" + gameNodeInternal?.imageUrl} alt={"http://" + gameNodeInternal?.imageUrl.substring(gameNodeInternal?.imageUrl.lastIndexOf('/') + 1)} />}
            {<video src = {"http://" + gameNodeInternal?.videoUrl} controls />}
        </div>
    )
}