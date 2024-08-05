import {ButtonProps} from "./Button.types";

export enum ButtonClass {
  CTA = "cta-btn",
  ROULETTE = "roulette-btn",
}

export const Button = ({disabled, onClick, children, buttonClass}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`bg-greenPrimary rounded-lg text-xl text-primaryColor
       font-bold px-4 py-2 m-auto ${buttonClass ? buttonClass.valueOf() : "cta-btn"} 
      disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={onClick}>{children}</button>
  )
}
