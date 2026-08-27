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
// A 28x18 grid of points that undulate like a wave — feels like
// a design tool grid or a subtle topographic map.
const COLS = 28, ROWS = 18, GAP = 0.38;
const gridGeo = new THREE.BufferGeometry();
const gridPos = new Float32Array(COLS * ROWS * 3);
const gridBase = new Float32Array(COLS * ROWS * 3); // store base XY
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const i = (r * COLS + c) * 3;
    const x = (c - COLS / 2) * GAP;
    const y = (r - ROWS / 2) * GAP;
    gridBase[i] = x; gridBase[i+1] = y; gridBase[i+2] = 0;
    gridPos[i] = x; gridPos[i+1] = y; gridPos[i+2] = 0;
  }
}
gridGeo.setAttribute('position', new THREE.BufferAttribute(gridPos, 3));
const gridMat = new THREE.PointsMaterial({
  color: 0x7a70f5,
  size: 0.055,
  transparent: true,
  opacity: 0.55,
});
const grid = new THREE.Points(gridGeo, gridMat);
grid.position.set(3.0, 0.2, -1);
scene.add(grid);

// ── Wireframe browser window outline ───────────────────────────
// Three rectangles stacked: a title bar + two content blocks.
// Looks like a minimal UI wireframe / design mock.
const winGroup = new THREE.Group();

function makeRect(w, h, x, y, z, opacity = 0.18) {
  const geo = new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, 0.01));
  const mat = new THREE.LineBasicMaterial({ color: 0x5146e5, transparent: true, opacity });
  const mesh = new THREE.LineSegments(geo, mat);
  mesh.position.set(x, y, z);
  return mesh;
}
// outer frame
winGroup.add(makeRect(3.2, 2.2, 0, 0, 0, 0.28));
// title bar
winGroup.add(makeRect(3.2, 0.32, 0, 0.94, 0.01, 0.22));
// left content block
winGroup.add(makeRect(1.3, 1.1, -0.7, -0.2, 0.01, 0.14));
// right content block
winGroup.add(makeRect(1.3, 1.1, 0.7, -0.2, 0.01, 0.14));
// three dot circles in title bar (SVG-style)
for (let i = 0; i < 3; i++) {
  const dot = new THREE.Mesh(
    new THREE.CircleGeometry(0.055, 12),
    new THREE.MeshBasicMaterial({ color: [0xff6058, 0xffbd2e, 0x28c840][i], transparent: true, opacity: 0.55 })
  );
  dot.position.set(-1.35 + i * 0.22, 0.94, 0.02);
  winGroup.add(dot);
}

winGroup.position.set(3.1, 0.1, 0);
winGroup.scale.setScalar(0.78);
scene.add(winGroup);

// ── Floating cursor triangle ────────────────────────────────────
// A classic pointer cursor shape made of lines — a nod to UX/design.
const cursorGeo = new THREE.BufferGeometry();
const cp = new Float32Array([
   0,    0.55, 0,
  -0.22,-0.45, 0,
   0,   -0.22, 0,
   0,    0.55, 0,
   0.22,-0.45, 0,
   0,   -0.22, 0,
]);
cursorGeo.setAttribute('position', new THREE.BufferAttribute(cp, 3));
const cursor = new THREE.Line(
  cursorGeo,
  new THREE.LineBasicMaterial({ color: 0x5146e5, transparent: true, opacity: 0.5 })
);
cursor.position.set(4.6, -0.6, 0.5);
cursor.scale.setScalar(0.7);
scene.add(cursor);

// ── Bezier-curve ribbon (design tool path) ──────────────────────
// A smooth CatmullRom curve — looks like a pen tool path or motion path.
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-1.2,  0.8, 0),
  new THREE.Vector3(-0.4, -0.6, 0.3),
  new THREE.Vector3( 0.5,  0.5, 0),
  new THREE.Vector3( 1.3, -0.3, 0.2),
  new THREE.Vector3( 1.8,  0.6, 0),
]);
const ribbonGeo = new THREE.TubeGeometry(curve, 60, 0.018, 6, false);
const ribbon = new THREE.Mesh(
  ribbonGeo,
  new THREE.MeshBasicMaterial({ color: 0x9d96ff, transparent: true, opacity: 0.35 })
);
ribbon.position.set(2.2, -1.2, 0.3);
scene.add(ribbon);

// ── Mouse + resize ─────────────────────────────────────────────
let mx = 0, my = 0;
addEventListener('mousemove', e => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; });
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
});

// ── Render loop ────────────────────────────────────────────────
const clock = new THREE.Clock();
function tick() {
  const t = clock.getElapsedTime();
  const p = scrollY / Math.max(1, document.body.scrollHeight - innerHeight);
  const isMobile = innerWidth < 900;

  // Animate dot grid wave
  const pos = gridGeo.attributes.position.array;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = (r * COLS + c) * 3;
      pos[i+2] = Math.sin(c * 0.45 + t * 0.9) * Math.cos(r * 0.45 + t * 0.6) * 0.28;
    }
  }
  gridGeo.attributes.position.needsUpdate = true;

  // Reposition based on mobile/desktop
  const offX = isMobile ? 0 : 3.0;
  const offY = isMobile ? -4 : 0.2 - p * 0.5;
  grid.position.x = offX;
  grid.position.y = offY;
  winGroup.position.x = isMobile ? 0 : 3.1;
  winGroup.position.y = isMobile ? -4 : 0.1 - p * 0.5;
  cursor.position.x = isMobile ? 0 : 4.6;
  cursor.position.y = isMobile ? -4 : -0.6 - p * 0.3;
  ribbon.position.x = isMobile ? 0 : 2.2;
  ribbon.position.y = isMobile ? -4 : -1.2 - p * 0.4;

  // Gentle animations
  winGroup.rotation.y = Math.sin(t * 0.18) * 0.08;
  winGroup.rotation.x = Math.sin(t * 0.12) * 0.04;
  cursor.rotation.z = Math.sin(t * 0.4) * 0.12;
  ribbon.rotation.z = Math.sin(t * 0.22) * 0.06;

  // Subtle camera parallax
  camera.position.x += (mx * 0.06 - camera.position.x) * 0.03;
  camera.position.y += (-my * 0.05 - camera.position.y) * 0.03;
  camera.lookAt(isMobile ? 0 : 1.8, 0, 0);

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();
