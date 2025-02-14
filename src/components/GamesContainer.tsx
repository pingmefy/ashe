"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Confetti from "react-confetti";
import Roulette, { PrizeType } from "react-roulette-pro";
import { useSteamApi } from "../hooks/useSteamApi";
import gameDesign from "../util/RouletteStylePlugin";
import { GameResponse } from "../util/types";
import { Button, ButtonClass } from "./button/Button";

const MIN_GAMES_IN_ROULETTE = 300;

enum ButtonState {
  START = "find a game for us",
  ROLLING = "they see me rollin...",
  RETRY = "omg no, reroll!",
  LOADING = "loading games...",
}

const getFormedPrizeList = (prizeList: PrizeType[]) => {
  if (prizeList.length === 0) return [];

  const multiplier = Math.ceil(MIN_GAMES_IN_ROULETTE / prizeList.length);
  const newArray = [];
  for (let i = 0; i < multiplier; i++) {
    newArray.push(...prizeList);
  }
  const limit = Math.min(newArray.length, MIN_GAMES_IN_ROULETTE);
  newArray.splice(limit, newArray.length - limit);

  return newArray.map((prize, index) => ({ ...prize, id: index }));
};

const emptyPrizeArray: PrizeType[] = Array(20).fill(
  { id: 1, image: "" },
  0,
  20,
);

const shuffleArray = (array: GameResponse[]) => {
  const newArray = [];
  while (array.length) {
    const randomIndex = Math.floor(Math.random() * array.length),
      element = array.splice(randomIndex, 1);
    newArray.push(element[0]);
  }
  return newArray;
};

type Props = {
  selectedFriendSteamIds: string[];
};
export const GamesContainer = (props: Props) => {
  const { selectedFriendSteamIds } = props;
  const needToRefreshGames = useRef(selectedFriendSteamIds.length > 1);
  const [start, setStart] = useState(false);
  const [buttonState, setButtonState] = useState<ButtonState>(
    ButtonState.START,
  );
  const { getCommonGames, games } = useSteamApi();
  const [gameList, setGameList] = useState(games);
  const [showConfetti, setShowConfetti] = useState(false);
  const memoGameList = useMemo(() => gameList, [gameList]);

  useEffect(() => {
    if (selectedFriendSteamIds.length > 1) needToRefreshGames.current = true;
  }, [selectedFriendSteamIds]);

  useEffect(() => {
    setGameList(games);
  }, [games]);

  const handleStartButton = () => {
    if (needToRefreshGames.current) {
      setButtonState(ButtonState.LOADING);
      getCommonGames(selectedFriendSteamIds);
    } else {
      handleStart();
    }
  };

  const prizeList: PrizeType[] = useMemo(() => {
    if (
      !Array.isArray(memoGameList) ||
      !memoGameList ||
      memoGameList.length === 0
    )
      return [];
    return memoGameList.map((game, index) => {
      return {
        id: index,
        image: game.coverUrl,
        text: game.name,
      };
    });
  }, [memoGameList]);

  const formedPrizeList = useMemo(
    () => getFormedPrizeList(prizeList),
    [prizeList],
  );
  const formedEmptyList = useMemo(
    () => getFormedPrizeList(emptyPrizeArray),
    [],
  );

  const handleStart = () => {
    const newValue = !start;
    newValue
      ? setButtonState(ButtonState.ROLLING)
      : setButtonState(ButtonState.START);
    if (!newValue) {
      setGameList(shuffleArray([...memoGameList]));
    }
    setStart(newValue);
  };

  const handlePrizeDefined = () => {
    setButtonState(ButtonState.RETRY);
    setShowConfetti(true);
  };

  useEffect(() => {
    if (prizeList.length === 0) return;
    handleStart();
    needToRefreshGames.current = false;
  }, [prizeList]);
  console.log(formedPrizeList.length, "FORMED PRIZE LIST");

  const prizeIndex = formedPrizeList.length - 20;
  console.log(prizeIndex, "PRIZE INDEX");
  return (
    <div className={"flex flex-col"}>
      <Roulette
        prizes={formedPrizeList.length > 0 ? formedPrizeList : formedEmptyList}
        prizeIndex={prizeIndex}
        start={start}
        onPrizeDefined={handlePrizeDefined}
        options={{ stopInCenter: true }}
        designPlugin={gameDesign()}
      />
      {showConfetti && (
        <Confetti
          width={window.outerWidth}
          height={window.outerHeight}
          recycle={false}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}

      <Button
        disabled={
          buttonState === ButtonState.ROLLING ||
          selectedFriendSteamIds.length < 2 ||
          buttonState === ButtonState.LOADING
        }
        buttonClass={ButtonClass.ROULETTE}
        onClick={handleStartButton}
      >
        {buttonState}
      </Button>
    </div>
  );
};
