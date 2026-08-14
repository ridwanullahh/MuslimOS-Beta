/**
 * Nearby places finder using the OpenStreetMap Overpass API.
 * BismiLLAH Ar-Rahman Ar-Raheem.
 *
 * No API key required — free public endpoint.
 */
export interface Place {
  id: number;
  name: string;
  type: string;
  lat: number;
  lng: number;
  distanceKm: number;
  address?: string;
}

export interface Coords { lat: number; lng: number; }

function haversineKm(a: Coords, b: Coords): number {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const la1 = a.lat * Math.PI / 180, la2 = b.lat * Math.PI / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

/** Find mosques within `radiusKm` of the given coordinates. */
export async function findMosques(coords: Coords, radiusKm = 10): Promise<Place[]> {
  const q = `[out:json][timeout:25];
(
  node["amenity"="place_of_worship"]["religion"="muslim"](around:${radiusKm * 1000},${coords.lat},${coords.lng});
  way["amenity"="place_of_worship"]["religion"="muslim"](around:${radiusKm * 1000},${coords.lat},${coords.lng});
);
out center 30;`;
  const res = await fetch(OVERPASS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: q,
  });
  if (!res.ok) throw new Error(`Overpass ${res.status}`);
  const j = await res.json();
  const places: Place[] = (j.elements || []).map((e: any) => {
    const lat = e.lat ?? e.center?.lat;
    const lng = e.lon ?? e.center?.lng;
    return {
      id: e.id,
      name: e.tags?.name || e.tags?.['name:en'] || 'Unnamed Mosque',
      type: e.tags?.denomination || 'mosque',
      lat, lng,
      distanceKm: haversineKm(coords, { lat, lng }),
      address: e.tags?.['addr:street'] || undefined,
    };
  }).filter((p: Place) => typeof p.lat === 'number');
  return places.sort((a, b) => a.distanceKm - b.distanceKm);
}

/** Find halal restaurants within `radiusKm` of the given coordinates. */
export async function findHalal(coords: Coords, radiusKm = 10): Promise<Place[]> {
  const q = `[out:json][timeout:25];
(
  node["amenity"="restaurant"]["diet:halal"="yes"](around:${radiusKm * 1000},${coords.lat},${coords.lng});
  way["amenity"="restaurant"]["diet:halal"="yes"](around:${radiusKm * 1000},${coords.lat},${coords.lng});
  node["amenity"="fast_food"]["diet:halal"="yes"](around:${radiusKm * 1000},${coords.lat},${coords.lng});
  way["amenity"="fast_food"]["diet:halal"="yes"](around:${radiusKm * 1000},${coords.lat},${coords.lng});
);
out center 30;`;
  const res = await fetch(OVERPASS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: q,
  });
  if (!res.ok) throw new Error(`Overpass ${res.status}`);
  const j = await res.json();
  const places: Place[] = (j.elements || []).map((e: any) => {
    const lat = e.lat ?? e.center?.lat;
    const lng = e.lon ?? e.center?.lng;
    return {
      id: e.id,
      name: e.tags?.name || e.tags?.['name:en'] || 'Halal Restaurant',
      type: e.tags?.amenity === 'fast_food' ? 'Fast Food' : 'Restaurant',
      lat, lng,
      distanceKm: haversineKm(coords, { lat, lng }),
      address: e.tags?.['addr:street'] || e.tags?.cuisine || undefined,
    };
  }).filter((p: Place) => typeof p.lat === 'number');
  return places.sort((a, b) => a.distanceKm - b.distanceKm);
}
