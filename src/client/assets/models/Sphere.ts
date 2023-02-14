import { GUI } from 'dat.gui'
import * as THREE from 'three'

interface SpherePamaters {
  color: THREE.ColorRepresentation | undefined
  wireframe: boolean
  hasAxis: boolean
}

interface SphereData {
  radius: number
  widthSegments: number
  heightSegments: number
  phiStart: number
  phiLength: number
  thetaStart: number
  thetaLength: number
}

type ReducerObj = { action: string, payload: any}

const DEFAULT_SPHEREDATA = {
  radius: 1,
  widthSegments: 8,
  heightSegments: 6,
  phiStart: 0,
  phiLength: Math.PI * 2,
  thetaStart: 0,
  thetaLength: Math.PI
}

class Sphere implements SpherePamaters {
  color: THREE.ColorRepresentation | undefined
  wireframe: boolean
  hasAxis: boolean
  radius: number
  heightSegments: number
  widthSegments: number
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
    this.radius = radius
    this.widthSegments = widthSegments
    this.heightSegments = heightSegments
    this.sphere = this._initializeGeometry(this.radius, this.widthSegments, this.heightSegments)
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
    return sphere
  }

  public setGeometryPosition(x:number, y: number, z: number) {
    this.sphere.position.set(x,y,z)
  }

  public getMesh(){
    return this.sphere
  }

  public setupGUIFolder(gui: GUI){
    const shapeFolder = gui.addFolder('Sphere')
    const properties = shapeFolder.addFolder('Properties')
    const shapeData = { ... DEFAULT_SPHEREDATA }
    properties.add(shapeData, 'width', 1, 30, 0.5).onChange(() => this.regenerateSphereGeometry(shapeData))
  }

  private regenerateSphereGeometry(data: SphereData, reducerObj: ReducerObj | {}  = {}) {
    const {
      radius,
      widthSegments,
      heightSegments,
      phiStart,
      phiLength,
      thetaStart,
      thetaLength
    } = data
    const newGeometry = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments,
      phiStart,
      phiLength,
      thetaStart,
      thetaLength
    )
    this.sphere.geometry.dispose()
    this.sphere.geometry = newGeometry
  }
}

export default Sphere
