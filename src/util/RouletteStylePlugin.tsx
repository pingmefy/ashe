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
    <div style={{width: 136, height: 160}}>
      <EmptyGameIcon/>
    </div>
  );

}

const gameDesign = () => (): IDesignPlugin => {
      const prizeItemWidth: number = 136;
      const prizeItemHeight: number = 180;

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
