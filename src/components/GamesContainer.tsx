import React, {useMemo, useState} from "react";
import Roulette, {PrizeType} from "react-roulette-pro";
import {GameResponse} from "../util/types";

type GamesContainerProps = {
  games: GameResponse[];
}
export const GamesContainer = ({games}: GamesContainerProps) => {
  const [start, setStart] = useState(false);
  const handleStart = () => {
    setStart((prevState) => !prevState);
  };
  const handlePrizeDefined = () => {
    console.log('🥳 Prize defined! 🥳');
  };

  const prizeList: PrizeType[] = useMemo(() => {
    if(!Array.isArray(games) || !games || games.length === 0) return []
    console.log(games)
    return games.map((game, index) => {
      return {
        id: index,
        image: game.coverUrl
      }
    })
  }, [games]);

  const reproductionArray = (array: PrizeType[] = [], length = 0) => [
    ...Array(length)
      .fill('_')
      .map(() => array[Math.floor(Math.random() * array.length)]),
  ];
  const reproducedPrizeList = [
    ...prizeList,
    ...reproductionArray(prizeList, prizeList.length * 3),
    ...prizeList,
    ...reproductionArray(prizeList, prizeList.length),
  ];

  const prizeIndex = prizeList.length;

  return(
    <div className={"bg-primaryColorDark p-4"}>
      <Roulette prizes={reproducedPrizeList} prizeIndex={prizeIndex} start={start} onPrizeDefined={handlePrizeDefined}/>
      <button onClick={handleStart}>Start test</button>
    </div>
  )
}
