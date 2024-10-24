import { Center, Text3D } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Spheres from "./3d-components/Spheres";
import Camera from "./3d-components/Camera";

const textProps = {
  size: 0.5,
  depth: 0.2,
  curveSegments: 6,
  bevelEnabled: true,
  bevelThickness: 0.01,
  bevelSize: 0.01,
  bevelOffset: 0,
  bevelSegments: 2,
};

function Experience() {
  return (
    <div id="canvas-container">
      <Canvas
        gl={{
          pixelRatio: Math.min(2, window.devicePixelRatio),
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight
          color={0xffffff}
          intensity={0.5}
          position={[2, 2, 2]}
        />

        <Camera />

        <Center>
          <Text3D font="fonts/Super Squad_Regular.json" {...textProps}>
            {"S a m   E c h i k s o n"}
            <meshToonMaterial color={0x00ff00} />
          </Text3D>
        </Center>

        <Spheres />
      </Canvas>
    </div>
  );
}

export default Experience;
