import {
  initializeMainCamera,
  initializeRenderer,
  initializeScene,
  initializeStats,
  setupGUIFolder
} from './assets/scene'
import { GUI } from 'dat.gui'
import { Cube, Sphere } from './assets/models'
import { addToScene } from '../basic_examples/01-BufferGeometry'
import addMaterialsToScene from '../basic_examples/02-Materials'

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
const sphere = new Sphere(0.5, 10, 10, 0x00ff00, false, false)

function onWindowResize() {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
  render()
}

function render() {
  renderer.render(scene, camera)
}

function main() {
  requestAnimationFrame(main)
  render()

  stats.update()
}

const gui = new GUI()

cube.getMesh().position.set(2, 0.5, 0)
cube.setupGUIFolder(gui)
sphere.getMesh().position.set(-2, 0.5, 0)
setupGUIFolder(gui, scene)
//addToScene(scene)
addMaterialsToScene(scene, gui)

canvas.appendChild(renderer.domElement)
window.addEventListener('resize', onWindowResize, false)

main()