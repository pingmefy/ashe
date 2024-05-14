import React from "react";
import {GameResponse} from "../util/types";
import {BodyTitle} from "./BodyTitle";
import {GamesContainer} from "./GamesContainer";

type BodyProps = {
  games: GameResponse[]
}
export const Body = ({games}: BodyProps) => {
  return (
    <div className={" w-[58%] bg-primaryColor h-full"}>
      <BodyTitle/>
      <GamesContainer games={games}/>
    </div>
  )
}
