/* eslint-disable @next/next/no-img-element */
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
  avatar?: string; // profile image
  activity_name?: string;
  activity_distance?: number;
  activity_date?: string;
  activity_location?: string;
}

interface RawFarthestAthlete {
  athlete: {
    id: number;
    firstname: string;
    lastname: string;
    profile?: string;
  };
  farthest_activity?: {
    id: number;
    name: string;
    distance: number;
    start_latlng: [number, number];
    start_date: string;
    distance_from_arona_km: number;
    location?: {
      city?: string;
      state?: string;
      country?: string;
    };
  };
}

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

export default function MapClient() {
  const [athletes, setAthletes] = useState<AthleteMarker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/strava/farthest-activities`
        );
        const data = await res.json();
        const formatted = (data as RawFarthestAthlete[])
          .filter((a) => a.farthest_activity?.start_latlng)
          .map((a) => ({
            id: a.athlete.id,
            name: a.athlete.firstname, // solo nome
            lat: a.farthest_activity!.start_latlng[0],
            lng: a.farthest_activity!.start_latlng[1],
            avatar: a.athlete.profile || undefined, // profile image
            activity_name: a.farthest_activity?.name,
            activity_distance: a.farthest_activity?.distance,
            activity_date: a.farthest_activity?.start_date,
            activity_location: a.farthest_activity?.location?.city || undefined,
          }));
        setAthletes(formatted);
      } catch (error) {
        console.error("❌ Failed to fetch farthest activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAthletes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

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
          <Popup autoClose={false} closeButton={false} autoPan={false}>
            <div className="text-center p-2 text-sm">
              {athlete.avatar && (
                <div className="flex justify-center mb-1">
                  <img
                    src={athlete.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              )}
              <strong>{athlete.name}</strong>
              {athlete.activity_location && (
                <p className="mt-1 text-xs italic text-gray-500">
                  📍 {athlete.activity_location}
                </p>
              )}
              {athlete.activity_name && (
                <div className="mt-2 text-left space-y-1">
                  <p>
                    <strong>🏃</strong> {athlete.activity_name}
                  </p>
                  <p>
                    <strong>📏</strong> {(athlete.activity_distance! / 1000).toFixed(2)} km
                  </p>
                  <p>
                    <strong>📅</strong> {(() => {
                      const d = new Date(athlete.activity_date || "");
                      return isNaN(d.getTime()) ? "N/D" : d.toLocaleDateString();
                    })()}
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
