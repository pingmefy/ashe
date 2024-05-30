import {FriendsSection} from "../FriendsSection";
import {GamesContainer} from "../GamesContainer";
import {BodyContentProps} from "./BodyContent.types";

export const BodyContent = ({friends, user}: BodyContentProps) => {
  return(
    <div>
      <GamesContainer/>
      <FriendsSection friends={friends} user={user} />
    </div>
  )
}
