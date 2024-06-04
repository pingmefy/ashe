import React from "react";
import {BodyContent} from "../body_content/BodyContent";
import {BodyTitle} from "../BodyTitle";
import {UnAuthBlock} from "../UnAuthBlock";
import {BodyProps} from "./Body.types";
import Image from 'next/image';


export const Body = ({friends, user}: BodyProps) => {
  return (
    <div className={" w-[58%] bg-primaryColor h-full flex flex-col gap-7"}>
      <BodyTitle/>
      {
        user ? <BodyContent user={user} friends={friends}/> : <UnAuthBlock/>
      }
      <div className={"footer-img z-0"}>
        <Image src="/bg-bottom.png" alt="Background" width={760} height={299} />
      </div>
    </div>
  )
}
