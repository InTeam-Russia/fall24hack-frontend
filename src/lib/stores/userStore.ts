import { writable } from 'svelte/store';

export interface User {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}

export const userStore = writable<User | null>(null);
