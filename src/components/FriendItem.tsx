"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { AddIcon, CheckIcon } from "../resources/Icons";
import {
  convertURLSearchParamsToSearchParams,
  getSelectedFriendsFromSearchParams,
  isFriendSelected,
} from "../util/search-params";

type FriendItemProps = {
  avatar?: string;
  nickname?: string;
  selected?: boolean;
  steamId?: string;
};
type EmptyFriendItemProps = {
  onClick: () => void;
};
const EmptyFriendItem = ({ onClick }: EmptyFriendItemProps) => {
  // TODO implement onclick, it should display or not the friend list, save on search params
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

export const FriendItem = ({
  avatar,
  nickname,
  selected,
  steamId,
}: FriendItemProps) => {
  const searchParams = useSearchParams();
  const selectedFriends = getSelectedFriendsFromSearchParams(
    convertURLSearchParamsToSearchParams(searchParams),
  );
  const router = useRouter();
  const pathname = usePathname();
  const newSearchParams = new URLSearchParams(searchParams?.toString());
  const handleSelectedChange = (friendId?: string) => {
    if (!friendId || (!selected && selectedFriends.length === 3)) return;
    if (isFriendSelected(selectedFriends, friendId)) {
      newSearchParams.delete("f", friendId);
    } else {
      newSearchParams.append("f", friendId);
    }

    router.replace(pathname + "?" + newSearchParams.toString(), {
      scroll: false,
    });
  };
  if (!avatar && !nickname) return <EmptyFriendItem onClick={() => null} />;
  return (
    <div
      onClick={() => handleSelectedChange(steamId)}
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
    </div>
  );
};
