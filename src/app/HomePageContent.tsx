"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Activity = {
  id: number;
  name: string;
  distance: number;
};

export default function HomePageContent() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const t = searchParams.get("token");
    if (t) setToken(t);
  }, [searchParams]);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/strava/activities`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setActivities(data);
      } catch (err) {
        console.error("Errore nel recupero attività:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [token]);

  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/strava/web-callback-init`;
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">RunPA Web</h1>

      {!token && (
        <button
          onClick={handleLogin}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Carica le tue attività su Strava
        </button>
      )}

      {loading && <p>⏳ Caricamento attività...</p>}

      {!loading && token && activities.length > 0 && (
        <ul className="mt-4">
          {activities.map((a) => (
            <li key={a.id} className="mb-2">
              <strong>{a.name}</strong> – {(a.distance / 1000).toFixed(2)} km
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
