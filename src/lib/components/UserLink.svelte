<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  import type { User } from '$lib/utils/types';
  export let UserInfo: User;
</script>

<Button
  variant="link"
  href={`https://${UserInfo.tgLink}`}
  style="padding-left: 0">
  <Avatar.Root class="mr-2">
    <Avatar.Fallback>ML</Avatar.Fallback>
  </Avatar.Root>
  @ML_PRRIDE
</Button>
