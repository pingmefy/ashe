import {ADSection} from "@components/ADSection";
import {Body} from "@components/Body";
import {Content} from "@components/Content";
import {Header} from "@components/Header";
import {Navbar} from "@components/Navbar";
import React, {useEffect, useMemo, useState} from 'react';
import '../app/globals.css';
import {useSteamApi} from "../hooks/useSteamApi";
import 'react-roulette-pro/dist/index.css';

const Home = () => {
  const [steamId, setSteamId] = useState<string | null>(null);
  const {getCommonGames, getFriendList, games, friendList, getUserData, user} = useSteamApi();
  const friends = useMemo(() => friendList, [friendList]);
  useEffect(() => {
    if(friends.length === 0) return;
    getCommonGames();
  }, [friends, getCommonGames]);

  useEffect(() => {
    if(steamId === null) return;
    getUserData(steamId);
  }, [steamId, getUserData]);

  useEffect(() => {
    if(user === null) return;
    getFriendList(user)
  }, [user, getFriendList]);
  return (
    <div className={"flex flex-col min-h-[100vh]"}>
      <Navbar setSteamId={setSteamId}/>
      <Header/>
      <Content>
        <ADSection/>
        <Body games={games} friends={friendList} user={user}/>
        <ADSection/>
      </Content>
    </div>
  );
}

export default Home;
