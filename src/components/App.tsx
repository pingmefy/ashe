import {ADSection} from "@components/ADSection";
import {Body} from "./body/Body";
import {Content} from "@components/Content";
import {Header} from "@components/Header";
import {Navbar} from "@components/Navbar";
import React from 'react';
import '../styles/globals.css';
import {useAppContext} from "../context/AppContext";
import 'react-roulette-pro/dist/index.css';

export const App = () => {
  const { friendList, user} = useAppContext();

  return (
    <div className={"flex flex-col min-h-[100vh]"}>
      <Navbar/>
      <Header/>
      <Content>
        <ADSection/>
        <Body friends={friendList} user={user}/>
        <ADSection/>
      </Content>
    </div>
  );
}

export default App;
