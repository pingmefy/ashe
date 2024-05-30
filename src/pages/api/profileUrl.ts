import type {NextApiRequest, NextApiResponse} from 'next';

export type ProfileUrlResponse = {
  steamId: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileUrlResponse | { error: string }>
) {
  try {
    const profileUrl = req.body.profileUrl;
    const params = new URLSearchParams({
      key: process.env.API_KEY || "",
      vanityurl: "frostfel",
    });
    const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?${params.toString()}`;
    console.log(url, "url")
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();
    res.status(200).json({steamId: json.response.steamid});
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error"});
  }
}

