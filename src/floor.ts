import * as THREE from "three";

export function generateFloor(): THREE.Mesh {
  const color = new THREE.Color(0x03a63c);
  const vertex = new THREE.Vector3();
  let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 200);
  floorGeometry.rotateX(-Math.PI / 2);

  // vertex displacement
  let position = floorGeometry.attributes.position;

  for (let i = 0, l = position.count; i < l; i++) {
    vertex.fromBufferAttribute(position, i);

    vertex.x += Math.random() * 20 - 10;
    vertex.y += Math.random() * 2;
    vertex.z += Math.random() * 20 - 10;

    position.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  const nonIndexedFloorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

  position = nonIndexedFloorGeometry.attributes.position;
  const colorsFloor = [];

  for (let i = 0, l = position.count; i < l; i++) {
    color.setHSL(
      Math.random() * 0.5,
      0.75,
      Math.random() * 0.25 + 0.6,
      THREE.SRGBColorSpace
    );
    colorsFloor.push(color.r, color.g, color.b);
  }

  nonIndexedFloorGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colorsFloor, 3)
  );

  const floorMaterial = new THREE.MeshBasicMaterial({ vertexColors: true });

  const floor = new THREE.Mesh(nonIndexedFloorGeometry, floorMaterial);

  return floor;
}
