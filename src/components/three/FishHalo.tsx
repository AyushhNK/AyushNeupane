"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface FishHaloProps {
  className?: string;
}

function createGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(255,255,255,0.9)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0.28)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createHaloFishParts() {
  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(0.34, 0);
  bodyShape.quadraticCurveTo(0.3, 0.13, 0.05, 0.14);
  bodyShape.quadraticCurveTo(-0.16, 0.13, -0.28, 0.04);
  bodyShape.quadraticCurveTo(-0.31, 0, -0.28, -0.04);
  bodyShape.quadraticCurveTo(-0.16, -0.13, 0.05, -0.14);
  bodyShape.quadraticCurveTo(0.3, -0.13, 0.34, 0);
  const bodyGeo = new THREE.ShapeGeometry(bodyShape, 10);

  const tailShape = new THREE.Shape();
  tailShape.moveTo(0.03, 0);
  tailShape.quadraticCurveTo(-0.08, 0.03, -0.22, 0.16);
  tailShape.lineTo(-0.09, 0);
  tailShape.lineTo(-0.22, -0.16);
  tailShape.quadraticCurveTo(-0.08, -0.03, 0.03, 0);
  const tailGeo = new THREE.ShapeGeometry(tailShape, 6);

  return { bodyGeo, tailGeo };
}

export default function FishHalo({ className }: FishHaloProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const glowTexture = createGlowTexture();
    const { bodyGeo, tailGeo } = createHaloFishParts();
    const palette = [
      new THREE.Color("#e6b94d"),
      new THREE.Color("#2dd4bf"),
      new THREE.Color("#eaf6f6"),
    ];

    interface HaloFish {
      root: THREE.Group;
      tailPivot: THREE.Group;
      angle: number;
      speed: number;
      radiusX: number;
      radiusZ: number;
      bobAmp: number;
      phase: number;
    }
    const fishCount = 8;
    const fishList: HaloFish[] = [];
    for (let i = 0; i < fishCount; i++) {
      const color = palette[i % palette.length];

      const bodyMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.92,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const tailMat = new THREE.MeshBasicMaterial({
        color: color.clone().multiplyScalar(0.75),
        transparent: true,
        opacity: 0.92,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const glowMat = new THREE.SpriteMaterial({
        map: glowTexture,
        color,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const root = new THREE.Group();
      const glow = new THREE.Sprite(glowMat);
      glow.scale.set(0.9, 0.55, 1);
      glow.position.z = -0.02;
      root.add(glow);

      const body = new THREE.Mesh(bodyGeo, bodyMat);
      root.add(body);

      const tailPivot = new THREE.Group();
      tailPivot.position.set(-0.28, 0, 0);
      const tail = new THREE.Mesh(tailGeo, tailMat);
      tailPivot.add(tail);
      root.add(tailPivot);

      const angle = (i / fishCount) * Math.PI * 2;
      const radiusX = 2.4 + Math.random() * 0.5;
      const radiusZ = 1.0 + Math.random() * 0.4;
      const scale = 1.05 + Math.random() * 0.55;
      root.scale.setScalar(scale);
      group.add(root);

      fishList.push({
        root,
        tailPivot,
        angle,
        speed: 0.006 + Math.random() * 0.004,
        radiusX,
        radiusZ,
        bobAmp: 0.4 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);
    resize();

    let animationFrameId: number;
    let elapsed = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        elapsed += 0.016;

        fishList.forEach((fish) => {
          fish.angle += fish.speed;
          const x = Math.cos(fish.angle) * fish.radiusX;
          const z = Math.sin(fish.angle) * fish.radiusZ;
          const y = Math.sin(fish.angle * 2 + fish.phase) * fish.bobAmp * 0.25;
          fish.root.position.set(x, y, z);

          // face the direction of travel continuously (no snap/flip): rotate
          // to the tangent of the orbit instead of toggling rotation.y by pi
          const tangentX = -Math.sin(fish.angle) * fish.radiusX;
          const tangentZ = Math.cos(fish.angle) * fish.radiusZ;
          fish.root.rotation.y = Math.atan2(-tangentZ, tangentX);

          fish.tailPivot.rotation.z = Math.sin(elapsed * 7 + fish.phase) * 0.5;
        });

        group.rotation.y += (mouse.x * 0.25 - group.rotation.y) * 0.03;
        group.rotation.x += (mouse.y * -0.12 - group.rotation.x) * 0.03;
      }

      renderer.render(scene, camera);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      glowTexture.dispose();
      bodyGeo.dispose();
      tailGeo.dispose();
      fishList.forEach((fish) => {
        fish.root.traverse((node) => {
          const mesh = node as THREE.Mesh | THREE.Sprite;
          const mat = (mesh as THREE.Mesh).material as
            | THREE.Material
            | THREE.Material[]
            | undefined;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else if (mat) mat.dispose();
        });
      });
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
      className={`pointer-events-none ${className ?? ""}`}
    />
  );
}
