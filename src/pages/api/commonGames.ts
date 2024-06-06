import {MongoClient} from "mongodb";
import type {NextApiRequest, NextApiResponse} from 'next';
import {logger} from "../../util/logger";
import {APIGameResponse} from "../../util/types";

const PRIVACY_ERROR_MESSAGE_KEY = "PRIVACY_ERROR_MESSAGE"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const steamIds: string[] = req.body.steamIds;
    const mongoClient = new MongoClient(process.env.MONGODB_URI || "");
    await mongoClient.connect();
    const db = mongoClient.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection(process.env.DB_COLLECTION || "steamApps");
    const results = await Promise.all(steamIds.map(fetchGames));
    const privacyError = results.find((result) => result.length === 0);

    const commonGames = results.filter((result) => result.length > 0 )
      .reduce((common, games) => common.filter(game => games.includes(game)));

    const query = {appid: {$in: commonGames}};
    let result = await collection.find(query).toArray();
    result = result.filter((game) => game.categories.supported_player_categoryids.includes(1)).map((game) => ({
      ...game,
      coverUrl: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/library_600x900_2x.jpg`,
    }))
    const response = {
      data: result,
      error: privacyError ? PRIVACY_ERROR_MESSAGE_KEY : null
    }
    res.status(200).json(response)

  } catch (error: unknown) {
    res.status(500).json({error: error instanceof Error ? error.message : "Unknown error"});
  }
}

const fetchGames = async (steamId: string): Promise<string[]> => {
  try {
    logger.info(`Fetching games for user with steamId ${steamId}`)
    const params = new URLSearchParams({
      steamid: steamId,
      include_appinfo: 'false',
      key: process.env.API_KEY || "",
      include_played_free_games: 'true',
      include_free_sub: 'true',
      language: 'english',
    });
    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json() as APIGameResponse;
    logger.info(`Fetched ${json.response.games.length} games for user with steamId ${steamId}`)
    return json.response.games.map((data) => data.appid);
  } catch (e: unknown) {
    logger.error(`Failed to get games for user with steamId ${steamId}`)
    return []
  }
};
