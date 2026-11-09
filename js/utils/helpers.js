/**
 * Math & DOM helper utilities
 */
export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

export function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

export function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}
