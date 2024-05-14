import {UserSummary} from "steamapi";

export const mockUserSummaries: UserSummary[] = [
  {
    steamID: "12323142",
    avatar: {
      small: "https://example.com/avatar1_small.png",
      medium: "https://placehold.co/30x30",
      large: "https://example.com/avatar1_large.png",
      hash: "hash1"
    },
    url: "https://example.com/user1",
    visible: true,
    personaState:1,
    personaStateFlags: 0,
    allowsComments: true,
    nickname: "Rulox",
    lastLogOffTimestamp: Date.now(),
    createdTimestamp: Date.now(),
    realName: "Real Name 1",
    primaryGroupID: "group1",
    gameID: 1,
    gameName: "Game 1",
    gameServerIP: "192.168.1.1",
    gameServerID: "server1",
    countryCode: "US",
    stateCode: "CA",
    cityID: "city1",
    get profileURL(): string {
      return this.url;
    },
    get lastLogOffAt(): Date | undefined {
      return new Date();
    },
    get createdAt(): Date | undefined {
      return new Date();
    }
  },
  {
    steamID: "987654321",
    avatar: {
      small: "https://example.com/avatar2_small.png",
      medium: "https://placehold.co/30x30",
      large: "https://example.com/avatar2_large.png",
      hash: "hash2"
    },
    url: "https://example.com/user2",
    visible: true,
    personaState: 1,
    personaStateFlags: 0,
    allowsComments: false,
    nickname: "Frostfel",
    lastLogOffTimestamp: Date.now(),
    createdTimestamp: Date.now(),
    realName: "Real Name 2",
    primaryGroupID: "group2",
    gameID: 2,
    gameName: "Game 2",
    gameServerIP: "192.168.1.2",
    gameServerID: "server2",
    countryCode: "US",
    stateCode: "NY",
    cityID: "city2",
    get profileURL(): string {
      return this.url;
    },
    get lastLogOffAt(): Date | undefined {
      return new Date();
    },
    get createdAt(): Date | undefined {
      return new Date();
    }
  }
];

export const mockUser: UserSummary =   {
  steamID: "123456789",
  avatar: {
    small: "https://example.com/avatar1_small.png",
    medium: "https://placehold.co/30x30",
    large: "https://example.com/avatar1_large.png",
    hash: "hash1"
  },
  url: "https://example.com/user1",
  visible: true,
  personaState:1,
  personaStateFlags: 0,
  allowsComments: true,
  nickname: "Arehucaz",
  lastLogOffTimestamp: Date.now(),
  createdTimestamp: Date.now(),
  realName: "Real Name 1",
  primaryGroupID: "group1",
  gameID: 1,
  gameName: "Game 1",
  gameServerIP: "192.168.1.1",
  gameServerID: "server1",
  countryCode: "US",
  stateCode: "CA",
  cityID: "city1",
  get profileURL(): string {
    return this.url;
  },
  get lastLogOffAt(): Date | undefined {
    return new Date();
  },
  get createdAt(): Date | undefined {
    return new Date();
  }
}
