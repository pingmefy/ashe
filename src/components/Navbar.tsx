import {useState} from "react";

type NavbarProps = {
  setSteamId: (steamId: string) => void;
}

export const Navbar = ({setSteamId}: NavbarProps) => {
  const [inputValue, setInputValue] = useState<string>("")
  return(
    <div className={`flex flex-row gap-4 w-full justify-center items-center bg-primaryColorDark`}>
      <span className={"header-text"}>
        whateverfy
      </span>
      <div className={"flex flex-row gap-4"}>
        <input type="text" className={"text-highlightColor"} onChange={(e) => setInputValue(e.target.value)} value={inputValue}/>
        <button onClick={() => setSteamId(inputValue)}>Test</button>
      </div>
    </div>
  )
}
