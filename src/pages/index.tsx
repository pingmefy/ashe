import {ADSection} from "@components/ADSection";
import {Body} from "@components/Body";
import {Content} from "@components/Content";
import {Header} from "@components/Header";
import {Navbar} from "@components/Navbar";
import React, {useEffect, useState} from 'react';
import '../app/globals.css';
import {UserSummary} from "steamapi";
import {GameResponse} from "../util/types";
import 'react-roulette-pro/dist/index.css';

const Home = () => {
  const [games, setGames] = useState<GameResponse[]>([]);
  const [steamId, setSteamId] = useState<string | null>(null);
  const [user, setUser] = useState<UserSummary | null>(null);
  //TODO: edit this to only trigger when steamId changes
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if(steamId !== null){
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
  }, [steamId]);
  return (
    <div className={"flex flex-col min-h-[100vh]"}>
      <Navbar setSteamId={setSteamId}/>
      <Header/>
      <Content>
        <ADSection/>
        <Body games={games} friends={[]} user={user}/>
        <ADSection/>
      </Content>
    </div>
  );
}

export default Home;
