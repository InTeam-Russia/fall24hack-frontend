<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Textarea } from '$lib/components/ui/textarea/index.js';

  const placeholders = ['Я считаю, что ...', 'По моим убеждениям, ...', 'Статистически, ...'];

  export let value: string;
  export let handleSubmit: () => void;
</script>

<div
  class="grid w-full gap-1.5"
  style="margin-bottom: 1rem">
  <Label class="ml-[.25rem]">Твой ответ:</Label>
  <Textarea
    placeholder={placeholders[Math.floor(Math.random() * placeholders.length)]}
    class="max-h-[10rem]"
    bind:value />
</div>

<Button
  size="sm"
  class="text-xs"
  target="_blank"
  on:click={handleSubmit}>Ответить!</Button>
