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
function upHeap(this:GameTree, node:Node):void
{


	let nodes: Node[] = this.nodes
	let currentNodeIndex: number = nodes.indexOf(node)
	let currentParent: Node = nodes[Math.floor((currentNodeIndex - 1)/2)]
	let currentNode: Node = node
	let currentParentIndex: number = Math.floor((currentNodeIndex - 1)/2)

	while(node.value < currentParent.value && currentNodeIndex > 0)
	{
		let temp:Node = currentNode
		nodes[currentNodeIndex] = currentParent
		nodes[currentParentIndex] = temp
		currentNodeIndex = currentParentIndex
		currentNode = nodes[currentNodeIndex]
		currentParentIndex = Math.floor((currentParentIndex - 1)/2)
		currentParent = nodes[currentParentIndex]
	}

	if(nodes[0] != this.root){
		this.root = nodes[0]
	}
}

function downHeap(this:GameTree, node:Node): void
{
	let nodes: Node[] = this.nodes
	let currentNodeIndex: number = nodes.indexOf(node)
	let currentNode: Node = node
	let currentLeftChild: Node = nodes[2*currentNodeIndex + 1]
	let currentRightChild: Node = nodes[2*currentNodeIndex + 2]

	while(currentNodeIndex < nodes.length)
	{
		if(currentNode.value >= currentLeftChild.value)
		{
			let temp:Node = currentNode
			nodes[currentNodeIndex] = currentLeftChild
			nodes[2*currentNodeIndex + 1] = temp
			currentNodeIndex = 2*currentNodeIndex + 1
			currentNode = nodes[currentNodeIndex]
			currentLeftChild = nodes[2*currentNodeIndex + 1]

		}else if (currentNode.value >= currentRightChild.value){
			let temp:Node = currentNode
			nodes[currentNodeIndex] = currentRightChild
			nodes[2*currentNodeIndex + 2] = temp
			currentNodeIndex = 2*currentNodeIndex + 2
			currentNode = nodes[currentNodeIndex]
			currentRightChild = nodes[2*currentNodeIndex + 2]
		} else {
			break
		}
	}
}

function insertNode(this:GameTree, node:Node): void
{
	let nodes: Node[] = this.nodes
	nodes.push(node)
	let size: number = nodes.length
	let parent:Node = nodes[Math.floor((size - 2)/2)]

	if(node.value < parent.value)
	{
		upHeap.call(this, node)
	}
}


function deleteNode(this:GameTree, node:Node): Node

{
	let nodes:Node[] = this.nodes
	let nodeIndex: number = nodes.indexOf(node)
	let placeholderNode:Node = new Node(0, null, null, null, null, null, Infinity, false)
	let deleted:Node = nodes.splice(nodeIndex, 1, placeholderNode)
	let deletedNodeParent:Node = this.nodes[Math.floor((nodeIndex - 1)/2)]
	downHeap.call(this, placeholderNode)
	delete placeholderNode
	return deleted
}

function extractMin(this:GameTree): Node
{
	let removed:Node  =  this.nodes.shift()
	let nodes:Node[] = this.nodes
	let placeholderNode:Node = new Node(0, null, null, null, null, null, Infinity, false)
	this.nodes.unshift(placeholderNode)
	downHeap.call(this, placeholderNode)
	delete placeholderNode
	return removed	
}

function getNodes(this:GameTree): Node[]
{
	return this.nodes
}


function getId(this:GameTree): number
{
	return this.game_id
}

function getRoot(this:GameTree):Node
{
	return this.root
}

function setNodeValue(this:GameTree, node:Node, newValue:number):void
{
	node.value = newValue
	let nodeIndex:number = this.indexOf(node)
	let nodes:Node[] = this.nodes
	let leftChild:Node = nodes[2*nodeIndex + 1]
	let rightChild:Node = nodes[2*nodeIndex + 2]
	let parent:Node = nodes[Math.floor(nodeIndex -1)/2]

	if(node.value >= leftChild.value || node.value >= rightChild.value)
	{
		downHeap.call(this, node)		

	}

	if(node.value < parent.value)
	{
		upHeap.call(this, node)
	}
}	

function isActive(this:GameTree):boolean
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
