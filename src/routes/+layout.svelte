<script lang="ts">
  import Navbar from '$lib/modules/Navbar.svelte';
  import { onMount } from 'svelte';
  import '../app.css';
  import { ModeWatcher, setMode } from 'mode-watcher';
  import { userStore } from '$lib/stores/userStore';
  import { Users } from '$lib/repository/users';

  let { children } = $props();

  onMount(() => {
    setMode('light');
  });

  onMount(async () => {
    userStore.set(await Users.Instance.GetSession());
  });
</script>

<ModeWatcher />
<Navbar />
<main class="max-w-screen-md mb-12 mx-auto">
  {@render children()}
</main>
