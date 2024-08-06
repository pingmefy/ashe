import React from 'react';
import {IDesignPlugin} from "react-roulette-pro";
import {EmptyGameIcon} from "../resources/Icons";


const TopChildren = () => {
  return (
    <div
      className={`arrow`}
    />
  );
};

const PrizeItem = ({ image, text }: { image: string, text: string | undefined }) => {
  return (
    <div className={'roulette-pro-regular-prize-item-wrapper center'}>
      <div className="roulette-pro-regular-image-wrapper">
        <img src={image} alt={text || "Game"} className="roulette-pro-regular-prize-item-image"/>
      </div>
    </div>
  );
}

const EmptyPrizeItem = () => {
  return (
    <div>
      <EmptyGameIcon/>
    </div>
  );

}

const gameDesign = () => (): IDesignPlugin => {
      const prizeItemWidth: number = 120;
      const prizeItemHeight: number = 160;

      return {
        topChildren: (
          <TopChildren/>
        ),
        bottomChildren:null,
        prizeItemWidth,
        prizeItemHeight,
        prizeItemRenderFunction: ({ image, text }) => {
          return (
            <>
              {image === "" ? <EmptyPrizeItem/> : <PrizeItem image={image} text={text}/>}
            </>
          );
        },
      };
    };

export default gameDesign;
