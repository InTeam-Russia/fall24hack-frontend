<script lang="ts">
  import Navbar from '$lib/modules/Navbar.svelte';
  import { onMount } from 'svelte';
  import '../app.css';
  import { ModeWatcher, setMode } from 'mode-watcher';

  let { children } = $props();

  onMount(() => {
    setMode('light');
  });
</script>

<ModeWatcher />
<Navbar />
<main class="max-w-screen-md mb-12 mx-auto">
  {@render children()}
</main>
