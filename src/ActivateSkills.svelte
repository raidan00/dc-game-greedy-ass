<script>
	import g from "./global.js";
	import models from "./models.js";

	function antiCapitalism(){
		if(!g.activeHuman)return;
		let sign = models.sign.scene.clone();
		sign.position.set(g.activeHuman.position.x, 0, g.activeHuman.position.z);
		g.dcWorld.scene.add(sign);
		let num = 0;
		sign.dcData = {
			tickAfterPhysics(delta){
				if(num>100)return;
				let money = models.money.scene.clone();
				money.position.set(g.activeHuman.position.x, 10, g.activeHuman.position.z);
				g.dcWorld.add(money);
			}
		}
	}
	function communism(){
	}
	function onKeyDown(e){
		switch(e.code){
			case "Digit1":
				antiCapitalism();
				break;
			case "Digit2":
				communism();
				break;
		}
	}
</script>

<button class="skill1" on:click={antiCapitalism}>anti capitalism</button>
<button class="skill2" on:click={communism}>communism on borders</button>
<svelte:window on:keydown={onKeyDown}/>

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
