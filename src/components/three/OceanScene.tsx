"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

// how far a swimming creature travels before wrapping to the other side --
// wide enough that the wrap always happens well off-screen (even on ultrawide
// monitors) instead of visibly popping out mid-frame
const SWIM_WRAP_BOUND = 34;
const SWIM_SPAWN_RANGE = 30;

function createRayTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "rgba(255,255,255,0.35)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0.12)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const FISH_BODY_BACK_X = -0.5;

function bakeCountershading(geo: THREE.BufferGeometry, topY: number, bottomY: number) {
  const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
  const colors = new Float32Array(posAttr.count * 3);
  const back = new THREE.Color(0.42, 0.42, 0.42);
  const belly = new THREE.Color(1, 1, 1);
  for (let i = 0; i < posAttr.count; i++) {
    const y = posAttr.getY(i);
    const t = THREE.MathUtils.clamp((y - bottomY) / (topY - bottomY), 0, 1);
    const c = belly.clone().lerp(back, t);
    colors.set([c.r, c.g, c.b], i * 3);
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
}

function createFishParts() {
  // fusiform body tapering to a narrow tail peduncle
  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(0.62, 0);
  bodyShape.quadraticCurveTo(0.55, 0.24, 0.1, 0.26);
  bodyShape.quadraticCurveTo(-0.28, 0.24, FISH_BODY_BACK_X, 0.07);
  bodyShape.quadraticCurveTo(FISH_BODY_BACK_X - 0.06, 0, FISH_BODY_BACK_X, -0.07);
  bodyShape.quadraticCurveTo(-0.28, -0.24, 0.1, -0.26);
  bodyShape.quadraticCurveTo(0.55, -0.24, 0.62, 0);
  const bodyGeo = new THREE.ShapeGeometry(bodyShape, 16);
  bakeCountershading(bodyGeo, 0.26, -0.26);

  // forked tail fin: drawn trailing away from the body (negative x) so it
  // reads as a real fork behind the fish instead of hiding under the body
  const tailShape = new THREE.Shape();
  tailShape.moveTo(0.06, 0);
  tailShape.quadraticCurveTo(-0.14, 0.06, -0.42, 0.32);
  tailShape.lineTo(-0.16, 0);
  tailShape.lineTo(-0.42, -0.32);
  tailShape.quadraticCurveTo(-0.14, -0.06, 0.06, 0);
  const tailGeo = new THREE.ShapeGeometry(tailShape, 8);

  // small dorsal fin sitting on the back
  const dorsalShape = new THREE.Shape();
  dorsalShape.moveTo(-0.16, 0);
  dorsalShape.lineTo(-0.02, 0.2);
  dorsalShape.lineTo(0.18, 0);
  dorsalShape.closePath();
  const dorsalGeo = new THREE.ShapeGeometry(dorsalShape);

  return { bodyGeo, tailGeo, dorsalGeo };
}

function createTurtleParts() {
  const shellShape = new THREE.Shape();
  shellShape.moveTo(0.55, 0.05);
  shellShape.quadraticCurveTo(0.5, 0.34, 0.05, 0.36);
  shellShape.quadraticCurveTo(-0.45, 0.32, -0.55, 0.06);
  shellShape.quadraticCurveTo(-0.5, -0.24, -0.1, -0.28);
  shellShape.quadraticCurveTo(0.35, -0.26, 0.55, 0.05);
  const shellGeo = new THREE.ShapeGeometry(shellShape, 12);

  const flipperShape = new THREE.Shape();
  flipperShape.moveTo(0, 0);
  flipperShape.quadraticCurveTo(0.22, 0.11, 0.36, 0.02);
  flipperShape.quadraticCurveTo(0.2, -0.09, 0, 0);
  const flipperGeo = new THREE.ShapeGeometry(flipperShape, 6);

  return { shellGeo, flipperGeo };
}

function createRayFishShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(0.95, 0);
  s.quadraticCurveTo(0.5, 0.6, -0.1, 0.7);
  s.quadraticCurveTo(-0.55, 0.55, -0.75, 0.16);
  s.lineTo(-1.2, 0.06);
  s.lineTo(-1.55, 0);
  s.lineTo(-1.2, -0.06);
  s.lineTo(-0.75, -0.16);
  s.quadraticCurveTo(-0.55, -0.55, -0.1, -0.7);
  s.quadraticCurveTo(0.5, -0.6, 0.95, 0);
  return s;
}

function createSeahorseParts() {
  // an upright, curled body with a distinctive snout and spiral tail
  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(0.08, 0.56);
  bodyShape.quadraticCurveTo(0.34, 0.54, 0.42, 0.34);
  bodyShape.quadraticCurveTo(0.34, 0.24, 0.16, 0.24);
  bodyShape.quadraticCurveTo(0.03, 0.18, 0.1, 0.02);
  bodyShape.quadraticCurveTo(0.28, -0.04, 0.26, -0.24);
  bodyShape.quadraticCurveTo(0.22, -0.42, 0.02, -0.5);
  bodyShape.quadraticCurveTo(-0.16, -0.56, -0.12, -0.4);
  bodyShape.quadraticCurveTo(-0.08, -0.3, -0.18, -0.28);
  bodyShape.quadraticCurveTo(-0.1, -0.14, -0.14, 0.08);
  bodyShape.quadraticCurveTo(-0.18, 0.28, -0.02, 0.42);
  bodyShape.quadraticCurveTo(0, 0.5, 0.08, 0.56);
  const bodyGeo = new THREE.ShapeGeometry(bodyShape, 10);

  const frillShape = new THREE.Shape();
  frillShape.moveTo(-0.08, 0);
  frillShape.lineTo(0, 0.16);
  frillShape.lineTo(0.09, 0);
  frillShape.closePath();
  const frillGeo = new THREE.ShapeGeometry(frillShape);

  return { bodyGeo, frillGeo };
}

function createOctopusParts() {
  const headGeo = new THREE.CircleGeometry(0.38, 16);
  return { headGeo };
}

const LEVIATHAN_HEAD_X = 4.8;
const LEVIATHAN_TAIL_X = -4.8;
const LEVIATHAN_DEPTH = 0.5;
const LEVIATHAN_DECOR_Z = LEVIATHAN_DEPTH + 0.06;

