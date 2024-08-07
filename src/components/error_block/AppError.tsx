import {APIError, APIErrorCode} from "../../util/types";

type ErrorProps = {
  error: APIError
}

const getErrorMessage = (errorCode: APIErrorCode) => {
  switch (errorCode) {
    case APIErrorCode.PRIVACY_ERROR_MESSAGE:
      return "One or more of your friends has a privacy setting that doesn't allow you to see \"their games.\"\n" +
        "We show you what games you could play with the others."
    default:
      return "Unknown error"
  }
}

export const AppError = ({error}: ErrorProps) => {
  return (
    <div className={"w-full bg-errorBg text-errorText p-[0.5rem] rounded-[10px] flex items-center justify-center text-center"}>
      <div>{getErrorMessage(error.code)}</div>
    </div>
  )
}

