import { CanvasTexture, LinearFilter } from "three";

function createCanvasTexture(size, draw) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas 2D rendering is unavailable.");

  draw(context, size, size / 2);
  const texture = new CanvasTexture(canvas);
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  return texture;
}

function drawRay(context, center, angle, length, width, alpha) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const perpendicularX = -sin;
  const perpendicularY = cos;

  context.beginPath();
  context.moveTo(center + cos * 4 + perpendicularX * width, center + sin * 4 + perpendicularY * width);
  context.lineTo(center + cos * length, center + sin * length);
  context.lineTo(center + cos * 4 - perpendicularX * width, center + sin * 4 - perpendicularY * width);
  context.closePath();
  context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
  context.fill();
}

export function createStarTexture() {
  return createCanvasTexture(128, (context, size, center) => {
    const glow = context.createRadialGradient(center, center, 1, center, center, 48);
    glow.addColorStop(0, "rgba(255, 255, 255, 0.44)");
    glow.addColorStop(0.18, "rgba(255, 255, 255, 0.14)");
    glow.addColorStop(0.55, "rgba(190, 230, 255, 0.045)");
    glow.addColorStop(1, "rgba(255, 255, 255, 0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, size, size);

    for (let index = 0; index < 4; index += 1) drawRay(context, center, (Math.PI / 2) * index, 58, 1.15, 0.18);
    for (let index = 0; index < 4; index += 1) drawRay(context, center, Math.PI / 4 + (Math.PI / 2) * index, 36, 0.65, 0.1);

    const core = context.createRadialGradient(center, center, 0, center, center, 11);
    core.addColorStop(0, "rgba(255, 255, 255, 0.96)");
    core.addColorStop(0.28, "rgba(255, 255, 255, 0.72)");
    core.addColorStop(0.7, "rgba(235, 248, 255, 0.22)");
    core.addColorStop(1, "rgba(255, 255, 255, 0)");
    context.fillStyle = core;
    context.beginPath();
    context.arc(center, center, 12, 0, Math.PI * 2);
    context.fill();
  });
}

export function createGlowTexture() {
  return createCanvasTexture(96, (context, size, center) => {
    const gradient = context.createRadialGradient(center, center, 1, center, center, 45);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.5)");
    gradient.addColorStop(0.22, "rgba(255, 255, 255, 0.18)");
    gradient.addColorStop(0.64, "rgba(180, 230, 255, 0.06)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
  });
}

export function createAccretionTexture() {
  return createCanvasTexture(256, (context, _size, center) => {
    context.save();
    context.translate(center, center);
    context.scale(1, 0.32);
    context.shadowColor = "rgba(255, 235, 170, 0.48)";
    context.shadowBlur = 14;

    const ring = context.createLinearGradient(-118, 0, 118, 0);
    [
      [0, "rgba(110, 220, 255, 0)"],
      [0.2, "rgba(120, 222, 255, 0.25)"],
      [0.42, "rgba(255, 229, 152, 0.78)"],
      [0.58, "rgba(255, 245, 204, 0.9)"],
      [0.78, "rgba(255, 133, 188, 0.24)"],
      [1, "rgba(175, 150, 255, 0)"],
    ].forEach(([stop, color]) => ring.addColorStop(stop, color));

    context.strokeStyle = ring;
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

    // Decorative noise is seeded by the loop index so texture output remains deterministic.
    for (let index = 0; index < 170; index += 1) {
      const angle = ((index * 73) % 170) / 170 * Math.PI * 2;
      const radius = 63 + ((index * 47) % 29);
      const arcLength = 0.018 + ((index * 17) % 50) / 1000;
      context.save();
      context.translate(center, center);
      context.scale(1, 0.32);
      context.beginPath();
      context.arc(0, 0, radius, angle, angle + arcLength);
      context.strokeStyle = `rgba(255, ${216 + (index % 39)}, ${155 + (index % 86)}, ${0.18 + (index % 30) / 100})`;
      context.lineWidth = 0.75 + (index % 14) / 10;
      context.stroke();
      context.restore();
    }
  });
}

export function createBlackHoleTexture() {
  return createCanvasTexture(256, (context, size, center) => {
    const lens = context.createRadialGradient(center, center, 4, center, center, 118);
    [
      [0, "rgba(0, 0, 7, 0.92)"],
      [0.36, "rgba(1, 2, 12, 0.84)"],
      [0.48, "rgba(4, 8, 22, 0.62)"],
      [0.55, "rgba(255, 232, 171, 0.28)"],
      [0.63, "rgba(120, 225, 255, 0.18)"],
      [0.78, "rgba(158, 127, 255, 0.055)"],
      [1, "rgba(255, 255, 255, 0)"],
    ].forEach(([stop, color]) => lens.addColorStop(stop, color));
    context.fillStyle = lens;
    context.fillRect(0, 0, size, size);
    context.strokeStyle = "rgba(255, 245, 207, 0.42)";
    context.lineWidth = 2;
    context.shadowColor = "rgba(255, 235, 170, 0.62)";
    context.shadowBlur = 12;
    context.beginPath();
    context.arc(center, center, 55, 0, Math.PI * 2);
    context.stroke();
  });
}
