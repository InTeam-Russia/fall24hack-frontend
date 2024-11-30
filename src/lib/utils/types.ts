export interface Poll {
  id: number;
  text: string;
  type: string;
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

export type Feed = User[] | Poll;
