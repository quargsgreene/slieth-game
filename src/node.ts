export interface Node
{

	id:string,
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
