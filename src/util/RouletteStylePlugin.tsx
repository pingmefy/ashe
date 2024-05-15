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

const PrizeItem = ({ image }: { image: string }) => {
  return (
    <div className={'roulette-pro-regular-prize-item-wrapper center '}>
      <div className="roulette-pro-regular-image-wrapper">
        <img
          className="roulette-pro-regular-prize-item-image"
          src={image}
          alt={'prize item'}
        />
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
        prizeItemRenderFunction: ({ image }) => {

          return (
            <div className="w-[120px] h-[160px]">
              {image === "" ? <EmptyPrizeItem/> : <PrizeItem image={image}/>}
            </div>
          );
        },
        classes: {
          prizeItem: "p-2 w-[120px] h-[160px]",
        },
      };
    };

export default gameDesign;
