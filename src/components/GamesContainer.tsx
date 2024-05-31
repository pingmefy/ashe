import React, {useEffect, useMemo, useRef, useState} from "react";
import Confetti from "react-confetti";
import Roulette, {PrizeType} from "react-roulette-pro";
import {useAppContext} from "../context/AppContext";
import gameDesign from "../util/RouletteStylePlugin";
import {Button} from "./button/Button";

enum ButtonState{
  START = "find a game for us",
  ROLLING = "they see me rollin...",
  RETRY= "omg no, reroll!",
  LOADING = "loading games..."
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

const shuffleArray = (array: any[]) => {
  const newArray = [];
  while (array.length) {
    const randomIndex = Math.floor(Math.random() * array.length),
      element = array.splice(randomIndex, 1);
    newArray.push(element[0]);
  }
  return newArray
}

export const GamesContainer = () => {
  const [start, setStart] = useState(false);
  const [buttonState, setButtonState] = useState<ButtonState>(ButtonState.START);
  const {selectedFriends, getCommonGames, games} = useAppContext();
  const [gameList, setGameList] = useState(games);
  const [showConfetti, setShowConfetti] = useState(false);
  const memoGameList = useMemo(() => gameList, [gameList]);
  let needToRefreshGames = useRef(false);

  useEffect(() => {
    if(selectedFriends.length > 1) needToRefreshGames.current = true
  }, [selectedFriends]);

  useEffect(() => {
    setGameList(games)
  }, [games]);

  const handleStartButton = () => {
    if(needToRefreshGames.current) {
      setButtonState(ButtonState.LOADING)
      getCommonGames(selectedFriends.map((friend) => friend.steamID))
    }else {
      handleStart()
    }
  };

  const prizeList: PrizeType[] = useMemo(() => {
    if(!Array.isArray(memoGameList) || !memoGameList || memoGameList.length === 0) return []
    return memoGameList.map((game, index) => {
      return {
        id: index,
        image: game.coverUrl,
        text: game.name
      }
    })
  }, [memoGameList]);

  const formedPrizeList = useMemo(() => getFormedPrizeList(prizeList), [prizeList]);
  const formedEmptyList = useMemo(() => getFormedPrizeList(emptyPrizeArray), []);

  const handleStart = () => {
    if(prizeList.length === 0) return
    const newValue = !start
    newValue ? setButtonState(ButtonState.ROLLING) : setButtonState(ButtonState.START)
    if(!newValue) {
      setGameList(shuffleArray([...memoGameList]))
    }
    setStart(newValue);
  }

  const handlePrizeDefined = () => {
    setButtonState(ButtonState.RETRY);
    setShowConfetti(true);
  };

  useEffect(() => {
    handleStart()
    needToRefreshGames.current = false
  }, [prizeList]);

  const prizeIndex = formedPrizeList.length;
  return(
    <div className={"bg-primaryColorDark flex flex-col"}>
      {!Array.isArray(memoGameList) || memoGameList.length === 0 ?
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
      {showConfetti && <Confetti
          width={window.outerWidth}
          height={window.outerHeight}
          recycle={false}
          onConfettiComplete={() => setShowConfetti(false)}

      />}

      <Button disabled={buttonState === ButtonState.ROLLING || selectedFriends.length < 2 || buttonState === ButtonState.LOADING}
        onClick={handleStartButton}>{buttonState}</Button>
    </div>
  )
}
