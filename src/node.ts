export class Node
{
	constructor(
		node_id:number,
		text:string[],
		node_images:string[],
		audio:string[],
		puzzles:string[],
		apiData:[],
		layoutOption:number,
		value:number,
		active:boolean
	){
		this.node_id = id
		this.text = text
		this.node_images = images
		this.audio = audio
		this.puzzles = puzzles
		this.apiData = apiData
		this.value = value
		this.active = boolean
	}

	get getNodeId(this:Node):number
	{
		return this.node_id
	}


	get getNodeText(this:Node):string[]
	{
		return this.text
	}


	get getImages(this:Node):string[]
	{
		return this.node_images
	}

	get getAudio(this:Node):string[]
	{
		return this.audio
	}


	get getPuzzles(this:Node):string[]
	{
		return this.puzzles
	}


	get getApiData(this:Node):[]
	{
		return this.apiData
	}


	get getValue(this:Node):number

	{
		return this.value
	}


	get isActive(this:Node):boolean

	{
		return this.active
	}


	set setId(this:Node, newId:number)
	{
		this.id = newId
	}

	set setText(this:Node, newText:string[])
	{
		this.text = newText
	}


	set setImages(this:Node, newImages:string[])
	{
		this.images = newImages
	}


	set setAudio(this:Node, newAudio:string[])
	{
		this.audio = newAudio
	}


	set setPuzzles(this:Node, newPuzzles:string[])
	{
		this.puzzles = newPuzzles

	}


	set setApiData(this:Node, newApiData:[])

	{
		this.apiData = newApiData
	}


	set toggleActive(this:Node, activityState:boolean)

	{
		this.active = activityState
	}
}

