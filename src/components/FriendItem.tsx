"use client";
import React from "react";
import { AddIcon, CheckIcon } from "../resources/Icons";

type FriendItemProps = {
  avatar?: string;
  nickname?: string;
  selected?: boolean;
};
type EmptyFriendItemProps = {
  onClick: () => void;
};
const EmptyFriendItem = ({ onClick }: EmptyFriendItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex px-2.5 py-4 justify-center items-center flex-1 bg-primaryColor border-dashed border border-gray cursor-pointer`}
    >
      <div>
        <AddIcon />
      </div>
    </div>
  );
};
//todo onclick server action to add selected friends
export const FriendItem = ({ avatar, nickname, selected }: FriendItemProps) => {
  if (!avatar && !nickname) return <EmptyFriendItem onClick={() => null} />;
  return (
    <div
      onClick={() => null}
      className={`flex px-2.5 py-4 ${selected ? "border-2 border-highlightColor" : "border border-darkGray"} justify-between items-center flex-1 cursor-pointer`}
    >
      <div className={"flex gap-1.5 items-center"}>
        <img
          src={avatar}
          alt="user-avatar"
          className={"border-gray border-solid border w-[32px] h-[32px]"}
        />
        <span>{nickname}</span>
      </div>
      {selected ? <CheckIcon /> : null}
    </div>
  );
};
