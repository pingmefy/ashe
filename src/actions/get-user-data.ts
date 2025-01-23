"use server";
import SteamAPI, {UserSummary} from "steamapi";

/**
 * Gets user data from steamId
 */
const getUserData = async (steamId: string): Promise<UserSummary> => {
  const steam = new SteamAPI(process.env.API_KEY || "");
  const userData = await steam.getUserSummary(steamId);
  let data: UserSummary
  if(Array.isArray(userData)){
    data = (userData as UserSummary[])[0]
  } else {
    data = userData as UserSummary
  }
  return data
};

export default getUserData;
