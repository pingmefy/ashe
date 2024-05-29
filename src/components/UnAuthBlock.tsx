import {useState} from "react";
import {Input} from "./input/Input";

export const UnAuthBlock = () => {
  const [profileUrl, setProfileUrl] = useState("");
  return(
    <div className={"bg-primaryColorDark border-2 border-highlightColor flex items-center justify-center m-10 p-4"}>
      <Input onChange={(value) => setProfileUrl(value)} value={profileUrl} type={"text"} placeholder={"Your profile url"}/>
    </div>
  )
}
