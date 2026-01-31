"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Head from "next/head";
import Image from "next/image";

import BlogList from "../components/BlogList";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex items-center justify-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500"></div>
    </div>
  ),
});

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

  const totalKm = (
    activities.reduce((sum, a) => sum + a.distance, 0) / 1000
  ).toFixed(1);

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-10">
      <Head>
        <title>Podistica Arona — RunPA Web</title>
      </Head>

      {/* Hero */}
      <section className="bg-gradient-to-r from-sky-100 via-sky-200 to-white rounded-lg p-8 shadow-md flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Benvenuti su <span className="text-sky-700">RunPA - Podistica Arona</span></h1>

          <p className="mt-2 text-gray-700">Visualizza le tue attività Strava, esplora la comunità e scopri i percorsi più lontani dall&apos;Arona.</p>

          <div className="mt-4 flex justify-center md:justify-start gap-3">
            {!token ? (
              <a href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/strava/web-callback-init`} className="inline-block">
                <Image src="/strava/btn_strava_connectwith_orange.png" alt="Connect with Strava" width={210} height={35} priority />
              </a>
            ) : (
              <div className="bg-sky-50 border border-sky-200 rounded px-4 py-2 text-sm text-sky-700">
                ✅ Connesso a Strava — {activities.length} attività ({totalKm} km totali)
              </div>
            )}

            <a href="/blog" className="inline-flex items-center px-4 py-2 bg-sky-600 text-white border border-sky-600 rounded shadow-sm text-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300 transition-colors" aria-label="Vai al blog">
              📰 Blog
            </a>
            <a href="/arona10k" className="inline-flex items-center px-4 py-2 bg-sky-600 text-white border border-sky-600 rounded shadow-sm text-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300 transition-colors" aria-label="Vai all'evento Arona 10K">
              📰 Arona 10k
            </a>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center">
          <Image src="/podistica-arona.png" alt="Podistica Arona" width={120} height={120} className="rounded-full shadow-lg" />
        </div>
      </section>

      {/* Activities */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Le ultime attività</h2>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500"></div>
            <p className="mt-3">Caricamento attività...</p>
          </div>
        )}

        {!loading && !token && (
          <p className="text-sm text-gray-600">Collega il tuo account Strava per vedere le tue attività qui.</p>
        )}

        {!loading && token && activities.length === 0 && (
          <p className="text-sm text-gray-600">Nessuna attività trovata.</p>
        )}

        {!loading && activities.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.slice(0, 6).map((a) => (
              <article key={a.id} className="border rounded p-4 shadow-sm">
                <h3 className="font-semibold">{a.name}</h3>
                <p className="text-sm text-gray-600">{(a.distance / 1000).toFixed(2)} km</p>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Community map */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Mappa della comunità</h2>
        <div className="rounded overflow-hidden shadow">
          <Map />
        </div>
      </section>

      {/* Blog */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Ultimi dal blog</h2>
        <div className="bg-white border rounded p-4 shadow-sm">
          <BlogList />
        </div>
      </section>

      <footer className="mt-6 py-6 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Image src="/podistica-arona.png" alt="Podistica Arona Logo" width={56} height={56} className="rounded-full" />
            <span className="text-sm">© Podistica Arona — Made with ❤️</span>
          </div>

          <div className="text-sm text-gray-600">
            <a href="/privacy" className="underline">Privacy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
