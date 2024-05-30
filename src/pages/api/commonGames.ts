import {MongoClient} from "mongodb";
import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | { error: string }>
) {
  try {
    const mongoClient =  new MongoClient(process.env.MONGODB_URI || "");
    await mongoClient.connect();
    const steamIds: string[] = req.body.steamIds;


    const fetchGames = async (steamId: string) => {
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

      const json = await response.json();
      return json.response.games.map((data) => data.appid);
    };

    let results = await Promise.all(steamIds.map(fetchGames));
    results = results.reduce((common, games) => common.filter(game => games.includes(game)));

    const db = mongoClient.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection(process.env.DB_COLLECTION || "steamApps");
    const query = { appid: { $in: results } };
    let result = await collection.find(query).toArray();
    result = result.filter((game) => game.categories.supported_player_categoryids.includes(1));
    result = result.map((game) => ({
      ...game,
      coverUrl: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/library_600x900_2x.jpg`,
    }))
    res.status(200).json(result)

  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error"});
  }
}
