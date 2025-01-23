"use client";
import { useCallback, useState } from "react";
import getSteamId from "../../actions/get-steam-id";
import { Button } from "../button/Button";
import { Input } from "../input/Input";

const SteamIdForm = () => {
  const [profileUrl, setProfileUrl] = useState("");
  const handleButtonClick = () => {
    getSteamId(profileUrl);
  };

  const handleOnInputChange = useCallback((value: string) => {
    const url = value.trim();
    setProfileUrl(url);
  }, []);

  return (
    <div
      className={
        "bg-primaryColorDark border-4 border-highlightColor flex flex-col items-center justify-center "
      }
    >
      <div className={"mt-12 w-full px-12"}>
        <Input
          onChange={(value) => handleOnInputChange(value)}
          value={profileUrl}
          type={"text"}
          placeholder={"https://steamcommunity.com/id/yourusername/"}
        />
      </div>
      <Button onClick={handleButtonClick}>select my friends</Button>
    </div>
  );
};

export default SteamIdForm;
