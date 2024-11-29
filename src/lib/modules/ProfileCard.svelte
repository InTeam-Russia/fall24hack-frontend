<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Card } from '$lib/components/ui/card';
  import type { User } from '$lib/stores/userStore';
  import { AtSign, Mail, MessageSquareMore } from 'lucide-svelte';

  export let CardProps: User;
</script>

<Card class="mx-2 rounded-lg py-3 px-4 shadow-md flex-1 flex flex-col justify-between">
  <div>
    <h1 class="font-bold text-xl">{CardProps.firstName} {CardProps.lastName}</h1>
    <small class="flex flex-row items-center text-zinc-500 mt-2">
      <AtSign class="h-3 w-3 mr-[.25rem]" />
      {CardProps.username}
    </small>
    <small class="flex flex-row items-center text-zinc-500">
      <Mail class="h-3 w-3 mr-[.25rem]" />
      {CardProps.email}
    </small>
    <small class="flex flex-row items-center text-zinc-500">
      <MessageSquareMore class="h-3 w-3 mr-[.25rem]" />
      {CardProps.tgLink}
    </small>
  </div>

  <Button
    size="sm"
    class="mt-4 text-xs"
    href={`https://${CardProps.tgLink}`}
    target="_blank">Контакт!</Button>
</Card>
