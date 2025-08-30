import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db";
import GameNode from "../../../src/models/GameNode";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const GameNodeDataGet = await GameNode.find({}); /* find all the data in our database */
        res.status(200).json({ success: true, data: GameNode });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const GameNodeDataPost = await GameNode.create(
          req.body,
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: GameNode });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
