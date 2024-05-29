import {UserSummary} from "steamapi";

export type BodyContentProps = {
  friends: UserSummary[],
  user: UserSummary
}
