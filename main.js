import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
const canvas=document.querySelector('#webgl'),scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(38,innerWidth/innerHeight,.1,100);
camera.position.set(0,0,9);
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
renderer.setSize(innerWidth,innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setClearColor(0xf0f0ed,0);
scene.add(new THREE.AmbientLight(0xffffff,2.1));
const key=new THREE.DirectionalLight(0xa8a1ff,1.2);
key.position.set(4,5,6);
scene.add(key);
const group=new THREE.Group();
// Push 3D element to the right half of screen — no text overlap
group.position.set(3.2,0,0);
group.scale.setScalar(0.62);
scene.add(group);
const shape=new THREE.Mesh(
  new THREE.TorusKnotGeometry(1.08,.22,140,20),
  new THREE.MeshStandardMaterial({color:0x6c64ed,metalness:.15,roughness:.52,transparent:true,opacity:.68})
);
group.add(shape);
const wire=new THREE.Mesh(
  new THREE.IcosahedronGeometry(1.75,2),
  new THREE.MeshBasicMaterial({color:0x5146e5,wireframe:true,transparent:true,opacity:.04})
);
group.add(wire);
const dotsGeo=new THREE.BufferGeometry();
const n=140,pos=new Float32Array(n*3);
for(let i=0;i<n*3;i++) pos[i]=(Math.random()-.5)*36;
dotsGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));
scene.add(new THREE.Points(dotsGeo,new THREE.PointsMaterial({color:0x8880ff,size:.016,transparent:true,opacity:.22})));
let mx=0,my=0;
addEventListener('mousemove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,2));});
const clock=new THREE.Clock();
function tick(){
  const t=clock.getElapsedTime(),p=scrollY/Math.max(1,document.body.scrollHeight-innerHeight);
  const isMobile=innerWidth<900;
  // On mobile push below visible text, on desktop stay right
  group.position.x=isMobile?0:3.2;
  group.position.y=isMobile?-3:.05-p*.3;
  // Very slow, gentle rotation — just ambient movement
  group.rotation.x=t*.05+p*1.2;
  group.rotation.y=t*.04+p*.9;
  wire.rotation.y=-t*.018;
  // Minimal parallax — barely noticeable, never fights text
  camera.position.x+=(mx*.08-camera.position.x)*.025;
  camera.position.y+=(-my*.06-camera.position.y)*.025;
  camera.lookAt(isMobile?0:1.5,0,0);
  renderer.render(scene,camera);
  requestAnimationFrame(tick);
}
tick();