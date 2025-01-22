"use server"

import {FriendsSection} from "@components/FriendsSection";
import {GamesContainer} from "@components/GamesContainer";
import React from "react";
import {UserSummary} from "steamapi";
import getUserData from "../../../actions/get-user-data";
import 'react-roulette-pro/dist/index.css';

const UserPage = async () => {
  const user: UserSummary  = await getUserData("76561197998388059")
  //todo get selectedFriends from search params
  return (
    <>
      <GamesContainer selectedFriendSteamIds={[]}/>
      <FriendsSection friends={[]}  user={user} />
    </>
  )
}

export default UserPage
