import React, {useMemo} from "react";
import {UserSummary} from "steamapi";
import {useAppContext} from "../context/AppContext";
import {FriendItem} from "./FriendItem";
import {FriendList} from "./FriendList";

type FriendsSectionProps = {
  friends: UserSummary[]
  user: UserSummary
}
//todo server-side friend selection to search params, also load friends from user, get steamId from path or props as pure string
//todo bring friendList to this file, reducing complexity
//todo friend item can also live here

export const FriendsSection = ({friends, user,}: FriendsSectionProps) => {
  const [friendListVisible, setFriendListVisible] = React.useState(false)
  const {selectedFriends, setSelectedFriends} = useAppContext()
  const selectedIds = useMemo(() => selectedFriends.map(friend => friend.steamID), [selectedFriends])

  const handleClickOnFriend = (selectedFriend: UserSummary) => {
    if(selectedIds.includes(selectedFriend.steamID) && selectedFriend.steamID !== user.steamID) {
      setSelectedFriends(selectedFriends.filter(friend => friend.steamID !== selectedFriend.steamID))
    }
  };

  const manageSelectFriend = (selectedFriend: UserSummary) => {
    if(selectedIds.length === 4) return;
    if(selectedIds.includes(selectedFriend.steamID)) {
      setSelectedFriends(selectedFriends.filter(friend => friend.steamID !== selectedFriend.steamID))
    } else {
      setSelectedFriends([...selectedFriends, selectedFriend])
    }
  };

  return (
    <div className={"bg-primaryColorDark mx-0 my-10 lg:m-10 p-4 flex flex-col"}>
      <span className={"text-white m-auto"}>choose the friends you want to play with</span>
      <div className={"flex gap-2 p-4 overflow-auto"}>
        {selectedFriends.map((user) => {
          return <FriendItem key={user.steamID} user={user} selected={true} onClick={() => handleClickOnFriend(user)}/>
        })}
        {selectedFriends.length < 4 && <FriendItem  onClick={() => setFriendListVisible((prevState) => !prevState)}/>}
      </div>
      { friendListVisible &&
          <FriendList friends={friends} selectedFriendIds={selectedIds} onFriendClick={manageSelectFriend}/>
      }
    </div>
  )
}
