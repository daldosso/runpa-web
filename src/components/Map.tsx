// components/Map.tsx
"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: iconUrl.src,
  shadowUrl: iconShadowUrl.src,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface AthleteMarker {
  id: number;
  name: string;
  lat: number;
  lng: number;
  avatar?: string;
}

interface RawAthlete {
  id: number;
  firstname: string;
  lastname: string;
  last_lat?: number;
  last_lng?: number;
  profile_medium?: string;
}

export default function Map() {
  const [athletes, setAthletes] = useState<AthleteMarker[]>([]);

  useEffect(() => {
    const fetchAthletes = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/strava/athletes`
      );
      const data = await res.json();
      const formatted = (data as RawAthlete[]).map((a) => ({
        id: a.id,
        name: `${a.firstname} ${a.lastname}`,
        lat: a.last_lat || 45.758,
        lng: a.last_lng || 8.556,
        avatar: a.profile_medium || undefined,
      }));
      setAthletes(formatted);
    };

    fetchAthletes();
  }, []);

  return (
    <MapContainer
      center={[45.758, 8.556]}
      zoom={13}
      scrollWheelZoom={true}
      className="h-[500px] w-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {athletes.map((athlete) => (
        <Marker key={athlete.id} position={[athlete.lat, athlete.lng]}>
          <Popup>
            <div className="text-center">
              <strong>{athlete.name}</strong>
              {athlete.avatar && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={athlete.avatar}
                  alt={athlete.name}
                  className="mt-2 mx-auto rounded-full w-12 h-12 object-cover"
                />
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
