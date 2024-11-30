<script lang="ts">
  import ProfileCard from '$lib/modules/ProfileCard.svelte';
  import PollCard from '$lib/modules/PollCard.svelte';
  import type { Poll } from '$lib/types/poll';
  import type { Feed, User } from '$lib/utils/types';
  import { onMount } from 'svelte';
  import FeedRepository from '$lib/repository/feed';
  import { Button } from '$lib/components/ui/button';
  import { Skeleton } from '$lib/components/ui/skeleton';
  import { ChevronDown, Loader2 } from 'lucide-svelte';

  type loadingState = 'PENDING' | 'ERROR' | 'OK';

  let loading: Record<string, loadingState> = {
    feed: 'PENDING',
    nextFeed: 'OK',
    button: 'OK',
  };

  let feed: Feed[] = [];

  onMount(async () => {
    feed = await FeedRepository.Instance.getNextFeed(0, 3);
    loading.feed = 'OK';
  });

  const handleUpdateFeed = async () => {
    loading.button = 'PENDING';
    loading.nextFeed = 'PENDING';
    const nextFeed = await FeedRepository.Instance.getNextFeed(0, 3);
    feed = feed.concat(nextFeed);
    loading.button = 'OK';
    loading.nextFeed = 'OK';
  };
</script>

{#if loading.feed === 'PENDING'}
  <Skeleton class="w-[100% - 2rem] mx-2 h-36" />
  <Skeleton class="w-[100% - 2rem] mx-2 h-12" />
  <div class="mx-2 flex flex-col sm:flex-row gap-8 justify-between w-full">
    <Skeleton class="w-full h-36" />
    <Skeleton class="w-full h-36" />
    <Skeleton class="w-full h-36" />
  </div>
{:else if feed.length !== 0}
  {#each feed as item}
    {#if Array.isArray(item) && 'firstName' in item[0]}
      <div class="flex flex-col gap-4">
        <div class="ml-4">
          <h1 class="text-3xl font-bold mb-1">Пообщаемся?</h1>
          <small class="text-sm">Сегодня эти котцы отвечали похожим образом</small>
        </div>
        <div class="flex flex-col sm:flex-row gap-2 justify-between w-full">
          <ProfileCard CardProps={item[0] as unknown as User} />
          <ProfileCard CardProps={item[1] as unknown as User} />
          <ProfileCard CardProps={item[2] as unknown as User} />
        </div>
      </div>
    {:else}
      <PollCard CardProps={item as unknown as Poll} />
    {/if}
  {/each}
{:else}
  <p
    class="text-sm"
    style="text-align:center">
    На сегодня опросы закончились
  </p>
{/if}

{#if loading.nextFeed === 'PENDING'}
  <Skeleton class="w-[100% - 2rem] mx-2 h-36" />
  <Skeleton class="w-[100% - 2rem] mx-2 h-12" />
  <div class="mx-2 flex flex-col sm:flex-row gap-8 justify-between w-full">
    <Skeleton class="w-full h-36" />
    <Skeleton class="w-full h-36" />
    <Skeleton class="w-full h-36" />
  </div>
{/if}

<div class="flex flex-row justify-center">
  <Button
    class="mx-auto"
    on:click={handleUpdateFeed}
    disabled={loading.button === 'PENDING' || loading.feed === 'PENDING'}>
    {#if loading.button === 'OK'}
      <ChevronDown class="mr-4 h-4" />
      Загрузить ещё
    {:else if loading.button === 'ERROR'}
      <ChevronDown class="mr-4 h-4" />
      Ошибка, пробуем ещё?
    {:else}
      <Loader2 class="animate-spin mr-4 h-4" />
      Загружаем...
    {/if}
  </Button>
</div>
