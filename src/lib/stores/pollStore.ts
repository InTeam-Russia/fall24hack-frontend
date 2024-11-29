import { writable } from 'svelte/store';

export interface Poll {
  type: string;
}

export const pollStore = writable<Poll | null>(null);
