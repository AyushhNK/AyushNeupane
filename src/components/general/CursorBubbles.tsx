"use client";

import { useEffect, useRef } from "react";
import "./CursorBubbles.css";

const MIN_INTERVAL_MS = 35;
const MIN_DISTANCE_PX = 5;
const BUBBLES_PER_BURST = 4;

export default function CursorBubbles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawn = useRef(0);
  const lastPos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    const spawnBubble = (x: number, y: number) => {
      const size = 6 + Math.random() * 13;
      const drift = (Math.random() - 0.5) * 70;
      const rise = -(70 + Math.random() * 90);
      const duration = 0.9 + Math.random() * 0.7;

      const bubble = document.createElement("div");
      bubble.className =
        "cursor-bubble" + (Math.random() < 0.3 ? " cursor-bubble-gold" : "");
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${x - size / 2}px`;
      bubble.style.top = `${y - size / 2}px`;
      bubble.style.setProperty("--drift", `${drift}px`);
      bubble.style.setProperty("--rise", `${rise}px`);
      bubble.style.animationDuration = `${duration}s`;

      container.appendChild(bubble);
      bubble.addEventListener(
        "animationend",
        () => {
          bubble.remove();
        },
        { once: true }
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.hypot(dx, dy);
      if (now - lastSpawn.current < MIN_INTERVAL_MS || dist < MIN_DISTANCE_PX) {
        return;
      }
      lastSpawn.current = now;
      lastPos.current = { x: e.clientX, y: e.clientY };

      const count = 1 + Math.floor(Math.random() * BUBBLES_PER_BURST);
      for (let i = 0; i < count; i++) {
        spawnBubble(
          e.clientX + (Math.random() - 0.5) * 22,
          e.clientY + (Math.random() - 0.5) * 22
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="cursor-bubbles-container"
      aria-hidden="true"
    />
  );
}
