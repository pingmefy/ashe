"use client"
import {useEffect} from "react";

export const ADSection = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      (window.adsbygoogle || []).push({});
    }
  }, []);
  return (
    <div className={"hidden lg:block min-w-[18.75rem] w-[21%]"}>
      {/*<script async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4760699435451370"
              crossOrigin="anonymous"></script>
      <ins className="adsbygoogle"
           style={{ display: "block" }}
           data-ad-client="ca-pub-4760699435451370"
           data-ad-slot="4137614929"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>*/}
    </div>
  )
}
