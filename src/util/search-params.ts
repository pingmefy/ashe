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

export const isFriendSelected = (
  selectedFriendIds: string[],
  friendId: string,
) => {
  return (
    selectedFriendIds.filter(
      (selectedFriendId) => selectedFriendId === friendId,
    ).length > 0
  );
};

export const convertURLSearchParamsToSearchParams = (
  urlSearchParams: URLSearchParams | null,
): SearchParams => {
  if (!urlSearchParams) return {};
  const searchParams: SearchParams = {};

  urlSearchParams.forEach((value, key) => {
    if (searchParams[key]) {
      if (Array.isArray(searchParams[key])) {
        (searchParams[key] as string[]).push(value);
      } else {
        searchParams[key] = [searchParams[key] as string, value];
      }
    } else {
      searchParams[key] = value;
    }
  });

  return searchParams;
};
