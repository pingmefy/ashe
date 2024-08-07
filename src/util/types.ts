
export interface GameResponse {
  coverUrl: string;
  name: string;
}

export interface APIGameResponse {
  response: APIGames
}

export interface APICommonGamesResponse {
  data: unknown;
  error: APIError | null

}

export interface APIGames {
  games: {
    appid: string;
  }[]
}

export interface APIError{
  code: APIErrorCode,
  data: PrivacyErrorData
}

export interface PrivacyErrorData {
  users: string[]
}

export enum APIErrorCode {
  PRIVACY_ERROR_MESSAGE = "PRIVACY_ERROR_MESSAGE"
}
