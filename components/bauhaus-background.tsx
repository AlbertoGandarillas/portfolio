"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Fondo animado inspirado en el diseño Bauhaus: formas geométricas primarias
 * (círculos, triángulos, semicírculos, anillos y barras) que rotan, orbitan y
 * pulsan en un loop continuo. Three.js puro, sin dependencias extra.
 *
 * - Cámara ortográfica -> composición plana y gráfica (estilo cartel Bauhaus).
 * - Respeta `prefers-reduced-motion` (renderiza un solo cuadro estático).
 * - Se pausa cuando la pestaña está oculta y limpia todos los recursos al desmontar.
 */

const PALETTE = {
  red: "#e5484d",
  blue: "#3f7ff5",
  yellow: "#f5c518",
  ink: "#161616",
} as const;

type ShapeType =
  | "circle"
  | "triangle"
  | "square"
  | "ring"
  | "half"
  | "quarter"
  | "bar";

interface ShapeSpec {
  type: ShapeType;
  size: number;
  color: string;
  x: number;
  y: number;
  opacity: number;
  spin?: number; // rotación continua (rad/s)
  orbitR?: number; // radio de órbita
  orbitSpeed?: number;
  orbitPhase?: number;
  pulseAmp?: number; // amplitud del "respiro" de escala
  pulseSpeed?: number;
  pulsePhase?: number;
  tilt?: number; // rotación inicial
}

const SHAPES: ShapeSpec[] = [
  // Anillo grande central (marco de la composición)
  { type: "ring", size: 2.4, color: PALETTE.ink, x: -0.4, y: 0.2, opacity: 0.85, spin: 0.05, pulseAmp: 0.04, pulseSpeed: 0.5 },
  // Círculo azul (izquierda arriba)
  { type: "circle", size: 1.5, color: PALETTE.blue, x: -3.4, y: 1.6, opacity: 0.9, orbitR: 0.25, orbitSpeed: 0.4, pulseAmp: 0.08, pulseSpeed: 0.7 },
  // Triángulo amarillo (derecha arriba)
  { type: "triangle", size: 1.4, color: PALETTE.yellow, x: 3.3, y: 1.9, opacity: 0.92, spin: 0.25, orbitR: 0.2, orbitSpeed: 0.5, orbitPhase: 1 },
  // Cuadrado rojo (izquierda abajo)
  { type: "square", size: 1.3, color: PALETTE.red, x: -3.1, y: -2.1, opacity: 0.9, spin: -0.18, pulseAmp: 0.06, pulseSpeed: 0.6 },
  // Semicírculo rojo (derecha abajo)
  { type: "half", size: 1.6, color: PALETTE.red, x: 3.6, y: -1.6, opacity: 0.88, spin: 0.15 },
  // Cuarto de círculo amarillo (abajo centro)
  { type: "quarter", size: 1.8, color: PALETTE.yellow, x: -1.2, y: -2.6, opacity: 0.88, spin: -0.22, orbitR: 0.15, orbitSpeed: 0.6 },
  // Acentos pequeños que orbitan y pulsan
  { type: "circle", size: 0.5, color: PALETTE.yellow, x: 1.8, y: 2.6, opacity: 0.95, orbitR: 0.6, orbitSpeed: 0.8, pulseAmp: 0.22, pulseSpeed: 1.1 },
  { type: "triangle", size: 0.7, color: PALETTE.blue, x: 2.2, y: -2.7, opacity: 0.9, spin: 0.4 },
  { type: "circle", size: 0.35, color: PALETTE.red, x: -2.4, y: 2.7, opacity: 0.95, orbitR: 0.5, orbitSpeed: -0.9, orbitPhase: 2 },
  // Barras/líneas que giran como agujas (constructivismo cinético)
  { type: "bar", size: 7.5, color: PALETTE.ink, x: 0, y: 0, opacity: 0.8, spin: 0.08, tilt: 0.3 },
  { type: "bar", size: 6.0, color: PALETTE.blue, x: 0, y: 0, opacity: 0.5, spin: -0.12, tilt: 1.6 },
];

