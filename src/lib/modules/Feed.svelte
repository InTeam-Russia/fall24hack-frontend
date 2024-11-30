<script lang="ts">
  import ProfileCard from '$lib/modules/ProfileCard.svelte';
  import PollCard from '$lib/modules/PollCard.svelte';
  import type { Poll } from '$lib/types/poll';
  import type { Feed, User } from '$lib/utils/types';
  import { onMount } from 'svelte';
  import FeedRepository from '$lib/repository/feed';
  import Spinner from '$lib/components/Spinner.svelte';
  import { cn } from '$lib/utils.js';

  let loadingState = 'LOADED';
  let feed: Feed[];

  onMount(async () => {
    feed = await FeedRepository.Instance.getFeed();
  });
</script>

{#each feed as item}
  {#if Array.isArray(item) && 'firstName' in item[0]}
    <div class="flex flex-col gap-4">
      <div class="ml-4">
        <h1 class="text-3xl font-bold mb-1">Пообщаемся?</h1>
        <small class="text-sm">Сегодня эти котцы отвечали похожим образом</small>
      </div>
      <div class="flex flex-col gap-2 justify-between w-full">
        <ProfileCard CardProps={item[0] as unknown as User} />
        <ProfileCard CardProps={item[1] as unknown as User} />
        <ProfileCard CardProps={item[2] as unknown as User} />
      </div>
    </div>
  {:else}
    <PollCard CardProps={item as unknown as Poll} />
  {/if}
{/each}
<div class="feed-spinner">
  {#if loadingState == 'LOADING'}
    <Spinner class={cn('feed-spinner')} />
  {:else if loadingState == 'LOADED'}
    <p
      class="text-sm"
      style="text-align:center">
      На сегодня опросы закончились
    </p>
  {/if}
</div>

<style>
  .feed-spinner {
    display: flex;
    justify-content: center;
    margin: 3rem 0;
  }
</style>
