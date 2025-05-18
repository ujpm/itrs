import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

// Mock data: array of [lat, lng, intensity]
const points = [
  { lat: -1.95, lng: 30.06, count: 10 },
  { lat: -1.96, lng: 30.07, count: 5 },
  { lat: -1.97, lng: 30.05, count: 8 },
  { lat: -1.98, lng: 30.08, count: 2 },
  { lat: -1.94, lng: 30.09, count: 4 }
];

function HeatLayer() {
  const map = useMap();
  useEffect(() => {
    // @ts-ignore
    const heat = (window as any).L.heatLayer(
      points.map(p => [p.lat, p.lng, p.count]),
      { radius: 30, blur: 20, max: 10 }
    ).addTo(map);
    return () => { map.removeLayer(heat); };
  }, [map]);
  return null;
}

export default function ComplaintHeatmap() {
  return (
    <MapContainer center={[-1.96, 30.06]} zoom={13} style={{ height: 300, width: '100%', borderRadius: 8 }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <HeatLayer />
    </MapContainer>
  );
}
