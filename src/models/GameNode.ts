import mongoose from "mongoose";

export interface GameNodes extends mongoose.Document {
	node_id:number,
	text:string[],
	node_images:string[],
	audio:string[],
	puzzles:string[],
	apiData:unknown[],
	layoutOption:number,
	value:number,
	active:boolean
}

const GameNodeSchema = new mongoose.Schema<GameNodes>(
{
	node_id: {
		type: Number,
		required: [true, "Please increment the id for this node."],
		min: 0,
		max: 1000
	},

	text: {
		type: [String]
	},

	node_images: {
		type: [String]
	},

	audio: {
		type: [String]
	},

	puzzles: {
		type: [String]
	},

	apiData: {
		type: [mongoose.Schema.Types.Mixed]
	},
	layoutOption: {
		type: Number,
		required: [true, "Please select a page layout option for this node."],
		min: 1,
		max: 4
	},
	value: {
		type:Number
	},
	active: {
		type:Boolean,
		required: [true, "Please specify an activity state for this node."]
	}
}

)

export default mongoose.models.GameNode || mongoose.model<GameNodes>("GameNode", GameNodeSchema);
