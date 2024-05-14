import React from "react";
import {UserSummary} from "steamapi";
import {FriendItem} from "./FriendItem";

type FriendListProps = {
  friends: UserSummary[];
  selectedFriendIds: string[];
}

const getGridClass = (friends: UserSummary[]) => {
  switch (friends.length) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
      default:
        return "grid-cols-";
  }
};

export const FriendList = ({friends, selectedFriendIds}: FriendListProps) => {
  return(
    <div className={"flex flex-col gap-4 p-4"}>
      <div className={"h-[1px] bg-greenPrimary w-[90%] m-auto"}/>
      <div className={`grid ${getGridClass(friends)} gap-4`}>
        {friends.map((friend, index) => {
          return <FriendItem key={index} user={friend} selected={selectedFriendIds.includes(friend.steamID)}/>
        })}
      </div>
    </div>
  )
}
