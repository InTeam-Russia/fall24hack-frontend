import { writable } from 'svelte/store';

export interface UserState {
  firstName: string;
  lastName: string;
  email: string; // TODO: check if it actually email or username
  role?: string;
}

export const userStore = writable<UserState | null>(null);
