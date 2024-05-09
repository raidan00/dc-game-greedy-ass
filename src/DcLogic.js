import * as t from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dc from 'dvijcock';
import models from "./models.js";

export default class{
	constructor(){}
	init(){
		let dcWorld = this.dcWorld;

		dcWorld.camera = models.howToPlay.cameras[0].clone();
		this.controls = new OrbitControls(dcWorld.camera, dcWorld.renderer.domElement);
		this.controls.enablePan = false;

		dcWorld.scene.add(dcWorld.camera);
		dcWorld.scene.add(dc.defaultLights);

		let wordScene = models.howToPlay.scene.clone();
		dcWorld.add(wordScene);
		let humans = wordScene.getObjectsByUserDataProperty("HumanPlace", true);
		humans.forEach((objT)=>{
			objT.removeFromParent();
			let human = models.human.scene.children[0].clone();
			human.position.copy(objT.position);
			dcWorld.add(human);
			human.dcData.rbody.setAngularFactor(dc.ammoTmp.vec(0, 0, 0));
			human.dcData.type = "human";
		})

		const player = new t.Mesh( new t.SphereGeometry(), new t.MeshStandardMaterial({color: "grey"}) );
		player.position.set(0,10,0);
		player.dcData = {
			physicsShape: true,
			mass: 1,
		}
		dcWorld.add(player);
		this.moveController = new dc.MoveController(player, this.controls, 0.5, 4);

		function setActiveHuman(obj){
			console.log(obj);
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
	}
	destroy(){
		this.controls.dispose();
		window.removeEventListener('click', this.onClick);
	}
}
