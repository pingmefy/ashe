import React, {useMemo} from "react";
import {UserSummary} from "steamapi";
import {mockUser, mockUserSummaries} from "../util/mocks/Friends";
import {FriendItem} from "./FriendItem";
import {FriendList} from "./FriendList";


export const FriendsSection = () => {
  const [friendListVisible, setFriendListVisible] = React.useState(false)
  const [selectedFriends, setSelectedFriends] = React.useState<UserSummary[]>([mockUser])
  const selectedIds = useMemo(() => selectedFriends.map(friend => friend.steamID), [selectedFriends])
  return (
    <div className={"bg-primaryColorDark m-10 p-4 flex flex-col"}>
      <span className={"text-white m-auto"}>choose the friends you want to play with</span>
      <div className={"flex gap-2 p-4"}>
        {selectedFriends.map((user, index) => {
          return <FriendItem key={index} user={user} selected={true} onClick={() => null}/>
        })}
        {mockUserSummaries.length < 4 && <FriendItem  onClick={() => setFriendListVisible((prevState) => !prevState)}/>}
      </div>
      { friendListVisible &&
          <FriendList friends={mockUserSummaries} selectedFriendIds={selectedIds}/>
      }
    </div>
  )
}
