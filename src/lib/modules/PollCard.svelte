<script lang="ts">
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import MessageCircleWarning from 'lucide-svelte/icons/message-circle-warning';
  import Share2 from 'lucide-svelte/icons/share-2';
  import EllipsisVertical from 'lucide-svelte/icons/ellipsis-vertical';
  import UserLink from '$lib/components/UserLink.svelte';
  import RadioPoll from './RadioPoll.svelte';
  import TextPoll from './TextPoll.svelte';
  import type { Poll } from '$lib/utils/types';

  export let CardProps: Poll;
  let value: string;

  const handleSubmit = () => {};
</script>

<Card.Root class="mx-2 shadow-md rounded-lg py-3 px-4">
  <Card.Header class="m-0 p-0 pb-6">
    <div>
      <div
        class="flex flex-row"
        style="justify-content: space-between; align-items: center">
        <Card.Title>{CardProps.text}</Card.Title>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger
            asChild
            let:builder>
            <Button
              size="icon"
              builders={[builder]}
              variant="outline"><EllipsisVertical class="h-4 w-4" /></Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content class="w-56">
            <DropdownMenu.Group>
              <DropdownMenu.Item>
                <Share2 class="mr-2 h-4 w-4" />
                <span>Поделиться</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <MessageCircleWarning class="mr-2 h-4 w-4" />
                <span>Пожаловаться</span>
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  </Card.Header>
  <Card.Content class="m-0 p-0">
    {#if CardProps.type == 'radio'}
      <RadioPoll
        variants={CardProps.variants ?? []}
        bind:value
        {handleSubmit} />
    {:else}
      <TextPoll
        bind:value
        {handleSubmit} />
    {/if}
  </Card.Content>
  <Card.Footer class="m-0 p-0 pt-8">
    <UserLink UserInfo={CardProps.author} />
  </Card.Footer>
</Card.Root>
