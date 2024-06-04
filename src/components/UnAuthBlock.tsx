import {useCallback, useState} from "react";
import {useAppContext} from "../context/AppContext";
import {useSteamApi} from "../hooks/useSteamApi";
import {
  getKeyFromProfileUrl,
  getSteamIdFromUrl, isCustomProfileUrl, isValidSteamProfile
} from "../util/ProfileUrlUtils";
import {Button} from "./button/Button";
import {Input} from "./input/Input";

export const UnAuthBlock = () => {
  const [profileUrl, setProfileUrl] = useState("");
  const { getSteamIdFromProfile } = useSteamApi();
  const {setSteamId} = useAppContext()
  const handleOnInputChange = useCallback((value: string) => {
    let url = value.trim();
    if(url.endsWith("/")) url = url.slice(0, -1);
    setProfileUrl(url)
  },[])
  const handleButtonClick = useCallback(async () => {
    if(!isValidSteamProfile(profileUrl)) return; //todo show error instead
    let steamId
    if(isCustomProfileUrl(profileUrl)){
      steamId = await getSteamIdFromProfile(getKeyFromProfileUrl(profileUrl));
      steamId = steamId.steamId;
    }else {
      steamId = getSteamIdFromUrl(profileUrl);
    }
    setSteamId(steamId)
  },[getSteamIdFromProfile, profileUrl])
  return(
    <div className={"text-center"}>
      <h1 className={"text-3xl font-bold"}>Paste here your steam <span className={"text-highlightColor"}>profile</span></h1>
      <div className={"bg-primaryColorDark border-4 border-highlightColor flex flex-col items-center justify-center m-10"}>
        <div className={"mt-11 w-2/4"}>
          <Input onChange={(value) => handleOnInputChange(value)} value={profileUrl} type={"text"} placeholder={"Your profile url"}/>
        </div>
        <Button onClick={handleButtonClick}>select my friends</Button>
      </div>
    </div>
  )
}
