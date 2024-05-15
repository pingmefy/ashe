import React, {useMemo} from "react";
import {UserSummary} from "steamapi";
import {FriendItem} from "./FriendItem";
import {FriendList} from "./FriendList";

type FriendsSectionProps = {
  friends: UserSummary[]
  user: UserSummary
}

export const FriendsSection = ({friends, user}: FriendsSectionProps) => {
  const [friendListVisible, setFriendListVisible] = React.useState(false)
  const [selectedFriends, setSelectedFriends] = React.useState<UserSummary[]>([user])
  const selectedIds = useMemo(() => selectedFriends.map(friend => friend.steamID), [selectedFriends])


  const handleClickOnFriend = (friend: UserSummary) => {
    if(selectedIds.includes(friend.steamID) && friend.steamID !== user.steamID) {
      setSelectedFriends(selectedFriends.filter(friend => friend.steamID !== friend.steamID))
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
        {selectedFriends.map((user) => {
          return <FriendItem key={user.steamID} user={user} selected={true} onClick={() => handleClickOnFriend(user)}/>
        })}
        {friends.length < 4 && <FriendItem  onClick={() => setFriendListVisible((prevState) => !prevState)}/>}
      </div>
      { friendListVisible &&
          <FriendList friends={friends} selectedFriendIds={selectedIds} onFriendClick={manageSelectFriend}/>
      }
    </div>
  )
}
