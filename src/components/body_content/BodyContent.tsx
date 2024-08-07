import {useAppContext} from "../../context/AppContext";
import {AppError} from "../error_block/AppError";
import {FriendsSection} from "../FriendsSection";
import {GamesContainer} from "../GamesContainer";
import {BodyContentProps} from "./BodyContent.types";

export const BodyContent = ({friends, user}: BodyContentProps) => {
  const {error} = useAppContext();
  return(
    <>
      <GamesContainer/>
      {error &&
      <AppError error={error} />
      }
      <FriendsSection friends={friends} user={user} />
    </>
  )
}
