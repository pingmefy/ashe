import React, {
  createContext,
  PropsWithChildren,
  useContext, useEffect, useState,
} from "react";
import {UserSummary} from "steamapi";
import {useSteamApi} from "../hooks/useSteamApi";
import {GameResponse} from "../util/types";

type AppContextType = {
  steamId: string | null;
  setSteamId: (steamId: string) => void;
  friendList: UserSummary[];
  getFriendList: (user: UserSummary) => void;
  user: UserSummary | null;
  games: GameResponse[];
  getCommonGames: (steamIds: string[]) => void;
  getUserData: (steamId: string) => void;
  selectedFriends: UserSummary[];
  setSelectedFriends: (friends: UserSummary[]) => void;
};

const defaultAppContext: AppContextType = {
  steamId: null,
  setSteamId: () => {
    return;
  },
  friendList: [],
  getFriendList: () => {
    return;
  },
  user: null,
  games: [],
  getCommonGames: () => {
    return;
  },
  getUserData: () => {
    return;
  },
  selectedFriends: [],
  setSelectedFriends: () => {
    return;
  },
};

export const AppContext = createContext(defaultAppContext);

const AppProvider = (props: PropsWithChildren<object>) => {
  const [steamId, setSteamId] = useState<string | null>(null);
  const {getCommonGames, getFriendList, games, friendList, getUserData, user} = useSteamApi();
  const [selectedFriends, setSelectedFriends] = React.useState<UserSummary[]>([])

  useEffect(() => {
    if(steamId === null) return;
    getUserData(steamId);
  }, [steamId]);

  useEffect(() => {
    if(user === null) return;
    setSelectedFriends([user])
    getFriendList(user)
  }, [user]);

  const memoGames = React.useMemo(() => games, [games])
  const memoSelectedFriends = React.useMemo(() => selectedFriends, [selectedFriends])


  return (
    <AppContext.Provider
      value={{
        steamId,
        setSteamId,
        friendList,
        getFriendList,
        user,
        games: memoGames,
        getCommonGames,
        getUserData,
        selectedFriends: memoSelectedFriends,
        setSelectedFriends,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
export type { AppContextType };
