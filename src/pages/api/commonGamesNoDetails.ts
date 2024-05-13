import type {NextApiRequest, NextApiResponse} from 'next';
import SteamAPI, {
  Game, GameInfo, GameInfoExtended, UserPlaytime, UserSummary
} from 'steamapi';
import {GameResponse} from "../../util/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse< GameResponse[] | { error: string }>
) {
  try {
    const steam = new SteamAPI(process.env.API_KEY || "");
    const steamIds: string[] = req.body.steamIds;
    const games: UserPlaytime<Game | GameInfo | GameInfoExtended>[][] = []
    const commonGames: UserPlaytime<Game | GameInfo | GameInfoExtended>[] = []
    for (let steamId of steamIds) {
      try{
        const userGames = await steam.getUserOwnedGames(steamId);
        games.push(userGames);
      }catch (error: unknown){
        console.error("Error fetching games for :", steamId);
      }
    }
    if(games.length === 0) res.status(200).json([]);
    commonGames.push(...games[0].filter((item) => games.every((game) => game.some((gameItem) => gameItem.game.id === item.game.id))));
    const response = commonGames.map(async (game) => {
      try{
        return {
          coverUrl: "https://placehold.co/400x600",
        }
      }catch (error: unknown) {
        console.error("Error: ", error.message);
      }
    });
    res.status(200).json(response);
  } catch (error: unknown) {
    console.error("Error fetching common games:", error instanceof Error ? error.message : "Unknown error")
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error"});
  }
}
