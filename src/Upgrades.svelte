<script>
	import { onMount, onDestroy } from "svelte";
	import g from "./global.js";
	import Card from "./Card.svelte";

	let config = [
		{
			name: "antiCapitalismPrice",
			text: "Cost of anti-capitalism society creation price",
			arr: [25, 20, 17, 15, 12, 10],
			formater: val=>val,
			i: 0,
		},
		{
			name: "communismCooldown",
			text: "Communism on border cooldown",
			arr: [20000, 16000, 14000, 12000, 10000, 8000],
			formater: val=>val/1000 + " seconds",
			i: 0,
		},
		{
			name: "education",
			text: "Humans education",
			arr: [0.75, 0.8, 0.85, 0.9, 0.95, 1],
			formater: val=>val*100 + " %",
			i: 0,
		},
	];
	for (const el of config){
		g[el.name] = el.arr[0];
	}
	let show = false;
	let hide = ()=> {
		show = false;
		setTimeout(()=>{
			show = true;
		},50000)
	}
	hide();
</script>

{#if show }
	<div class="main">
		{#each config as el, i}
			<Card {el} hide={hide}/>
		{/each}
	</div>
{/if}

<style>
	.main {
		height: 100vh;
		position: fixed;
		top: 0px;
		left: 0px;
		color: black;
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}
</style>
