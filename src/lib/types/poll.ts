import type { User } from '../stores/userStore';

export interface Poll {
  id: number;
  text: string;
  type: string;
  author: User;
}
