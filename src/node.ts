export interface Node
{

	id:number,
	text?: string[],
	images?: string[],
	audio?: string[],
	puzzles?: string[],
	apiData?: [],
	layoutOption?: number,
	value: number,
	active:boolean

}



function getNodeId(this:Node)
{
	return this.id
}


function getNodeText(this:Node)
{
	return this.text
}


function getImages(this:Node)
{
	return this.images
}

function getAudio(this:Node)
{
	return this.audio
}


function getPuzzles(this:Node)
{
	return this.puzzles
}


function getApiData(this:Node)
{
	return this.apiData
}


function getValue(this:Node)

{
	return this.value
}


function isActive(this:Node)

{
	return this.active
}


function setId(this:Node, newId:number)
{
	this.id = newId
}

function setText(this:Node, newText:string[])
{
	this.text = newText
}


function setImages(this:Node, newImages:string[])
{
	this.images = newImages
}


function setAudio(this:Node, newAudio:string[])
{
	this.audio = newAudio
}


function setPuzzles(this:Node, newPuzzles:string[])
{
	this.puzzles = newPuzzles

}


function setApiData(this:Node, newApiData:[])

{
	this.apiData = newApiData
}


function toggleActive(this:Node, activityState:boolean)

{
	this.active = activityState
}



