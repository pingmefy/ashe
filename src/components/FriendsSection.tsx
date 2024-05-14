import React, {useMemo} from "react";
import {UserSummary} from "steamapi";
import {mockUser, mockUserSummaries} from "../util/mocks/Friends";
import {FriendItem} from "./FriendItem";
import {FriendList} from "./FriendList";


export const FriendsSection = () => {
  const [friendListVisible, setFriendListVisible] = React.useState(false)
  const [selectedFriends, setSelectedFriends] = React.useState<UserSummary[]>([mockUser])
  const selectedIds = useMemo(() => selectedFriends.map(friend => friend.steamID), [selectedFriends])

  const handleClickOnFriend = (user: UserSummary) => {
    if(selectedIds.includes(user.steamID) && user.steamID !== mockUser.steamID) {
      setSelectedFriends(selectedFriends.filter(friend => friend.steamID !== user.steamID))
    }
  };

  const manageSelectFriend = (user: UserSummary) => {
    if(selectedIds.includes(user.steamID)) {
      setSelectedFriends(selectedFriends.filter(friend => friend.steamID !== user.steamID))
    } else {
      setSelectedFriends([...selectedFriends, user])
    }

  };

  return (
    <div className={"bg-primaryColorDark m-10 p-4 flex flex-col"}>
      <span className={"text-white m-auto"}>choose the friends you want to play with</span>
      <div className={"flex gap-2 p-4"}>
        {selectedFriends.map((user, index) => {
          return <FriendItem key={index} user={user} selected={true} onClick={() => handleClickOnFriend(user)}/>
        })}
        {mockUserSummaries.length < 4 && <FriendItem  onClick={() => setFriendListVisible((prevState) => !prevState)}/>}
      </div>
      { friendListVisible &&
          <FriendList friends={mockUserSummaries} selectedFriendIds={selectedIds} onFriendClick={manageSelectFriend}/>
      }
    </div>
  )
}
