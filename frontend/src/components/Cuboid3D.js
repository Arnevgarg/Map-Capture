import React, { useEffect } from 'react';
import * as BABYLON from 'babylonjs';

const Cuboid3D = ({ capturedImage }) => {
  useEffect(() => {
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);

    const createScene = () => {
      const scene = new BABYLON.Scene(engine);
      const camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 3, BABYLON.Vector3.Zero(), scene);

      camera.attachControl(canvas, true);
    
      const light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
      var light2 = new BABYLON.PointLight(
        "light2",
        new BABYLON.Vector3(0, 10, 0),
        scene
      );
      
      const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);

      if (capturedImage) {
        const material = new BABYLON.StandardMaterial("boxMaterial", scene);
        //material.diffuseTexture = new BABYLON.Texture(capturedImage, scene);
        //const texture = new BABYLON.Texture(`data:image/png;base64,${capturedImage}`, scene);
        const texture = new BABYLON.Texture(capturedImage, scene);
        material.diffuseTexture = texture;
        box.material = material;
      }

      return scene;
    };

    const scene = createScene();
    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener('resize', () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, [capturedImage]);

  return (
    <canvas id="renderCanvas" style={{ width: '800px', height: '600px' }}></canvas>
  );
};

export default Cuboid3D;
