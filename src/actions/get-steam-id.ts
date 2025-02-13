"use server";

import { redirect } from "next/navigation";
import paths from "../paths";
import {
  getKeyFromProfileUrl,
  getSteamIdFromUrl,
  isCustomProfileUrl,
  isValidSteamProfile,
} from "../util/ProfileUrlUtils";

const getSteamIdFromProfile = async (profileUrl: string) => {
  const params = new URLSearchParams({
    key: process.env.API_KEY || "",
    vanityurl: profileUrl,
  });
  const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?${params.toString()}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();
  return { steamId: json.response.steamid };
};

/**
 * Gets user steam id by profile url
 */
const getSteamId = async (profileUrl: string) => {
  console.log("Getting steam id");
  if (!isValidSteamProfile(profileUrl)) return; //todo show error instead
  let steamId;
  if (isCustomProfileUrl(profileUrl)) {
    const result = await getSteamIdFromProfile(
      getKeyFromProfileUrl(profileUrl),
    );
    steamId = result.steamId;
  } else {
    steamId = getSteamIdFromUrl(profileUrl);
  }
  redirect(paths.userPage(steamId));
};

export default getSteamId;