function leviathanWave(x: number, time: number) {
  const factor = (LEVIATHAN_HEAD_X - x) / (LEVIATHAN_HEAD_X - LEVIATHAN_TAIL_X);
  return Math.sin(x * 0.75 - time * 1.8) * 0.85 * factor;
}

function leviathanHalfWidth(x: number) {
  const t = THREE.MathUtils.clamp(
    (LEVIATHAN_HEAD_X - x) / (LEVIATHAN_HEAD_X - LEVIATHAN_TAIL_X),
    0,
    1
  );
  return 0.44 * Math.sin(Math.PI * (1 - t) ** 0.6);
}

function createLeviathanShape(): THREE.Shape {
  // a long, lean serpent body -- narrower and longer than a normal fish
  const s = new THREE.Shape();
  s.moveTo(LEVIATHAN_HEAD_X, 0);
  s.quadraticCurveTo(4.6, 0.4, 3.6, 0.44);
  s.quadraticCurveTo(1.6, 0.4, 0, 0.32);
  s.quadraticCurveTo(-2.2, 0.24, -3.7, 0.12);
  s.quadraticCurveTo(-4.5, 0.06, LEVIATHAN_TAIL_X, 0);
  s.quadraticCurveTo(-4.5, -0.06, -3.7, -0.12);
  s.quadraticCurveTo(-2.2, -0.24, 0, -0.32);
  s.quadraticCurveTo(1.6, -0.4, 3.6, -0.44);
  s.quadraticCurveTo(4.6, -0.4, LEVIATHAN_HEAD_X, 0);
  return s;
}

function createGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(160,255,240,0.85)");
  gradient.addColorStop(0.45, "rgba(110,180,255,0.35)");
  gradient.addColorStop(1, "rgba(110,180,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const DEPTH_STOPS: [number, THREE.Color][] = [
  [0, new THREE.Color("#1d6b80")],
  [0.14, new THREE.Color("#175d76")],
  [0.35, new THREE.Color("#0f4a63")],
  [0.55, new THREE.Color("#0a2e40")],
  [0.75, new THREE.Color("#051520")],
  [1, new THREE.Color("#00030a")],
];

function getDepthColor(progress: number, target: THREE.Color) {
  for (let i = 0; i < DEPTH_STOPS.length - 1; i++) {
    const [p0, c0] = DEPTH_STOPS[i];
    const [p1, c1] = DEPTH_STOPS[i + 1];
    if (progress >= p0 && progress <= p1) {
      const t = (progress - p0) / (p1 - p0 || 1);
      target.copy(c0).lerp(c1, t);
      return;
    }
  }
  target.copy(DEPTH_STOPS[DEPTH_STOPS.length - 1][1]);
}

interface FadedMaterial {
  material: THREE.Material & { opacity: number };
  base: number;
}

