<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Avatar from '$lib/components/ui/avatar/index.js';
</script>

<Button
  variant="link"
  style="padding-left: 0">
  <Avatar.Root class="mr-2">
    <Avatar.Image
      src="https://github.com/shadcn.png"
      alt="@shadcn" />
    <Avatar.Fallback>CN</Avatar.Fallback>
  </Avatar.Root>
  @ML_PRRIDE
</Button>
