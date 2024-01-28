import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


export default class CaseDisplay {
  constructor(canvasId) {
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;
    this.clock = undefined;
    this.control = undefined;
    this.directionalLight = undefined;
    this.canvasId = canvasId;
  }

  initialize() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight * 0.5, 1, 1000);
    this.camera.position.z = 50;

    const canvas = document.getElementById(this.canvasId);
    const width = window.innerWidth * 0.5; 
    const height = window.innerHeight; 
    this.renderer = new THREE.WebGLRenderer({canvas});
    this.renderer.setSize(width, height); 
    document.body.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.scene.background = new THREE.Color(0x000000);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    this.directionalLight.position.set(0, 32, 64);
    this.scene.add(this.directionalLight);

    // Additional lights
    const bottomLight = new THREE.DirectionalLight(0xffffff, 1);
    bottomLight.position.set(0, -32, 0);
    this.scene.add(bottomLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1);
    frontLight.position.set(0, 0, 64);
    this.scene.add(frontLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1);
    backLight.position.set(0, 0, -64);
    this.scene.add(backLight);

    window.addEventListener('resize', () => this.onWindowResize(), false);
}



  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight * 0.5;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  }
}