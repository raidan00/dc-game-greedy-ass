<script>
	import { onMount, onDestroy } from "svelte";
	import { power, influence, winLooseMsg } from "./store.js";
	import g from "./global.js";
	import Card from "./Card.svelte";


	let config = [
		{
			name: "antiCapitalismPrice",
			text: "Cost of anti-capitalism society creation",
			arr: [100, 80, 60, 40, 20, 10],
		},
		{
			name: "communismCooldown",
			text: "Communism on border cooldown",
			arr: [10000, 8000, 6000, 4000, 3000, 2000],
		},
		{
			name: "education",
			text: "Humans education",
			arr: [0.1, 0.2, 0.4, 0.6, 0.8, 1],
		},
	]
	let powers = [5, 10, 20, 25, 30, 32, 34, 36, 38, 40];
	let powerI = 0;
	function getNextPower(){
		if(powerI > powers.length-2)powerI = powers.length-2;
		return powers[powerI+1];
	}
	let influences = [7000, 6000, 5000, 4000, 3000, 2500, 2000, 1500, 1000, 500];
	let influenceI = 0;
	function getNextInfluence(){
		if(influenceI>influences.length-2)influenceI = influences.length-2;
		return influences[influenceI+1];
	}
	$power = powers[0];
	$influence = influences[0];
	let show = true;
	let interval;
	onMount(async() => {
		interval = setInterval(()=>{
			show = true;
		}, 15000)
	});
	onDestroy(() => {
		clearInterval(interval);
	});
</script>


{#if show && !$winLooseMsg}
	<div class="main">
		{#each config as el, i}
			<Card config={el}/>
		{/each}
		<div class="card">
			<div>Cost of anti-capitalism society creation</div>
			<button on:click={()=>{ $power = getNextPower(); show=false; powerI++;} }>
				Upgrade to {getNextPower().toFixed(2)}
			</button>

		</div>
		<div class="card">
			<div>Communism on border cooldown</div>
			<button on:click={()=>{ $influence = getNextInfluence(); show=false; influenceI++;} }>
				Upgrade to {getNextInfluence().toFixed(2)}
			</button>
		</div>
		<div class="card">
			<div>Humans education</div>
			<button on:click={()=>{ $influence = getNextInfluence(); show=false; influenceI++;} }>
				Upgrade to {getNextInfluence().toFixed(2)}
			</button>
		</div>
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
