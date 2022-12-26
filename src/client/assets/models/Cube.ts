import * as THREE from 'three'
import { GUI } from 'dat.gui'
interface CubeParameters {
  color: THREE.ColorRepresentation | undefined
  wireframe: boolean
  hasAxis: boolean
}

const ROTATION_STEP_PARAMS = [0, 2 * Math.PI, 0.01]
class Cube implements CubeParameters {
  color: THREE.ColorRepresentation | undefined
  wireframe: boolean
  hasAxis: boolean
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshPhongMaterial>
  constructor (
    color: THREE.ColorRepresentation, 
    wireframe: boolean, 
    hasAxis: boolean
  ) {
    this.color = color
    this.hasAxis = hasAxis
    this.wireframe = wireframe

    this.cube = this._initializeGeometry()
  }

  private _initializeGeometry() {
    const geometry = new THREE.BoxGeometry()
    const phongMaterial = new THREE.MeshPhongMaterial({
      color: this.color,
      wireframe: this.wireframe
    })

    const cube = new THREE.Mesh(geometry, phongMaterial)

    if(this.hasAxis){
      const cubeAxis = new THREE.AxesHelper()
      cube.add(cubeAxis)
    }
    return cube
  }

  public setCubePosition(x:number, y: number, z: number) {
    this.cube.position.set(x,y,z)
  }
  public getMesh(){
    return this.cube
  }

  public setupGUIFolder(gui: GUI){
    const shapeFolder = gui.addFolder('Cube')

    const rotationFolder = shapeFolder.addFolder('Rotation')
    const positionFolder = shapeFolder.addFolder('Position')
    const scaleFolder = shapeFolder.addFolder('Scale')
    
    rotationFolder.add(this.cube.rotation, 'x', ...ROTATION_STEP_PARAMS)
    rotationFolder.add(this.cube.rotation, 'y', ...ROTATION_STEP_PARAMS)
    rotationFolder.add(this.cube.rotation, 'z', ...ROTATION_STEP_PARAMS)

    positionFolder.add(this.cube.position, 'x', -10, 10, 0.5)
    positionFolder.add(this.cube.position, 'y', -10, 10, 0.5)
    positionFolder.add(this.cube.position, 'z', -10, 10, 0.5)

    scaleFolder.add(this.cube.scale, 'x', -5, 5, 0.1)
    scaleFolder.add(this.cube.scale, 'y', -5, 5, 0.1)
    scaleFolder.add(this.cube.scale, 'z', -5, 5, 0.1)

    shapeFolder.add(this.cube, 'visible', true)
    shapeFolder.open() 
  }
}

export default Cube
