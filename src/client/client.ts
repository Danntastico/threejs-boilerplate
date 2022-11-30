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
  const phongMaterial = new THREE.MeshPhongMaterial()
  const cube = new THREE.Mesh(geometry, phongMaterial)
  if(hasAxis){
    const cubeAxis = new THREE.AxesHelper()
    cube.add(cubeAxis)
  }

  return cube
}

const cube = generateCube(0x00ff00, true, true)
const mainLight = new THREE.PointLight(0xff0000, 1, 100)
mainLight.position.set(5, 10, 10)
MainScene.add(mainLight)
cube.position.set(0,0.5,0)

MainScene.add(cube)

const controls = new OrbitControls(MainCamera, MainRenderer.domElement)

const stats = Stats()
document.body.appendChild(stats.dom)

const cubeFolder = GUIConfig.addFolder('Cube')

const cubeZRotationController = cubeFolder.add(cube.rotation, 'z', 0, 1)

const cubePositionFolder = cubeFolder.addFolder('Position')
cubePositionFolder.add(cube.position, 'x', -10, 10, 0.1)
cubePositionFolder.add(cube.position, 'y', -10, 10, 0.1)
cubePositionFolder.add(cube.position, 'z', -10, 10, 0.1)
cubeFolder.open()
cubePositionFolder.open()
const cubeScaleFolder = cubeFolder.addFolder('Scale')
cubeScaleFolder.add(cube.scale, 'x', -5, 5)
cubeScaleFolder.add(cube.scale, 'y', -5, 5)
cubeScaleFolder.add(cube.scale, 'z', -5, 5)

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
  const cubeWorldPosition = new THREE.Vector3()
  cube.getWorldPosition(cubeWorldPosition)
  console.table(cubeWorldPosition)
  render()
  
  stats.update()
  
}

function render(){
  MainRenderer.render(MainScene, MainCamera)
}

window.addEventListener('resize', onWindowResize, false)

animate()