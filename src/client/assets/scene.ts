import {
  DoubleSide,
  Color,
  WebGLRenderer,
  Scene,
  GridHelper,
  AxesHelper,
  PointLight,
  PointLightHelper,
  PerspectiveCamera,
  AmbientLight,
  PlaneGeometry,
  MeshBasicMaterial,
  MathUtils,
  Mesh,
  MeshPhongMaterial
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'

type Dimentions = Record<string, number>


function initializeScene() {
  const { ambientLight, mainLight } = setupLights()

  const mainScene = new Scene()
  const grid = new GridHelper(30, 30)

  const planeGeometry = new PlaneGeometry(10, 10)
  const material = new MeshPhongMaterial({ color: 0xffff00 })
  const plane = new Mesh(planeGeometry, material)


  mainScene.background = new Color(0x333333)

  plane.position.y = -0.1
  plane.rotateX(MathUtils.degToRad(-90))

  mainScene.add(ambientLight)
  mainScene.add(grid)
  mainScene.add(mainLight)
  mainScene.add(new AxesHelper(2))
  mainScene.add(plane)

  return mainScene
}

function setupLights() {
  const mainLight = new PointLight(0xf5f5ee, 1, 100)
  const pointLightHelper = new PointLightHelper(mainLight, 1);

  const ambientLight = new AmbientLight(0x404040, 0.2)

  mainLight.position.set(5, 10, 10)
  mainLight.add(pointLightHelper)

  ambientLight.position.set(0, 5, -30)
  return {
    mainLight,
    ambientLight
  }
}

function initializeRenderer({ width, height }: Dimentions) {
  const renderer = new WebGLRenderer({
    alpha: true
  })
  renderer.setSize(width, height)

  return renderer
}

function initializeMainCamera(
  { width, height }: Dimentions,
  renderer: WebGLRenderer
) {
  const camera = new PerspectiveCamera(
    75,
    width / height,
    0.1,
    1000,
  )
  camera.position.z = 5
  camera.position.x = 5
  camera.position.y = 2
  new OrbitControls(camera, renderer.domElement)
  return camera
}

function initializeStats(canvas: HTMLElement) {
  const stats = Stats()

  canvas.appendChild(stats.dom)

  return stats
}

export {
  initializeMainCamera,
  initializeRenderer,
  initializeScene,
  initializeStats
}