const FRUSTUM = 10; // unidades de mundo visibles en vertical

function buildGeometry(spec: ShapeSpec): THREE.BufferGeometry {
  switch (spec.type) {
    case "circle":
      return new THREE.CircleGeometry(spec.size, 64);
    case "triangle":
      return new THREE.CircleGeometry(spec.size, 3);
    case "square":
      return new THREE.PlaneGeometry(spec.size, spec.size);
    case "ring":
      return new THREE.RingGeometry(spec.size * 0.82, spec.size, 64);
    case "half":
      return new THREE.CircleGeometry(spec.size, 48, 0, Math.PI);
    case "quarter":
      return new THREE.CircleGeometry(spec.size, 48, 0, Math.PI / 2);
    case "bar":
      return new THREE.PlaneGeometry(spec.size, 0.12);
  }
}

export function BauhausBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      // Sin soporte WebGL: dejamos el fondo sólido del tema.
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, 0.1, 100);
    camera.position.z = 10;

    const applySize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const aspect = width / height;
      camera.left = (-FRUSTUM * aspect) / 2;
      camera.right = (FRUSTUM * aspect) / 2;
      camera.top = FRUSTUM / 2;
      camera.bottom = -FRUSTUM / 2;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
    };

    applySize();
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const group = new THREE.Group();
    scene.add(group);

    const shapes: { mesh: THREE.Mesh; spec: ShapeSpec }[] = [];

    SHAPES.forEach((spec, i) => {
      const geometry = buildGeometry(spec);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(spec.color),
        transparent: true,
        opacity: spec.opacity,
        side: THREE.DoubleSide,
        depthTest: false,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(spec.x, spec.y, 0);
      mesh.rotation.z = spec.tilt ?? 0;
      mesh.renderOrder = i;
      group.add(mesh);
      shapes.push({ mesh, spec });
    });

    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = ((e.clientX / window.innerWidth) * 2 - 1) * 0.5;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1) * 0.5;
    };

    const clock = new THREE.Clock();

    const step = (elapsed: number) => {
      for (const { mesh, spec } of shapes) {
        mesh.rotation.z = (spec.tilt ?? 0) + (spec.spin ?? 0) * elapsed;
        const pulse = spec.pulseAmp
          ? 1 + spec.pulseAmp * Math.sin((spec.pulseSpeed ?? 1) * elapsed + (spec.pulsePhase ?? 0))
          : 1;
        mesh.scale.setScalar(pulse);
        if (spec.orbitR) {
          const a = (spec.orbitSpeed ?? 0.5) * elapsed + (spec.orbitPhase ?? 0);
          mesh.position.x = spec.x + spec.orbitR * Math.cos(a);
          mesh.position.y = spec.y + spec.orbitR * Math.sin(a);
        }
      }
      // Parallax sutil hacia el cursor (profundidad).
      group.position.x += (pointer.x - group.position.x) * 0.04;
      group.position.y += (pointer.y - group.position.y) * 0.04;
      group.rotation.x += (pointer.y * 0.06 - group.rotation.x) * 0.04;
      group.rotation.y += (pointer.x * 0.06 - group.rotation.y) * 0.04;
      renderer.render(scene, camera);
    };

    let frame = 0;
    const loop = () => {
      step(clock.getElapsedTime());
      frame = requestAnimationFrame(loop);
    };

    const onResize = () => applySize();
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else if (!frame && !reducedMotion) {
        clock.getDelta(); // descarta el tiempo en pausa
        loop();
      }
    };

    window.addEventListener("resize", onResize);

    if (reducedMotion) {
      // Un solo cuadro estático, sin animación ni listeners de interacción.
      step(0);
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      loop();
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      for (const { mesh } of shapes) {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      }
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 opacity-80"
    />
  );
}
