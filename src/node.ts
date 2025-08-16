export class Node
{
	constructor(
		id:number,
		text:string[],
		images:string[],
		audio:string[],
		puzzles:string[],
		apiData:[],
		layoutOption:number,
		value:number,
		active:boolean
	){}

	getNodeId(this:Node)
	{
		return this.id
	}


	getNodeText(this:Node)
	{
		return this.text
	}


	getImages(this:Node)
	{
		return this.images
	}

	getAudio(this:Node)
	{
		return this.audio
	}


	getPuzzles(this:Node)
	{
		return this.puzzles
	}


	getApiData(this:Node)
	{
		return this.apiData
	}


	getValue(this:Node)

	{
		return this.value
	}


	isActive(this:Node)

	{
		return this.active
	}


	setId(this:Node, newId:number)
	{
		this.id = newId
	}

	setText(this:Node, newText:string[])
	{
		this.text = newText
	}


	setImages(this:Node, newImages:string[])
	{
		this.images = newImages
	}


	setAudio(this:Node, newAudio:string[])
	{
		this.audio = newAudio
	}


	setPuzzles(this:Node, newPuzzles:string[])
	{
		this.puzzles = newPuzzles

	}


	setApiData(this:Node, newApiData:[])

	{
		this.apiData = newApiData
	}


	toggleActive(this:Node, activityState:boolean)

	{
		this.active = activityState
	}
}

