<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';

  import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
</script>

<RadioGroup.Root
  style="margin-bottom: 1rem"
  value="comfortable">
  <div class="flex items-center space-x-2 my-1">
    <RadioGroup.Item
      value="default"
      id="r1" />
    <Label for="r1">Гей</Label>
  </div>
  <div class="flex items-center space-x-2 my-1">
    <RadioGroup.Item
      value="comfortable"
      id="r2" />
    <Label for="r2">Пидорас</Label>
  </div>
  <div class="flex items-center space-x-2 my-1">
    <RadioGroup.Item
      value="compact"
      id="r3" />
    <Label for="r3">Гомосек</Label>
  </div>
  <RadioGroup.Input name="spacing" />
</RadioGroup.Root>
<Button>Дать голос</Button>
