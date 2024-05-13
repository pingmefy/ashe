import {useState} from "react";

export const Navbar = () => {
  const [steamId, setSteamId] = useState<string>("")
  return(
    <div className={`flex flex-row gap-4 w-full justify-center items-center bg-primaryColorDark p-4`}>
      <span className={"header-text"}>
        whateverfy
      </span>
      <div className={"flex flex-row gap-4"}>
        <input type="text" onChange={(e) => setSteamId(e.target.value)} value={steamId}/>
        <button>Test</button>
      </div>
    </div>
  )
}
