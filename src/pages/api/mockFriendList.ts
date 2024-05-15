import type {NextApiRequest, NextApiResponse} from 'next';
import {UserSummary,} from 'steamapi';
import {mockUserSummaries} from "../../util/mocks/Friends";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserSummary[] | { error: string }>
) {
  try {
    res.status(200).json(mockUserSummaries);
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error"});
  }
}
