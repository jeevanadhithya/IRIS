import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DEFAULT_ZOOM = 5;

type Props = { className?: string };

export default function IndiaMap({ className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: [20.5937, 78.9629],
      zoom: DEFAULT_ZOOM,
      minZoom: DEFAULT_ZOOM,
      maxZoom: 19,
      worldCopyJump: true,
      scrollWheelZoom: true,
      zoomControl: true,
      attributionControl: true,
      maxBounds: [
        [5.0, 60.0], // Southwest coordinates
        [40.0, 100.0] // Northeast coordinates
      ],
      maxBoundsViscosity: 1.0,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: DEFAULT_ZOOM,
      maxZoom: 19,
    }).addTo(map);
    mapRef.current = map;
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`h-[600px] w-full rounded-lg border border-border ${className ?? ""}`}
    />
  );
}
