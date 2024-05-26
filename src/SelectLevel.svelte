<script>
	import { route } from './store.js';

	function setLvl(val) {
		route.set(val);
	}
</script>

<div class="main">
	<div class="text">
		Greedy ass pulling out all money from people. You must stop this.
	</div>
	<div class="levels">
		levels:
	</div>
	<button on:click={()=>setLvl("howToPlay")}>
		how to play
	</button>
	<button on:click={()=>setLvl("lvl1")}>
		1
	</button>
	<button on:click={()=>setLvl("lvl2")}>
		2
	</button>
	<button on:click={()=>setLvl("lvl3")}>
		3
	</button>
</div>

<style>
	.text {
		width: 70vw;
		font-size: 24px;
		margin-bottom: 10px;
		background: #cacff9;
		border-radius: 10px;
		padding: 10px;
		margin: auto;
	}
	.levels {
		font-size: 22px;
		color: black;
		text-shadow: 2px 2px 4px #ffffff;
	}
	* {
		margin: 5px;
	}
</style>
