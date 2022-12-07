import * as THREE from 'three'

interface CubeParameters {
  color: THREE.ColorRepresentation | undefined
  wireframe: boolean
  hasAxis: boolean
}

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
}

export default new Cube(0x00ff00, false, false).getMesh()
