import type {NextApiRequest, NextApiResponse} from 'next';
import SteamAPI, {
  Game, GameInfo, GameInfoExtended, UserPlaytime, UserSummary
} from 'steamapi';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | { error: string }>
) {
  try {
    const steam = new SteamAPI(process.env.API_KEY || "");
    const steamIds: string[] = req.body.steamIds;
    const games: UserPlaytime<Game | GameInfo | GameInfoExtended>[][] = []
    const commonGames: UserPlaytime<Game | GameInfo | GameInfoExtended>[] = []
    for (let steamId of steamIds) {
      const userGames = await steam.getUserOwnedGames(steamId);
        games.push(userGames);
    }
    if(games.length === 0) res.status(200).json([]);
    commonGames.push(...games[0].filter((item) => games.every((game) => game.some((gameItem) => gameItem.game.id === item.game.id))));
    const response = await Promise.all(commonGames.map(async (game) => {
      try{
      const gameDetail = await steam.getGameDetails(game.game.id);
      return {
        coverUrl: game.game.coverURL,
        ...gameDetail
      }
      }catch (error: unknown) {
        console.error("Error fetching game details for appId:", game.game.id);
      }
    }));
    const filteredResponse = response.filter(item =>
      item && item.categories && item.categories.some(category => category.id === 1)
    );
    res.status(200).json(filteredResponse);
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error"});
  }
}
