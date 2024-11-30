<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  export let variants: string[];
  export let value: string = variants[0];
  export let handleSubmit: () => void;
</script>

<RadioGroup.Root
  style="margin-bottom: 1rem"
  bind:value>
  {#each variants as variant}
    <div class="flex items-center space-x-2">
      <Label class="flex items-center gap-2 py-2">
        <RadioGroup.Item value={variant} />
        {variant}
      </Label>
    </div>
  {/each}
  <RadioGroup.Input name="spacing" />
</RadioGroup.Root>

<Button
  size="sm"
  class="text-xs"
  target="_blank"
  on:click={handleSubmit}>Ответить!</Button>
