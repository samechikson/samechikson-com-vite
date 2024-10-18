import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
// import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
// @ts-ignore
let gui;
if (import.meta.env.DEV) {
  gui = new GUI();
}

// Constants
const radius = 5;
const frustumSize = 5;

// Canvas
const canvas = document.querySelector<HTMLCanvasElement>("canvas.webgl");

if (!canvas) {
  throw new Error("Canvas not found");
}

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

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
for (let i = 0; i < 500; i++) {
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
  const aspect = window.innerWidth / window.innerHeight;

  camera.left = (-frustumSize * aspect) / 2;
  camera.right = (frustumSize * aspect) / 2;
  camera.top = frustumSize / 2;
  camera.bottom = -frustumSize / 2;

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.setSize(window.innerWidth, window.innerHeight);
});

/**
 * Camera
 */
// Base camera
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.OrthographicCamera(
  (frustumSize * aspect) / -2,
  (frustumSize * aspect) / 2,
  frustumSize / 2,
  frustumSize / -2,
  0.01,
  100
);
camera.position.x = -radius;
camera.position.y = 0;
camera.position.z = radius;

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxPolarAngle = 2;
controls.minPolarAngle = 1;
controls.maxDistance = 10;
controls.maxAzimuthAngle = Math.PI / 10;
controls.minAzimuthAngle = -Math.PI / 10;

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
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
let xDirection = 0.005;
let yDirection = 0.005;
const tick = () => {
  camera.position.x += xDirection;
  camera.position.y += yDirection;

  if (controls.getAzimuthalAngle() <= controls.minAzimuthAngle) {
    xDirection = 0.005;
  } else if (controls.getAzimuthalAngle() >= controls.maxAzimuthAngle) {
    xDirection = -0.005;
  }
  if (controls.getPolarAngle() <= controls.minPolarAngle) {
    yDirection = -0.005;
  } else if (controls.getPolarAngle() >= controls.maxPolarAngle) {
    yDirection = 0.005;
  }

  // Update controls
  controls.update();

  camera.lookAt(scene.position);
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
