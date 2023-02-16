import * as THREE from 'three'

const boxGeometry = new THREE.BoxGeometry()
const sphereGeometry = new THREE.SphereGeometry()
const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0)
const planeGeometry = new THREE.PlaneGeometry()
const torusKnotGeometry = new THREE.TorusKnotGeometry()

const material = new THREE.MeshBasicMaterial()


const cube = new THREE.Mesh(boxGeometry, material)
cube.position.y = 0.5
cube.position.x = 5

const sphere = new THREE.Mesh(sphereGeometry, material)
sphere.position.y = 1
sphere.position.x = 3

const icosahedron = new THREE.Mesh(icosahedronGeometry, material)
icosahedron.position.y = 0.89
icosahedron.position.x = 0

const plane = new THREE.Mesh(planeGeometry, material)
plane.position.y = 0.5
plane.position.x = -2

const torusKnot = new THREE.Mesh(torusKnotGeometry, material)
torusKnot.position.y = 2
torusKnot.position.x = -5

const options = {
  side: {
    FrontSide: THREE.FrontSide,
    BackSide: THREE.BackSide,
    DoubleSide: THREE.DoubleSide,
  },
}

function addToScene(scene: THREE.Scene, gui: dat.GUI) {
  scene.add(cube)
  scene.add(torusKnot)
  scene.add(plane)
  scene.add(sphere)
  scene.add(icosahedron)

  const materialFolder = gui.addFolder('THREE.Material')
  materialFolder
    .add(material, 'transparent')
    .onChange(() => (material.needsUpdate = true))
  materialFolder.add(material, 'opacity', 0, 1, 0.01)
  materialFolder.add(material, 'depthTest')
  materialFolder.add(material, 'depthWrite')
  materialFolder
    .add(material, 'alphaTest', 0, 1, 0.01)
    .onChange(() => updateMaterial())
  materialFolder.add(material, 'visible')
  materialFolder
    .add(material, 'side', options.side)
    .onChange(() => updateMaterial())
  materialFolder.open()

}

function updateMaterial() {
  material.side = Number(material.side)
  material.needsUpdate = true
}

export default addToScene