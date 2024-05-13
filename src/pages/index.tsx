import {ADSection} from "@components/ADSection";
import {Body} from "@components/Body";
import {Content} from "@components/Content";
import {Header} from "@components/Header";
import {Navbar} from "@components/Navbar";
import React from 'react';
import '../app/globals.css';
const Home = () => {
  return (
    <div className={"flex flex-col min-h-[100vh]"}>
      <Navbar/>
      <Header/>
      <Content>
        <ADSection/>
        <Body/>
        <ADSection/>
      </Content>
    </div>
  );
}

export default Home;
