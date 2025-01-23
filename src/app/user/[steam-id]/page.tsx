"use server";

import { FriendItem } from "@components/FriendItem";
import { GamesContainer } from "@components/GamesContainer";
import React from "react";
import { UserSummary } from "steamapi";
import getUserData from "../../../actions/get-user-data";
import "react-roulette-pro/dist/index.css";
import getUserFriends from "../../../actions/get-user-friends";
import { getGridClassForFriends } from "../../../util/grid-utils";
import { getSelectedFriendsFromSearchParams } from "../../../util/search-params";
import { SearchParams, SteamIdParams } from "../../../util/types";

type Props = {
  params: SteamIdParams;
  searchParams: SearchParams;
};

const UserPage = async (props: Props) => {
  const { params, searchParams } = props;
  const { "steam-id": steamId } = params;
  //todo cache data that wont change, user and friends
  const user: UserSummary = await getUserData(steamId);
  const friends: UserSummary[] = await getUserFriends(steamId);
  const selectedFriendIds: string[] =
    getSelectedFriendsFromSearchParams(searchParams);
  const selectedFriends: UserSummary[] = friends.filter((friend) =>
    selectedFriendIds.includes(friend.steamID),
  );
  const friendListVisible: boolean = true; //todo implement
  return (
    <>
      <GamesContainer
        selectedFriendSteamIds={[...selectedFriendIds, steamId]}
      />
      <div
        className={"bg-primaryColorDark mx-0 my-10 lg:m-10 p-4 flex flex-col"}
      >
        <span className={"text-white m-auto"}>
          choose the friends you want to play with
        </span>
        <div className={"flex gap-2 p-4 overflow-auto"}>
          <FriendItem
            key={user.steamID}
            steamId={user.steamID}
            avatar={user.avatar.medium}
            nickname={user.nickname}
            selected={true}
          />
          {selectedFriends.map((user) => {
            return (
              <FriendItem
                key={user.steamID}
                steamId={user.steamID}
                avatar={user.avatar.medium}
                nickname={user.nickname}
                selected={true}
              />
            );
          })}
          {selectedFriends.length < 3 && <FriendItem />}
        </div>
        {friendListVisible && (
          <div className={"flex flex-col gap-4 pt-0 p-4"}>
            <div className={"h-[1px] bg-greenPrimary w-[90%] m-auto"} />
            <div className={`grid ${getGridClassForFriends(friends)} gap-4`}>
              {friends.map((friend, index) => {
                return (
                  <FriendItem
                    key={index}
                    steamId={friend.steamID}
                    avatar={friend.avatar.medium}
                    nickname={friend.nickname}
                    selected={selectedFriendIds.includes(friend.steamID)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserPage;
