import { GameResponse } from "./types";

export const shuffleArray = (array: GameResponse[]) => {
  const newArray = [];
  while (array.length) {
    const randomIndex = Math.floor(Math.random() * array.length),
      element = array.splice(randomIndex, 1);
    newArray.push(element[0]);
  }
  return newArray;
};
