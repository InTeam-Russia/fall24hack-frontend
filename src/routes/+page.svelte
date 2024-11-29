<script lang="ts">
  import ProfileCard from '$lib/modules/ProfileCard.svelte';
  import { userStore, type User } from '$lib/stores/userStore';
  import PollCard from '$lib/modules/PollCard.svelte';
  import type { Poll } from '$lib/types/poll';

  type UserOrPoll = User[] | Poll;

  let feed: UserOrPoll[] = [
    {
      id: 123,
      type: 'radio',
      text: '123',
      author: {
        firstName: 'Иван',
        lastName: 'Афоничев',
        username: 'iafonichev',
        email: 'iafonichev@gmail.com',
        tgLink: 't.me/BoringPlace',
      },
    },
    [
      {
        firstName: 'Иван',
        lastName: 'Афоничев',
        username: 'iafonichev',
        email: 'iafonichev@gmail.com',
        tgLink: 't.me/BoringPlace',
      },
      {
        firstName: 'Марк',
        lastName: 'Даун',
        username: 'markdaun',
        email: 'markdaun@gmail.com',
        tgLink: 't.me/markdaun',
      },
      {
        firstName: 'Яна',
        lastName: 'Цист',
        username: 'cistit',
        email: 'agile@nigga.com',
        tgLink: 't.me/fuckmeplsomg',
      },
    ],
    {
      id: 123,
      type: 'text',
      text: '123',
      author: {
        firstName: 'Иван',
        lastName: 'Афоничев',
        username: 'iafonichev',
        email: 'iafonichev@gmail.com',
        tgLink: 't.me/BoringPlace',
      },
    },
  ];
</script>

<main class="feed items-stretch max-w-screen-sm mt-6 md:mt-16 mx-auto">
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
