import * as THREE from 'three'

interface SpherePamaters {
  color: THREE.ColorRepresentation | undefined
  wireframe: boolean
  hasAxis: boolean
}

class Sphere implements SpherePamaters {
  color: THREE.ColorRepresentation | undefined
  wireframe: boolean
  hasAxis: boolean
  sphere: THREE.Mesh<THREE.SphereGeometry, THREE.MeshPhongMaterial>
  constructor (
    radius: number,
    widthSegments: number, 
    heightSegments: number,
    color: THREE.ColorRepresentation, 
    wireframe: boolean, 
    hasAxis: boolean
  ) {
    this.color = color
    this.hasAxis = hasAxis
    this.wireframe = wireframe

    this.sphere = this._initializeGeometry()
  }

  private _initializeGeometry(radius = 1, widthSegments: number, heightSegments: number) {
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
    const phongMaterial = new THREE.MeshPhongMaterial({
      color: this.color,
      wireframe: this.wireframe
    })

    const sphere = new THREE.Mesh(geometry, phongMaterial)

    if(this.hasAxis){
      const sphereAxis = new THREE.AxesHelper()
      sphere.add(sphereAxis)
    }

    console.log(sphere.geometry)
    return sphere
  }

  public setCubePosition(x:number, y: number, z: number) {
    this.sphere.position.set(x,y,z)
  }
  public getMesh(){
    return this.sphere
  }
}

export default new Sphere(0x00ff00, false, false).getMesh()
