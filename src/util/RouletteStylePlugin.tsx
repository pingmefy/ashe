import React from 'react';

import {IDesignPlugin, IDesignPluginProps} from "react-roulette-pro";


export interface IRegularDesignProps {
  hideCenterDelimiter?: boolean;
  prizesWithText?: boolean;
}

interface ITopChildrenProps {
  hideCenterDelimiter: IRegularDesignProps['hideCenterDelimiter'];
  type: IDesignPluginProps['type'];
}

const TopChildren = ({ type, hideCenterDelimiter }: ITopChildrenProps) => {
  return hideCenterDelimiter !== true ? (
    <div
      className={`arrow ${type}`}
    />
  ) : null;
};

const gameDesign =
  ({ prizesWithText, hideCenterDelimiter }: IRegularDesignProps) =>
    ({ type }: IDesignPluginProps): IDesignPlugin => {
      const prizeItemWidth: number = 600;
      const prizeItemHeight: number = 900;

      return {
        topChildren: (
          <TopChildren type={type} hideCenterDelimiter={hideCenterDelimiter} />
        ),
        bottomChildren:null,
        prizeItemWidth,
        prizeItemHeight,
        prizeItemRenderFunction: ({ image, text }) => {

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
