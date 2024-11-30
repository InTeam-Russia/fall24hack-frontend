<script lang="ts">
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Skeleton } from '$lib/components/ui/skeleton';
  import { userStore } from '$lib/stores/userStore';
  import { Cat, CircleUserRound, KeyRound } from 'lucide-svelte';
</script>

<nav class="flex flex-row items-center justify-center py-2 px-4 max-w-screen-sm relative mx-auto">
  <a
    href="/"
    class="flex flex-row items-center gap-2">
    <Cat class="h-16 w-12 text-primary" />
    <div class="flex flex-col items-center text-primary">
      <span class="text-3xl font-bold uppercase tracking-wide">Котец</span>
      <small class="text-[0.75rem] italic -mt-1">Какой кот ты сегодня?</small>
    </div>
  </a>

  {#await userStore}
    <Skeleton class="rounded-full w-12 aspect-square ml-auto bg-zinc-300 absolute right-4" />
  {:then}
    {#if $userStore === null}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          class="flex flex-row items-center justify-center bg-zinc-200 dark:bg-zinc-800 rounded-full w-12 aspect-square ml-auto absolute right-4">
          <KeyRound class="w-8 text-zinc-600 dark:text-zinc-300" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.Item href="/">Главная</DropdownMenu.Item>
            <DropdownMenu.Item href="/auth">Вход</DropdownMenu.Item>
            <DropdownMenu.Item href="/register">Регистрация</DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    {:else}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          class="flex flex-row items-center justify-center bg-zinc-200 dark:bg-zinc-800 rounded-full w-12 aspect-square ml-auto absolute right-4">
          <CircleUserRound class="w-8 text-zinc-600 dark:text-zinc-300" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.Item class="font-bold">
              @{$userStore?.username ?? 'iafonichev'}
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item href="/">Главная</DropdownMenu.Item>
            <DropdownMenu.Item href="/profile">Профиль</DropdownMenu.Item>
            <DropdownMenu.Item href="/polls/new">Задать вопрос</DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    {/if}
  {/await}
</nav>
