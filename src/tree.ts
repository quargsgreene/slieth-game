import {NodeOptions, GameNodeData} from './node'

export type Routes = '/' | 'active' | 'inactive'

export type GameTreeType = GameTree[]

export interface GameState

{
	gameTree:GameTreeType
}
export interface GameAttributes

{
	game_id:number;
	nodes:GameNodeData[];
	active:boolean;
	root:GameNodeData;
}

export enum LocalStorageKey
{
	GAME_STATE = 'GAME_STATE',
}

export class GameTree
{

	constructor(public game_id: number,
		   public nodes: GameNodeData[],
		   public active: boolean,
		   public root: GameNodeData ){}

	upHeap(node:GameNodeData):void
	{
		const nodes: GameNodeData[] = this.nodes;
		let currentNodeIndex: number = nodes.indexOf(node);
		let currentParent: GameNodeData = nodes[Math.floor((currentNodeIndex - 1)/2)];
		let currentNode: GameNodeData = node;
		let currentParentIndex: number = Math.floor((currentNodeIndex - 1)/2);

		while(node.value < currentParent.value && currentNodeIndex > 0)
		{
			const temp:GameNodeData = currentNode;
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

	downHeap(node:GameNodeData): void
	{
		const nodes: GameNodeData[] = this.nodes;
		let currentNodeIndex: number = nodes.indexOf(node);
		let currentNode: GameNodeData = node;
		let currentLeftChild: GameNodeData = nodes[2*currentNodeIndex + 1];
		let currentRightChild: GameNodeData = nodes[2*currentNodeIndex + 2];

		while(currentNodeIndex < nodes.length)
		{
			if(currentNode.value >= currentLeftChild.value)
			{
				const temp:GameNodeData = currentNode;
				nodes[currentNodeIndex] = currentLeftChild;
				nodes[2*currentNodeIndex + 1] = temp;
				currentNodeIndex = 2*currentNodeIndex + 1;
				currentNode = nodes[currentNodeIndex];
				currentLeftChild = nodes[2*currentNodeIndex + 1];

			}else if (currentNode.value >= currentRightChild.value){
				const temp:GameNodeData = currentNode;
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

	insertNode(node:GameNodeData): void
	{
		const nodes: GameNodeData[] = this.nodes;
		nodes.push(node);
		const size: number = nodes.length;
		const parent:GameNodeData = nodes[Math.floor((size - 2)/2)];

		if(node.value < parent.value)
		{
			this.upHeap(node);
		}
	}

	extractMin(): GameNodeData | null
	{
	       const removed:GameNodeData = this.root;
	       const nodes:GameNodeData[] = this.nodes;
	       nodes[0].value = Number.POSITIVE_INFINITY;
	       this.downHeap(nodes[0]);
	       nodes.pop();
	       this.root = nodes[0];

	       return removed ?? null;
	}


	deleteNode(node:GameNodeData): GameNodeData | null

	{
	    //    let temp:GameNodeData = node;
	       const nodes:GameNodeData[] = this.nodes;
	       const removed:GameNodeData = node;
	       node.value = Number.NEGATIVE_INFINITY;
	       this.upHeap(node);
	       this.extractMin();
	       this.root = nodes[0];

	       return removed ?? null;
	}

	getNodes(): GameNodeData[]
	{
		return this.nodes;
	}

	getId(): number
	{
		return this.game_id;
	}

	getRoot():GameNodeData
	{
		return this.root;
	}

	setNodeValue(node:GameNodeData, newValue:number):void
	{
		node.value = newValue;
		const nodeIndex:number = this.nodes.indexOf(node);
		const nodes:GameNodeData[] = this.nodes;
		const leftChild:GameNodeData = nodes[2*nodeIndex + 1];
		const rightChild:GameNodeData = nodes[2*nodeIndex + 2];
		const parent:GameNodeData = nodes[Math.floor(nodeIndex -1)/2];

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

	isActive():boolean
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

