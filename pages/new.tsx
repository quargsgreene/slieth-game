import GameNode from "../components/GameNode";
import React from 'react';

const NewGameNode = () => {
	const gameNode = {
		node_id:0,
		text: [],
		node_images:[],
		audio:[],
		puzzles:[],
		apiData:[],
		layoutOption:1,
		value:0,
		active:false
	};
	
	return <GameNode />
};


export default NewGameNode; 
