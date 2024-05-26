import {get as storeGet} from 'svelte/store';
import * as t from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dc from 'dvijcock';
import { route as routeStore } from './store.js';
import models from "./models.js";
import g from "./global.js";
import { winMsg } from './WinMsg.svelte';

let config = {
	assMoney:{
		howToPlay: 3,
		lvl1: 100,
		lvl2: 200,
		lvl3: 500,
		lvl4: 1000,
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
				money: 10,
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
	}
}
