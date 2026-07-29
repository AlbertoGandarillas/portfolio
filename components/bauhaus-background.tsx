"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Composición Bauhaus cinética (Three.js puro).
 *
 * Inspirada en los carteles Bauhaus y en el grafismo constructivista:
 * arcos concéntricos, círculos partidos que contrarrotan, cuartos de círculo
 * con giro "mecánico" a saltos de 90°, barras a rayas diagonales, y líneas
 * finas que conectan nodos con un punto de dato viajando por ellas (motivo
 * circuito). Todo en loop continuo, con paleta auténtica sobre papel crema.
 *
 * - Cámara ortográfica -> composición plana y gráfica de cartel.
 * - Corredor central despejado para que el texto del hero se lea nítido.
 * - Respeta prefers-reduced-motion; se pausa con la pestaña oculta; limpia todo.
 */

const C = {
  red: "#e2361f",
  blue: "#1f4ea1",
  navy: "#14224c",
  yellow: "#f2b417",
  ink: "#161311",
  cream: "#efe7d6",
} as const;

const FRUSTUM = 10;
const easeInOut = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

type Pt = [number, number];
interface Actor {
  update: (t: number) => void;
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
      return; // Sin WebGL dejamos el fondo sólido del tema.
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // --- recursos a liberar ---
    const geos: THREE.BufferGeometry[] = [];
    const mats: THREE.Material[] = [];
    const texs: THREE.Texture[] = [];
    const actors: Actor[] = [];

