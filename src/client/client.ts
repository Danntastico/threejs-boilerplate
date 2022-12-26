import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {
  initializeMainCamera, 
  initializeRenderer, 
  initializeScene,
  initializeStats
} from './assets/scene'
import { GUI } from 'dat.gui'
import { Cube, Sphere } from './assets/models'

const canvas = document.body

const viewportDimentions = {
  width: innerWidth,
  height: innerHeight
}

const scene = initializeScene()
const renderer = initializeRenderer(viewportDimentions)
const camera = initializeMainCamera(viewportDimentions, renderer)
const stats = initializeStats(canvas)

const cube = new Cube(0x00ff00, false, false)

function onWindowResize(){
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
  render()
}

function render(){
  renderer.render(scene, camera)
}

function main(){
  requestAnimationFrame(main)
  render()

  stats.update()
}

const gui = new GUI()

cube.getMesh().position.set(2, 0.5, 0)
cube.setupGUIFolder(gui)
Sphere.position.set(-2, 0.5, 0)

scene.add(cube.getMesh())
scene.add(Sphere)

canvas.appendChild(renderer.domElement)
window.addEventListener('resize', onWindowResize, false)

main()