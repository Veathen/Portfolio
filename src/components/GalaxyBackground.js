import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const createStarTexture = () => {
  const canvas = document.createElement("canvas");
  const size = 128;
  const center = size / 2;
  const context = canvas.getContext("2d");

  canvas.width = size;
  canvas.height = size;

  const drawRay = (angle, length, width, alpha) => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const px = -sin;
    const py = cos;
    const start = 4;
    const tip = length;

    context.beginPath();
    context.moveTo(center + cos * start + px * width, center + sin * start + py * width);
    context.lineTo(center + cos * tip, center + sin * tip);
    context.lineTo(center + cos * start - px * width, center + sin * start - py * width);
    context.closePath();
    context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    context.fill();
  };

  const glow = context.createRadialGradient(center, center, 1, center, center, 48);
  glow.addColorStop(0, "rgba(255, 255, 255, 0.44)");
  glow.addColorStop(0.18, "rgba(255, 255, 255, 0.14)");
  glow.addColorStop(0.55, "rgba(190, 230, 255, 0.045)");
  glow.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.fillStyle = glow;
  context.fillRect(0, 0, size, size);

  for (let i = 0; i < 4; i += 1) {
    drawRay((Math.PI / 2) * i, 58, 1.15, 0.18);
  }

  for (let i = 0; i < 4; i += 1) {
    drawRay(Math.PI / 4 + (Math.PI / 2) * i, 36, 0.65, 0.1);
  }

  const core = context.createRadialGradient(center, center, 0, center, center, 11);
  core.addColorStop(0, "rgba(255, 255, 255, 0.96)");
  core.addColorStop(0.28, "rgba(255, 255, 255, 0.72)");
  core.addColorStop(0.7, "rgba(235, 248, 255, 0.22)");
  core.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.fillStyle = core;
  context.beginPath();
  context.arc(center, center, 12, 0, Math.PI * 2);
  context.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
};

const createGlowTexture = () => {
  const canvas = document.createElement("canvas");
  const size = 96;
  const center = size / 2;
  const context = canvas.getContext("2d");

  canvas.width = size;
  canvas.height = size;

  const gradient = context.createRadialGradient(center, center, 1, center, center, 45);
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.5)");
  gradient.addColorStop(0.22, "rgba(255, 255, 255, 0.18)");
  gradient.addColorStop(0.64, "rgba(180, 230, 255, 0.06)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
};

