import {get as storeGet} from 'svelte/store';
import * as t from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dc from 'dvijcock';
import { route as routeStore } from './store.js';
import models from "./models.js";
import g from "./global.js";
import { winMsg } from './WinMsg.svelte';

let config = {
	humanMoney:{
		howToPlay: 50,
		lvl1: 50,
		lvl2: 50,
	},
	assMoney:{
		howToPlay: 3,
		lvl1: 50,
		lvl2: 100,
	},
	assPullDelay:{
		howToPlay: 99999999999,
		lvl1: 10000,
		lvl2: 5000,
	},
}
export default class{
	constructor(){}
	init(){
		dc.config.collisionFilter = 0b01;
		let route = storeGet(routeStore);
		let dcWorld = g.dcWorld = this.dcWorld;
		g.dcLogic = this;
		g.assMoney = config.assMoney[route];

		dcWorld.camera = models[route].cameras[0].clone();
		this.controls = new OrbitControls(dcWorld.camera, dcWorld.renderer.domElement);
		this.controls.enablePan = false;

		dcWorld.scene.add(dcWorld.camera);
		dcWorld.scene.add(dc.defaultLights);

		let wordScene = models[route].scene.clone();
		dcWorld.add(wordScene);
		let humans = wordScene.getObjectsByUserDataProperty("HumanPlace", true);
		humans = humans.map((objPlace)=>{
			objPlace.removeFromParent();
			let human = models.human.scene.children[0].clone();
			human.position.copy(objPlace.position);
			human.dcData = {
				setFriction: 3,
				type: "human",
				money: config.humanMoney[route],
			}
			dcWorld.add(human);
			human.dcData.rbody.setAngularFactor(dc.ammoTmp.vec(0, 0, 0));
			return human;
		})
		let ass = wordScene.getObjectByName("Ass");
		ass.dcData.onCollision.push((tObj)=>{
			if(tObj.name != "human" && tObj.name != "sign") return;
			let impulse2d = new t.Vector2(tObj.position.x, tObj.position.z).normalize();
			let impulse = new t.Vector3(impulse2d.x, 1, impulse2d.y).multiplyScalar(0.5);
			tObj.dcData.rbody.applyCentralImpulse(dc.ammoTmp.vec(impulse.x, impulse.y, impulse.z));
		});
		wordScene.getObjectByName("Border").visible = false;
		g.USSR = wordScene.getObjectByName("USSR");
		g.USSR.visible = false;
		if(route == "howToPlay"){
			this.arrowAndInfrom = new dc.ArrowAndInfrom(`Step1\n Click on human to take control`,
				models.arrow.scene, humans[0], humans[0], 6);
		};
		let target = models.target.scene.clone();
		target.scale.set(1.5, 1.5, 1.5);
		let start = Date.now();
		target.dcData = {
			onAfterPhysics: [ (delta)=>{
				if(g.activeHuman){
					target.position.set(g.activeHuman.position.x, g.activeHuman.position.y-1.1, g.activeHuman.position.z);
					target.rotation.y = (Date.now()-start)*0.001;
				}
			} ],
		}
		dcWorld.scene.add(target);
		let setActiveHuman = (obj)=>{
			if(this.arrowAndInfrom){
				this.arrowAndInfrom.destroy();
				let str = `Step2\n Move close to greedy ass but do not touch it and activate anti-capitalism skill`
				this.arrowAndInfrom = new dc.ArrowAndInfrom(str, models.arrow.scene, humans[0], wordScene, 6);
			}
			if(this.moveController)this.moveController.destroy();
			this.moveController = new dc.MoveController(obj, this.controls, 0.5, 4);
			g.activeHuman = obj;
		}
		const raycaster = new t.Raycaster();
		const pointer = new t.Vector2();
		this.onClick = function (event){
			pointer.x = (event.clientX / window.innerWidth)*2-1;
			pointer.y = - (event.clientY / window.innerHeight)*2+1;
			raycaster.setFromCamera(pointer, dcWorld.camera);
			const intersects = raycaster.intersectObjects(dcWorld.scene.children);
			for (let i = 0; i < intersects.length; i ++){
				let obj = intersects[i].object;
				if(obj?.parent?.dcData?.type == "human"){
					setActiveHuman(obj.parent);
					return;
				}
			}
		}
		window.addEventListener('click', this.onClick);
		this.assPullInterval = setInterval(()=>{
			for(let human of humans){
				if(human.dcData.money<1)return;;
				human.dcData.money--;
				let coin = models.assMoney.scene.children[0].clone();
				coin.position.copy(human.position);
				coin.position.y+= 5;
				g.dcWorld.add(coin);
				coin.dcData.onCollision.push((tObj)=>{
					if(tObj != ass)return;
					g.assMoney++;
					dcWorld.remove(coin);
				});
				coin.dcData.onBeforePhysics.push((tObj)=>{
					let velocity = coin.dcData.rbody.getLinearVelocity();
					let velVec = new t.Vector3(velocity.x(), velocity.y(), velocity.z());
					if(velVec.length()>3)return;
					let pushVec = coin.position.clone().normalize().multiplyScalar(1).negate();
					coin.dcData.rbody.applyCentralForce(dc.ammoTmp.vec(pushVec.x, pushVec.y, pushVec.z));
				});
			}
		}, config.assPullDelay[route]);
		this.resultInterval = setInterval(()=>{
			if(g.assMoney < 1){
				winMsg.set(true);
			};
		}, 300);
	}
	destroy(){
		g.wipe();
		this.controls.dispose();
		window.removeEventListener('click', this.onClick);
		if(this.arrowAndInfrom)this.arrowAndInfrom.destroy();
		if(this.moveController)this.moveController.destroy();
		clearInterval(this.resultInterval);
		clearInterval(this.assPullInterval);
	}
}
