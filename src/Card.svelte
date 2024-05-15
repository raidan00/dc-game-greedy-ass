<script>
	import g from "./global.js";

	export let el;
	export let hide;

	function getNext(){
		if(el.i>el.arr.length-2)el.i = el.arr.length-2;
		return el.arr[el.i+1];
	}
	function setNext(){
		el.i++;
		hide();
		g[el.name] = el.arr[el.i];
	}
</script>

{#if el.i!=el.arr.length-1}
	<div class="card">
		<div class="text">{el.text}</div>
		<button on:click={setNext}>
			Upgrade to <div>{el.formater(getNext())}</div>
		</button>
	</div>
{/if}
<style>
	.card{
		background: grey;
		width: 20vw;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		pointer-events: all;
		min-height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.text {
		background: #a50505;
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

