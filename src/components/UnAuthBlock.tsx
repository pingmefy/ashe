import {useState} from "react";
import {Button} from "./button/Button";
import {Input} from "./input/Input";

export const UnAuthBlock = () => {
  const [profileUrl, setProfileUrl] = useState("");
  return(
    <div className={"bg-primaryColorDark border-4 border-highlightColor flex flex-col items-center justify-center m-10"}>
      <div className={"mt-10 w-2/4"}>
        <Input onChange={(value) => setProfileUrl(value)} value={profileUrl} type={"text"} placeholder={"Your profile url"}/>
      </div>
      <Button onClick={() => null}>select my friends</Button>
    </div>
  )
}
