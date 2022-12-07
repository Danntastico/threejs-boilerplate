import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {
  initializeMainCamera, 
  initializeRenderer, 
  initializeScene 
} from './assets/scene'


const canvas = document.body

const viewportDimentions = {
  width: innerWidth,
  height: innerHeight
}

const scene = initializeScene()
const renderer = initializeRenderer(viewportDimentions)
const camera = initializeMainCamera(viewportDimentions, renderer)

canvas.appendChild(renderer.domElement)
window.addEventListener('resize', onWindowResize, false)

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
}

main()