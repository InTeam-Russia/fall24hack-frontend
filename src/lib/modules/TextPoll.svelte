<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { Label } from '$lib/components/ui/label/index.js';

  import { Textarea } from '$lib/components/ui/textarea/index.js';
</script>

<div
  class="grid w-full gap-1.5"
  style="margin-bottom: 1rem">
  <Label>Твой ответ:</Label>
  <Textarea
    placeholder="У попа была собака..."
    class="max-h-[10rem]" />
</div>
<Button>Ответить</Button>
