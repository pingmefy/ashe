import {PropsWithChildren} from "react";
import {ButtonClass} from "./Button";

export type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  buttonClass?: ButtonClass;
} & PropsWithChildren;
