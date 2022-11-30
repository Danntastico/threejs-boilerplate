import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { MainCamera, MainRenderer, MainScene } from './assets'
import { GUIConfig } from './config/gui'

function generateCube(
  color: THREE.ColorRepresentation | undefined, 
  wireframe:boolean, 
  hasAxis: boolean){
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({
    color,
    wireframe
  })
  const cube = new THREE.Mesh(geometry, material)
  if(hasAxis){
    const cubeAxis = new THREE.AxesHelper()
    cube.add(cubeAxis)
  }

  return cube
}

const cube = generateCube(0x00ff00, true, true)
MainScene.add(cube)

new OrbitControls(MainCamera, MainRenderer.domElement)

const stats = Stats()
document.body.appendChild(stats.dom)

const cubeFolder = GUIConfig.addFolder('Cube')

const cubeZRotationController = cubeFolder.add(cube.rotation, 'z', 0, 1)

cubeFolder.open()
const settings = { animateXRotation: false, animateYRotation: false}
const isXanimated = cubeFolder.add(settings, 'animateXRotation').onChange((v) => !v)
const isYanimated = cubeFolder.add(settings, 'animateYRotation').onChange((v) => !v)

function onWindowResize() {
  MainCamera.aspect = window.innerWidth / window.innerHeight
  MainCamera.updateProjectionMatrix()
  MainRenderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

function animate(){
  requestAnimationFrame(animate)

  if(isXanimated.getValue()){
    cube.rotation.x += 0.01
  }
  if(isYanimated.getValue()){
    cube.rotation.y += 0.01
  }

  render()
  
  stats.update()
  
}

function render(){
  MainRenderer.render(MainScene, MainCamera)
}

window.addEventListener('resize', onWindowResize, false)

animate()