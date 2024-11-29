<script>
  import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
  import { userStore } from '$lib/stores/userStore';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<ThemeSwitcher />

{JSON.stringify($userStore)}
