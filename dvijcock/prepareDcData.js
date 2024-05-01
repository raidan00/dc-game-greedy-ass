import ammoTmp from 'dvijcock/ammoTmp.js';

export default function(objThree){
	if(objThree?.dcData?.btShape === true){
		if(objThree.geometry.type === 'SphereGeometry'){
			objThree.dcData.btShape = new Ammo.btSphereShape(objThree.scale.x);
		}else if(objThree.geometry.type === 'BoxGeometry'){
			objThree.dcData.btShape = new Ammo.btBoxShape(
				ammoTmp.vec(objThree.scale.x*0.5, objThree.scale.y*0.5, objThree.scale.z*0.5)
			);
		}else if(objThree.geometry.type === 'CylinderGeometry'){
			objThree.dcData.btShape = new Ammo.btCylinderShape(
				ammoTmp.vec(objThree.scale.x, objThree.scale.y*0.5, objThree.scale.z)
			);
		}
	}else if(objThree.userData.btShape === true){
		if(!objThree.dcData)objThree.dcData={};
		objThree.dcData.mass = objThree.userData.mass;

		if(objThree.name.includes("Sphere")){
			objThree.dcData.btShape = new Ammo.btSphereShape(objThree.scale.x);
		}else if(objThree.name.includes("Cube")){
			objThree.dcData.btShape = new Ammo.btBoxShape(
				ammoTmp.vec(objThree.scale.x, objThree.scale.y, objThree.scale.z)
			);
		}else{
			objThree.dcData.btShape = true
		}
	}
	if(objThree.dcData.btShape === true){
		if(objThree.dcData.mass){
			let coords = objThree.geometry.attributes.position.array;
			const shape = new Ammo.btConvexHullShape();
			for ( let i = 0, il = coords.length; i < il; i += 3 ) {
				let tmpVec = ammoTmp.vec( coords[ i ], coords[ i + 1 ], coords[ i + 2 ] );
				const lastOne = ( i >= ( il - 3 ) );
				shape.addPoint( tmpVec, lastOne );
			}
			objThree.dcData.btShape = shape;
		}else{
			var mesh = new Ammo.btTriangleMesh(true, true);
			let index = objThree.geometry.index.array;
			let vert = objThree.geometry.attributes.position.array;
			console.log(index, vert);
			for (let i = 0; i < index.length; i += 3 ) {
				mesh.addTriangle(
					new Ammo.btVector3(vert[index[i+0]*3+0], vert[index[i+0]*3+1], vert[index[i+0]*3+2]),
					new Ammo.btVector3(vert[index[i+1]*3+0], vert[index[i+1]*3+1], vert[index[i+1]*3+2]),
					new Ammo.btVector3(vert[index[i+2]*3+0], vert[index[i+2]*3+1], vert[index[i+2]*3+2]),
					false
				);
			}
			objThree.dcData.btShape = new Ammo.btBvhTriangleMeshShape(mesh, true, true);
		}
	}
	objThree.dcData.btShape.setMargin(0.05);
}
