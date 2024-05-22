import {
  AppDetails, AppDetailsResponse, IAppDetailsResponseItem
} from "../util/types";


export default class SteamWebAPIClient {

  private cache: {
    [key: string]: {
      value: unknown;
      cachedAt: number;
    };
  } = {};

  public constructor() {
  }

  public async getAppDetails(appId: number): Promise<AppDetails> {
    const cacheKey = `AppDetails:${appId}`;

    if (this.cache[cacheKey] === undefined) {
      const response = await this.execGetRequest(
        `https://store.steampowered.com/api/appdetails/?appids=${appId}`
      );

      const data: unknown = response.body;

      const appDetailsResponse = AppDetailsResponse.parse(data);

      const appDetailsItem: IAppDetailsResponseItem | undefined =
        appDetailsResponse.items.get(appId);

      if (appDetailsItem !== undefined && appDetailsItem.success) {
        const cachedAt = new Date();
        console.log(`Caching "${cacheKey}" at ${cachedAt.toISOString()}`);

        this.cache[cacheKey] = {
          cachedAt: cachedAt.getTime(),
          value: appDetailsItem.data,
        };
      } else {
        throw new Error(
          `Response for appId "${appId}" is empty or not success`
        );
      }
    }

    return this.cache[cacheKey].value as AppDetails;
  }

  public async getGames(options: {
    limit: number;
    offset: number;
  }): Promise<unknown> {
    const { limit = 100, offset = 0 } = options;

    let input: any = {
      context: {
        language: "english",
        country_code: "ES",
      },
      query: {
        start: offset,
        count: limit,
        sort: 2,
        filters: {
          // released_only: true,
          // tagids_must_match: [
          //   {
          //     tagids: [tagId],
          //   },
          // ],
          type_filters: {
            include_games: true,
          },
        },
      },
      data_request: {
        // include_assets: false,
        include_release: true,
        // include_platforms: false,
        // include_all_purchase_options: false,
        // include_screenshots: false,
        // include_trailers: false,
        // include_ratings: false,
        include_tag_count: 20,
        include_reviews: true,
        include_basic_info: true,
        // include_supported_languages: false,
        // include_full_description: false,
      },
    };

    const url = new URL(
      "https://api.steampowered.com/IStoreQueryService/Query/v1"
    );

    url.searchParams.append("input_json", JSON.stringify(input));

    const cacheKey = `Query:${JSON.stringify(input)}`;

    if (this.cache[cacheKey] === undefined) {
      const response = await this.execGetRequest(url);

      const data: any = response.body;

      const cachedAt = new Date();
      // console.log(`Caching "${cacheKey}" at ${cachedAt.toISOString()}`);

      this.cache[cacheKey] = {
        cachedAt: cachedAt.getTime(),
        value: data.response,
      };
    }

    return this.cache[cacheKey].value;
  }

  public async getUserOwnedGames(steamId: string): Promise<any | null> {
    const params = new URLSearchParams({
      steamid: steamId,
      include_appinfo: 'false',
      key: "3C84F9655BD3EE1F0F60266F2526EA38",
      include_played_free_games: 'true',
      include_free_sub: 'true',
      language: 'english',
    });

    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();
    return json.response.games.map((data: any) => {
      return data.appid;
    });
  }

  public async getGame(appId: number): Promise<unknown> {
    const input = {
      ids: [{ appid: appId }],
      data_request: {
        // include_assets: false,
        include_release: true,
        // include_platforms: false,
        // include_all_purchase_options: false,
        // include_screenshots: false,
        // include_trailers: false,
        // include_ratings: false,
        include_tag_count: 20,
        // include_reviews: false,
        // include_basic_info: false,
        // include_supported_languages: false,
        // include_full_description: false,
      },
      context: {
        language: "english",
        country_code: "ES",
      },
    };

    const url = new URL(
      "https://api.steampowered.com/IStoreBrowseService/GetItems/v1"
    );

    url.searchParams.append("input_json", JSON.stringify(input));

    const cacheKey = `GetItems:${JSON.stringify(input)}`;

    if (this.cache[cacheKey] === undefined) {
      const response = await this.execGetRequest(url);

      const data: any = response.body;

      const cachedAt = new Date();
      console.log(`Caching "${cacheKey}" at ${cachedAt.toISOString()}`);

      this.cache[cacheKey] = {
        cachedAt: cachedAt.getTime(),
        value: data.response["store_items"][0],
      };
    }

    return this.cache[cacheKey].value;
  }

  private async execGetRequest<T = unknown>(
    url: string | URL
  ): Promise<Response> {
    const response: Response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error(
        `Something went wrong:\n\tCode: ${response.status}\n\tResponse: ${response.body}`
      );
    }
  }
}

export const steamWebAPIClient = new SteamWebAPIClient();