    const scene = new THREE.Scene();
    const world = new THREE.Group();
    scene.add(world);
    const applyTheme = () => {
      scene.background = new THREE.Color(
        document.documentElement.classList.contains("dark") ? C.ink : C.cream
      );
    };
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // --- cámara / tamaño ---
    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, 0.1, 100);
    camera.position.z = 10;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const applySize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const aspect = width / height;
      camera.left = (-FRUSTUM * aspect) / 2;
      camera.right = (FRUSTUM * aspect) / 2;
      camera.top = FRUSTUM / 2;
      camera.bottom = -FRUSTUM / 2;
      camera.updateProjectionMatrix();
      world.scale.setScalar(width < 640 ? 0.5 : width < 900 ? 0.78 : 1);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
    };
    applySize();
    container.appendChild(renderer.domElement);

    // --- helpers de construcción ---
    const track = <T extends THREE.BufferGeometry>(g: T): T => {
      geos.push(g);
      return g;
    };
    const mkMat = (color: string, opacity = 1) => {
      const m = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        depthTest: false,
        depthWrite: false,
      });
      mats.push(m);
      return m;
    };
    const mesh = (geo: THREE.BufferGeometry, color: string, opacity = 1) =>
      new THREE.Mesh(track(geo), mkMat(color, opacity));

    // Arcos concéntricos (media luna) que rotan lentamente.
    const arches = (
      x: number,
      y: number,
      rot: number,
      colors: string[],
      spin: number,
      r0 = 0.55,
      gap = 0.4,
      thick = 0.16
    ) => {
      const g = new THREE.Group();
      g.position.set(x, y, 0);
      g.rotation.z = rot;
      colors.forEach((c, i) => {
        const rIn = r0 + i * gap;
        const m = mesh(
          new THREE.RingGeometry(rIn, rIn + thick, 64, 1, 0, Math.PI),
          c,
          0.95
        );
        g.add(m);
      });
      world.add(g);
      actors.push({ update: (t) => (g.rotation.z = rot + t * spin) });
    };

    // Círculo partido en dos medios discos que contrarrotan.
    const splitCircle = (
      x: number,
      y: number,
      r: number,
      a: string,
      b: string,
      speed: number
    ) => {
      const g = new THREE.Group();
      g.position.set(x, y, 0);
      const mA = mesh(new THREE.CircleGeometry(r, 80, 0, Math.PI), a, 0.95);
      const mB = mesh(new THREE.CircleGeometry(r, 80, 0, Math.PI), b, 0.95);
      mB.rotation.z = Math.PI;
      g.add(mA, mB);
      world.add(g);
      actors.push({
        update: (t) => {
          mA.rotation.z = t * speed;
          mB.rotation.z = Math.PI - t * speed;
        },
      });
    };

    // Cuarto de círculo con giro mecánico a saltos de 90°.
    const wedge = (
      x: number,
      y: number,
      r: number,
      color: string,
      base: number,
      dir: number,
      period: number,
      opacity = 0.95
    ) => {
      const m = mesh(new THREE.CircleGeometry(r, 48, 0, Math.PI / 2), color, opacity);
      m.position.set(x, y, 0);
      world.add(m);
      const step = Math.PI / 2;
      const move = 0.42;
      actors.push({
        update: (t) => {
          const p = (t % period) / period;
          const idx = Math.floor(t / period);
          const local = p < move ? easeInOut(p / move) : 1;
          m.rotation.z = base + dir * (idx + local) * step;
        },
      });
    };

    // Sector circular (media / cuarto) que gira continuo.
    const sector = (
      x: number,
      y: number,
      r: number,
      color: string,
      theta: number,
      speed: number,
      base = 0,
      opacity = 0.92
    ) => {
      const m = mesh(new THREE.CircleGeometry(r, 80, 0, theta), color, opacity);
      m.position.set(x, y, 0);
      world.add(m);
      actors.push({ update: (t) => (m.rotation.z = base + t * speed) });
    };

    // Triángulo.
    const triangle = (
      x: number,
      y: number,
      r: number,
      color: string,
      base: number,
      spin: number,
      opacity = 0.95
    ) => {
      const m = mesh(new THREE.CircleGeometry(r, 3), color, opacity);
      m.position.set(x, y, 0);
      m.rotation.z = base;
      world.add(m);
      actors.push({ update: (t) => (m.rotation.z = base + spin * t) });
    };

    // Rectángulo / cuadrado.
    const rect = (
      x: number,
      y: number,
      w: number,
      h: number,
      color: string,
      base = 0,
      spin = 0,
      opacity = 0.95
    ) => {
      const m = mesh(new THREE.PlaneGeometry(w, h), color, opacity);
      m.position.set(x, y, 0);
      m.rotation.z = base;
      world.add(m);
      if (spin) actors.push({ update: (t) => (m.rotation.z = base + spin * t) });
    };

    // Anillo (contorno) que gira.
    const ring = (
      x: number,
      y: number,
      r: number,
      thick: number,
      color: string,
      spin: number,
      opacity = 0.8
    ) => {
      const m = mesh(new THREE.RingGeometry(r - thick, r, 96), color, opacity);
      m.position.set(x, y, 0);
      world.add(m);
      actors.push({ update: (t) => (m.rotation.z = t * spin) });
    };

    // Círculo pequeño que orbita y pulsa (acento).
    const dotAccent = (
      x: number,
      y: number,
      r: number,
      color: string,
      orbitR: number,
      orbitSpeed: number,
      phase: number
    ) => {
      const m = mesh(new THREE.CircleGeometry(r, 32), color, 0.95);
      world.add(m);
      actors.push({
        update: (t) => {
          const a = orbitSpeed * t + phase;
          m.position.set(x + orbitR * Math.cos(a), y + orbitR * Math.sin(a), 0);
          m.scale.setScalar(1 + 0.18 * Math.sin(t * 1.3 + phase));
        },
      });
    };

    // Textura de rayas diagonales para las barras.
    const makeStripe = () => {
      const c = document.createElement("canvas");
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext("2d")!;
      ctx.clearRect(0, 0, 64, 64);
      ctx.fillStyle = C.ink;
      for (let i = -64; i < 64; i += 18) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 9, 0);
        ctx.lineTo(i + 9 + 64, 64);
        ctx.lineTo(i + 64, 64);
        ctx.closePath();
        ctx.fill();
      }
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      texs.push(tex);
      return tex;
    };

    const stripedBar = (
      x: number,
      y: number,
      w: number,
      h: number,
      angle: number,
      speed: number
    ) => {
      const tex = makeStripe();
      tex.repeat.set(Math.max(1, Math.round(w)), 1);
      const geo = track(new THREE.PlaneGeometry(w, h));
      const m = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        depthTest: false,
        depthWrite: false,
      });
      mats.push(m);
      const mm = new THREE.Mesh(geo, m);
      mm.position.set(x, y, 0);
      mm.rotation.z = angle;
      world.add(mm);
      actors.push({ update: (t) => (tex.offset.x = (t * speed) % 1) });
    };

    // Líneas que conectan nodos con un punto de dato viajando por ellas.
    const circuit = (pts: Pt[], travelColor: string, speed: number) => {
      const g = new THREE.Group();
      const seglen: number[] = [];
      let total = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        const [x1, y1] = pts[i];
        const [x2, y2] = pts[i + 1];
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.hypot(dx, dy);
        seglen.push(len);
        total += len;
        const seg = mesh(new THREE.PlaneGeometry(len, 0.03), C.ink, 0.85);
        seg.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0);
        seg.rotation.z = Math.atan2(dy, dx);
        g.add(seg);
      }
      for (const [x, y] of pts) {
        const n = mesh(new THREE.CircleGeometry(0.08, 24), C.ink, 0.95);
        n.position.set(x, y, 0);
        g.add(n);
      }
      const dot = mesh(new THREE.CircleGeometry(0.12, 24), travelColor, 1);
      const halo = mesh(new THREE.CircleGeometry(0.22, 24), travelColor, 0.25);
      g.add(halo, dot);
      world.add(g);
      actors.push({
        update: (t) => {
          let d = (t * speed) % total;
          let i = 0;
          while (i < seglen.length - 1 && d > seglen[i]) {
            d -= seglen[i];
            i++;
          }
          const f = seglen[i] ? d / seglen[i] : 0;
          const px = pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f;
          const py = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f;
          dot.position.set(px, py, 0);
          halo.position.set(px, py, 0);
          halo.scale.setScalar(1 + 0.4 * Math.sin(t * 4));
        },
      });
    };

    // ---------------------------------------------------------------
    //  COMPOSICIÓN  (corredor central ~x∈[-2,2], y∈[-1.4,1.2] despejado)
    // ---------------------------------------------------------------
    // Cuadrante superior izquierdo
    arches(-4.7, 2.1, -0.35, [C.red, C.yellow, C.blue, C.navy], 0.09);
    rect(-6.4, 3.1, 0.9, 0.9, C.blue, 0.2, 0.06);
    // Cuadrante superior derecho
    splitCircle(4.8, 2.0, 1.55, C.blue, C.navy, 0.45);
    stripedBar(4.9, 2.1, 3.6, 0.55, -0.85, 0.06);
    triangle(6.6, 3.0, 0.7, C.yellow, 0.4, 0.2);
    // Flancos medios
    wedge(-5.4, -0.4, 1.5, C.yellow, 0, 1, 3.4);
    ring(6.2, 0.4, 1.0, 0.14, C.red, 0.12);
    // Cuadrante inferior izquierdo
    wedge(-4.2, -2.7, 1.25, C.blue, Math.PI, -1, 3.0);
    rect(-5.7, -2.5, 0.85, 0.85, C.red, 0.15, -0.05);
    triangle(-2.6, -3.0, 0.9, C.navy, 0.1, 0.18);
    // Cuadrante inferior derecho
    sector(1.9, -3.0, 1.35, C.yellow, Math.PI, 0.3);
    triangle(4.3, -2.6, 1.15, C.red, 0.6, -0.12);
    triangle(5.6, -1.4, 1.0, C.navy, 0.2, 0.1);
    // Anillo tenue central (se difumina bajo la viñeta -> da profundidad)
    ring(0, 0.1, 2.7, 0.05, C.ink, 0.04, 0.35);
    // Acentos que orbitan
    dotAccent(-2.7, 2.9, 0.28, C.red, 0.5, 0.9, 0);
    dotAccent(2.4, 2.9, 0.34, C.yellow, 0.6, -0.7, 1.5);
    dotAccent(-1.4, -3.3, 0.24, C.blue, 0.45, 1.1, 2.2);
    // Circuitos con punto de dato viajando
    circuit(
      [
        [-8, 3.6],
        [-3.2, 3.6],
        [-3.2, 2.9],
        [-1.6, 2.9],
        [-1.0, 3.5],
        [-0.4, 2.9],
        [1.2, 2.9],
      ],
      C.red,
      1.1
    );
    circuit(
      [
        [8, -0.6],
        [6.2, -0.6],
        [6.2, -2.2],
        [3.2, -2.2],
        [3.2, -3.8],
      ],
      C.yellow,
      0.9
    );

    // Orden de dibujo por orden de inserción (líneas/nodos encima de figuras).
    let ord = 0;
    world.traverse((o) => {
      if (o instanceof THREE.Mesh) o.renderOrder = ord++;
    });

    // --- interacción / animación ---
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = ((e.clientX / window.innerWidth) * 2 - 1) * 0.5;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1) * 0.5;
    };

    const clock = new THREE.Clock();
    const step = (t: number) => {
      for (const a of actors) a.update(t);
      world.position.x += (pointer.x - world.position.x) * 0.04;
      world.position.y += (pointer.y - world.position.y) * 0.04;
      world.rotation.x += (pointer.y * 0.05 - world.rotation.x) * 0.04;
      world.rotation.y += (pointer.x * 0.05 - world.rotation.y) * 0.04;
      renderer.render(scene, camera);
    };

    let frame = 0;
    let heroVisible = true;
    const loop = () => {
      step(clock.getElapsedTime());
      frame = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const startLoop = () => {
      if (!frame && !reducedMotion && !document.hidden && heroVisible) {
        clock.getDelta();
        loop();
      }
    };

    const onResize = () => applySize();
    const onVisibility = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };
    const viewportObserver = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting;
        if (heroVisible) startLoop();
        else stopLoop();
      },
      { threshold: 0.01 }
    );
    viewportObserver.observe(container);

    window.addEventListener("resize", onResize);
    if (reducedMotion) {
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
      viewportObserver.disconnect();
      themeObserver.disconnect();
      for (const g of geos) g.dispose();
      for (const m of mats) m.dispose();
      for (const t of texs) t.dispose();
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
      className="pointer-events-none absolute inset-0 -z-20"
    />
  );
}
