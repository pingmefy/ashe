import {useState} from "react";
import {UserSummary} from "steamapi";
import {GameResponse} from "../util/types";

export const useSteamApi = () => {
  const [games, setGames] = useState<GameResponse[]>([]);
  const [user, setUser] = useState<UserSummary | null>(null);
  const [friendList, setFriendList] = useState<UserSummary[]>([]);

  const getFriendList = (user: UserSummary) => {
    if(user === null) return;
    fetch('/api/friendList', {
      method: 'POST', // Set the method to POST
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type header to application/json
      },
      body: JSON.stringify({steamId: user.steamID})
    })
      .then(response => response.json())
      .then(data => {
        if(data.error) return;
        setFriendList(data as UserSummary[]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const getCommonGames = (steamIds: string[] = []) => {
    fetch('/api/commonGames', {
      method: 'POST', // Set the method to POST
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type header to application/json
      },
      body: JSON.stringify({steamIds: steamIds })
    })
      .then(response => response.json())
      .then(data => {
        setGames(data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const getUserData = (steamId: string) => {
    fetch('/api/userData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({steamId: steamId})
    })
      .then(response => response.json())
      .then(data => {
        if(data.error) return;
        setUser(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const getSteamIdFromProfile = async (profileUrl: string) => {
    const response = await fetch('/api/profileUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({profileUrl: profileUrl})
    })
    return await response.json();
  }
  return {getFriendList, friendList, getCommonGames, games, getUserData, user, getSteamIdFromProfile}
}
