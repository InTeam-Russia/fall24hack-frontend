import type { User } from '$lib/utils/types';
import { writable } from 'svelte/store';

export const userStore = writable<User | null>(null);

// export const userStore = writable<User | null>(null);
