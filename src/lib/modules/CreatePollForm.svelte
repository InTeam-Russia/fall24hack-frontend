<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';
  import { CirclePlus, LoaderCircle } from 'lucide-svelte';
  import * as Tabs from '$lib/components/ui/tabs';
  import { Input } from '$lib/components/ui/input';
  import { z } from 'zod';
  import { Polls } from '$lib/repository/polls';
  import { userStore } from '$lib/stores/userStore';
  import type { Poll, User } from '$lib/utils/types';

  const placeholders = [
    'какой ваш любимый фильм всех времен?',
    'какой жанр музыки вы предпочитаете?',
    'какое ваше любимое блюдо?',
    'какой ваш любимый способ провести выходные?',
    'какой ваш любимый вид спорта?',
    'какой ваш любимый цвет?',
    'какой ваш любимый автор или книга?',
    'какое ваше любимое место для отдыха?',
    'какой ваш любимый праздник?',
    'какой ваш любимый вид искусства?',
  ];

  let errorProvider: Record<string, string | null> = {
    text: null,
    variants: null,
    general: null,
  };

  type PollType = 'radio' | 'text';

  let formState: Record<string, string | PollType | string[] | User | null> = {
    text: '',
    type: 'text',
    variants: ['', '', '', '', '', '', '', '', '', ''],
    author: $userStore,
  };

  let loading: boolean = false;

  const PollSchema = z
    .object({
      text: z.string().min(1, { message: 'Вы не задали вопрос' }),
      type: z.enum(['radio', 'text']),
      variants: z.array(z.string()).length((formState.variants as unknown as string[])?.length),
    })
    .superRefine((data, ctx) => {
      if (data.type === 'radio') {
        const nonEmptyVariants = data.variants.filter((variant) => variant.trim() !== '');

        if (nonEmptyVariants.length < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Введите хотя бы два варианта ответа',
            path: ['variants'],
          });
        }
      }
    });

  const handleSubmit = async () => {
    loading = true;
    const validateResult = PollSchema.safeParse(formState);

    if (!validateResult.success) {
      errorProvider = {};
      validateResult.error.errors?.forEach((err) => {
        errorProvider[err.path[0]] = err.message;
      });
      loading = false;
      return false;
    }

    errorProvider = {
      text: null,
      variants: null,
      general: null,
    };

    const formRequest: Record<string, string | PollType | string[] | User | null> = {
      text: formState.text,
      type: formState.type === 'text' ? 'FREE' : 'RADIO',
    };

    if (formState.type === 'radio') {
      formRequest.variants = (formState.variants as unknown as string[]).filter(
        (item: string) => item !== '',
      );
    } else {
      formRequest.variants = [];
    }

    formRequest.author = $userStore;

    errorProvider.general = (await Polls.Instance.AddPoll(
      formRequest as unknown as Poll,
    )) as unknown as string;

    loading = false;
  };
</script>

<form
  class="flex flex-col max-w-[480px] mx-4 sm:mx-auto mt-12"
  on:submit|preventDefault={handleSubmit}>
  <h1 class="text-3xl text-center font-bold mb-6">Задай свой вопрос</h1>

  <div class="flex flex-col gap-2 my-2">
    <Label for="text">Вопрос</Label>
    <Textarea
      placeholder={`Например, ${placeholders[Math.floor(Math.random() * placeholders.length)]}`}
      class="max-h-[10rem]"
      bind:value={formState.text as unknown as string} />
    {#if errorProvider.text}
      <small class="text-destructive">{errorProvider.text}</small>
    {/if}
  </div>

  <Tabs.Root
    bind:value={formState.type as unknown as string}
    class="w-full">
    <Tabs.List class="w-full">
      <Tabs.Trigger value="text">Свободный ответ</Tabs.Trigger>
      <Tabs.Trigger value="radio">Выбор</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="radio">
      {#each Array.from({ length: (formState.variants as unknown as string[])?.length }, (_, idx) => idx + 1) as idx}
        {#if idx === 1 || (formState.variants as unknown as string[])[idx - 2] !== ''}
          <div class="flex flex-col gap-2 my-4">
            <Label for={`radio-{idx}`}>Введите вариант ответа №{idx}</Label>
            <Input
              name={`radio-{idx}`}
              bind:value={(formState.variants as unknown as string[])[idx - 1]} />
          </div>
        {/if}
      {/each}

      {#if errorProvider.variants}
        <small class="text-destructive my-2">{errorProvider.variants}</small>
      {/if}
    </Tabs.Content>
  </Tabs.Root>

  {#if errorProvider.general}
    <small class="text-destructive my-2">{errorProvider.general}</small>
  {/if}

  <Button
    type="submit"
    class="mt-2"
    disabled={loading}>
    {#if loading}
      <LoaderCircle class="animate-spin h-4 mr-2" />
      Обработка запроса...
    {:else}
      <CirclePlus class="h-4 mr-2" />
      Создать
    {/if}
  </Button>
</form>
