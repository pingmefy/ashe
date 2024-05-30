import {UserSummary} from "steamapi";

export type BodyProps = {
  friends: UserSummary[]
  user?: UserSummary | null
}
