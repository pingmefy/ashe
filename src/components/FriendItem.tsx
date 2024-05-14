import React from "react";
import { UserSummary } from "steamapi";
import {AddIcon, CheckIcon} from "../resources/Icons";

type FriendItemProps = {
  user?: UserSummary
  selected?: boolean
}
const EmptyFriendItem = () => {
  return (
    <div
      className={`flex px-2.5 py-4 justify-center items-center flex-1 bg-primaryColor border-dashed border border-gray cursor-pointer`}>
      <div>
        <AddIcon/>
      </div>
    </div>
  )
}
export const FriendItem = ({user, selected}: FriendItemProps) => {
  if (!user) return <EmptyFriendItem/>
  return (
    <div
      className={`flex px-2.5 py-4 ${selected ? "border-2 border-highlightColor" : "border border-darkGray"} justify-between items-center flex-1 cursor-pointer`}>
      <div className={"flex gap-1.5 items-center"}>
        <img src={user.avatar.medium} alt="user-avatar"
             className={"border-gray border-solid border w-[32px] h-[32px]"}/>
        <span>{user.nickname}</span>
      </div>
      {selected ? <CheckIcon/> : null}
    </div>
  )
}
