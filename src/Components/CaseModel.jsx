import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import CaseDisplay from '../model/CaseDisplay';

function CaseModel() {
  useEffect(() => {
    const test = new CaseDisplay('caseId');
    test.initialize();
    test.animate();

    let loadedModel;
    const gltfLoader = new GLTFLoader();

    gltfLoader.load("case/scene.gltf", (gltfScene) => {
      loadedModel = gltfScene;
      gltfScene.scene.rotation.y = Math.PI / 8;
      gltfScene.scene.position.x = 0;
      gltfScene.scene.position.y = 0;
      gltfScene.scene.scale.set(15, 15, 15);
      test.scene.add(gltfScene.scene);

      const frontLight = new THREE.DirectionalLight(0xffffff, 0.8); 
      frontLight.position.set(0, 50, 100);
      frontLight.target.position.set(0, 0, 0); 
      test.scene.add(frontLight);
      test.scene.add(frontLight.target); 

      const backLight = new THREE.DirectionalLight(0xffffff, 0.8); 
      backLight.position.set(0, 50, -100); 
      backLight.target.position.set(0, 0, 0);
      test.scene.add(backLight);
      test.scene.add(backLight.target); 
    });
    let hopStartTime = Date.now();
    const hopDuration = 5000; // Adjust the duration of each hop
    const hopAmplitude = 1; // Adjust the amplitude of the hop
    const rotationSpeed = 0.002;

    const animate = () => {
      requestAnimationFrame(animate);
      if (loadedModel) {
        loadedModel.scene.rotation.y += rotationSpeed;

        const currentTime = Date.now();
        const elapsedTime = (currentTime - hopStartTime) % hopDuration;
        const hopAmount = Math.sin((elapsedTime / hopDuration) * Math.PI * 2) * hopAmplitude;

        loadedModel.scene.position.y = -15 + hopAmount;

        // If the hop duration has elapsed, reset the hop start time
        if (elapsedTime >= hopDuration) {
          hopStartTime = currentTime;
        }
      }
      test.renderer.render(test.scene, test.camera);
    };
    animate();
  }, []);

  return (
    <div className='border border-red-500 bottom-3'>
      <canvas id="caseId" />
    </div>

  );
}

export default CaseModel;
