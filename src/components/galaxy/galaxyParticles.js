import { BufferAttribute, BufferGeometry, Color, DynamicDrawUsage } from "three";

const ARM_COUNT = 5;

function createRandom(seed = 0xdecafbad) {
  let state = seed >>> 0;

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function createGalaxyParticles(particleCount) {
  const random = createRandom(particleCount);
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const baseAngles = new Float32Array(particleCount);
  const radii = new Float32Array(particleCount);
  const jitters = new Float32Array(particleCount * 3);
  const speeds = new Float32Array(particleCount);
  const coreColor = new Color("#fff1bf");
  const white = new Color("#f8fbff");
  const cyan = new Color("#69e6ff");
  const violet = new Color("#a98bff");
  const rose = new Color("#ff7ab6");

  for (let index = 0; index < particleCount; index += 1) {
    const positionIndex = index * 3;
    const radius = Math.pow(random(), 0.62) * 7.4 + 0.08;
    const armAngle = ((index % ARM_COUNT) / ARM_COUNT) * Math.PI * 2;
    const angle = armAngle + radius * 0.72 + (random() - 0.5) * (0.5 + radius * 0.12);
    const spread = Math.pow(random(), 2.1) * (0.18 + radius * 0.08);
    const tangentSpread = (random() - 0.5) * spread;

    baseAngles[index] = angle;
    radii[index] = radius;
    jitters[positionIndex] = Math.cos(angle + Math.PI / 2) * tangentSpread;
    jitters[positionIndex + 1] = (random() - 0.5) * (0.08 + radius * 0.018);
    jitters[positionIndex + 2] = Math.sin(angle + Math.PI / 2) * tangentSpread;
    speeds[index] = 0.045 / (0.45 + radius * 0.18) + random() * 0.006;

    const tint = cyan.clone().lerp(index % 3 === 0 ? violet : rose, random() * 0.42);
    const outerColor = white.clone().lerp(tint, 0.28 + random() * 0.22);
    const color = coreColor.clone().lerp(outerColor, Math.min(radius / 5.8, 1));
    colors[positionIndex] = color.r;
    colors[positionIndex + 1] = color.g;
    colors[positionIndex + 2] = color.b;
  }

  updateGalaxyPositions({ positions, baseAngles, radii, jitters, speeds }, 0, 0, true);

  const geometry = new BufferGeometry();
  const positionAttribute = new BufferAttribute(positions, 3);
  positionAttribute.setUsage(DynamicDrawUsage);
  geometry.setAttribute("position", positionAttribute);
  geometry.setAttribute("color", new BufferAttribute(colors, 3));

  return { geometry, positions, baseAngles, radii, jitters, speeds };
}

export function updateGalaxyPositions(particles, elapsed, angleOffset, reducedMotion = false) {
  const { positions, baseAngles, radii, jitters, speeds } = particles;

  for (let index = 0; index < radii.length; index += 1) {
    const positionIndex = index * 3;
    const radius = radii[index];
    const angle = baseAngles[index] + angleOffset + (reducedMotion ? 0 : elapsed * speeds[index]);
    const wave = reducedMotion ? 0 : Math.sin(elapsed * 0.45 + radius * 1.7) * 0.025;

    positions[positionIndex] = Math.cos(angle) * radius + jitters[positionIndex];
    positions[positionIndex + 1] = jitters[positionIndex + 1] + wave;
    positions[positionIndex + 2] = Math.sin(angle) * radius + jitters[positionIndex + 2];
  }
}
