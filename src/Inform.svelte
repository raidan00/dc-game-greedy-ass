<script>
	import { onMount, onDestroy } from "svelte";
	import g from "./global.js";

	let assMoney = 1;
	let humanMoney = 1;
	let activeHuman;
	
	let interval = setInterval(()=>{
		assMoney = g.assMoney;
		activeHuman = g.activeHuman;
		if(activeHuman){
			humanMoney = activeHuman.dcData.money;
		}
	}, 100);
	onDestroy(()=>{
		clearInterval(interval);
	});
</script>

<div class="main">
	<div>
		Greedy ass money: {assMoney}
	</div>
	{#if activeHuman}
		<div>
			Selected human money: {humanMoney}
		</div>
	{/if}

</div>

<style>
	.main{
		position: fixed;
		right: 0px;
		top: 0px;
		background: white;
		border: 2px solid black;
		border-radius: 5px;
		text-align: left;
		padding: 3px;
		font-size: 14px;
	}
</style>


