import React from "react";
import {mockUserSummaries} from "../util/mocks/Friends";
import {FriendItem} from "./FriendItem";


export const SelectFriendsContainer = () => {
  return (
    <div className={"bg-primaryColorDark m-10 p-4 flex flex-col"}>
      <span className={"text-white m-auto"}>choose the friends you want to play with</span>
      <div className={"flex gap-2 p-4"}>
        {mockUserSummaries.map((user, index) => {
          return <FriendItem key={index} user={user} selected={index === 1}/>
        })}
        {mockUserSummaries.length < 4 && <FriendItem />}
      </div>
    </div>
  )
}
