import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const orbitControlProps = {
  enableDamping: true,
  maxPolarAngle: 2,
  minPolarAngle: 1,
  maxDistance: 10,
  maxAzimuthAngle: Math.PI / 10,
  minAzimuthAngle: -Math.PI / 10,
};

const radius = 5;
const frustumSize = 5;
const zoomBasedOnWidth = THREE.MathUtils.mapLinear(
  window.innerWidth,
  300,
  1920,
  0.3,
  1
);
const aspect = window.innerWidth / window.innerHeight;

let xDirection = 0.005;
let yDirection = 0.005;

function Camera() {
  const camera = useRef<THREE.OrthographicCamera>(null!);
  const controls = useRef<any>(null!);

  useFrame(() => {
    camera.current.position.x += xDirection;
    camera.current.position.y += yDirection;

    if (
      controls.current.getAzimuthalAngle() <= controls.current.minAzimuthAngle
    ) {
      xDirection = 0.005;
    } else if (
      controls.current.getAzimuthalAngle() >= controls.current.maxAzimuthAngle
    ) {
      xDirection = -0.005;
    }
    if (controls.current.getPolarAngle() <= controls.current.minPolarAngle) {
      yDirection = -0.005;
    } else if (
      controls.current.getPolarAngle() >= controls.current.maxPolarAngle
    ) {
      yDirection = 0.005;
    }
  });

  useEffect(() => {
    const handleResize = () => {
      // Update sizes
      const aspect = window.innerWidth / window.innerHeight;

      camera.current.left = (-frustumSize * aspect) / 2;
      camera.current.right = (frustumSize * aspect) / 2;
      camera.current.top = frustumSize / 2;
      camera.current.bottom = -frustumSize / 2;

      // Update renderer
      camera.current.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cameraProps = useMemo(
    () => ({
      left: (frustumSize * aspect) / -2,
      right: (frustumSize * aspect) / 2,
      top: frustumSize / 2,
      bottom: frustumSize / -2,
      near: 0.01,
      far: 100,
      position: new THREE.Vector3(-radius, 0, radius * 2),
      zoom: zoomBasedOnWidth,
    }),
    []
  );

  return (
    <>
      <OrbitControls ref={controls} makeDefault {...orbitControlProps} />
      <OrthographicCamera ref={camera} makeDefault {...cameraProps} />
    </>
  );
}

export default Camera;
