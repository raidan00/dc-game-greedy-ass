<script>
	import { onMount, onDestroy } from "svelte";
	import {  DcWorld } from "dvijcock";
	import DcLogic from "./DcLogic.js";
	import Back from './Back.svelte';

	let domEl;
	let dc;
	onMount(() => {
		dc = new DcWorld();
		dc.setDomElement(domEl);
		dc.setLogic(new DcLogic);
	});
	onDestroy(() => {
		dc.destroy();
	});
</script>

<div bind:this={domEl} class="game"></div>
<Back/>

<style>
	.game {
		width: 100vw;
		height: 100vh;
		margin: 0px;
		top: 0px;
		left: 0px;
		position: fixed;
	}
</style>
