import * as t from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dc from 'dvijcock';
import models from "./models.js";

export default class{
	constructor(){}
	init(){
		let dcWorld = this.dcWorld;

		dcWorld.camera = new t.PerspectiveCamera( 65, 1/*dc will set acpect*/, 0.1, 30000 );
		dcWorld.camera.position.set(20,7,0);

		this.controls = new OrbitControls(dcWorld.camera, dcWorld.renderer.domElement);
		this.controls.enablePan = false;

		dcWorld.scene.add(dcWorld.camera);
		dcWorld.scene.add(dc.defaultLights);

		dcWorld.add(models.test.scene);

		const player = new t.Mesh( new t.SphereGeometry(), new t.MeshStandardMaterial({color: "grey"}) );
		player.position.set(0,10,0);
		player.dcData = {
			btShape: true,
			mass: 1,
		}
		dcWorld.add(player);
		this.moveController = new dc.MoveController(player, this.controls, 0.5, 4);
	}
	destroy(){
		this.controls.dispose();
	}
}
