"use server";
import SteamAPI, { UserFriend, UserSummary } from "steamapi";

/**
 * Gets user friends
 */
const getUserFriends = async (steamId: string): Promise<UserSummary[]> => {
  try {
    const steam = new SteamAPI(process.env.API_KEY || "");
    const userFriends = await getUsers(steamId, steam);
    if (userFriends.length === 0) return [];
    const steamIds = userFriends.map((userFriend) => userFriend.steamID);
    let summaries = await steam.getUserSummary(steamIds);
    if (Array.isArray(summaries))
      summaries = summaries.sort((a, b) =>
        a.nickname.localeCompare(b.nickname),
      );
    return summaries as UserSummary[];
  } catch (error: unknown) {
    console.error("Error fetching user friends:", error);
    return [];
  }
};

const getUsers = async (steamID: string, steam: SteamAPI) => {
  const userFriends: UserFriend[] = await steam.getUserFriends(steamID);
  return userFriends ? userFriends : [];
};

export default getUserFriends;
