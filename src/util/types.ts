
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
  code: string,
  data: PrivacyErrorData
}

export interface PrivacyErrorData {
  users: string[]
}
