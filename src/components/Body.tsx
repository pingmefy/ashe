import React from "react";
import {UserSummary} from "steamapi";
import {BodyTitle} from "./BodyTitle";
import {FriendsSection} from "./FriendsSection";
import {GamesContainer} from "./GamesContainer";
import {LoginButton} from "./LoginButton";

type BodyProps = {
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

const BodyContent = ({friends, user}: {friends: UserSummary[], user: UserSummary}) => {
  return(
    <div>

      <GamesContainer/>
      <FriendsSection friends={friends} user={user} />
    </div>
  )
}

export const Body = ({friends, user}: BodyProps) => {
  return (
    <div className={" w-[58%] bg-primaryColor h-full"}>
      <BodyTitle/>
      {
        user ? <BodyContent user={user} friends={friends}/> : <UnAuthBlock/>
      }
    </div>
  )
}
