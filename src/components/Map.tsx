"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngBoundsExpression } from "leaflet";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet's default marker icons
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
  last_activity_name?: string;
  last_activity_distance?: number;
  last_activity_type?: string;
  last_activity_date?: string;
}

interface RawAthlete {
  id: number;
  firstname: string;
  lastname: string;
  last_lat?: number;
  last_lng?: number;
  profile_medium?: string;
  last_activity?: {
    name: string;
    distance: number;
    type: string;
    start_date_local: string;
  };
}

// FitBounds to make all markers visible
function FitBoundsHelper({ athletes }: { athletes: AthleteMarker[] }) {
  const map = useMap();

  useEffect(() => {
    if (athletes.length > 0) {
      const bounds: LatLngBoundsExpression = athletes.map((a) => [
        a.lat,
        a.lng,
      ]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [athletes, map]);

  return null;
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
        last_activity_name: a.last_activity?.name,
        last_activity_distance: a.last_activity?.distance,
        last_activity_type: a.last_activity?.type,
        last_activity_date: a.last_activity?.start_date_local,
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
              {athlete.last_activity_name && (
                <div className="mt-2 text-sm text-left">
                  <p>
                    <strong>🏃 Attività:</strong> {athlete.last_activity_name}
                  </p>
                  <p>
                    <strong>📏 Distanza:</strong>{" "}
                    {(athlete.last_activity_distance! / 1000).toFixed(2)} km
                  </p>
                  <p>
                    <strong>📅 Data:</strong>{" "}
                    {new Date(athlete.last_activity_date!).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>⛳ Tipo:</strong> {athlete.last_activity_type}
                  </p>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
      <FitBoundsHelper athletes={athletes} />
    </MapContainer>
  );
}
