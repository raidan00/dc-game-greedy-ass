let tmpVec;
let tmpQuat;
let tmpTransform;

let exportDefault = {
	vec(x, y, z){
		tmpVec.setValue(x,y,z);
		return tmpVec;
	},
	quat(x, y, z, w){
		tmpQuat.setValue(x,y,z, w);
		return tmpQuat;
	},
	transform(){
		tmpTransform.setIdentity();
		return tmpTransform;
	},
	vecArr: [],
}
export default exportDefault;

function ammoTmpInit(){
	tmpVec = new Ammo.btVector3(0, 0, 0);
	tmpQuat = new Ammo.btQuaternion( 0, 0, 0, 1);
	tmpTransform = new Ammo.btTransform();
	exportDefault.vecArr.push(new Ammo.btVector3(0, 0, 0));
	exportDefault.vecArr.push(new Ammo.btVector3(0, 0, 0));
	exportDefault.vecArr.push(new Ammo.btVector3(0, 0, 0));
}
export { ammoTmpInit };
