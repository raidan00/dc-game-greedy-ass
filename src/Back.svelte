<script>
	import { route } from './store.js';

	function back(val) {
		route.set("index");
	}
</script>

<button on:click={back}>
	Back
</button>

<style>
	button {
		margin: 0px;
		top: 0px;
		left: 0px;
		position: fixed;
	}
</style>
