import type {NextApiRequest, NextApiResponse} from 'next';
import SteamAPI, {UserFriend, UserSummary,} from 'steamapi';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserSummary[] | { error: string }>
) {
  try {
    const steam = new SteamAPI(process.env.API_KEY || "");
    const steamId = req.body.steamId;
    const userFriends = await getUsers(steamId, steam);
    if(userFriends.length === 0) res.status(200).json([]);
    const steamIds = userFriends.map((userFriend) => userFriend.steamID)
    let summaries = await steam.getUserSummary(steamIds);
    if(Array.isArray(summaries))summaries = summaries.sort((a, b) => a.nickname.localeCompare(b.nickname))
    res.status(200).json(summaries as UserSummary[]);
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error"});
  }
}

const getUsers = async (steamID: string, steam: SteamAPI) => {
  const userFriends: UserFriend[] = await steam.getUserFriends(steamID);
  return userFriends ? userFriends : [];
}
