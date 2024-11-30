import { Users } from '$lib/repository/users';
import type { User } from '$lib/utils/types';
import { writable } from 'svelte/store';

export const userStore = writable<User | null>(await Users.Instance.GetSession());

// export const userStore = writable<User | null>(null);
