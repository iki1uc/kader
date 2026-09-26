import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// scene setup
const canvas = document.getElementById('cv');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05070e);
scene.fog = new THREE.Fog(0x05070e, 12, 30);

const camera = new THREE.PerspectiveCamera(45, innerWidth/innerHeight, .1, 100);
camera.position.set(4, 3, 7);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.25;
controls.target.set(0, 0.5, 0);

// lights
scene.add(new THREE.AmbientLight(0x223344, 1.2));
const dl = new THREE.DirectionalLight(0xf0e0c0, 1.6);
dl.position.set(5, 9, 6);
scene.add(dl);
const dl2 = new THREE.DirectionalLight(0x88ddff, .5);
dl2.position.set(-5, -3, -5);
scene.add(dl2);

// ─── STAND: the monolith ───
const standGeo = new THREE.BoxGeometry(0.5, 2.4, 0.5);
const standMat = new THREE.MeshStandardMaterial({
  color: 0x44aa77, emissive: 0x44aa77, emissiveIntensity: 0.35,
  roughness: 0.4, metalness: 0.7
});
const stand = new THREE.Mesh(standGeo, standMat);
stand.position.y = 0.7;
scene.add(stand);

// edge lines
const standEdges = new THREE.LineSegments(
  new THREE.EdgesGeometry(standGeo),
  new THREE.LineBasicMaterial({ color: 0x88ddbb, transparent: true, opacity: 0.4 })
);
stand.add(standEdges);

// base
const baseGeo = new THREE.RingGeometry(0.5, 0.8, 64);
const baseMat = new THREE.MeshBasicMaterial({ color: 0x44aa77, transparent: true, opacity: 0.4, side: THREE.DoubleSide });
const base = new THREE.Mesh(baseGeo, baseMat);
base.rotation.x = -Math.PI/2;
base.position.y = -0.5;
scene.add(base);

// ─── UMSTAND: rings around ───
const rings = [];
for (let i = 0; i < 3; i++) {
  const r = 0.9 + i * 0.4;
  const g = new THREE.TorusGeometry(r, 0.008, 6, 96);
  const m = new THREE.MeshBasicMaterial({ color: 0x88ddff, transparent: true, opacity: 0.3 });
  const torus = new THREE.Mesh(g, m);
  torus.rotation.x = Math.PI/2;
  torus.position.y = 0.3 + i * 0.2;
  scene.add(torus);
  rings.push({ mesh: torus, speed: 0.001 * (i+1), y: torus.position.y });
}