const createAccretionTexture = () => {
  const canvas = document.createElement("canvas");
  const size = 256;
  const center = size / 2;
  const context = canvas.getContext("2d");

  canvas.width = size;
  canvas.height = size;

  context.save();
  context.translate(center, center);
  context.scale(1, 0.32);
  context.shadowColor = "rgba(255, 235, 170, 0.48)";
  context.shadowBlur = 14;

  const ringGradient = context.createLinearGradient(-118, 0, 118, 0);
  ringGradient.addColorStop(0, "rgba(110, 220, 255, 0)");
  ringGradient.addColorStop(0.2, "rgba(120, 222, 255, 0.25)");
  ringGradient.addColorStop(0.42, "rgba(255, 229, 152, 0.78)");
  ringGradient.addColorStop(0.58, "rgba(255, 245, 204, 0.9)");
  ringGradient.addColorStop(0.78, "rgba(255, 133, 188, 0.24)");
  ringGradient.addColorStop(1, "rgba(175, 150, 255, 0)");

  context.strokeStyle = ringGradient;
  context.lineCap = "round";
  context.lineWidth = 9;
  context.beginPath();
  context.arc(0, 0, 72, 0, Math.PI * 2);
  context.stroke();

  context.shadowColor = "rgba(120, 226, 255, 0.36)";
  context.shadowBlur = 22;
  context.lineWidth = 3.5;
  context.strokeStyle = "rgba(198, 240, 255, 0.34)";
  context.beginPath();
  context.arc(0, 0, 86, Math.PI * 0.08, Math.PI * 1.92);
  context.stroke();

  context.restore();

  for (let i = 0; i < 170; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 63 + Math.random() * 29;
    const arcLength = 0.018 + Math.random() * 0.05;

    context.save();
    context.translate(center, center);
    context.scale(1, 0.32);
    context.beginPath();
    context.arc(0, 0, radius, angle, angle + arcLength);
    context.strokeStyle = `rgba(255, ${216 + Math.floor(Math.random() * 39)}, ${155 + Math.floor(Math.random() * 86)}, ${0.18 + Math.random() * 0.3})`;
    context.lineWidth = 0.75 + Math.random() * 1.4;
    context.stroke();
    context.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
};

const createBlackHoleTexture = () => {
  const canvas = document.createElement("canvas");
  const size = 256;
  const center = size / 2;
  const context = canvas.getContext("2d");

  canvas.width = size;
  canvas.height = size;

  const lens = context.createRadialGradient(center, center, 4, center, center, 118);
  lens.addColorStop(0, "rgba(0, 0, 7, 0.92)");
  lens.addColorStop(0.36, "rgba(1, 2, 12, 0.84)");
  lens.addColorStop(0.48, "rgba(4, 8, 22, 0.62)");
  lens.addColorStop(0.55, "rgba(255, 232, 171, 0.28)");
  lens.addColorStop(0.63, "rgba(120, 225, 255, 0.18)");
  lens.addColorStop(0.78, "rgba(158, 127, 255, 0.055)");
  lens.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.fillStyle = lens;
  context.fillRect(0, 0, size, size);

  context.strokeStyle = "rgba(255, 245, 207, 0.42)";
  context.lineWidth = 2;
  context.shadowColor = "rgba(255, 235, 170, 0.62)";
  context.shadowBlur = 12;
  context.beginPath();
  context.arc(center, center, 55, 0, Math.PI * 2);
  context.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
};

function GalaxyBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount || typeof window === "undefined" || !window.WebGLRenderingContext) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0.45, 9.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const galaxy = new THREE.Group();
    galaxy.position.set(0.72, 0.52, 0);
    galaxy.rotation.x = -0.48;
    galaxy.rotation.z = -0.16;
    scene.add(galaxy);

    const particleCount = window.innerWidth < 720 ? 3600 : 6800;
    const armCount = 5;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const baseAngles = new Float32Array(particleCount);
    const radii = new Float32Array(particleCount);
    const jitters = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    const coreColor = new THREE.Color("#fff1bf");
    const white = new THREE.Color("#f8fbff");
    const cyan = new THREE.Color("#69e6ff");
    const violet = new THREE.Color("#a98bff");
    const rose = new THREE.Color("#ff7ab6");

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      const radius = Math.pow(Math.random(), 0.62) * 7.4 + 0.08;
      const armAngle = ((i % armCount) / armCount) * Math.PI * 2;
      const swirl = radius * 0.72;
      const angle = armAngle + swirl + (Math.random() - 0.5) * (0.5 + radius * 0.12);
      const spread = Math.pow(Math.random(), 2.1) * (0.18 + radius * 0.08);
      const tangentSpread = (Math.random() - 0.5) * spread;

      baseAngles[i] = angle;
      radii[i] = radius;
      jitters[i3] = Math.cos(angle + Math.PI / 2) * tangentSpread;
      jitters[i3 + 1] = (Math.random() - 0.5) * (0.08 + radius * 0.018);
      jitters[i3 + 2] = Math.sin(angle + Math.PI / 2) * tangentSpread;
      speeds[i] = 0.045 / (0.45 + radius * 0.18) + Math.random() * 0.006;

      positions[i3] = Math.cos(angle) * radius + jitters[i3];
      positions[i3 + 1] = jitters[i3 + 1];
      positions[i3 + 2] = Math.sin(angle) * radius + jitters[i3 + 2];

      const tint = cyan.clone().lerp(i % 3 === 0 ? violet : rose, Math.random() * 0.42);
      const outerColor = white.clone().lerp(tint, 0.28 + Math.random() * 0.22);
      const color = coreColor.clone().lerp(outerColor, Math.min(radius / 5.8, 1));
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const galaxyGeometry = new THREE.BufferGeometry();
    galaxyGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    galaxyGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const starTexture = createStarTexture();
    const glowTexture = createGlowTexture();
    const baseOpacity = 0.42;
    const fadedOpacity = 0.07;
    const baseGlowOpacity = 0.24;
    const fadedGlowOpacity = 0.04;
    const galaxyMaterial = new THREE.PointsMaterial({
      size: window.innerWidth < 720 ? 0.1 : 0.118,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: baseOpacity,
      alphaTest: 0.045,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const galaxyPoints = new THREE.Points(galaxyGeometry, galaxyMaterial);
    galaxy.add(galaxyPoints);

    const glowMaterial = new THREE.PointsMaterial({
      size: window.innerWidth < 720 ? 0.2 : 0.24,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: baseGlowOpacity,
      alphaTest: 0.01,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glowPoints = new THREE.Points(galaxyGeometry, glowMaterial);
    galaxy.add(glowPoints);

    const accretionTexture = createAccretionTexture();
    const accretionMaterial = new THREE.SpriteMaterial({
      map: accretionTexture,
      transparent: true,
      opacity: 0.86,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
    });
    const accretionDisk = new THREE.Sprite(accretionMaterial);
    accretionDisk.scale.set(3.25, 3.25, 1);
    accretionDisk.renderOrder = 4;
    galaxy.add(accretionDisk);

    const blackHoleTexture = createBlackHoleTexture();
    const blackHoleMaterial = new THREE.SpriteMaterial({
      map: blackHoleTexture,
      transparent: true,
      opacity: 0.9,
      depthTest: false,
      depthWrite: false,
    });
    const blackHole = new THREE.Sprite(blackHoleMaterial);
    blackHole.scale.set(1.35, 1.35, 1);
    blackHole.renderOrder = 5;
    galaxy.add(blackHole);

    const clock = new THREE.Clock();
    const reducedMotion = prefersReducedMotion();
    let scrollAngleOffset = 0;
    let frameId;

    const updateScrollState = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const scrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      const eased = 1 - Math.pow(1 - scrollProgress, 2);
      const scale = 1 - eased * 0.54;

      scrollAngleOffset = eased * Math.PI * 1.25;
      galaxy.scale.setScalar(scale);
      galaxyMaterial.opacity = baseOpacity - eased * (baseOpacity - fadedOpacity);
      glowMaterial.opacity = baseGlowOpacity - eased * (baseGlowOpacity - fadedGlowOpacity);
      accretionMaterial.opacity = 0.86 - eased * 0.5;
      blackHoleMaterial.opacity = 0.9 - eased * 0.38;
      renderer.domElement.style.opacity = `${1 - eased * 0.36}`;

      if (reducedMotion) {
        for (let i = 0; i < particleCount; i += 1) {
          const i3 = i * 3;
          const radius = radii[i];
          const angle = baseAngles[i] + scrollAngleOffset;

          positions[i3] = Math.cos(angle) * radius + jitters[i3];
          positions[i3 + 1] = jitters[i3 + 1];
          positions[i3 + 2] = Math.sin(angle) * radius + jitters[i3 + 2];
        }

        galaxyGeometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
      }
    };

    const render = () => {
      const elapsed = clock.getElapsedTime();

      if (!reducedMotion) {
        for (let i = 0; i < particleCount; i += 1) {
          const i3 = i * 3;
          const radius = radii[i];
          const angle = baseAngles[i] + elapsed * speeds[i] + scrollAngleOffset;
          const wave = Math.sin(elapsed * 0.45 + radius * 1.7) * 0.025;

          positions[i3] = Math.cos(angle) * radius + jitters[i3];
          positions[i3 + 1] = jitters[i3 + 1] + wave;
          positions[i3 + 2] = Math.sin(angle) * radius + jitters[i3 + 2];
        }

        galaxyGeometry.attributes.position.needsUpdate = true;
        accretionMaterial.rotation = elapsed * 0.16 + scrollAngleOffset * 0.16;
        galaxy.rotation.z = -0.16 + elapsed * 0.018;
        galaxy.rotation.y = Math.sin(elapsed * 0.08) * 0.045;
      }

      renderer.render(scene, camera);

      if (!reducedMotion) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      camera.aspect = innerWidth / innerHeight;
      camera.position.z = innerWidth < 720 ? 11.5 : 9.5;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(innerWidth, innerHeight);
      galaxyMaterial.size = innerWidth < 720 ? 0.1 : 0.118;
      glowMaterial.size = innerWidth < 720 ? 0.2 : 0.24;
      updateScrollState();
      renderer.render(scene, camera);
    };

    const handleScroll = () => {
      updateScrollState();
    };

    handleResize();
    updateScrollState();
    render();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      galaxyGeometry.dispose();
      galaxyMaterial.dispose();
      glowMaterial.dispose();
      starTexture.dispose();
      glowTexture.dispose();
      accretionTexture.dispose();
      accretionMaterial.dispose();
      blackHoleTexture.dispose();
      blackHoleMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="galaxy-canvas" ref={mountRef} aria-hidden="true" />;
}

export default GalaxyBackground;
