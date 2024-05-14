import React, {useMemo, useState} from "react";
import Roulette, {PrizeType} from "react-roulette-pro";
import gameDesign from "../util/RouletteStylePlugin";
import {GameResponse} from "../util/types";

type GamesContainerProps = {
  games: GameResponse[];
}
enum ButtonState{
  START = "find a game for us",
  ROLLING = "they see me rollin...",
  RETRY= "omg no, reroll!"
}

const getFormedPrizeList = (prizeList: PrizeType[]) => {
  const reproductionArray = (array: PrizeType[] = [], length = 0) => [
    ...Array(length)
      .fill('_')
      .map(() => array[Math.floor(Math.random() * array.length)]),
  ];
  return [
    ...prizeList,
    ...reproductionArray(prizeList, prizeList.length * 3),
    ...prizeList,
    ...reproductionArray(prizeList, prizeList.length),
  ]
}

const emptyPrizeArray: PrizeType[] = [{id: 0, image: ""},{id: 1, image: ""},{id: 2, image: ""},{id: 3, image: ""}];

export const GamesContainer = ({games}: GamesContainerProps) => {
  const [start, setStart] = useState(false);
  const [buttonState, setButtonState] = useState<ButtonState>(ButtonState.START);
  const handleStart = () => {
    const newValue = !start
    newValue ? setButtonState(ButtonState.ROLLING) : setButtonState(ButtonState.START)
    setStart(newValue);
  };

  const handlePrizeDefined = () => {
    setButtonState(ButtonState.RETRY);
  };

  const prizeList: PrizeType[] = useMemo(() => {
    if(!Array.isArray(games) || !games || games.length === 0) return emptyPrizeArray
    return games.map((game, index) => {
      return {
        id: index,
        image: game.coverUrl
      }
    })
  }, [games]);


  const prizeIndex = prizeList.length;

  return(
    <div className={"bg-primaryColorDark flex flex-col"}>
      <Roulette prizes={getFormedPrizeList(prizeList)}
                prizeIndex={prizeIndex} start={start}
                onPrizeDefined={handlePrizeDefined}
                designPlugin={gameDesign()}
      />
      <button disabled={buttonState === ButtonState.ROLLING}
        className={"bg-greenPrimary rounded-lg text-xl" +
          " text-primaryColor font-bold px-4 py-2 m-auto cta-btn" +
          " disabled:opacity-50 disabled:cursor-not-allowed"}
        onClick={handleStart}>{buttonState}</button>
    </div>
  )
}
