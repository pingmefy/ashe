import React from 'react';

import {IDesignPlugin} from "react-roulette-pro";


const TopChildren = () => {
  return (
    <div
      className={`arrow`}
    />
  );
};

const gameDesign = () => (): IDesignPlugin => {
      const prizeItemWidth: number = 600;
      const prizeItemHeight: number = 900;

      return {
        topChildren: (
          <TopChildren/>
        ),
        bottomChildren:null,
        prizeItemWidth,
        prizeItemHeight,
        prizeItemRenderFunction: ({ image }) => {

          return (
            <div
              className="w-[600px] h-[900px]"
            >
              <div
                className={'roulette-pro-regular-prize-item-wrapper center'}
              >
                <div className="roulette-pro-regular-image-wrapper">
                  <img
                    className="roulette-pro-regular-prize-item-image"
                    src={image}
                    alt={'prize item'}
                  />
                </div>
              </div>
            </div>
          );
        },
        classes: {
          prizeItem: "p-2",
        },
      };
    };

export default gameDesign;
