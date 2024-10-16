import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
// import GUI from "lil-gui";
import { TextGeometry } from "three/examples/jsm/Addons.js";

/**
 * Base
 */
// Debug
// const gui = new GUI();

// Canvas
const canvas = document.querySelector<HTMLCanvasElement>("canvas.webgl");

if (!canvas) {
  throw new Error("Canvas not found");
}

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * Fonts
 */
const fontLoader = new FontLoader();
fontLoader.load("fonts/Super Squad_Regular.json", (font) => {
  const textGeometry = new TextGeometry("S a m   E c h i k s o n", {
    font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelOffset: 0,
    bevelSegments: 2,
  });

  textGeometry.center();

  const textMaterial = new THREE.MeshToonMaterial({
    color: 0x00ff00,
  });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(textMesh);
});

// Objects
const matcapTexture = textureLoader.load("/textures/matcaps/8.png");
const sphereGeometry = new THREE.SphereGeometry(0.05, 32, 32);
const sphereMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
for (let i = 0; i < 100; i++) {
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.x = (Math.random() - 0.5) * 15;
  sphere.position.y = (Math.random() - 0.5) * 15;
  sphere.position.z = (Math.random() - 0.5) * 15;
  scene.add(sphere);
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = -3;
camera.position.y = 0.5;
camera.position.z = 4;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
