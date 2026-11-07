"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import * as THREE from "three";

const signals = [
  { id: "motion", label: "Motion", copy: "Edits with rhythm, restraint and a pulse.", href: "/work/dreamy-aesthetic-reel", color: "#ff5b35" },
  { id: "campaigns", label: "Campaigns", copy: "Visual worlds built to survive the full rollout.", href: "/work/rakhi-gifting-system", color: "#c7f35b" },
  { id: "ai", label: "AI systems", copy: "Directed workflows with taste, checks and useful outputs.", href: "/work/creative-automation", color: "#557cff" },
  { id: "experiments", label: "Experiments", copy: "Small strange prototypes built before permission arrives.", href: "/lab", color: "#ff88b7" },
] as const;

type SignalId = (typeof signals)[number]["id"];

function makeNull() {
  const group = new THREE.Group();
  const ink = new THREE.MeshStandardMaterial({ color: 0x11110f, roughness: 0.72 });
  const orange = new THREE.MeshStandardMaterial({ color: 0xff5b35, roughness: 0.48 });
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.62, 32, 24), ink);
  body.scale.set(0.9, 1.25, 0.72);
  body.castShadow = true;
  group.add(body);

  const limbGeometry = new THREE.CylinderGeometry(0.075, 0.075, 0.72, 10);
  const leftArm = new THREE.Mesh(limbGeometry, ink);
  leftArm.position.set(-0.62, -0.03, 0);
  leftArm.rotation.z = -0.5;
  const rightArm = leftArm.clone();
  rightArm.position.x = 0.62;
  rightArm.rotation.z = 0.5;
  group.add(leftArm, rightArm);

  const shoeGeometry = new THREE.SphereGeometry(0.25, 20, 12);
  const leftShoe = new THREE.Mesh(shoeGeometry, orange);
  leftShoe.scale.set(1.15, 0.38, 0.68);
  leftShoe.position.set(-0.3, -0.86, 0.12);
  const rightShoe = leftShoe.clone();
  rightShoe.position.x = 0.3;
  group.add(leftShoe, rightShoe);

  const playhead = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.38, 3), orange);
  playhead.position.set(0.68, 0.44, 0);
  playhead.rotation.z = -Math.PI / 2;
  group.add(playhead);
  group.scale.setScalar(0.72);
  group.position.set(2.1, -1.38, 0.55);
  group.rotation.y = -0.35;
  return group;
}

