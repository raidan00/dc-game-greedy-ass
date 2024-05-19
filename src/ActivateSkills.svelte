<script>
	import g from "./global.js";
	import models from "./models.js";
	import * as t from "three"
	import * as dc from 'dvijcock';

	function antiCapitalism(){
		if(!g.activeHuman)return;
		let sign = models.sign.scene.children[0].clone();
		sign.position.set(g.activeHuman.position.x, 2, g.activeHuman.position.z);
		g.dcWorld.add(sign);
		sign.dcData.rbody.setAngularFactor(dc.ammoTmp.vec(0, 0, 0));
		let coin;
		sign.dcData.tickAfterPhysics =(delta)=>{
				if(coin){
					let velocity = coin.dcData.rbody.getLinearVelocity();
					let velVec = new t.Vector3(velocity.x(), velocity.y(), velocity.z());
					if(velVec.length()>3)return;
					let pushVec = sign.position.clone().sub(coin.position).normalize().multiplyScalar(1);
					coin.dcData.rbody.applyCentralForce(dc.ammoTmp.vec(pushVec.x, pushVec.y, pushVec.z));
				}else{
					coin = models.money.scene.children[0].clone();
					coin.position.set(0, 2, 0);
					g.dcWorld.add(coin);
					g.assMoney--;
					if(g.dcLogic.arrowAndInfrom){
						g.dcLogic.arrowAndInfrom.destroy();
						let str = `Step3\n pick up coin`
						g.dcLogic.arrowAndInfrom = new dc.ArrowAndInfrom(str, models.arrow.scene, g.activeHuman, coin, 6);
					}
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
