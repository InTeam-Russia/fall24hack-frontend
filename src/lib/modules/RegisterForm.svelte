<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { SERVER } from '$lib/config';
  import { KeyRound, LoaderCircle } from 'lucide-svelte';
  import { z } from 'zod';

  let errorProvider: Record<string, string | null> = {
    firstName: null,
    lastName: null,
    email: null,
    username: null,
    password: null,
    confirmPassword: null,
    general: null,
  };

  let formState: Record<string, string> = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  let loadingState: boolean = false;

  const FormSchema = z
    .object({
      firstName: z.string().min(1, { message: 'Имя обязательно' }),
      lastName: z.string().min(1, { message: 'Фамилия обязательна' }),
      email: z.string().email({ message: 'Некорректный email' }),
      username: z.string().min(1, { message: 'Хэндл обязателен' }),
      password: z
        .string()
        .min(8, { message: 'Пароль должен содержать минимум 8 символов' })
        .regex(/[A-Z]/, { message: 'Пароль должен содержать хотя бы одну заглавную букву' })
        .regex(/[0-9]/, { message: 'Пароль должен содержать хотя бы одну цифру' }),
      confirmPassword: z.string().min(1, { message: 'Подтверждение пароля обязательно' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Пароли не совпадают',
      path: ['confirmPassword'],
    });

  const handleSubmit = async () => {
    const validateResult = FormSchema.safeParse(formState);

    if (!validateResult.success) {
      errorProvider = {};
      validateResult.error.errors?.forEach((err) => {
        errorProvider[err.path[0]] = err.message;
      });
      return false;
    }

    errorProvider = {
      firstName: null,
      lastName: null,
      email: null,
      username: null,
      password: null,
      confirmPassword: null,
    };

    const formRequest: Record<string, string | null> = {
      firstName: formState.firstName,
      lastName: formState.lastName,
      email: formState.null,
      username: formState.username,
      password: formState.password,
    };

    try {
      const response = await fetch(`${SERVER}/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formRequest),
      });

      if (response.ok) {
        loadingState = false;
        goto('/auth');
      } else {
        const errorData = await response.json();
        errorProvider.general = (errorData.message as string) || 'Ошибка регистрации';
        loadingState = false;
      }
    } catch (error) {
      errorProvider.general = (error as string) || 'Сетевая ошибка. Попробуйте позже';
      loadingState = false;
    }
  };
</script>

<form
  class="flex flex-col max-w-[480px] mx-4 sm:mx-auto"
  on:submit|preventDefault={handleSubmit}>
  <h1 class="text-3xl text-center font-bold mt-12 mb-6">Регистрация</h1>

  <div class="flex flex-col gap-2 my-2">
    <Label for="firstName">Имя</Label>
    <Input
      type="text"
      id="firstName"
      name="firstName"
      placeholder="Введите имя"
      bind:value={formState.firstName}
      tabindex={1} />
    {#if errorProvider.firstName}
      <small class="text-destructive">{errorProvider.firstName}</small>
    {/if}
  </div>

  <div class="flex flex-col gap-2 my-2">
    <Label for="lastName">Фамилия</Label>
    <Input
      type="text"
      id="lastName"
      name="lastName"
      placeholder="Введите фамилию"
      bind:value={formState.lastName}
      tabindex={2} />
    {#if errorProvider.lastName}
      <small class="text-destructive">{errorProvider.lastName}</small>
    {/if}
  </div>

  <div class="flex flex-col gap-2 my-2">
    <Label for="username">Адрес email</Label>
    <Input
      type="text"
      id="email"
      name="email"
      placeholder="Введите email"
      bind:value={formState.email}
      tabindex={3} />
    {#if errorProvider.useremailname}
      <small class="text-destructive">{errorProvider.email}</small>
    {/if}
  </div>

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

  <div class="flex flex-col gap-2 my-2">
    <Label for="confirmPassword">Повтор пароля</Label>
    <Input
      type="password"
      id="confirmPassword"
      name="confirmPassword"
      placeholder="Повторите пароль"
      bind:value={formState.confirmPassword}
      tabindex={6} />
    {#if errorProvider.confirmPassword}
      <small class="text-destructive">{errorProvider.confirmPassword}</small>
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
      Зарегистрироваться
    {/if}
  </Button>
</form>
