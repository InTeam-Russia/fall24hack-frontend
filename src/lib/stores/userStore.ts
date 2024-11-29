import { writable } from 'svelte/store';

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  tgLink: string;
}

export const userStore = writable<User | null>({
  firstName: 'Хуй',
  lastName: 'Сука',
  username: 'huksuka',
  email: 'huksuka@example.com',
  tgLink: 'https://t.me/huksuka',
});
