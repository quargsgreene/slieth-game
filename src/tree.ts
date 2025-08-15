import type {Node} from './node.ts'

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

function insertNode(node:Node)
{

	//

}


function deleteNode(node:Node)

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



function getNodes(this:GameTree)
{

	return this.nodes

}


function getId(this:GameTree)
{

	return this.game_id

}

function getRoot(this:GameTree)
{

	return this.root

}


function isActive(this:GameTree)
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