export function HopeMachine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef<SignalId>("motion");
  const [activeSignal, setActiveSignal] = useState<SignalId>("motion");
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const active = signals.find((signal) => signal.id === activeSignal) ?? signals[0];

  useEffect(() => {
    activeRef.current = activeSignal;
  }, [activeSignal]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const settleStatus = (nextStatus: "ready" | "fallback") => {
      window.queueMicrotask(() => setStatus(nextStatus));
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      settleStatus("fallback");
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      settleStatus("fallback");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.1, 8.4);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    scene.add(new THREE.HemisphereLight(0xffffff, 0x3f3850, 2.7));
    const warmLight = new THREE.PointLight(0xff8a61, 38, 14, 2);
    warmLight.position.set(-3.5, 3.4, 4.5);
    const coolLight = new THREE.PointLight(0x6688ff, 32, 13, 2);
    coolLight.position.set(3.5, -1.5, 4);
    scene.add(warmLight, coolLight);

    const machine = new THREE.Group();
    machine.rotation.x = -0.08;
    scene.add(machine);

    const darkMetal = new THREE.MeshStandardMaterial({ color: 0x171714, metalness: 0.72, roughness: 0.27 });
    const paleMetal = new THREE.MeshStandardMaterial({ color: 0xded7ca, metalness: 0.56, roughness: 0.34 });
    const lime = new THREE.MeshStandardMaterial({ color: 0xc7f35b, emissive: 0x425c10, emissiveIntensity: 2.2, metalness: 0.18, roughness: 0.24 });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.02, 3), lime);
    core.castShadow = true;
    machine.add(core);
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.22, 2), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.13 }));
    machine.add(shell);

    const ringA = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.055, 12, 96), darkMetal);
    ringA.rotation.x = 1.05;
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.045, 12, 96), paleMetal);
    ringB.rotation.set(0.62, 0.22, -0.38);
    const ringC = new THREE.Mesh(new THREE.TorusGeometry(2.55, 0.028, 10, 96), darkMetal);
    ringC.rotation.set(1.25, -0.5, 0.2);
    machine.add(ringA, ringB, ringC);
    const spine = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 5.2, 12), darkMetal);
    spine.rotation.z = Math.PI / 2;
    machine.add(spine);

    const nodePositions = [
      new THREE.Vector3(-2.55, 1.15, 0.35),
      new THREE.Vector3(2.38, 1.25, -0.2),
      new THREE.Vector3(-2.25, -1.38, 0.25),
      new THREE.Vector3(2.45, -1.1, -0.15),
    ];
    const nodeMeshes: Array<{ id: SignalId; mesh: THREE.Mesh; halo: THREE.Mesh }> = [];
    signals.forEach((signal, index) => {
      const position = nodePositions[index];
      const material = new THREE.MeshStandardMaterial({ color: signal.color, emissive: signal.color, emissiveIntensity: 1.15, metalness: 0.28, roughness: 0.28 });
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.27, 24, 18), material);
      node.position.copy(position);
      node.userData.signal = signal.id;
      node.castShadow = true;
      machine.add(node);
      const halo = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.025, 8, 48), new THREE.MeshBasicMaterial({ color: signal.color, transparent: true, opacity: 0.55 }));
      halo.position.copy(position);
      halo.rotation.x = Math.PI / 2;
      machine.add(halo);
      const connector = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([position.clone().multiplyScalar(0.18), position.clone().multiplyScalar(0.88)]),
        new THREE.LineBasicMaterial({ color: signal.color, transparent: true, opacity: 0.38 }),
      );
      machine.add(connector);
      nodeMeshes.push({ id: signal.id, mesh: node, halo });
    });

    const panelGeometry = new THREE.BoxGeometry(1.35, 0.78, 0.08);
    const leftPanel = new THREE.Mesh(panelGeometry, darkMetal);
    leftPanel.position.set(-2.1, 0.05, -0.72);
    leftPanel.rotation.set(-0.08, 0.3, -0.2);
    const rightPanel = new THREE.Mesh(panelGeometry, paleMetal);
    rightPanel.position.set(1.85, 0.05, -0.88);
    rightPanel.rotation.set(0.1, -0.45, 0.18);
    machine.add(leftPanel, rightPanel);

    const nullCharacter = makeNull();
    scene.add(nullCharacter);
    const grid = new THREE.GridHelper(12, 24, 0x557cff, 0x716d66);
    grid.position.set(0, -2.35, -1.6);
    const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
    gridMaterials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0.14;
    });
    scene.add(grid);

    const starPositions = new Float32Array(180 * 3);
    for (let index = 0; index < 180; index += 1) {
      const seed = index + 1;
      starPositions[index * 3] = Math.sin(seed * 12.9898) * 5.8;
      starPositions[index * 3 + 1] = Math.cos(seed * 4.1414) * 3.6;
      starPositions[index * 3 + 2] = -2.5 + Math.sin(seed * 7.77) * 2.2;
    }
    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(starsGeometry, new THREE.PointsMaterial({ color: 0xffffff, size: 0.025, transparent: true, opacity: 0.45 }));
    scene.add(stars);

    const pointer = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const targetRotation = new THREE.Vector2(0, 0);
    const dragStart = new THREE.Vector2();
    const targetScale = new THREE.Vector3();
    let dragging = false;
    let moved = false;
    let scrollProgress = 0;
    let frame = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      renderer.setSize(bounds.width, bounds.height, false);
      camera.aspect = bounds.width / bounds.height;
      camera.position.z = bounds.width < 620 ? 9.7 : 8.4;
      camera.updateProjectionMatrix();
    };
    const updatePointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
    };
    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      moved = false;
      dragStart.set(event.clientX, event.clientY);
      canvas.setPointerCapture(event.pointerId);
      canvas.classList.add("is-dragging");
    };
    const onPointerMove = (event: PointerEvent) => {
      updatePointer(event);
      if (dragging) {
        const deltaX = event.clientX - dragStart.x;
        const deltaY = event.clientY - dragStart.y;
        if (Math.abs(deltaX) + Math.abs(deltaY) > 4) moved = true;
        targetRotation.x += deltaY * 0.0022;
        targetRotation.y += deltaX * 0.0028;
        dragStart.set(event.clientX, event.clientY);
      } else {
        targetRotation.y = pointer.x * 0.26;
        targetRotation.x = pointer.y * 0.14;
      }
    };
    const onPointerUp = (event: PointerEvent) => {
      if (!moved) {
        updatePointer(event);
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(nodeMeshes.map((item) => item.mesh), false);
        const selected = hits[0]?.object.userData.signal as SignalId | undefined;
        if (selected) setActiveSignal(selected);
      }
      dragging = false;
      canvas.classList.remove("is-dragging");
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    };
    const onScroll = () => {
      scrollProgress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
    };

    const startTime = performance.now();
    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      const selectedIndex = signals.findIndex((signal) => signal.id === activeRef.current);
      machine.rotation.x += (targetRotation.x - machine.rotation.x) * 0.045;
      machine.rotation.y += (targetRotation.y - machine.rotation.y) * 0.045;
      machine.position.y = Math.sin(elapsed * 0.72) * 0.08 - scrollProgress * 0.35;
      ringA.rotation.z = elapsed * 0.28 + selectedIndex * 0.24;
      ringB.rotation.y = elapsed * -0.19;
      ringC.rotation.z = elapsed * 0.11;
      core.rotation.x = elapsed * 0.18;
      core.rotation.y = elapsed * 0.25;
      shell.rotation.y = elapsed * -0.12;
      stars.rotation.z = elapsed * 0.006;
      nullCharacter.position.y = -1.38 + Math.sin(elapsed * 1.8) * 0.055;
      nullCharacter.rotation.z = Math.sin(elapsed * 1.25) * 0.035;
      nodeMeshes.forEach((item, index) => {
        const selected = item.id === activeRef.current;
        const pulse = 1 + Math.sin(elapsed * 2.2 + index) * 0.07;
        const scale = selected ? 1.38 : pulse;
        targetScale.set(scale, scale, scale);
        item.mesh.scale.lerp(targetScale, 0.08);
        item.halo.rotation.z = elapsed * (index % 2 ? -0.52 : 0.52);
        item.halo.scale.setScalar(selected ? 1.24 : 1);
      });
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("scroll", onScroll, { passive: true });
    resize();
    onScroll();
    settleStatus("ready");
    render();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("scroll", onScroll);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line) {
          object.geometry?.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`hope-machine hope-machine-${status}`}>
      <canvas ref={canvasRef} aria-label="Null's interactive three-dimensional hope machine" />
      <div className="machine-static-fallback" aria-hidden={status !== "fallback"}>
        <span className="fallback-core" />
        <span className="fallback-ring fallback-ring-one" />
        <span className="fallback-ring fallback-ring-two" />
      </div>
      <div className="machine-status"><span className="machine-status-light" />Hope engine / {status === "loading" ? "waking" : "online"}</div>
      <div className="machine-signals" aria-label="Project signals">
        {signals.map((signal, index) => (
          <button
            type="button"
            key={signal.id}
            className={activeSignal === signal.id ? "is-active" : ""}
            style={{ "--signal-color": signal.color } as CSSProperties}
            aria-pressed={activeSignal === signal.id}
            onClick={() => setActiveSignal(signal.id)}
          >
            <span>0{index + 1}</span>{signal.label}
          </button>
        ))}
      </div>
      <div className="machine-readout" aria-live="polite">
        <span className="machine-readout-index">0{signals.findIndex((signal) => signal.id === activeSignal) + 1}</span>
        <div><strong>{active.label}</strong><p>{active.copy}</p></div>
        <Link href={active.href} aria-label={`Open ${active.label} work`}><ArrowUpRight size={20} /></Link>
      </div>
    </div>
  );
}
