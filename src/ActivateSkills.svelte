<script context="module">
	export let skill1Button;
	export let skill2Button;
</script>
<script>
	import { onMount, onDestroy } from "svelte";
	import g from "./global.js";
	import models from "./models.js";

	onMount(() => {
		skill1Button.addEventListener('click', ()=>{
			if(!g.activeHuman)return;
			let sign = models.sign.scene.clone();
			sign.position.set(g.activeHuman.position.x, 0, g.activeHuman.position.z);
			g.dcWorld.scene.add(sign);
		});
	});
</script>

<button class="skill1" bind:this={skill1Button}>anti capitalism</button>
<button class="skill2" bind:this={skill2Button}>communism on borders</button>

<style>
	.skill1 {
		bottom: 0px;
		right: min(15vw, 15vh);
	}
	.skill2 {
		bottom: min(15vw, 15vh);
		right: 0px;
	}
	.skill1, .skill2 {
		font-size: min(3vw, 3vh);
		width: min(20vw, 20vh);
		height: min(20vw, 20vh);
		border-radius: 50%;
		align-items: center;
		justify-content: center;
		display: flex;
		position: fixed;
	}
</style>
