<script lang="ts">
  import ProfileCard from '$lib/modules/ProfileCard.svelte';
  import { userStore, type User } from '$lib/stores/userStore';

  type UserOrPoll = User[];

  let feed: UserOrPoll[] = [
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
  ];
</script>

<main class="items-stretch max-w-screen-sm mt-16 mx-auto">
  {#each feed as item}
    {#if item[0] && 'firstName' in item[0]}
      <div class="flex flex-col sm:flex-row gap-2 justify-between w-full">
        <ProfileCard CardProps={item[0] as unknown as User} />
        <ProfileCard CardProps={item[1] as unknown as User} />
        <ProfileCard CardProps={item[2] as unknown as User} />
      </div>
    {/if}
  {/each}
</main>

<div class="w-full overflow-hidden">
  {JSON.stringify($userStore)}
</div>
