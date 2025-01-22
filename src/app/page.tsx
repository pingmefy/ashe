"use server"
import {BodyTitle} from "@components/BodyTitle";
import SteamIdForm from "@components/form/SteamIdForm";
import Image from 'next/image';
import React from 'react';

const HomePage = () => {
  return (
    <div className={"w-full m-auto lg:m-0 lg:w-[58%] bg-primaryColor h-full flex"}>
      <div className={" w-full h-full flex flex-col items-center gap-[0.75rem] z-20 relative"}>
        <BodyTitle/>
        <div className={"text-center flex flex-col gap-8"}>
          <h1 className={"text-3xl font-bold"}>Paste here your steam <span className={"text-highlightColor"}>profile</span></h1>
          <SteamIdForm/>
        </div>
      </div>
      <div className={"footer-img z-0"}>
        <Image src="/bg-bottom.png" alt="Background" width={760} height={299}/>
      </div>
    </div>
  )
}

export default HomePage;
