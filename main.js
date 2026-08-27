import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 0, 9);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);

// ── Dot grid wave ──────────────────────────────────────────────
const COLS = 28, ROWS = 18, GAP = 0.38;
const gridGeo = new THREE.BufferGeometry();
const gridPos = new Float32Array(COLS * ROWS * 3);
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const i = (r * COLS + c) * 3;
    gridPos[i]   = (c - COLS / 2) * GAP;
    gridPos[i+1] = (r - ROWS / 2) * GAP;
    gridPos[i+2] = 0;
  }
}
gridGeo.setAttribute('position', new THREE.BufferAttribute(gridPos, 3));
const grid = new THREE.Points(gridGeo, new THREE.PointsMaterial({
  color: 0x7a70f5, size: 0.052, transparent: true, opacity: 0.45,
}));
grid.position.set(3.0, 0.2, -1);
scene.add(grid);

// ── Wireframe browser window ─────────────────────────────────
const winGroup = new THREE.Group();
function makeRect(w, h, x, y, z, op = 0.18) {
  const geo = new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, 0.01));
  const mat = new THREE.LineBasicMaterial({ color: 0x5146e5, transparent: true, opacity: op });
  const mesh = new THREE.LineSegments(geo, mat);
  mesh.position.set(x, y, z);
  return mesh;
}
winGroup.add(makeRect(3.2, 2.2,  0,     0,    0,    0.22));
winGroup.add(makeRect(3.2, 0.32, 0,     0.94, 0.01, 0.18));
winGroup.add(makeRect(1.3, 1.1, -0.7, -0.2,  0.01, 0.11));
winGroup.add(makeRect(1.3, 1.1,  0.7, -0.2,  0.01, 0.11));
for (let i = 0; i < 3; i++) {
  const dot = new THREE.Mesh(
    new THREE.CircleGeometry(0.052, 12),
    new THREE.MeshBasicMaterial({ color: [0xff6058,0xffbd2e,0x28c840][i], transparent:true, opacity:0.45 })
  );
  dot.position.set(-1.35 + i * 0.22, 0.94, 0.02);
  winGroup.add(dot);
}
winGroup.position.set(3.1, 0.1, 0);
winGroup.scale.setScalar(0.78);
scene.add(winGroup);

// ── Cursor ──────────────────────────────────────────────────
const cursorGeo = new THREE.BufferGeometry();
cursorGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
   0, 0.55,0, -0.22,-0.45,0,  0,-0.22,0,
   0, 0.55,0,  0.22,-0.45,0,  0,-0.22,0,
]),3));
const cursor = new THREE.Line(cursorGeo,
  new THREE.LineBasicMaterial({ color:0x5146e5, transparent:true, opacity:0.38 })
);
cursor.position.set(4.6, -0.6, 0.5);
cursor.scale.setScalar(0.7);
scene.add(cursor);

// ── Bezier ribbon ───────────────────────────────────────────
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-1.2, 0.8,0),
  new THREE.Vector3(-0.4,-0.6,0.3),
  new THREE.Vector3( 0.5, 0.5,0),
  new THREE.Vector3( 1.3,-0.3,0.2),
  new THREE.Vector3( 1.8, 0.6,0),
]);
const ribbon = new THREE.Mesh(
  new THREE.TubeGeometry(curve, 60, 0.016, 6, false),
  new THREE.MeshBasicMaterial({ color:0x9d96ff, transparent:true, opacity:0.25 })
);
ribbon.position.set(2.2, -1.2, 0.3);
scene.add(ribbon);

// ── Mouse + resize ──────────────────────────────────────────
let mx = 0, my = 0;
addEventListener('mousemove', e => { mx = e.clientX/innerWidth-.5; my = e.clientY/innerHeight-.5; });
addEventListener('resize', () => {
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
});

// ── Render loop ─────────────────────────────────────────────
const clock = new THREE.Clock();
function tick() {
  const t = clock.getElapsedTime();
  const p = scrollY / Math.max(1, document.body.scrollHeight - innerHeight);
  const isMobile = innerWidth < 900;

  // Grid wave — very slow, very shallow
  const pos = gridGeo.attributes.position.array;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = (r * COLS + c) * 3;
      // amplitude 0.09 (was 0.28), speed 0.28 (was 0.9)
      pos[i+2] = Math.sin(c * 0.42 + t * 0.28) * Math.cos(r * 0.42 + t * 0.18) * 0.09;
    }
  }
  gridGeo.attributes.position.needsUpdate = true;

  // Positions
  grid.position.x    = isMobile ? 0 : 3.0;
  grid.position.y    = isMobile ? -4 : 0.2 - p * 0.4;
  winGroup.position.x = isMobile ? 0 : 3.1;
  winGroup.position.y = isMobile ? -4 : 0.1 - p * 0.4;
  cursor.position.x  = isMobile ? 0 : 4.6;
  cursor.position.y  = isMobile ? -4 : -0.6 - p * 0.25;
  ribbon.position.x  = isMobile ? 0 : 2.2;
  ribbon.position.y  = isMobile ? -4 : -1.2 - p * 0.3;

  // Breathing rotations — cycle ~20s, amplitude tiny
  winGroup.rotation.y = Math.sin(t * 0.07) * 0.032;
  winGroup.rotation.x = Math.sin(t * 0.05) * 0.016;
  // cursor drifts like it’s hovering
  cursor.position.y += Math.sin(t * 0.38) * 0.0006;
  cursor.rotation.z   = Math.sin(t * 0.18) * 0.04;
  // ribbon barely moves
  ribbon.rotation.z   = Math.sin(t * 0.09) * 0.022;

  // Camera parallax — almost imperceptible
  camera.position.x += (mx * 0.04 - camera.position.x) * 0.02;
  camera.position.y += (-my * 0.03 - camera.position.y) * 0.02;
  camera.lookAt(isMobile ? 0 : 1.8, 0, 0);

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();
