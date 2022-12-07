import { 
  WebGLRenderer, 
  Scene, 
  GridHelper, 
  AxesHelper, 
  PointLight, 
  PointLightHelper, 
  PerspectiveCamera
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

type Dimentions = Record<string, number>


function initializeScene(){
  const mainScene = new Scene()
  const plane = new GridHelper(20, 10)
  const mainLight = new PointLight(0xf5f5ee, 1, 100)
  const pointLightHelper = new PointLightHelper( mainLight, 1 );

  mainLight.position.set(5, 10, 10)
  mainLight.add(pointLightHelper)

  mainScene.add(new AxesHelper(2))
  mainScene.add(mainLight)
  mainScene.add(plane)
  
  return mainScene
}

function initializeRenderer({ width, height }: Dimentions){
  const renderer = new WebGLRenderer()
  renderer.setSize(width, height)
  
  return renderer
}

function initializeMainCamera(
  { width, height }: Dimentions, 
  renderer: WebGLRenderer 
){
  const camera = new PerspectiveCamera(
    75,
    width / height,
    0.1,
    1000,
  )
  camera.position.z = 2
  new OrbitControls(camera, renderer.domElement)
  return camera
}

export {
  initializeMainCamera,
  initializeRenderer,
  initializeScene,
}