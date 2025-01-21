export const getSteamIdFromUrl = (url: string): string => {
  if(isSteamId(url)) {
    return url;
  }
  if(isProfileUrl(url)) {
    return getKeyFromProfileUrl(url);
  }
  return "";
}

const isSteamId = (text: string): boolean => {
  return text.length === 17 && !isNaN(Number(text));

}

const isProfileUrl = (text: string): boolean => {
  return text.includes('steamcommunity.com/profiles/');
}

export const isCustomProfileUrl = (text: string): boolean => {
  return text.includes('steamcommunity.com/id/');
}

export const isValidSteamProfile = (text: string): boolean => {
  return isSteamId(text) || isProfileUrl(text) || isCustomProfileUrl(text);
}

export const getKeyFromProfileUrl = (url: string): string => {
  const formattedUrl = url.endsWith("/") ? url.slice(0, -1) : url;
  const splitUrl = formattedUrl.split('/');
  return splitUrl[splitUrl.length - 1];
}
