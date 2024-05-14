import {useState} from "react";
import {UserSummary} from "steamapi";
import {GameResponse} from "../util/types";

export const useSteamApi = () => {
  const [games, setGames] = useState<GameResponse[]>([]);
  const [steamId, setSteamId] = useState<string | null>(null);
  const [user, setUser] = useState<UserSummary | null>(null);
  const [friendList, setFriendList] = useState<UserSummary[]>([]);

  const getFriendList = (user: UserSummary) => {
    if(user === null) return;
    fetch('/api/mockFriendList', {
      method: 'GET', // Set the method to POST
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type header to application/json
      },
    })
      .then(response => response.json())
      .then(data => {
        setFriendList(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const getCommonGames = (users: UserSummary[] = []) => {
    fetch('/api/mockCommonGames', {
      method: 'POST', // Set the method to POST
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type header to application/json
      },
      body: JSON.stringify({steamIds: ["76561197998388059"] })
    })
      .then(response => response.json())
      .then(data => {
        setGames(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const getUserData= (steamId: string) => {
    fetch('/api/mockUserData', {
      method: 'GET', // Set the method to POST
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type header to application/json
      },
    })
      .then(response => response.json())
      .then(data => {
        setUser(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  return {getFriendList, friendList, getCommonGames, games, getUserData, user}
}
