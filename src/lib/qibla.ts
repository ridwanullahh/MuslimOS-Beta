/**
 * Qibla direction calculator.
 * BismiLLAH Ar-Rahman Ar-Raheem.
 *
 * The Ka'bah is at 21.4225° N, 39.8262° E.
 * This module computes the bearing from the user's location to the Ka'bah
 * using the great-circle initial-bearing formula.
 */
export const KAABA_LAT = 21.4225241;
export const KAABA_LNG = 39.8261818;

const EARTH_RADIUS_KM = 6371;

function toRad(deg: number): number { return deg * Math.PI / 180; }
function toDeg(rad: number): number { return rad * 180 / Math.PI; }

/** Compute the initial bearing (degrees, 0-360 from true North, clockwise) from a point to the Ka'bah. */
export function qiblaBearing(lat: number, lng: number): number {
  const φ1 = toRad(lat);
  const φ2 = toRad(KAABA_LAT);
  const Δλ = toRad(KAABA_LNG - lng);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(y, x);
  return (toDeg(θ) + 360) % 360;
}

/** Great-circle distance from a point to the Ka'bah (km). */
export function qiblaDistance(lat: number, lng: number): number {
  const φ1 = toRad(lat);
  const φ2 = toRad(KAABA_LAT);
  const Δφ = toRad(KAABA_LAT - lat);
  const Δλ = toRad(KAABA_LNG - lng);
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

/** Normalize a device-orientation alpha angle to a 0-360 compass heading. */
export function alphaToHeading(alpha: number | null, webkitCompassHeading?: number | null): number | null {
  // iOS provides webkitCompassHeading directly (0 = North, clockwise)
  if (typeof webkitCompassHeading === 'number' && !isNaN(webkitCompassHeading)) {
    return webkitCompassHeading;
  }
  // Android provides alpha (0 = North when phone is held upright, but counter-clockwise)
  if (typeof alpha === 'number' && !isNaN(alpha)) {
    return (360 - alpha) % 360;
  }
  return null;
}

/** Request device-orientation permission on iOS 13+. Returns true if granted. */
export async function requestOrientationPermission(): Promise<boolean> {
  const anyDOE: any = (window as any).DeviceOrientationEvent;
  if (anyDOE && typeof anyDOE.requestPermission === 'function') {
    try {
      const result = await anyDOE.requestPermission();
      return result === 'granted';
    } catch {
      return false;
    }
  }
  return true; // no permission needed on this platform
}
