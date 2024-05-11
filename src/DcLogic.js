import {get as storeGet} from 'svelte/store';
import * as t from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dc from 'dvijcock';
import { route as routeStore } from './store.js';
import models from "./models.js";
import { skill1Button, skill2Button } from './ActivateSkills.svelte';


export default class{
	constructor(){}
	init(){
		let route = storeGet(routeStore);
		let dcWorld = this.dcWorld;

		dcWorld.camera = models.howToPlay.cameras[0].clone();
		this.controls = new OrbitControls(dcWorld.camera, dcWorld.renderer.domElement);
		this.controls.enablePan = false;

		dcWorld.scene.add(dcWorld.camera);
		dcWorld.scene.add(dc.defaultLights);

		let wordScene = models.howToPlay.scene.clone();
		dcWorld.add(wordScene);
		let humans = wordScene.getObjectsByUserDataProperty("HumanPlace", true);
		humans = humans.map((objPlace)=>{
			objPlace.removeFromParent();
			let human = models.human.scene.children[0].clone();
			human.position.copy(objPlace.position);
			dcWorld.add(human);
			human.dcData.rbody.setAngularFactor(dc.ammoTmp.vec(0, 0, 0));
			human.dcData.type = "human";
			return human;
		})
		if(route == "howToPlay"){
			this.arrowAndInfrom = new dc.ArrowAndInfrom(`Step1\n Click on human to take control`,
				models.arrow.scene, humans[0], humans[0], 6);
		};
		let activeHuman;
		let target = models.target.scene.clone();
		target.scale.set(1.5, 1.5, 1.5);
		target.dcData = {
			tickAfterPhysics(delta){
				if(activeHuman){
					target.position.set(activeHuman.position.x, activeHuman.position.y-1.1, activeHuman.position.z);
					target.rotation.y = (Date.now()-this.start)*0.001;
				}
			},
			start: Date.now(),
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
			activeHuman = obj;
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
		skill1Button.addEventListener('click', ()=>{
			if(!activeHuman)return;
			let sign = models.sign.scene.clone();
			sign.position.set(activeHuman.position.x, 0, activeHuman.position.z);
			dcWorld.scene.add(sign);
		});
	}
	destroy(){
		this.controls.dispose();
		window.removeEventListener('click', this.onClick);
		if(this.arrowAndInfrom)this.arrowAndInfrom.destroy();
		if(this.moveController)this.moveController.destroy();
	}
}
