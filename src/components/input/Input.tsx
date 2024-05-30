import {InputProps} from "./Input.types";

export const Input = ({type, value, onChange, placeholder}: InputProps) => {
  return (
    <input
      className={"text-primaryColor rounded-[10px] border-solid border-2 border-highlightColor px-[17px] py-[14.5px] w-full"}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}/>
  )
}
