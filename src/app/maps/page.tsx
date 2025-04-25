// app/maps/page.tsx
"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function MapsPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Athletes Map</h1>
      <div className="rounded overflow-hidden shadow">
        <Map />
      </div>
      <div className="mt-6 text-sm text-center">
        <Link href="/">← Back to Home</Link>
      </div>
    </main>
  );
}
