<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Users } from '$lib/repository/users';
  import { KeyRound, LoaderCircle } from 'lucide-svelte';

  let errorProvider: Record<string, string | null> = {
    username: null,
    password: null,
    general: null,
  };

  let formState: Record<string, string> = {
    username: '',
    password: '',
  };

  let loadingState: boolean = false;

  const handleSubmit = async () => {
    loadingState = true;

    errorProvider = {
      username: null,
      password: null,
      general: null,
    };

    const formRequest: Record<string, string | null> = {
      username: formState.username,
      password: formState.password,
    };

    errorProvider.general = await Users.Instance.Login(formRequest);
    if (!errorProvider.general) goto('/');
    loadingState = false;
  };
</script>

<form
  class="flex flex-col max-w-[480px] mx-4 sm:mx-auto"
  on:submit|preventDefault={handleSubmit}>
  <h1 class="text-3xl text-center font-bold mt-12 mb-6">Вход</h1>

  <div class="flex flex-col gap-2 my-2">
    <Label for="username">Хэндл</Label>
    <Input
      type="text"
      id="username"
      name="username"
      placeholder="Введите хэндл"
      bind:value={formState.username}
      tabindex={4} />
    {#if errorProvider.username}
      <small class="text-destructive">{errorProvider.username}</small>
    {/if}
  </div>

  <div class="flex flex-col gap-2 my-2">
    <Label for="password">Пароль</Label>
    <Input
      type="password"
      id="password"
      name="password"
      placeholder="Введите пароль"
      bind:value={formState.password}
      tabindex={5} />
    {#if errorProvider.password}
      <small class="text-destructive">{errorProvider.password}</small>
    {/if}
  </div>

  {#if errorProvider.general}
    <small class="text-destructive my-2">{errorProvider.general}</small>
  {/if}

  <Button
    type="submit"
    class="mt-2"
    disabled={loadingState}>
    {#if loadingState}
      <LoaderCircle class="animate-spin h-4 mr-2" />
      Обработка запроса...
    {:else}
      <KeyRound class="h-4 mr-2" />
      Войти
    {/if}
  </Button>
</form>
