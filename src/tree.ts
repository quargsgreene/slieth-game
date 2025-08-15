import {Node}

export type Routes = '/' | 'active' | 'inactive'


export interface GameTree
{
	game_id:string,
	nodes:Node[],
	active:boolean,
	root:Node

}

export type GameTreeType = GameTree[]


export interface GameState

{
	gameTree:GameTreeType
}


export enum LocalStorageKey
{

	GAME_STATE = 'GAME_STATE',

}

//TODO: insert, delete, heapify, extract min

function insert(node:Node)
{

	//

}


function delete(node:Node)

{


	//

}



function extractMin()
{

	//

}


function heapify()
{


	//

}



function getNodes()
{

	return this.nodes

}


function getId()
{

	return this.game_id

}

function getRoot()
{

	return this.root

}


function isActive()
{

	return this.active

}


function loadAppStateFromLocalStorage(): GameState 
{
	const stringifiedJSON: string | null = window.localStorage.getItem(LocalStorageKey.GAME_STATE,
									  )


	if( typeof stringifiedJSON === 'string')
	{
		const Loaded: GameState = JSON.parse(stringifiedJSON)
		return Loaded
	
	}

		
	const NewGameState: GameState = {

		gameTree: [],
	}

	return NewGameState
	
}	


