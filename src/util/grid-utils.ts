import {UserSummary} from "steamapi";

export const getGridClassForFriends = (friends: UserSummary[]) => {
  switch (friends.length) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-1 lg:grid-cols-2";
    case 3:
      return "grid-cols-1 lg:grid-cols-3";
    case 4:
    default:
      return "grid-cols-1 lg:grid-cols-4";
  }
};
