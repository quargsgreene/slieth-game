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
			this.upHeap(node);
		}
	}

	extractMin(): GameNode | null
	{
		/*let removed:GameNode  =  this.nodes.shift();
		let nodes:GameNode[] = this.nodes;
		let placeholderNode:GameNode = new GameNode(0, [""], [""], [""], [""], [], 0, Infinity, false);
		this.nodes.unshift(placeholderNode);
		this.downHeap(placeholderNode);
		delete placeholderNode;*/
	       /*let size:number = this.nodes.length;
	       let temp:GameNode = this.root;
	       let nodes:GameNode[] = this.nodes;
	       nodes[0] = nodes[size - 1];
	       nodes[size - 1] = temp;
	       let removed = nodes.pop();
	       nodes.downHeap(nodes[0]);
	       nodes.root = nodes[0];*/
	       let removed:GameNode = this.root;
	       let nodes:GameNode[] = this.nodes;
	       nodes[0].value = Number.POSITIVE_INFINITY;
	       this.downHeap(nodes[0]);
	       nodes.pop();
	       this.root = nodes[0];

	       return removed ?? null;
	}


	deleteNode(node:GameNode): GameNode | null

	{/*
		let nodes:GameNode[] = this.nodes;
		let nodeIndex: number = nodes.indexOf(node);
		let placeholderNode:GameNode = new GameNode(0, [""], [""], [""], [""], [], 0, Infinity, false);
		let deleted:GameNode = nodes.splice(nodeIndex, 1, placeholderNode)[0];
		if(!deleted){
			return null;
		}
		let deletedNodeParent:GameNode = this.nodes[Math.floor((nodeIndex - 1)/2)];
		this.downHeap(placeholderNode);
		delete placeholderNode;
		return deleted;*/

	       let temp:GameNode = node;
	       let nodes:GameNode[] = this.nodes;
	       let removed:GameNode = node;
	       node.value = Number.NEGATIVE_INFINITY;
	       this.upHeap(node);
	       this.extractMin();
	       this.root = nodes[0];

	       return removed ?? null;
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
			this.downHeap(node);		

		}

		if(node.value < parent.value)
		{
			this.upHeap(node);
		}
		this.root = nodes[0];
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

