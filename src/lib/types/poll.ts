import type { User } from '$lib/utils/types';

export interface Poll {
  id: number;
  text: string;
  type: string;
  variants?: string[];
  author: User;
}
