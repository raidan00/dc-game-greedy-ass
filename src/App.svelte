<script>
	import { route } from './store.js';
	import Game from './Game.svelte';
</script>

{#if $route == "index"}
	<Game/>
{/if}
