import React from "react";
import {FooterImage} from "../../resources/FooterImage";
import {BodyContent} from "../body_content/BodyContent";
import {BodyTitle} from "../BodyTitle";
import {UnAuthBlock} from "../UnAuthBlock";
import {BodyProps} from "./Body.types";


export const Body = ({friends, user}: BodyProps) => {
  return (
    <div className={" w-[58%] bg-primaryColor h-full"}>
      <BodyTitle/>
      {
        user ? <BodyContent user={user} friends={friends}/> : <UnAuthBlock/>
      }
      {!user ? (
        <div className={"footer-img z-0"}>
          <FooterImage/>
        </div>
      ) : null }

    </div>
  )
}
