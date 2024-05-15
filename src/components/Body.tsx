import React from "react";
import {UserSummary} from "steamapi";
import {GameResponse} from "../util/types";
import {BodyTitle} from "./BodyTitle";
import {FriendsSection} from "./FriendsSection";
import {GamesContainer} from "./GamesContainer";
import {LoginButton} from "./LoginButton";

type BodyProps = {
  games: GameResponse[]
  friends: UserSummary[]
  user?: UserSummary | null
}

const UnAuthBlock = () => {
  return(
    <div className={"bg-primaryColorDark border-2 border-highlightColor flex items-center justify-center m-10 p-4"}>
        <LoginButton text={"Login with Steam"} onClick={() => null} colorClass={"bg-highlightColor"}/>
    </div>
  )
}

export const Body = ({games, friends, user}: BodyProps) => {
  return (
    <div className={" w-[58%] bg-primaryColor h-full"}>
      <BodyTitle/>
      <GamesContainer games={games}/>
      {
        user ? <FriendsSection friends={friends} user={user} /> : <UnAuthBlock/>
      }
    </div>
  )
}
