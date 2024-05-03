<script>
	import { route } from './store.js';
	import Game from './Game.svelte';

	setInterval(()=>{
		if($route == "index") route.set("some");
		else route.set("index");
	},100);
</script>

{#if $route == "index"}
	<Game/>
{/if}
