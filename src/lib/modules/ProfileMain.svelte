<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { Separator } from '$lib/components/ui/separator';
  import { Skeleton } from '$lib/components/ui/skeleton';
  import { logout } from '$lib/data';
  import { userStore } from '$lib/stores/userStore';
  import { AtSign, LoaderCircle, LogOut, Mail, MessageSquareMore } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let userInfo: Record<string, string> | null = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    tgLink: '',
  };

  let loadingState: Record<string, boolean> = {
    userInfo: true,
    logout: false,
  };

  onMount(async () => {
    userInfo = {
      firstName: $userStore?.firstName ?? '',
      lastName: $userStore?.lastName ?? '',
      email: $userStore?.email ?? '',
      username: $userStore?.username ?? '',
      tgLink: $userStore?.tgLink ?? '',
    };

    if (!userInfo) {
      goto('/auth');
    }

    loadingState.userInfo = false;
  });

  const handleLogout = async () => {
    loadingState.logout = true;
    await logout();
    goto('/auth');
  };
</script>

{#if loadingState.userInfo}
  <form class="flex flex-col max-w-screen-md mx-4 sm:mx-auto">
    <h1 class="text-3xl text-center font-bold mt-12">Профиль</h1>
    <Separator class="mb-6" />

    <div class="flex flex-col gap-2 my-2">
      <Skeleton class="w-30 h-4 rounded-md" />
      <Skeleton class="w-full h-8 rounded-md" />
    </div>

    <div class="flex flex-col gap-2 my-2">
      <Skeleton class="w-30 h-4 rounded-md" />
      <Skeleton class="w-full h-8 rounded-md" />
    </div>

    <div class="flex flex-col gap-2 my-2">
      <Skeleton class="w-30 h-4 rounded-md" />
      <Skeleton class="w-full h-8 rounded-md" />
    </div>

    <div class="flex flex-col gap-2 my-2">
      <Skeleton class="w-30 h-4 rounded-md" />
      <Skeleton class="w-full h-8 rounded-md" />
    </div>

    <div class="flex flex-col gap-2 my-2">
      <Skeleton class="w-30 h-4 rounded-md" />
      <Skeleton class="w-full h-8 rounded-md" />
    </div>
  </form>
{:else if userInfo}
  <form
    class="flex flex-col max-w-screen-md mx-4 sm:mx-auto"
    on:submit|preventDefault={handleLogout}>
    <h1 class="text-3xl text-center font-bold mt-12 mb-6">Профиль</h1>
    <Separator class="mb-6" />

    <div class="flex flex-col my-2">
      <small class="text-zinc-500">Имя</small>
      <p>{userInfo.firstName}</p>
    </div>

    <div class="flex flex-col my-2">
      <small class="text-zinc-500">Фамилия</small>
      <p>{userInfo.lastName}</p>
    </div>

    <div class="flex flex-col my-2">
      <small class="text-zinc-500">Адрес email</small>
      <p class="flex flex-row items-center"><Mail class="h-4" />{userInfo.email}</p>
    </div>

    <div class="flex flex-col my-2">
      <small class="text-zinc-500">Хэндл</small>
      <p class="flex flex-row items-center"><AtSign class="h-4" />{userInfo.username}</p>
    </div>

    <div class="flex flex-col my-2">
      <small class="text-zinc-500">Телеграм</small>
      <p class="flex flex-row items-center"><MessageSquareMore class="h-4" />{userInfo.tgLink}</p>
    </div>

    <Button
      type="submit"
      variant="destructive"
      class="mt-4 max-w-[324px]">
      {#if loadingState.button}
        <LoaderCircle class="animate-spin h-4 mr-2" />
        Выходим...
      {:else}
        <LogOut class="h-4" />&nbsp;<span>Выйти из профиля</span>
      {/if}
    </Button>
  </form>
{/if}
