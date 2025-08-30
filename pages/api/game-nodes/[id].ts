import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../lib/db";
import GameNode from "../../../src/models/GameNode";

interface GameNode  {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const gameNode = await GameNode.findById(id);
        if (!gameNode) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: gameNode });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const gameNode = await GameNode.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!gameNode) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: gameNode });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedGameNode = await GameNode.deleteOne({ _id: id });
        if (!deletedGameNode) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
