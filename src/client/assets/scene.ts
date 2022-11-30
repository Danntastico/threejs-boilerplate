import * as THREE from 'three'

const Scene = new THREE.Scene()
Scene.add(new THREE.AxesHelper(2))

const plane = new THREE.GridHelper(20, 10)
Scene.add(plane)
export default Scene