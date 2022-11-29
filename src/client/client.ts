import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const scene = new THREE.Scene()

//Cameras
const camera1 = new THREE.PerspectiveCamera(75, 1, 0.1, 10)
const camera2 = new THREE.OrthographicCamera(-1,1,1,-1, 0.1, 10)
const camera3 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
const camera4 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)

const basicVector = new THREE.Vector3(0,0,0)

camera1.position.z = 2
camera2.position.y = 1
camera2.lookAt(basicVector)
camera3.position.z = 1
camera4.position.x = 1
camera4.lookAt(basicVector)

const canvas1 = document.getElementById('cam-1') as HTMLCanvasElement
const canvas2 = document.getElementById('cam-2') as HTMLCanvasElement
const canvas3 = document.getElementById('cam-3') as HTMLCanvasElement
const canvas4 = document.getElementById('cam-4') as HTMLCanvasElement

const renderer1 = new THREE.WebGLRenderer({canvas: canvas1})
const renderer2 = new THREE.WebGLRenderer({canvas: canvas2})
const renderer3 = new THREE.WebGLRenderer({canvas: canvas3})
const renderer4 = new THREE.WebGLRenderer({canvas: canvas4})

renderer1.setSize(200,200)
renderer2.setSize(200,200)
renderer3.setSize(200,200)
renderer4.setSize(200,200)

new OrbitControls(camera1, renderer1.domElement)
new OrbitControls(camera2, renderer2.domElement)

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

camera.position.z = 2

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true
})

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

function animate(){
  requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  render()
}


function render(){
  renderer1.render(scene, camera1)
  renderer2.render(scene, camera2)
  renderer3.render(scene, camera3)
  renderer4.render(scene, camera4)
}

animate()
