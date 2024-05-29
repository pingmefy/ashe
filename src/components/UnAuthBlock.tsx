import {LoginButton} from "./LoginButton";

export const UnAuthBlock = () => {
  return(
    <div className={"bg-primaryColorDark border-2 border-highlightColor flex items-center justify-center m-10 p-4"}>
      <LoginButton text={"Login with Steam"} onClick={() => null} colorClass={"bg-highlightColor"}/>
    </div>
  )
}
