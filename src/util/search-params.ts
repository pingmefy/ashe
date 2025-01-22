import { SearchParams } from "./types";

export const getSelectedFriendsFromSearchParams = (
  searchParams: SearchParams,
): string[] => {
  const { f: friends } = searchParams;

  if (Array.isArray(friends)) {
    const uniqueFriends = new Set(friends);
    return Array.from(uniqueFriends);
  }

  if (typeof friends === "string") {
    return [friends];
  }

  return [];
};
