import { getErrorMessage } from "@components/error_block/AppError";
import { useToast } from "@components/hooks/use-toast";
import { useState } from "react";
import { UserSummary } from "steamapi";
import { shuffleArray } from "../util/array-utils";
import { APIError, GameResponse } from "../util/types";

export const useSteamApi = () => {
  const [games, setGames] = useState<GameResponse[]>([]);
  const [user, setUser] = useState<UserSummary | null>(null);
  const [friendList, setFriendList] = useState<UserSummary[]>([]);
  const [error, setError] = useState<APIError | null>(null);
  const { toast } = useToast();

  const getFriendList = (user: UserSummary) => {
    if (user === null) return;
    fetchAPI("/api/friendList", {
      method: "POST", // Set the method to POST
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header to application/json
      },
      body: JSON.stringify({ steamId: user.steamID }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFriendList(data as UserSummary[]);
      })
      .catch((error) => {
        console.error("AppError fetching data:", error);
      });
  };

  const getCommonGames = (steamIds: string[] = []) => {
    fetchAPI("/api/commonGames", {
      method: "POST", // Set the method to POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ steamIds: steamIds }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error !== null) {
          toast({
            title: "Error",
            description: getErrorMessage(data.error.code),
            variant: "destructive",
          });
        }
        setGames(shuffleArray([...data.data]));
      })
      .catch((error) => {
        console.error("AppError fetching data:", error);
      });
  };

  const getUserData = (steamId: string) => {
    fetchAPI("/api/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ steamId: steamId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("AppError fetching data:", error);
      });
  };

  const fetchAPI = (input: string, init: RequestInit): Promise<Response> => {
    setError(null);
    return fetch(input, init);
  };
  return {
    getFriendList,
    friendList,
    getCommonGames,
    games,
    getUserData,
    user,
    error,
  };
};
