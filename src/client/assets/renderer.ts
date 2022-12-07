import * as THREE from 'three'

const Renderer = new THREE.WebGLRenderer()
Renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(Renderer.domElement)

export default Renderer