import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import type { SwarmParams } from '../types/portfolio';

export class ParticlesSwarm {
  count: number;
  container: HTMLDivElement;
  speedMult: number;
  disposed: boolean = false;
  animationFrameId: number = 0;
  
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  composer: EffectComposer;
  
  dummy: THREE.Object3D;
  color: THREE.Color;
  target: THREE.Vector3;
  pColor: THREE.Color;
  
  geometry: THREE.TetrahedronGeometry;
  material: THREE.MeshBasicMaterial;
  mesh: THREE.InstancedMesh;
  positions: THREE.Vector3[];
  clock: THREE.Clock;

  params: SwarmParams;
  mouse: THREE.Vector2;

  constructor(container: HTMLDivElement, initialParams: SwarmParams, count = 20000) {
    this.count = count;
    this.container = container;
    this.speedMult = 1.0;
    this.params = { ...initialParams };
    
    // SETUP
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x000000, 0.01);
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.camera.position.set(0, 0, 100);
    
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // POST PROCESSING
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight), 
      1.5, 
      0.4, 
      0.85
    );
    bloomPass.strength = 1.8; 
    bloomPass.radius = 0.4; 
    bloomPass.threshold = 0;
    this.composer.addPass(bloomPass);

    // OBJECTS
    this.dummy = new THREE.Object3D();
    this.color = new THREE.Color();
    this.target = new THREE.Vector3();
    this.pColor = new THREE.Color();
    
    this.geometry = new THREE.TetrahedronGeometry(0.25);
    this.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    this.mesh = new THREE.InstancedMesh(this.geometry, this.material, this.count);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    if (this.mesh.instanceColor) {
      this.mesh.instanceColor.setUsage(THREE.DynamicDrawUsage);
    }
    this.scene.add(this.mesh);
    
    this.positions = [];
    for (let i = 0; i < this.count; i++) {
      this.positions.push(new THREE.Vector3(
        (Math.random() - 0.5) * 100, 
        (Math.random() - 0.5) * 100, 
        (Math.random() - 0.5) * 100
      ));
      this.mesh.setColorAt(i, this.color.setHex(0x00ff88));
    }
    
    this.clock = new THREE.Clock();
    this.mouse = new THREE.Vector2(0, 0);
    
    // Bindings
    this.animate = this.animate.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('mousemove', this.handleMouseMove);
    
    this.animate();
  }

  handleMouseMove(e: MouseEvent) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  updateParams(newParams: Partial<SwarmParams>) {
    this.params = { ...this.params, ...newParams };
    if (newParams.flow !== undefined) {
      this.speedMult = Math.abs(newParams.flow) * 0.32;
    }
  }

  handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
  }

  animate() {
    if (this.disposed) return;
    this.animationFrameId = requestAnimationFrame(this.animate);
    
    const time = this.clock.getElapsedTime() * this.speedMult;
    
    const mat = this.material as any;
    if (mat.uniforms && mat.uniforms.uTime) {
      mat.uniforms.uTime.value = time;
    }

    const addControl = (id: keyof SwarmParams, _l: string, _min: number, _max: number, val: number) => {
      return this.params[id] !== undefined ? this.params[id] : val;
    };
    
    const setInfo = (..._args: any[]) => {};
    const annotate = (..._args: any[]) => {};
    
    const count = this.count;
    
    // Cache variables for readability and speed
    const R = addControl("macroRadius", "Macro Radius", 10, 100, 50);
    const r = addControl("microRadius", "Micro Radius", 5, 50, 15);
    const P = Math.floor(addControl("pLoops", "Knot P Loops", 1, 10, 2));
    const Q = Math.floor(addControl("qTwists", "Knot Q Twists", 1, 10, 5));
    const numBlocks = Math.floor(addControl("blocks", "Num Blocks", 10, 800, 350));
    const pLen = addControl("length", "Block Length", 1, 30, 7.0);
    const pSize = addControl("size", "Block Size", 0.5, 10, 2.5);
    const stagger = addControl("stagger", "Track Stagger", 0, 15, 4.0);
    const extraTwist = addControl("twist", "Bundle Twist", 0, 10, 1.5);
    const flow = addControl("flow", "Energy Flow", -2, 2, 0.3);
    
    const stardustRatio = 0.05;
    const numStardust = count * stardustRatio;
    
    const gRx = time * 0.11;
    const gRy = time * 0.17;
    const cgx = Math.cos(gRx), sgx = Math.sin(gRx);
    const cgy = Math.cos(gRy), sgy = Math.sin(gRy);

    // Unproject 2D mouse coordinates into the 3D space of the swarm
    const mouse3D = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
    mouse3D.unproject(this.camera);
    const dir = mouse3D.sub(this.camera.position).normalize();
    const distToPlane = -this.camera.position.z / dir.z;
    const mousePos3D = this.camera.position.clone().add(dir.multiplyScalar(distToPlane));
    
    for (let i = 0; i < this.count; i++) {
      const target = this.target;
      const color = this.pColor;
      
      if (i === 0) {
        setInfo();
        annotate("singularity", new THREE.Vector3(0, 0, 0), "Energy Core");
      }
      
      if (i < numStardust) {
        const raw1 = Math.sin(i * 11.11) * 43758.54;
        const sd1 = raw1 - Math.floor(raw1);
        const raw2 = Math.cos(i * 22.22) * 43758.54;
        const sd2 = raw2 - Math.floor(raw2);
        const raw3 = Math.sin(i * 33.33) * 43758.54;
        const sd3 = raw3 - Math.floor(raw3);
    
        const radiusDist = R * 1.2 + sd1 * 80.0;
        const theta = sd2 * Math.PI * 2.0;
        const phi = Math.acos(sd3 * 2.0 - 1.0);
    
        const driftX = Math.sin(time * 0.2 + i * 0.1) * 10.0;
        const driftY = Math.cos(time * 0.25 + i * 0.1) * 10.0;
        const driftZ = Math.sin(time * 0.15 + i * 0.2) * 10.0;
    
        const sx = radiusDist * Math.sin(phi) * Math.cos(theta) + driftX;
        const sy = radiusDist * Math.sin(phi) * Math.sin(theta) + driftY;
        const sz = radiusDist * Math.cos(phi) + driftZ;
    
        const y1 = sy * cgx - sz * sgx;
        const z1 = sy * sgx + sz * cgx;
        const x2 = sx * cgy + z1 * sgy;
        const y2 = y1;
        const z2 = -sx * sgy + z1 * cgy;
    
        target.set(x2, y2, z2);
    
        const twinkle = Math.pow((Math.sin(time * 3.0 + i) + 1.0) * 0.5, 8.0);
        color.setHSL(0.5 + sd1 * 0.1, 0.8, 0.05 + twinkle * 0.8);
      } else {
        const remainingCount = count - numStardust;
        const iRem = i - numStardust;
        
        const blocksSafe = Math.max(1, numBlocks);
        const ppb = remainingCount / blocksSafe;
        const blockId = Math.floor(iRem / ppb);
        const localId = iRem - blockId * ppb;
    
        const wireRatio = 0.85;
        const numWire = ppb * wireRatio;
        const isWire = localId < numWire;
    
        const tBase = (blockId / blocksSafe) * Math.PI * 2.0;
        const t = tBase + time * flow * 0.1;
    
        const cosQt = Math.cos(Q * t);
        const sinQt = Math.sin(Q * t);
        const cosPt = Math.cos(P * t);
        const sinPt = Math.sin(P * t);
    
        const px = (R + r * cosQt) * cosPt;
        const py = (R + r * cosQt) * sinPt;
        const pz = r * sinQt;
    
        let tx = -P * (R + r * cosQt) * sinPt - Q * r * sinQt * cosPt;
        let ty =  P * (R + r * cosQt) * cosPt - Q * r * sinQt * sinPt;
        let tz =  Q * r * cosQt;
        const tLen = Math.sqrt(tx * tx + ty * ty + tz * tz) + 0.0001;
        tx /= tLen; ty /= tLen; tz /= tLen;
    
        const nx_torus = cosPt;
        const ny_torus = sinPt;
        const nz_torus = 0.0;
    
        let bx = ty * nz_torus - tz * ny_torus;
        let by = tz * nx_torus - tx * nz_torus;
        let bz = tx * ny_torus - ty * nx_torus;
        const bLen = Math.sqrt(bx * bx + by * by + bz * bz) + 0.0001;
        bx /= bLen; by /= bLen; bz /= bLen;
    
        let nx = by * tz - bz * ty;
        let ny = bz * tx - bx * tz;
        let nz = bx * ty - by * tx;
    
        const twistAngle = tBase * extraTwist + time * flow * 0.5;
        const cosTw = Math.cos(twistAngle);
        const sinTw = Math.sin(twistAngle);
    
        const fnx = nx * cosTw - bx * sinTw;
        const fny = ny * cosTw - by * sinTw;
        const fnz = nz * cosTw - bz * sinTw;
    
        const fbx = nx * sinTw + bx * cosTw;
        const fby = ny * sinTw + by * cosTw;
        const fbz = nz * sinTw + bz * cosTw;
    
        const track = blockId % 4;
        const c1 = track % 2 === 0 ? 1.0 : -1.0;
        const c2 = Math.floor(track / 2) === 0 ? 1.0 : -1.0;
        
        const cx = px + fnx * c1 * stagger + fbx * c2 * stagger;
        const cy = py + fny * c1 * stagger + fby * c2 * stagger;
        const cz = pz + fnz * c1 * stagger + fbz * c2 * stagger;
    
        let lx = 0.0, ly = 0.0, lz = 0.0;
        let u = 0.0;
    
        if (isWire) {
          const edgePosRaw = (localId / numWire) * 12.0;
          const edgeId = Math.min(11, Math.floor(edgePosRaw));
          u = (edgePosRaw - edgeId) * 2.0 - 1.0;
    
          const axis = edgeId % 3;
          const corner = Math.floor(edgeId / 3);
          const e1 = (corner % 2 === 0) ? -1.0 : 1.0;
          const e2 = (Math.floor(corner / 2) === 0) ? -1.0 : 1.0;
    
          if (axis === 0) { lx = u; ly = e1; lz = e2; }
          else if (axis === 1) { lx = e1; ly = u; lz = e2; }
          else { lx = e1; ly = e2; lz = u; }
        } else {
          const rawS1 = Math.sin(localId * 12.989 + blockId * 78.233) * 43758.545;
          const rawS2 = Math.cos(localId * 39.346 + blockId * 53.211) * 43758.545;
          const rawS3 = Math.sin(localId * 73.156 + blockId * 12.742) * 43758.545;
          const rawS4 = Math.cos(localId * 23.456 + blockId * 89.123) * 43758.545;
          
          const s1 = rawS1 - Math.floor(rawS1);
          const s2 = rawS2 - Math.floor(rawS2);
          const s3 = rawS3 - Math.floor(rawS3);
          const s4 = rawS4 - Math.floor(rawS4);
    
          const faceAxis = Math.min(2, Math.floor(s1 * 3.0));
          const signFace = s2 > 0.5 ? 1.0 : -1.0;
          const u2 = s3 * 2.0 - 1.0;
          const v2 = s4 * 2.0 - 1.0;
    
          u = 0.0; 
    
          if (faceAxis === 0) { lx = signFace; ly = u2; lz = v2; }
          else if (faceAxis === 1) { lx = u2; ly = signFace; lz = v2; }
          else { lx = u2; ly = v2; lz = signFace; }
        }
    
        lx *= pLen;
        ly *= pSize;
        lz *= pSize;
    
        const fx = cx + lx * tx + ly * fnx + lz * fbx;
        const fy = cy + lx * ty + ly * fny + lz * fby;
        const fz = cz + lx * tz + ly * fnz + lz * fbz;
    
        const y1 = fy * cgx - fz * sgx;
        const z1 = fy * sgx + fz * cgx;
        const x2 = fx * cgy + z1 * sgy;
        const y2 = y1;
        const z2 = -fx * sgy + z1 * cgy;
    
        target.set(x2, y2, z2);
    
        const trackOffset = (track / 4.0) * 0.08;
        const hue = 0.5 + trackOffset + Math.sin(tBase * P * 2.0 + time) * 0.02;
        
        let sat = isWire ? 0.95 : 0.5;
        let lit = isWire ? 0.3 : 0.02;
    
        if (isWire) {
          const pulseEnv = Math.sin(tBase * P * 12.0 - time * 5.0);
          if (pulseEnv > 0.8) {
            lit += (pulseEnv - 0.8) * 3.0;
          }
          
          const isCorner = Math.abs(u) > 0.90 ? 1.0 : 0.0;
          lit += isCorner * 0.6;
          sat -= isCorner * 0.8;
        }
    
        color.setHSL(hue % 1.0, Math.min(1.0, Math.max(0.0, sat)), Math.min(1.0, Math.max(0.0, lit)));
      }
      
      // Mouse gravity attraction effect
      const dx = mousePos3D.x - target.x;
      const dy = mousePos3D.y - target.y;
      const dz = mousePos3D.z - target.z;
      const distSq = dx * dx + dy * dy + dz * dz;
      if (distSq < 1600) { // 40 units interaction radius
        const dist = Math.sqrt(distSq) + 0.0001;
        const force = (1.0 - dist / 40) * 12.0; // gravity pull strength
        target.x += (dx / dist) * force;
        target.y += (dy / dist) * force;
        target.z += (dz / dist) * force;
      }

      // UPDATE
      this.positions[i].lerp(this.target, 0.024);
      this.dummy.position.copy(this.positions[i]);
      this.dummy.updateMatrix();
      this.mesh.setMatrixAt(i, this.dummy.matrix);
      this.mesh.setColorAt(i, this.pColor);
    }
    
    this.mesh.instanceMatrix.needsUpdate = true;
    if (this.mesh.instanceColor) {
      this.mesh.instanceColor.needsUpdate = true;
    }
    
    this.composer.render();
  }
  
  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
    
    this.geometry.dispose();
    this.material.dispose();
    this.scene.remove(this.mesh);
    this.renderer.dispose();
    
    const canvas = this.container.querySelector('canvas');
    if (canvas) {
      this.container.removeChild(canvas);
    }
  }
}

interface ParticlesBackgroundProps {
  params: SwarmParams;
}

export const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ params }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const swarmInstanceRef = useRef<ParticlesSwarm | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Instantiate user's 3D Swarm with container and current params
    const swarm = new ParticlesSwarm(containerRef.current, params);
    swarmInstanceRef.current = swarm;

    return () => {
      swarm.dispose();
      swarmInstanceRef.current = null;
    };
  }, []); // Run once on mount

  // React to parameter changes from parent component (e.g. scroll interpolation)
  useEffect(() => {
    if (swarmInstanceRef.current) {
      swarmInstanceRef.current.updateParams(params);
    }
  }, [params]);

  return <div ref={containerRef} className="background-canvas" />;
};
