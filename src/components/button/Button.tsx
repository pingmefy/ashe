import {ButtonProps} from "./Button.types";

export const Button = ({disabled, onClick, children}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={"bg-greenPrimary rounded-lg text-xl" +
        " text-primaryColor font-bold px-4 py-2 m-auto cta-btn" +
        " disabled:opacity-50 disabled:cursor-not-allowed"}
      onClick={onClick}>{children}</button>
  )
}
