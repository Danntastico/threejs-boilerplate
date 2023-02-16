import * as THREE from 'three'
import { Vector3 } from 'three'
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper'

// Simple Line 
const linePoints: Array<THREE.Vector3> = []

linePoints.push(new THREE.Vector3(-5, 5, 0))
linePoints.push(new THREE.Vector3(5, 0, 0))
linePoints.push(new THREE.Vector3(5, -5, 1))

let lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints)
let line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: 0xFF5733 }))

// Triangle
const trianglePoints = [
  new Vector3(1, 1, 0), // a
  new Vector3(-1, 1, 0), // b
  new Vector3(-1, -1, 0), // c
]
const triangleMaterial = new THREE.MeshBasicMaterial({ color: 0xC70039 })
const triangleGeometry = new THREE.BufferGeometry()
triangleGeometry.setFromPoints(trianglePoints)
triangleGeometry.computeVertexNormals()
triangleGeometry.computeTangents()

const triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial)

// Pyramid
const pyramidPoints = [
  new THREE.Vector3(-1, 1, -1), //c
  new THREE.Vector3(-1, -1, 1), //b
  new THREE.Vector3(1, 1, 1), //a 

  new THREE.Vector3(1, 1, 1), //a    
  new THREE.Vector3(1, -1, -1), //d  
  new THREE.Vector3(-1, 1, -1), //c

  new THREE.Vector3(-1, -1, 1), //b
  new THREE.Vector3(1, -1, -1), //d  
  new THREE.Vector3(1, 1, 1), //a

  new THREE.Vector3(-1, 1, -1), //c
  new THREE.Vector3(1, -1, -1), //d    
  new THREE.Vector3(-1, -1, 1), //b
]

const pyramidGeometry = new THREE.BufferGeometry()
pyramidGeometry.setFromPoints(pyramidPoints)
pyramidGeometry.computeVertexNormals()

const pyramidMaterial = new THREE.MeshNormalMaterial()
const pyramidMesh = new THREE.Mesh(pyramidGeometry, pyramidMaterial)


export const addToScene = (scene: THREE.Scene) => {
  scene.add(pyramidMesh)
}

export default pyramidMesh
