import {PropsWithChildren} from "react";

export const Content = ({children}: PropsWithChildren) => {
  return(
    <div className={"flex flex-row bg-primaryColor"}>
      {children}
    </div>
  )
}
