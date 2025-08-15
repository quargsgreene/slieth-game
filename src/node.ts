export interface Node
{

	id:number,
	text: string[],
	images: string[],
	audio: string[],
	puzzles: string[],
	apiData: [],
	value: number,
	active:boolean

}



function getNodeId()
{

	return this.id

}


function getNodeText()
{

	return this.text

}


function getImages()
{

	return this.images

}

function getAudio()
{

	return this.audio

}


function getPuzzles()
{

	return this.puzzles

}


function getApiData()
{

	return this.apiData

}


function getValue()

{


	return this.value

}


function isActive()

{

	return this.active

}


function setId(newId:number)
{
	this.id = newId

}

function setText(newText:string[])
{

	this.text = newText

}


function setImages(newImages:string[])
{

	this.images = newImages

}


function setAudio(newAudio:string[])
{

	this.audio = newAudio

}


function setPuzzles(newPuzzles:string[])
{
	this.puzzles = newPuzzles

}


function setApiData(newApiData:[])

{

	this.apiData = newApiData

}


function setValue(newValue:number)

{

	this.value = newValue

}


function toggleActive(activityState:boolean)

{


	this.active = activityState


}



