import {useState} from "react";
import {useAppContext} from "../context/AppContext";


export const Navbar = () => {
  const [inputValue, setInputValue] = useState<string>("")
  const {setSteamId} = useAppContext();
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
