import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { AdditiveBlending } from "three";
import { createGalaxyParticles, updateGalaxyPositions } from "./galaxyParticles";
import {
  createAccretionTexture,
  createBlackHoleTexture,
  createGlowTexture,
  createStarTexture,
} from "./galaxyTextures";

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return reducedMotion;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId;
    const update = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const linearProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      setProgress(1 - Math.pow(1 - linearProgress, 2));
      frameId = undefined;
    };
    const scheduleUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return progress;
}

function GalaxyScene({ scrollProgress, reducedMotion }) {
  const groupRef = useRef();
  const starMaterialRef = useRef();
  const glowMaterialRef = useRef();
  const accretionMaterialRef = useRef();
  const blackHoleMaterialRef = useRef();
  const elapsedRef = useRef(0);
  const { camera, size } = useThree();
  const mobile = size.width < 720;
  const particles = useMemo(() => createGalaxyParticles(mobile ? 3600 : 6800), [mobile]);
  const textures = useMemo(() => ({
    star: createStarTexture(),
    glow: createGlowTexture(),
    accretion: createAccretionTexture(),
    blackHole: createBlackHoleTexture(),
  }), []);

  useEffect(() => {
    camera.position.z = mobile ? 11.5 : 9.5;
    camera.updateProjectionMatrix();
  }, [camera, mobile]);

  useEffect(() => () => {
    particles.geometry.dispose();
  }, [particles]);

  useEffect(() => () => {
    Object.values(textures).forEach((texture) => texture.dispose());
  }, [textures]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (!reducedMotion) elapsedRef.current += delta;

    const elapsed = elapsedRef.current;
    const angleOffset = scrollProgress * Math.PI * 1.25;
    const scale = 1 - scrollProgress * 0.54;
    updateGalaxyPositions(particles, elapsed, angleOffset, reducedMotion);
    particles.geometry.attributes.position.needsUpdate = true;

    groupRef.current.scale.setScalar(scale);
    groupRef.current.rotation.z = -0.16 + (reducedMotion ? 0 : elapsed * 0.018);
    groupRef.current.rotation.y = reducedMotion ? 0 : Math.sin(elapsed * 0.08) * 0.045;
    starMaterialRef.current.opacity = 0.42 - scrollProgress * 0.35;
    glowMaterialRef.current.opacity = 0.24 - scrollProgress * 0.2;
    accretionMaterialRef.current.opacity = 0.86 - scrollProgress * 0.5;
    accretionMaterialRef.current.rotation = (reducedMotion ? 0 : elapsed * 0.16) + angleOffset * 0.16;
    blackHoleMaterialRef.current.opacity = 0.9 - scrollProgress * 0.38;
  });

  return (
    <group ref={groupRef} position={[0.72, 0.52, 0]} rotation={[-0.48, 0, -0.16]}>
      <points>
        <primitive object={particles.geometry} attach="geometry" />
        <pointsMaterial
          ref={starMaterialRef}
          size={mobile ? 0.1 : 0.118}
          map={textures.star}
          vertexColors
          transparent
          opacity={0.42}
          alphaTest={0.045}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <points>
        <primitive object={particles.geometry} attach="geometry" />
        <pointsMaterial
          ref={glowMaterialRef}
          size={mobile ? 0.2 : 0.24}
          map={textures.glow}
          vertexColors
          transparent
          opacity={0.24}
          alphaTest={0.01}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <sprite scale={[3.25, 3.25, 1]} renderOrder={4}>
        <spriteMaterial
          ref={accretionMaterialRef}
          map={textures.accretion}
          transparent
          opacity={0.86}
          blending={AdditiveBlending}
          depthTest={false}
          depthWrite={false}
        />
      </sprite>
      <sprite scale={[1.35, 1.35, 1]} renderOrder={5}>
        <spriteMaterial
          ref={blackHoleMaterialRef}
          map={textures.blackHole}
          transparent
          opacity={0.9}
          depthTest={false}
          depthWrite={false}
        />
      </sprite>
    </group>
  );
}

export default function GalaxyBackground() {
  const reducedMotion = useReducedMotion();
  const scrollProgress = useScrollProgress();
  const supportsWebGL = typeof window !== "undefined" && Boolean(window.WebGLRenderingContext || window.WebGL2RenderingContext);

  if (!supportsWebGL) return null;

  return (
    <div className="galaxy-canvas" aria-hidden="true" style={{ opacity: 1 - scrollProgress * 0.36 }}>
      <Canvas
        camera={{ fov: 55, near: 0.1, far: 100, position: [0, 0.45, 9.5] }}
        dpr={[1, 2]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <GalaxyScene scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
