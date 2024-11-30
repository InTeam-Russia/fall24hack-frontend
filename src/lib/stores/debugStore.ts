import type { DebugConfig } from '$lib/utils/types';
import { readable } from 'svelte/store';

export const debugStore = readable<DebugConfig>({
  feed: false,
  session: false,
  polls: false,
  recomendations: false,
});
