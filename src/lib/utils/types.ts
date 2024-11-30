export interface Poll {
  id?: number;
  text: string;
  type: 'FREE' | 'RADIO';
  variants?: string[];
  author: User;
}

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  tgLink: string;
}

export interface ApiError {
  error: string;
}

export type Feed = User[] | Poll;

export interface PollsRequest {
  pageIndex: number;
  pageSize: number;
}

export interface PollAnswer {
  pollId: number;
  text: string;
}

export interface DebugConfig {
  feed: boolean;
  session: boolean;
  polls: boolean;
  recomendations: boolean;
}
