import * as THREE from 'three'
import { GUI } from 'dat.gui'

const Camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

Camera.position.z = 2

export default Camera
