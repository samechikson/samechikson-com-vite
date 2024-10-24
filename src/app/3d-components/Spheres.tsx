import { useMatcapTexture } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const sphereGeometry = new THREE.SphereGeometry(0.05, 32, 32);
const sphereMaterial = new THREE.MeshMatcapMaterial();

type Props = {};
function Spheres({}: Props) {
  const spheres = useRef<Array<any>>([]);
  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.needsUpdate = true;

    sphereMaterial.matcap = matcapTexture;
    sphereMaterial.needsUpdate = true;
  }, []);
  return (
    <>
      {[...Array(500)].map((_, index) => (
        <mesh
          ref={(element) => (spheres.current[index] = element)}
          key={index}
          geometry={sphereGeometry}
          material={sphereMaterial}
          position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
          ]}
        />
      ))}
    </>
  );
}

export default Spheres;