export default function OceanScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const bgColor = new THREE.Color("#1d6b80");
    scene.background = bgColor;
    scene.fog = new THREE.FogExp2(bgColor.getHex(), 0.018);

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "low-power",
    });
    container.appendChild(renderer.domElement);

    const world = new THREE.Group();
    scene.add(world);

    const teal = new THREE.Color("#2dd4bf");
    const gold = new THREE.Color("#e6b94d");
    const foam = new THREE.Color("#eaf6f6");
    const glowTexture = createGlowTexture();

    // ---------------- light shafts ----------------
    const rayTexture = createRayTexture();
    const rayGroup = new THREE.Group();
    const rayDefs = [
      { x: -9, z: -10, tilt: 0.12, scale: 1.4 },
      { x: -2, z: -14, tilt: -0.08, scale: 1.1 },
      { x: 5, z: -8, tilt: 0.18, scale: 1.6 },
      { x: 11, z: -16, tilt: -0.14, scale: 1.2 },
    ];
    const rays = rayDefs.map((def) => {
      const geo = new THREE.PlaneGeometry(6, 34);
      const mat = new THREE.MeshBasicMaterial({
        map: rayTexture,
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(def.x, 6, def.z);
      mesh.rotation.z = def.tilt;
      mesh.scale.setScalar(def.scale);
      rayGroup.add(mesh);
      return { mesh, baseX: def.x, mat, baseOpacity: 0.16 };
    });
    world.add(rayGroup);

    // ---------------- rising bubbles ----------------
    const bubbleCount = 140;
    const bounds = { x: 16, y: 12, z: 10 };
    const bubblePositions = new Float32Array(bubbleCount * 3);
    const bubbleSpeeds = new Float32Array(bubbleCount);
    const bubbleColors = new Float32Array(bubbleCount * 3);
    for (let i = 0; i < bubbleCount; i++) {
      const x = (Math.random() * 2 - 1) * bounds.x;
      const y = (Math.random() * 2 - 1) * bounds.y;
      const z = (Math.random() * 2 - 1) * bounds.z;
      bubblePositions.set([x, y, z], i * 3);
      bubbleSpeeds[i] = 0.01 + Math.random() * 0.025;
      const mixed = foam.clone().lerp(teal, Math.random() * 0.6);
      bubbleColors.set([mixed.r, mixed.g, mixed.b], i * 3);
    }
    const bubbleGeo = new THREE.BufferGeometry();
    bubbleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(bubblePositions, 3)
    );
    bubbleGeo.setAttribute("color", new THREE.BufferAttribute(bubbleColors, 3));
    const bubbleMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const bubbles = new THREE.Points(bubbleGeo, bubbleMat);
    world.add(bubbles);

    // ---------------- schooling reef fish ----------------
    const { bodyGeo: fishBodyGeo, tailGeo: fishTailGeo, dorsalGeo: fishDorsalGeo } =
      createFishParts();
    const eyeGeo = new THREE.CircleGeometry(0.04, 10);
    const eyeMat = new THREE.MeshBasicMaterial({
      color: "#eafcff",
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    const fishPalette = [gold, new THREE.Color("#d97742"), teal, new THREE.Color("#c9c9c9")];

    interface Fish {
      root: THREE.Group;
      tailPivot: THREE.Group;
      speed: number;
      baseY: number;
      amplitude: number;
      phase: number;
      tailFreq: number;
      dir: number;
      fades: FadedMaterial[];
    }
    const fishGroup = new THREE.Group();
    const fishList: Fish[] = [];
    const fishCount = 40;
    for (let i = 0; i < fishCount; i++) {
      const color = fishPalette[i % fishPalette.length];
      const opacity = 0.85;

      const bodyMat = new THREE.MeshBasicMaterial({
        vertexColors: true,
        color,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const finMat = new THREE.MeshBasicMaterial({
        color: color.clone().multiplyScalar(0.75),
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const root = new THREE.Group();

      const glowMat = new THREE.SpriteMaterial({
        map: glowTexture,
        color,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      });
      const glowSprite = new THREE.Sprite(glowMat);
      glowSprite.scale.set(1.6, 1, 1);
      glowSprite.position.set(0, 0, -0.02);
      root.add(glowSprite);

      const bodyMesh = new THREE.Mesh(fishBodyGeo, bodyMat);
      root.add(bodyMesh);

      const dorsalMesh = new THREE.Mesh(fishDorsalGeo, finMat);
      dorsalMesh.position.set(0.02, 0.24, 0);
      root.add(dorsalMesh);

      const eyeMesh = new THREE.Mesh(eyeGeo, eyeMat);
      eyeMesh.position.set(0.48, 0.05, 0.001);
      root.add(eyeMesh);

      const tailPivot = new THREE.Group();
      tailPivot.position.set(FISH_BODY_BACK_X, 0, 0);
      const tailMesh = new THREE.Mesh(fishTailGeo, finMat);
      tailPivot.add(tailMesh);
      root.add(tailPivot);

      const depth = -4 - Math.random() * 10;
      const scale = 0.5 + (1 - Math.abs(depth) / 14) * 1.1;
      root.scale.setScalar(scale);
      const dir = Math.random() > 0.5 ? 1 : -1;
      const startX = (Math.random() * 2 - 1) * SWIM_SPAWN_RANGE;
      const baseY = (Math.random() * 2 - 1) * 7;
      root.position.set(startX, baseY, depth);
      root.scale.x *= dir;
      fishGroup.add(root);
      fishList.push({
        root,
        tailPivot,
        speed: (0.015 + Math.random() * 0.02) * dir,
        baseY,
        amplitude: 0.4 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
        tailFreq: 7 + Math.random() * 2,
        dir,
        fades: [
          { material: bodyMat, base: opacity },
          { material: finMat, base: opacity },
          { material: glowMat, base: 0.4 },
        ],
      });
    }
    world.add(fishGroup);

    // ---------------- sea turtles, gliding with paddling flippers ----------------
    const { shellGeo: turtleShellGeo, flipperGeo: turtleFlipperGeo } =
      createTurtleParts();
    const turtleHeadGeo = new THREE.CircleGeometry(0.13, 10);
    interface Turtle {
      root: THREE.Group;
      frontFlipper: THREE.Group;
      backFlipper: THREE.Group;
      baseY: number;
      speed: number;
      dir: number;
      phase: number;
      fades: FadedMaterial[];
    }
    const turtleGroup = new THREE.Group();
    const turtleList: Turtle[] = [];
    const turtleCount = 6;
    for (let i = 0; i < turtleCount; i++) {
      const shellMat = new THREE.MeshBasicMaterial({
        color: "#4a6b3a",
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const skinMat = new THREE.MeshBasicMaterial({
        color: "#6f9a58",
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const root = new THREE.Group();
      const shell = new THREE.Mesh(turtleShellGeo, shellMat);
      root.add(shell);

      const head = new THREE.Mesh(turtleHeadGeo, skinMat);
      head.position.set(0.62, 0.02, 0.001);
      root.add(head);

      const frontFlipper = new THREE.Group();
      frontFlipper.position.set(0.18, -0.16, 0);
      frontFlipper.add(new THREE.Mesh(turtleFlipperGeo, skinMat));
      root.add(frontFlipper);

      const backFlipper = new THREE.Group();
      backFlipper.position.set(-0.38, -0.14, 0);
      backFlipper.add(new THREE.Mesh(turtleFlipperGeo, skinMat));
      root.add(backFlipper);

      const depth = -6 - Math.random() * 7;
      const scale = 0.9 + Math.random() * 0.55;
      root.scale.setScalar(scale);
      const dir = Math.random() > 0.5 ? 1 : -1;
      const baseY = 0.5 + Math.random() * 4;
      root.position.set((Math.random() * 2 - 1) * SWIM_SPAWN_RANGE, baseY, depth);
      root.scale.x *= dir;
      turtleGroup.add(root);
      turtleList.push({
        root,
        frontFlipper,
        backFlipper,
        baseY,
        speed: (0.009 + Math.random() * 0.007) * dir,
        dir,
        phase: Math.random() * Math.PI * 2,
        fades: [
          { material: shellMat, base: 0.9 },
          { material: skinMat, base: 0.9 },
        ],
      });
    }
    world.add(turtleGroup);

    // ---------------- jellyfish, mid-depth drifters ----------------
    const jellyBellGeo = new THREE.SphereGeometry(
      0.5,
      14,
      10,
      0,
      Math.PI * 2,
      0,
      Math.PI / 1.7
    );
    const jellyTentacleMat = new THREE.LineBasicMaterial({
      color: "#eaf6f6",
      transparent: true,
      opacity: 0.45,
    });
    const jellyPalette = [
      new THREE.Color("#f3d9e6"),
      new THREE.Color("#cdeaf0"),
      new THREE.Color("#e6b94d"),
    ];
    interface Jelly {
      group: THREE.Group;
      bell: THREE.Mesh;
      tentacles: { line: THREE.Line; base: Float32Array; segs: number }[];
      phase: number;
      baseX: number;
      baseY: number;
      fades: FadedMaterial[];
    }
    const jellyGroup = new THREE.Group();
    const jellyList: Jelly[] = [];
    const jellyCount = 11;
    for (let i = 0; i < jellyCount; i++) {
      const color = jellyPalette[i % jellyPalette.length];
      const bellMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const group = new THREE.Group();
      const bell = new THREE.Mesh(jellyBellGeo, bellMat);
      bell.rotation.x = Math.PI;
      group.add(bell);

      const tentacles: Jelly["tentacles"] = [];
      const tentacleCount = 6;
      const segs = 6;
      for (let t = 0; t < tentacleCount; t++) {
        const angle = (t / tentacleCount) * Math.PI * 2;
        const rx = Math.cos(angle) * 0.32;
        const rz = Math.sin(angle) * 0.32;
        const positions = new Float32Array(segs * 3);
        for (let s = 0; s < segs; s++) {
          positions.set([rx, -0.05 - s * 0.13, rz], s * 3);
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const line = new THREE.Line(geo, jellyTentacleMat);
        group.add(line);
        tentacles.push({ line, base: positions.slice(), segs });
      }

      const depth = -3 - Math.random() * 9;
      const scale = 0.55 + Math.random() * 0.7;
      group.scale.setScalar(scale);
      const baseX = (Math.random() * 2 - 1) * 13;
      const baseY = -1 - Math.random() * 6;
      group.position.set(baseX, baseY, depth);
      jellyGroup.add(group);
      jellyList.push({
        group,
        bell,
        tentacles,
        phase: Math.random() * Math.PI * 2,
        baseX,
        baseY,
        fades: [{ material: bellMat, base: 0.35 }],
      });
    }
    world.add(jellyGroup);

    // ---------------- rays gliding in the deep ----------------
    const rayFishGeo = new THREE.ShapeGeometry(createRayFishShape(), 10);
    interface RayFish {
      root: THREE.Group;
      baseY: number;
      speed: number;
      dir: number;
      phase: number;
      fades: FadedMaterial[];
    }
    const rayFishGroup = new THREE.Group();
    const rayFishList: RayFish[] = [];
    const rayFishCount = 5;
    for (let i = 0; i < rayFishCount; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: "#3d5a68",
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const root = new THREE.Group();
      const mesh = new THREE.Mesh(rayFishGeo, mat);
      root.add(mesh);

      const depth = -8 - Math.random() * 8;
      const scale = 0.8 + Math.random() * 0.7;
      root.scale.setScalar(scale);
      const dir = Math.random() > 0.5 ? 1 : -1;
      const baseY = -3 - Math.random() * 5;
      root.position.set((Math.random() * 2 - 1) * SWIM_SPAWN_RANGE, baseY, depth);
      root.scale.x *= dir;
      rayFishGroup.add(root);
      rayFishList.push({
        root,
        baseY,
        speed: (0.006 + Math.random() * 0.008) * dir,
        dir,
        phase: Math.random() * Math.PI * 2,
        fades: [{ material: mat, base: 0.55 }],
      });
    }
    world.add(rayFishGroup);

    // ---------------- seahorses, hovering and bobbing upright ----------------
    const { bodyGeo: seahorseBodyGeo, frillGeo: seahorseFrillGeo } =
      createSeahorseParts();
    const seahorsePalette = [
      new THREE.Color("#e8a87c"),
      teal,
      new THREE.Color("#d9a5e0"),
    ];
    interface Seahorse {
      root: THREE.Group;
      frill: THREE.Mesh;
      baseY: number;
      driftSpeed: number;
      phase: number;
      fades: FadedMaterial[];
    }
    const seahorseGroup = new THREE.Group();
    const seahorseList: Seahorse[] = [];
    const seahorseCount = 6;
    for (let i = 0; i < seahorseCount; i++) {
      const color = seahorsePalette[i % seahorsePalette.length];
      const bodyMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const frillMat = new THREE.MeshBasicMaterial({
        color: color.clone().multiplyScalar(0.7),
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const root = new THREE.Group();
      const body = new THREE.Mesh(seahorseBodyGeo, bodyMat);
      root.add(body);
      const frill = new THREE.Mesh(seahorseFrillGeo, frillMat);
      frill.position.set(0.06, 0.22, 0.002);
      root.add(frill);

      const depth = -4 - Math.random() * 9;
      const scale = 0.6 + (1 - Math.abs(depth) / 13) * 0.7;
      root.scale.setScalar(scale);
      const baseX = (Math.random() * 2 - 1) * SWIM_SPAWN_RANGE;
      const baseY = (Math.random() * 2 - 1) * 6;
      root.position.set(baseX, baseY, depth);
      const driftSpeed = (Math.random() - 0.5) * 0.004;
      root.scale.x *= driftSpeed >= 0 ? 1 : -1;
      seahorseGroup.add(root);
      seahorseList.push({
        root,
        frill,
        baseY,
        driftSpeed,
        phase: Math.random() * Math.PI * 2,
        fades: [
          { material: bodyMat, base: 0.9 },
          { material: frillMat, base: 0.9 },
        ],
      });
    }
    world.add(seahorseGroup);

    // ---------------- octopuses, jetting along with trailing tentacles ----------------
    const { headGeo: octoHeadGeo } = createOctopusParts();
    const octoEyeGeo = new THREE.CircleGeometry(0.05, 8);
    const octoEyeMat = new THREE.MeshBasicMaterial({
      color: "#f2e8ff",
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const octoTentacleMat = new THREE.LineBasicMaterial({
      color: "#caa0c9",
      transparent: true,
      opacity: 0.6,
    });
    const octoPalette = [
      new THREE.Color("#7a3b52"),
      new THREE.Color("#5b3a6b"),
    ];
    interface Octopus {
      root: THREE.Group;
      mantle: THREE.Mesh;
      tentacles: { line: THREE.Line; base: Float32Array; segs: number }[];
      baseY: number;
      speed: number;
      dir: number;
      phase: number;
      fades: FadedMaterial[];
    }
    const octoGroup = new THREE.Group();
    const octoList: Octopus[] = [];
    const octoCount = 4;
    for (let i = 0; i < octoCount; i++) {
      const color = octoPalette[i % octoPalette.length];
      const headMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const root = new THREE.Group();
      const mantle = new THREE.Mesh(octoHeadGeo, headMat);
      root.add(mantle);

      [0.14, -0.14].forEach((yOff) => {
        const eye = new THREE.Mesh(octoEyeGeo, octoEyeMat);
        eye.position.set(0.2, yOff, 0.01);
        root.add(eye);
      });

      const tentacles: Octopus["tentacles"] = [];
      const tentacleCount = 6;
      const segs = 5;
      for (let t = 0; t < tentacleCount; t++) {
        const spread = (t - (tentacleCount - 1) / 2) * 0.13;
        const positions = new Float32Array(segs * 3);
        for (let s = 0; s < segs; s++) {
          positions.set(
            [-0.1 - s * 0.14, spread * (1 + s * 0.35), 0],
            s * 3
          );
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const line = new THREE.Line(geo, octoTentacleMat);
        root.add(line);
        tentacles.push({ line, base: positions.slice(), segs });
      }

      const depth = -5 - Math.random() * 8;
      const scale = 0.8 + Math.random() * 0.6;
      root.scale.setScalar(scale);
      const dir = Math.random() > 0.5 ? 1 : -1;
      const baseY = -1 - Math.random() * 5;
      root.position.set((Math.random() * 2 - 1) * SWIM_SPAWN_RANGE, baseY, depth);
      root.scale.x *= dir;
      octoGroup.add(root);
      octoList.push({
        root,
        mantle,
        tentacles,
        baseY,
        speed: (0.008 + Math.random() * 0.007) * dir,
        dir,
        phase: Math.random() * Math.PI * 2,
        fades: [{ material: headMat, base: 0.85 }],
      });
    }
    world.add(octoGroup);

    // ---------------- the leviathan: one glowing dragon-like sea monster ----------------
    // a real extruded solid (not a flat cutout) so its own light can model it
    const leviathanGeo = new THREE.ExtrudeGeometry(createLeviathanShape(), {
      depth: LEVIATHAN_DEPTH,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelSegments: 2,
      curveSegments: 48,
    });
    const leviathanBasePositions = (
      leviathanGeo.getAttribute("position") as THREE.BufferAttribute
    ).array.slice() as Float32Array;
    const leviathanMat = new THREE.MeshStandardMaterial({
      color: "#2a1420",
      emissive: "#3a0f08",
      emissiveIntensity: 0.6,
      roughness: 0.55,
      metalness: 0.15,
      transparent: true,
      opacity: 0.97,
      side: THREE.DoubleSide,
      depthWrite: false,
      fog: false,
    });
    const leviathanRoot = new THREE.Group();
    const leviathanBody = new THREE.Mesh(leviathanGeo, leviathanMat);
    leviathanRoot.add(leviathanBody);

    // the creature is lit mainly by its own bioluminescent glow, plus a dim
    // ambient fill so the unlit side never drops to pure black
    const leviathanFill = new THREE.HemisphereLight("#1c4a56", "#020204", 0.5);
    leviathanRoot.add(leviathanFill);
    const leviathanEmberLight = new THREE.PointLight("#ff5a2e", 3.5, 14, 2);
    leviathanEmberLight.position.set(0.5, 0.3, 2);
    leviathanRoot.add(leviathanEmberLight);

    const leviathanGlowMat = new THREE.SpriteMaterial({
      map: glowTexture,
      color: new THREE.Color("#ff4d2e"),
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    const leviathanGlow = new THREE.Sprite(leviathanGlowMat);
    leviathanGlow.scale.set(11, 6.5, 1);
    leviathanGlow.position.set(1, 0, LEVIATHAN_DECOR_Z);
    leviathanRoot.add(leviathanGlow);

    // fierce glowing eyes
    const eyeGlowMat = new THREE.MeshBasicMaterial({
      color: "#ff2200",
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    const eyeGlowGeo = new THREE.CircleGeometry(0.12, 10);
    const leviathanEyes = [0.24, -0.24].map((yOff) => {
      const eye = new THREE.Mesh(eyeGlowGeo, eyeGlowMat);
      eye.position.set(LEVIATHAN_HEAD_X - 0.4, yOff, LEVIATHAN_DECOR_Z);
      leviathanRoot.add(eye);
      return { mesh: eye, baseX: LEVIATHAN_HEAD_X - 0.4, baseY: yOff };
    });

    // a pair of big curved horns swept back from the crown of the skull
    const hornShape = new THREE.Shape();
    hornShape.moveTo(0, 0);
    hornShape.quadraticCurveTo(0.24, 0.4, 0.08, 0.85);
    hornShape.quadraticCurveTo(-0.08, 0.44, -0.12, 0);
    hornShape.closePath();
    const hornGeo = new THREE.ShapeGeometry(hornShape, 6);
    const hornMat = new THREE.MeshBasicMaterial({
      color: "#12080d",
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.97,
      depthWrite: false,
      fog: false,
    });
    const hornDefs = [
      { x: LEVIATHAN_HEAD_X - 0.65, y: 0.35, rot: -0.4, scale: 1.3 },
      { x: LEVIATHAN_HEAD_X - 1.2, y: 0.42, rot: -0.6, scale: 1.0 },
    ];
    const leviathanHorns = hornDefs.map((def) => {
      const horn = new THREE.Mesh(hornGeo, hornMat);
      horn.rotation.z = def.rot;
      horn.scale.setScalar(def.scale);
      horn.position.set(def.x, def.y, LEVIATHAN_DECOR_Z);
      leviathanRoot.add(horn);
      return { mesh: horn, baseX: def.x, baseY: def.y };
    });

    // small jagged teeth along the lower jaw
    const toothShape = new THREE.Shape();
    toothShape.moveTo(-0.05, 0);
    toothShape.lineTo(0, -0.16);
    toothShape.lineTo(0.05, 0);
    toothShape.closePath();
    const toothGeo = new THREE.ShapeGeometry(toothShape);
    const toothMat = new THREE.MeshBasicMaterial({
      color: "#f2ece0",
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      fog: false,
    });
    const toothXs = [4.35, 4.2, 4.05, 3.9];
    const leviathanTeeth = toothXs.map((x) => {
      const tooth = new THREE.Mesh(toothGeo, toothMat);
      tooth.position.set(x, -0.1, LEVIATHAN_DECOR_Z);
      leviathanRoot.add(tooth);
      return { mesh: tooth, baseX: x, baseY: -0.1 };
    });

    // a pale ribcage showing through the long serpentine spine
    const ribMat = new THREE.LineBasicMaterial({
      color: "#e3d9bd",
      transparent: true,
      opacity: 0.7,
      fog: false,
    });
    const ribXs = [3.4, 2.5, 1.6, 0.7, -0.3, -1.3, -2.4, -3.5, -4.3];
    const leviathanRibs = ribXs.map((x) => {
      const hw = leviathanHalfWidth(x) * 0.88;
      const positions = new Float32Array([
        -0.22, -hw, 0, 0, 0, 0, -0.22, hw, 0,
      ]);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const line = new THREE.Line(geo, ribMat);
      line.position.set(x, 0, LEVIATHAN_DECOR_Z);
      leviathanRoot.add(line);
      return { mesh: line, geo, baseX: x, baseY: 0 };
    });

    // jagged dorsal spikes with a glowing ember at each tip
    const spikeShape = new THREE.Shape();
    spikeShape.moveTo(-0.16, 0);
    spikeShape.lineTo(0, 0.55);
    spikeShape.lineTo(0.16, 0);
    spikeShape.closePath();
    const spikeGeo = new THREE.ShapeGeometry(spikeShape);
    const spikeMat = new THREE.MeshBasicMaterial({
      color: "#12080d",
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.97,
      depthWrite: false,
      fog: false,
    });
    const spineDotGeo = new THREE.CircleGeometry(0.08, 8);
    const spineDotMat = new THREE.MeshBasicMaterial({
      color: "#ff7a1f",
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    const spineXs = [3.2, 2.0, 0.8, -0.4, -1.6, -2.8, -3.9];
    const leviathanSpikes = spineXs.map((x) => {
      const topY = leviathanHalfWidth(x);
      const spike = new THREE.Mesh(spikeGeo, spikeMat);
      const spikeScale = 0.7 + topY * 0.7;
      spike.scale.set(spikeScale * 0.75, spikeScale, 1);
      spike.position.set(x, topY, LEVIATHAN_DECOR_Z);
      leviathanRoot.add(spike);
      return { mesh: spike, baseX: x, baseY: topY };
    });
    const leviathanSpineDots = spineXs.map((x) => {
      const topY = leviathanHalfWidth(x);
      const spikeScale = 0.7 + topY * 0.7;
      const dot = new THREE.Mesh(spineDotGeo, spineDotMat);
      const y = topY + 0.55 * spikeScale;
      dot.position.set(x, y, LEVIATHAN_DECOR_Z + 0.02);
      leviathanRoot.add(dot);
      return { mesh: dot, baseX: x, baseY: y };
    });

    leviathanRoot.position.set(0, -1.5, -17);
    leviathanRoot.scale.setScalar(2.6);
    world.add(leviathanRoot);

    // ---------------- bioluminescent motes, abyssal band ----------------
    const moteCount = 70;
    const motePositions = new Float32Array(moteCount * 3);
    const moteColors = new Float32Array(moteCount * 3);
    const moteBounds = { x: 16, y: 10, z: 10 };
    const moteColorPalette = [teal, new THREE.Color("#8b6bff"), gold];
    for (let i = 0; i < moteCount; i++) {
      const x = (Math.random() * 2 - 1) * moteBounds.x;
      const y = -moteBounds.y - Math.random() * 4;
      const z = (Math.random() * 2 - 1) * moteBounds.z;
      motePositions.set([x, y, z], i * 3);
      const c = moteColorPalette[i % moteColorPalette.length];
      moteColors.set([c.r, c.g, c.b], i * 3);
    }
    const moteGeo = new THREE.BufferGeometry();
    moteGeo.setAttribute("position", new THREE.BufferAttribute(motePositions, 3));
    moteGeo.setAttribute("color", new THREE.BufferAttribute(moteColors, 3));
    const moteMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const motes = new THREE.Points(moteGeo, moteMat);
    world.add(motes);

    // ---------------- interaction state ----------------
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const scroll = { progress: 0, contactProgress: 0 };
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.progress = max > 0 ? window.scrollY / max : 0;

      // the leviathan belongs to the testimonials + contact stretch of the
      // page: start bringing it in as testimonials arrives so it's already
      // present by the time "Ready to Collaborate?" comes into view
      const zoneEl =
        document.getElementById("testimonials") ??
        document.getElementById("contact");
      if (zoneEl) {
        const rect = zoneEl.getBoundingClientRect();
        const raw = 1 - rect.top / window.innerHeight;
        scroll.contactProgress = THREE.MathUtils.clamp(raw, 0, 1);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);
    resize();

    let animationFrameId: number;
    let elapsed = 0;
    const targetRotation = { x: 0, y: 0 };
    const currentBg = bgColor.clone();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        elapsed += 0.012;
        const progress = scroll.progress;

        // bubbles rise and wrap
        const posAttr = bubbleGeo.getAttribute(
          "position"
        ) as THREE.BufferAttribute;
        for (let i = 0; i < bubbleCount; i++) {
          const iy = i * 3 + 1;
          let y = posAttr.array[iy] as number;
          y += bubbleSpeeds[i];
          if (y > bounds.y) y = -bounds.y;
          (posAttr.array as Float32Array)[iy] = y;
          const ix = i * 3;
          (posAttr.array as Float32Array)[ix] +=
            Math.sin(elapsed * 2 + i) * 0.003;
        }
        posAttr.needsUpdate = true;

        // reef fish swim across and wrap around; the tail fin flicks
        // independently of the body for a proper swimming motion
        // fish are always visible, right from the top of the page, so
        // they're already swimming behind the hero section too
        const fishFactor = 1;
        fishList.forEach((fish) => {
          const p = fish.root.position;
          p.x += fish.speed;
          if (fish.dir > 0 && p.x > SWIM_WRAP_BOUND) p.x = -SWIM_WRAP_BOUND;
          if (fish.dir < 0 && p.x < -SWIM_WRAP_BOUND) p.x = SWIM_WRAP_BOUND;
          p.y = fish.baseY + Math.sin(elapsed * 1.4 + fish.phase) * fish.amplitude * 0.3;
          fish.root.rotation.z = Math.sin(elapsed * fish.tailFreq * 0.5 + fish.phase) * 0.04;
          fish.tailPivot.rotation.z =
            Math.sin(elapsed * fish.tailFreq + fish.phase) * 0.5;
          fish.fades.forEach((f) => (f.material.opacity = f.base * fishFactor));
        });
        eyeMat.opacity = 0.9 * fishFactor;

        // sea turtles glide across, paddling with front and back flippers
        const turtleFactor = smoothstep(0.12, 0.24, progress);
        turtleList.forEach((turtle) => {
          const p = turtle.root.position;
          p.x += turtle.speed;
          if (turtle.dir > 0 && p.x > SWIM_WRAP_BOUND) p.x = -SWIM_WRAP_BOUND;
          if (turtle.dir < 0 && p.x < -SWIM_WRAP_BOUND) p.x = SWIM_WRAP_BOUND;
          p.y = turtle.baseY + Math.sin(elapsed * 0.5 + turtle.phase) * 0.4;
          turtle.frontFlipper.rotation.z =
            Math.sin(elapsed * 2 + turtle.phase) * 0.45;
          turtle.backFlipper.rotation.z =
            Math.sin(elapsed * 2 + turtle.phase + Math.PI) * 0.35;
          turtle.fades.forEach((f) => (f.material.opacity = f.base * turtleFactor));
        });

        // jellyfish pulse their bell and trail wavy tentacles
        const jellyFactor = smoothstep(0.24, 0.36, progress);
        jellyList.forEach((jelly) => {
          jelly.bell.scale.set(
            1,
            0.85 + Math.sin(elapsed * 1.5 + jelly.phase) * 0.15,
            1
          );
          jelly.group.position.y =
            jelly.baseY + Math.sin(elapsed * 0.4 + jelly.phase) * 0.6;
          jelly.group.position.x =
            jelly.baseX + Math.sin(elapsed * 0.12 + jelly.phase) * 1.4;
          jelly.tentacles.forEach((tent, ti) => {
            const posAttrT = tent.line.geometry.getAttribute(
              "position"
            ) as THREE.BufferAttribute;
            for (let s = 0; s < tent.segs; s++) {
              const baseX = tent.base[s * 3];
              const wave =
                Math.sin(elapsed * 2 + s * 0.6 + ti + jelly.phase) *
                0.06 *
                (s / tent.segs);
              (posAttrT.array as Float32Array)[s * 3] = baseX + wave;
            }
            posAttrT.needsUpdate = true;
          });
          jelly.fades.forEach((f) => (f.material.opacity = f.base * jellyFactor));
          jellyTentacleMat.opacity = 0.45 * jellyFactor;
        });

        // rays glide slowly through the deep, banking gently
        const rayFactor = smoothstep(0.44, 0.58, progress);
        rayFishList.forEach((ray) => {
          const p = ray.root.position;
          p.x += ray.speed;
          if (ray.dir > 0 && p.x > SWIM_WRAP_BOUND) p.x = -SWIM_WRAP_BOUND;
          if (ray.dir < 0 && p.x < -SWIM_WRAP_BOUND) p.x = SWIM_WRAP_BOUND;
          p.y = ray.baseY + Math.sin(elapsed * 0.3 + ray.phase) * 1.2;
          ray.root.rotation.z = Math.sin(elapsed * 0.5 + ray.phase) * 0.15;
          ray.fades.forEach((f) => (f.material.opacity = f.base * rayFactor));
        });

        // seahorses hover in place, bobbing and drifting very slowly
        const seahorseFactor = smoothstep(0.16, 0.28, progress);
        seahorseList.forEach((sh) => {
          sh.root.position.x += sh.driftSpeed;
          if (sh.root.position.x > SWIM_WRAP_BOUND) {
            sh.root.position.x = -SWIM_WRAP_BOUND;
          }
          if (sh.root.position.x < -SWIM_WRAP_BOUND) {
            sh.root.position.x = SWIM_WRAP_BOUND;
          }
          sh.root.position.y = sh.baseY + Math.sin(elapsed * 0.6 + sh.phase) * 0.5;
          sh.frill.rotation.z = Math.sin(elapsed * 6 + sh.phase) * 0.3;
          sh.fades.forEach((f) => (f.material.opacity = f.base * seahorseFactor));
        });

        // octopuses jet across with a pulsing mantle and trailing tentacles
        const octoFactor = smoothstep(0.34, 0.46, progress);
        octoList.forEach((octo) => {
          const p = octo.root.position;
          p.x += octo.speed;
          if (octo.dir > 0 && p.x > SWIM_WRAP_BOUND) p.x = -SWIM_WRAP_BOUND;
          if (octo.dir < 0 && p.x < -SWIM_WRAP_BOUND) p.x = SWIM_WRAP_BOUND;
          p.y = octo.baseY + Math.sin(elapsed * 0.5 + octo.phase) * 0.6;
          const pulse = Math.sin(elapsed * 3 + octo.phase);
          octo.mantle.scale.set(1 + pulse * 0.08, 1 - pulse * 0.06, 1);
          octo.tentacles.forEach((tent, ti) => {
            const posAttrT = tent.line.geometry.getAttribute(
              "position"
            ) as THREE.BufferAttribute;
            for (let s = 0; s < tent.segs; s++) {
              const baseY = tent.base[s * 3 + 1];
              const wave =
                Math.sin(elapsed * 3 + s * 0.7 + ti + octo.phase) *
                0.06 *
                (s / tent.segs);
              (posAttrT.array as Float32Array)[s * 3 + 1] = baseY + wave;
            }
            posAttrT.needsUpdate = true;
          });
          octo.fades.forEach((f) => (f.material.opacity = f.base * octoFactor));
        });
        octoEyeMat.opacity = 0.9 * octoFactor;
        octoTentacleMat.opacity = 0.6 * octoFactor;

        // the leviathan surfaces specifically as the contact section arrives,
        // rather than at a fixed page-scroll percentage, so it reliably shows
        // up behind "Ready to Collaborate?" regardless of overall page height
        const leviathanFactor = smoothstep(0.15, 0.65, scroll.contactProgress);
        leviathanRoot.visible = leviathanFactor > 0.01;
        if (leviathanRoot.visible) {
          const bodyPosAttr = leviathanGeo.getAttribute(
            "position"
          ) as THREE.BufferAttribute;
          const bodyArr = bodyPosAttr.array as Float32Array;
          for (let i = 0; i < bodyArr.length; i += 3) {
            const x = leviathanBasePositions[i];
            bodyArr[i + 1] = leviathanBasePositions[i + 1] + leviathanWave(x, elapsed);
          }
          bodyPosAttr.needsUpdate = true;
          leviathanGeo.computeVertexNormals();

          leviathanEyes.forEach(({ mesh, baseX, baseY }) => {
            mesh.position.y = baseY + leviathanWave(baseX, elapsed);
          });
          leviathanHorns.forEach(({ mesh, baseX, baseY }) => {
            mesh.position.y = baseY + leviathanWave(baseX, elapsed);
          });
          leviathanTeeth.forEach(({ mesh, baseX, baseY }) => {
            mesh.position.y = baseY + leviathanWave(baseX, elapsed);
          });
          leviathanRibs.forEach(({ mesh, baseX, baseY }) => {
            mesh.position.y = baseY + leviathanWave(baseX, elapsed);
          });
          leviathanSpikes.forEach(({ mesh, baseX, baseY }) => {
            mesh.position.y = baseY + leviathanWave(baseX, elapsed);
          });
          leviathanSpineDots.forEach(({ mesh, baseX, baseY }) => {
            mesh.position.y = baseY + leviathanWave(baseX, elapsed);
          });

          leviathanRoot.position.x = Math.sin(elapsed * 0.1) * 5.5;
          leviathanRoot.position.y = -1.5 + Math.sin(elapsed * 0.2) * 0.6;

          const pulse = 0.75 + Math.sin(elapsed * 2.5) * 0.25;
          leviathanGlowMat.opacity = 0.7 * pulse * leviathanFactor;
          eyeGlowMat.opacity = 0.95 * leviathanFactor;
          spineDotMat.opacity = 0.85 * pulse * leviathanFactor;
          leviathanMat.opacity = 0.97 * leviathanFactor;
          leviathanMat.emissiveIntensity = 0.6 * pulse;
          leviathanEmberLight.intensity = 3.5 * pulse * leviathanFactor;
          hornMat.opacity = 0.96 * leviathanFactor;
          toothMat.opacity = 0.9 * leviathanFactor;
          ribMat.opacity = 0.7 * leviathanFactor;
          spikeMat.opacity = 0.96 * leviathanFactor;
        }

        // bioluminescent motes glow awake in the abyss
        const moteFactor = smoothstep(0.68, 0.84, progress);
        moteMat.opacity = 0.8 * moteFactor;
        if (moteFactor > 0.01) {
          const moteAttr = moteGeo.getAttribute(
            "position"
          ) as THREE.BufferAttribute;
          for (let i = 0; i < moteCount; i++) {
            const ix = i * 3;
            (moteAttr.array as Float32Array)[ix] +=
              Math.sin(elapsed * 0.5 + i) * 0.002;
          }
          moteAttr.needsUpdate = true;
        }

        // light shafts drift slowly and dim as we leave the sunlit layer
        const rayShaftFactor = 1 - smoothstep(0.3, 0.6, progress);
        rays.forEach(({ mesh, baseX, mat, baseOpacity }, i) => {
          mesh.position.x = baseX + Math.sin(elapsed * 0.15 + i) * 1.2;
          mat.opacity = baseOpacity * rayShaftFactor;
        });

        targetRotation.y = mouse.x * 0.12 + progress * 0.4;
        targetRotation.x = mouse.y * -0.06;
        world.rotation.y += (targetRotation.y - world.rotation.y) * 0.02;
        world.rotation.x += (targetRotation.x - world.rotation.x) * 0.02;

        const targetWorldY = -progress * 6;
        world.position.y += (targetWorldY - world.position.y) * 0.03;

        const fog = scene.fog as THREE.FogExp2;
        const targetDensity = 0.014 + progress * 0.09;
        fog.density += (targetDensity - fog.density) * 0.05;

        const targetBg = new THREE.Color();
        getDepthColor(progress, targetBg);
        currentBg.lerp(targetBg, 0.04);
        (scene.background as THREE.Color).copy(currentBg);
        fog.color.copy(currentBg);
      }

      renderer.render(scene, camera);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);

      rayTexture.dispose();
      rays.forEach(({ mesh, mat }) => {
        mesh.geometry.dispose();
        mat.dispose();
      });
      bubbleGeo.dispose();
      bubbleMat.dispose();
      fishBodyGeo.dispose();
      fishTailGeo.dispose();
      fishDorsalGeo.dispose();
      eyeGeo.dispose();
      eyeMat.dispose();
      fishList.forEach((fish) => {
        fish.fades.forEach((f) => f.material.dispose());
      });
      turtleShellGeo.dispose();
      turtleFlipperGeo.dispose();
      turtleHeadGeo.dispose();
      turtleList.forEach((turtle) => {
        turtle.fades.forEach((f) => f.material.dispose());
      });
      jellyBellGeo.dispose();
      jellyTentacleMat.dispose();
      jellyList.forEach((jelly) => {
        jelly.fades.forEach((f) => f.material.dispose());
        jelly.tentacles.forEach((t) => t.line.geometry.dispose());
      });
      rayFishGeo.dispose();
      rayFishList.forEach((ray) => {
        ray.fades.forEach((f) => f.material.dispose());
      });
      seahorseBodyGeo.dispose();
      seahorseFrillGeo.dispose();
      seahorseList.forEach((sh) => {
        sh.fades.forEach((f) => f.material.dispose());
      });
      octoHeadGeo.dispose();
      octoEyeGeo.dispose();
      octoEyeMat.dispose();
      octoTentacleMat.dispose();
      octoList.forEach((octo) => {
        octo.fades.forEach((f) => f.material.dispose());
        octo.tentacles.forEach((t) => t.line.geometry.dispose());
      });
      leviathanGeo.dispose();
      leviathanMat.dispose();
      glowTexture.dispose();
      leviathanGlowMat.dispose();
      eyeGlowGeo.dispose();
      eyeGlowMat.dispose();
      hornGeo.dispose();
      hornMat.dispose();
      toothGeo.dispose();
      toothMat.dispose();
      ribMat.dispose();
      leviathanRibs.forEach((rib) => rib.geo.dispose());
      spikeGeo.dispose();
      spikeMat.dispose();
      spineDotGeo.dispose();
      spineDotMat.dispose();
      moteGeo.dispose();
      moteMat.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
