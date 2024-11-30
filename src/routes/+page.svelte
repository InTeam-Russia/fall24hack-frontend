<script lang="ts">
  import { userStore } from '$lib/stores/userStore';
  import Feed from '$lib/modules/Feed.svelte';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';

  onMount(() => {
    if (get(userStore) === null) {
      goto('/auth');
    }
  });
</script>

<main class="feed items-stretch max-w-screen-sm mt-6 md:mt-16 mx-auto">
  <Feed />
</main>

<div class="w-full overflow-hidden">
  {JSON.stringify($userStore)}
</div>

<style>
  .feed > :global(*) {
    margin-bottom: 2rem;
  }
  .feed:last-child {
    margin-bottom: inherit;
  }
</style>
