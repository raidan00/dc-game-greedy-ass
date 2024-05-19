<script context="module">
	import { writable } from 'svelte/store';
	const winMsg = writable(false);
	export { winMsg };
</script>
<script>
	import { route } from './store.js';
	winMsg.set("")
	function back(val) {
		route.set("index");
	}
</script>

{#if $winMsg != ""}
	<div class="main">
		<div class="msg">
			<div>
				You win
			</div>
			<button on:click={back}>
				Back
			</button>
		</div>
	</div>
{/if}

<style>
	.main {
		position: fixed;
		right: 0px;
		top: 0px;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		pointer-events: none;
	}
	.msg {
		font-size: 40px;
		background: #b7b7b7;
		width: 50vw;
		border: 2px solid black;
		color: black;
		pointer-events: all;
		width: 100vw;
	}
	button {
		font-size: 20px;
		margin: 10px;
	}
</style>


