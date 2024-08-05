import type {NextApiRequest, NextApiResponse} from 'next';
import SteamAPI, {UserSummary} from 'steamapi';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserSummary | { error: string }>
) {
  try {
    const steam = new SteamAPI(process.env.API_KEY || "");
    const steamId = req.body.steamId.toString();
    const userData = await steam.getUserSummary(steamId);
    res.status(200).json(userData as UserSummary);
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error"});
  }
}
