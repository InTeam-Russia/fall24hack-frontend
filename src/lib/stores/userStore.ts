import type { User } from '$lib/utils/types';
import { writable } from 'svelte/store';

export const userStore = writable<User | null>({
  firstName: 'Хуй',
  lastName: 'Сука',
  username: 'huksuka',
  email: 'huksuka@example.com',
  tgLink: 'https://t.me/huksuka',
});

// export const userStore = writable<User | null>(null);
