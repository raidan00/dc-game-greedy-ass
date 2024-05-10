<script>
	import { route } from './store.js';
	import Game from './Game.svelte';
	import SelectLevel from './SelectLevel.svelte';
	import Back from './Back.svelte';
</script>

{#if $route == "index"}
	<SelectLevel/>
{:else}
	<Game/>
	<Back/>
{/if}

