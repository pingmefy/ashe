import type {NextApiRequest, NextApiResponse} from 'next';
import SteamAPI, {
} from 'steamapi';
import {GameResponse} from "../../util/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse< GameResponse[] | { error: string }>
) {
  try {
    const steam = new SteamAPI(process.env.API_KEY || "");
    const response: GameResponse[] = []
    for (let i = 0; i < 20; i++) {
      response.push({coverUrl: "https://placehold.co/600x900"})
    }
    res.status(200).json(response);
  } catch (error: unknown) {
    console.error("Error fetching common games:", error instanceof Error ? error.message : "Unknown error")
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error"});
  }
}
