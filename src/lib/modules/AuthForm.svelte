<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { SERVER } from '$lib/config';
  import { getUserSession } from '$lib/data';
  import { userStore } from '$lib/stores/userStore';
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
    errorProvider = {
      username: null,
      password: null,
    };

    const formRequest: Record<string, string | null> = {
      username: formState.username,
      password: formState.password,
    };

    try {
      const response = await fetch(`${SERVER}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formRequest),
      });

      if (response.ok) {
        userStore.set(await getUserSession());
        loadingState = false;
        goto('/profile');
      } else {
        const errorData = await response.json();
        errorProvider.general = (errorData.message as string) || 'Ошибка авторизации';
        loadingState = false;
      }
    } catch (error) {
      errorProvider.general = (error as string) || 'Сетевая ошибка. Попробуйте позже';
      loadingState = false;
    }
  };
</script>

<form
  class="flex flex-col max-w-[480px] mx-4 sm:mx-auto mt-12"
  on:submit|preventDefault={handleSubmit}>
  <h1 class="text-3xl text-center font-bold mb-6">Вход</h1>

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
