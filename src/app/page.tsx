"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function HomePage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  useEffect(() => {
    const fetchActivities = async () => {
      if (!token) return;
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/strava/activities`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setActivities(data);
      setLoading(false);
    };

    fetchActivities();
  }, [token]);

  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/strava/web-callback-init`;
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">RunPA Web</h1>
      {!token ? (
        <button
          onClick={handleLogin}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Carica le tue attività su Strava
        </button>
      ) : loading ? (
        <p>Caricamento attività...</p>
      ) : (
        <ul>
          {activities.map((a, i) => (
            <li key={i} className="mb-2">
              <strong>{a.name}</strong> – {(a.distance / 1000).toFixed(2)} km
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
