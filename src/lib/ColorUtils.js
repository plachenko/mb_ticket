export function hexToRgba(hex, alpha) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // Parse r, g, b values
  let bigint = parseInt(hex, 16);
  let r, g, b;

  if (hex.length === 3) {
    r = ((bigint >> 8) & 0xf) * 17;
    g = ((bigint >> 4) & 0xf) * 17;
    b = (bigint & 0xf) * 17;
  } else {
    r = (bigint >> 16) & 255;
    g = (bigint >> 8) & 255;
    b = bigint & 255;
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
