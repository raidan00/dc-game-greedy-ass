<script>
	import { route } from './store.js';
	import Game from './Game.svelte';
	import SelectLevel from './SelectLevel.svelte';
	import { NotificationDisplay } from '@beyonk/svelte-notifications'
</script>

<NotificationDisplay />
{#if $route == "index"}
	<SelectLevel/>
{:else}
	<Game/>
{/if}

