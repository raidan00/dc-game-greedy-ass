<script>
	import { route } from './store.js';
	import Game from './Game.svelte';
	import SelectLevel from './SelectLevel.svelte';
</script>

{#if $route == "index"}
	<SelectLevel/>
{:else}
	<Game/>
{/if}

