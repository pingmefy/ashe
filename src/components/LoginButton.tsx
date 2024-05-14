import React, {PropsWithChildren} from "react";
import {SteamIcon} from "../resources/Icons";

type LoginButtonProps = {
  onClick: () => void;
  text: string;
  colorClass: string
}

export const LoginButton = ({text, onClick, colorClass}: LoginButtonProps) => {
  return(
    <div className={`${colorClass} rounded-lg px-2.5 py-1.5 flex gap-2.5 cursor-pointer items-center`} onClick={onClick}>
      <SteamIcon/>
      <span className={"text-white"}>{text}</span>
    </div>
  )
}
