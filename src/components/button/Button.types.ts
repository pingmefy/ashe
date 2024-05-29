import {PropsWithChildren} from "react";

export type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
} & PropsWithChildren<{}>;
