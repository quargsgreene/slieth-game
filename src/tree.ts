import {NodeOptions, GameNode} from './node'

export type Routes = '/' | 'active' | 'inactive'

export type GameTreeType = GameTree[]


export interface GameState

{
	gameTree:GameTreeType
}
export interface GameAttributes

{
	game_id:number;
	nodes:GameNode[];
	active:boolean;
	root:GameNode;
}

export enum LocalStorageKey
{
	GAME_STATE = 'GAME_STATE',
}

export class GameTree
{

	constructor(public game_id: number,
		   public nodes: GameNode[],
		   public active: boolean,
		   public root: GameNode ){}

	upHeap(node:GameNode):void
	{


		let nodes: GameNode[] = this.nodes;
		let currentNodeIndex: number = nodes.indexOf(node);
		let currentParent: GameNode = nodes[Math.floor((currentNodeIndex - 1)/2)];
		let currentNode: GameNode = node;
		let currentParentIndex: number = Math.floor((currentNodeIndex - 1)/2);

		while(node.value < currentParent.value && currentNodeIndex > 0)
		{
			let temp:GameNode = currentNode;
			nodes[currentNodeIndex] = currentParent;
			nodes[currentParentIndex] = temp;
			currentNodeIndex = currentParentIndex;
			currentNode = nodes[currentNodeIndex];
			currentParentIndex = Math.floor((currentParentIndex - 1)/2);
			currentParent = nodes[currentParentIndex];
		}

		if(nodes[0] != this.root){
			this.root = nodes[0];
		}
	}

	downHeap(node:GameNode): void
	{
		let nodes: GameNode[] = this.nodes;
		let currentNodeIndex: number = nodes.indexOf(node);
		let currentNode: GameNode = node;
		let currentLeftChild: GameNode = nodes[2*currentNodeIndex + 1];
		let currentRightChild: GameNode = nodes[2*currentNodeIndex + 2];

		while(currentNodeIndex < nodes.length)
		{
			if(currentNode.value >= currentLeftChild.value)
			{
				let temp:GameNode = currentNode;
				nodes[currentNodeIndex] = currentLeftChild;
				nodes[2*currentNodeIndex + 1] = temp;
				currentNodeIndex = 2*currentNodeIndex + 1;
				currentNode = nodes[currentNodeIndex];
				currentLeftChild = nodes[2*currentNodeIndex + 1];

			}else if (currentNode.value >= currentRightChild.value){
				let temp:GameNode = currentNode;
				nodes[currentNodeIndex] = currentRightChild;
				nodes[2*currentNodeIndex + 2] = temp;
				currentNodeIndex = 2*currentNodeIndex + 2;
				currentNode = nodes[currentNodeIndex];
				currentRightChild = nodes[2*currentNodeIndex + 2];
			} else {
				break;
			}
		}
	}

	insertNode(node:GameNode): void
	{
		let nodes: GameNode[] = this.nodes;
		nodes.push(node);
		let size: number = nodes.length;
		let parent:GameNode = nodes[Math.floor((size - 2)/2)];

		if(node.value < parent.value)
		{
			upHeap.call(this, node);
		}
	}


	deleteNode(node:GameNode): GameNode

	{
		let nodes:GameNode[] = this.nodes;
		let nodeIndex: number = nodes.indexOf(node);
		let placeholderNode:GameNode = new GameNode(0, [""], [""], [""], [""], [], Infinity, false);
		let deleted:GameNode = nodes.splice(nodeIndex, 1, placeholderNode);
		let deletedNodeParent:GameNode = this.nodes[Math.floor((nodeIndex - 1)/2)];
		downHeap.call(this, placeholderNode);
		delete placeholderNode;
		return deleted;
	}

	extractMin(): GameNode
	{
		let removed:GameNode  =  this.nodes.shift();
		let nodes:GameNode[] = this.nodes;
		let placeholderNode:GameNode = new GameNode(0, [""], [""], [""], [""], [], Infinity, false);
		this.nodes.unshift(placeholderNode);
		downHeap.call(this, placeholderNode);
		delete placeholderNode;
		return removed;
	}

	get getNodes(): GameNode[]
	{
		return this.nodes;
	}


	get getId(): number
	{
		return this.game_id;
	}

	get getRoot():GameNode
	{
		return this.root;
	}

	set setNodeValue(node:GameNode, newValue:number):void
	{
		node.value = newValue;
		let nodeIndex:number = this.indexOf(node);
		let nodes:GameNode[] = this.nodes;
		let leftChild:GameNode = nodes[2*nodeIndex + 1];
		let rightChild:GameNode = nodes[2*nodeIndex + 2];
		let parent:GameNode = nodes[Math.floor(nodeIndex -1)/2];

		if(node.value >= leftChild.value || node.value >= rightChild.value)
		{
			downHeap.call(this, node);		

		}

		if(node.value < parent.value)
		{
			upHeap.call(this, node);
		}
	}	

	get isActive():boolean
	{
		return this.active;
	}


	loadAppStateFromLocalStorage(): GameState 
	{
		const stringifiedJSON: string | null = window.localStorage.getItem(LocalStorageKey.GAME_STATE,
										  )
		if( typeof stringifiedJSON === 'string')
		{
			const Loaded: GameState = JSON.parse(stringifiedJSON);
			return Loaded;
		}

		const NewGameState: GameState = {

			gameTree: [],
		}

		return NewGameState;	
	}	
}

