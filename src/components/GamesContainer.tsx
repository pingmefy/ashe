import React, {useEffect, useMemo, useRef, useState} from "react";
import Roulette, {PrizeType} from "react-roulette-pro";
import {useAppContext} from "../context/AppContext";
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
  ].map((prize, index) => ({...prize, id: index}));
}

const emptyPrizeArray: PrizeType[] = Array(20).fill({id: 1, image: "" }, 0, 20).map((_, index) => ({id: index, image: ""}));

export const GamesContainer = ({games}: GamesContainerProps) => {
  const [start, setStart] = useState(false);
  const [buttonState, setButtonState] = useState<ButtonState>(ButtonState.START);
  const {selectedFriends, getCommonGames} = useAppContext();
  let needToRefreshGames = useRef(false);

  const memoSelectedFriends = useMemo(() => selectedFriends, [selectedFriends])
  useEffect(() => {
    if(memoSelectedFriends.length > 1) needToRefreshGames.current = true
  }, [memoSelectedFriends]);

  const handleStartButton = () => {
    if(needToRefreshGames.current) {
      getCommonGames(selectedFriends.map((friend) => friend.steamID))
    }else {
      handleStart()
    }
  };

  const handleStart = () => {
    if(prizeList.length === 0) return
    const newValue = !start
    newValue ? setButtonState(ButtonState.ROLLING) : setButtonState(ButtonState.START)
    setStart(newValue);
  }

  const memoGames = useMemo(() => games, [games]);

  const handlePrizeDefined = () => {
    setButtonState(ButtonState.RETRY);
  };

  const prizeList: PrizeType[] = useMemo(() => {
    if(!Array.isArray(memoGames) || !memoGames || memoGames.length === 0) return []
    return memoGames.map((game, index) => {
      return {
        id: index,
        image: game.coverUrl
      }
    })
  }, [memoGames]);

  useEffect(() => {
    handleStart()
    needToRefreshGames.current = false
  }, [prizeList]);

  const formedPrizeList = useMemo(() => getFormedPrizeList(prizeList), [prizeList]);
  const formedEmptyList = useMemo(() => getFormedPrizeList(emptyPrizeArray), []);

  const prizeIndex = formedPrizeList.length;
  return(
    <div className={"bg-primaryColorDark flex flex-col"}>
      {!Array.isArray(memoGames) || memoGames.length === 0 ?
        <Roulette prizes={formedEmptyList}
                  prizeIndex={20} start={false}
                  onPrizeDefined={handlePrizeDefined}
                  designPlugin={gameDesign()}
        />
        :
        <Roulette prizes={formedPrizeList}
                  prizeIndex={prizeIndex} start={start}
                  onPrizeDefined={handlePrizeDefined}
                  designPlugin={gameDesign()}
        />

      }
      <button disabled={buttonState === ButtonState.ROLLING || selectedFriends.length < 2}
        className={"bg-greenPrimary rounded-lg text-xl" +
          " text-primaryColor font-bold px-4 py-2 m-auto cta-btn" +
          " disabled:opacity-50 disabled:cursor-not-allowed"}
        onClick={handleStartButton}>{buttonState}</button>
    </div>
  )
}
