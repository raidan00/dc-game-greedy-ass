<script>
	import { onMount, onDestroy } from "svelte";
	import { lvl, power, influence, winLooseMsg } from "./store.js";
	import g from "./global.js";

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
	let blur = function(event){
		show = true;
	};
	onMount(async() => {
		interval = setInterval(()=>{
			show = true;
		}, 15000)
		window.addEventListener("blur", blur);
	});
	onDestroy(() => {
		clearInterval(interval);
		window.removeEventListener("blur", blur);
	});
</script>


{#if show && !$winLooseMsg && $lvl != -0}
	<div class="main">
		<div class="card">
			<div>Cost of anti-capitalist society creation</div>
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
	.main > div{
		background: grey;
		width: 20vw;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		pointer-events: all;
	}
	.card {
		min-height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.card > div{
		padding: 10px;
	}
	.main > div div:first-child{
		background: #4c4580;
		border-radius: 3px;
		font-size: 17px;
		min-height: 100px;
		align-content: center;
		flex-direction: column;
		justify-content: center;
		display: flex;
		vertical-align: middle;
	}
</style>
