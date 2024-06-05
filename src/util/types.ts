export interface GameResponse {
  coverUrl: string;
  name: string;
}

export interface APIGameResponse {
  response: APIGames
}

export interface APIGames {
  games: {
    appid: string;
  }[]
}

