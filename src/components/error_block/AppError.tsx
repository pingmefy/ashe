import { APIErrorCode } from "../../util/types";

export const getErrorMessage = (errorCode: APIErrorCode) => {
  switch (errorCode) {
    case APIErrorCode.PRIVACY_ERROR_MESSAGE:
      return (
        'One or more of your friends has a privacy setting that doesn\'t allow you to see "their games."\n' +
        "We show you what games you could play with the others."
      );
    default:
      return "Unknown error";
  }
};
