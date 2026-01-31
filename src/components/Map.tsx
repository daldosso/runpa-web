"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex items-center justify-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500"></div>
    </div>
  ),
});

export default function Map() {
  return <MapClient />;
}

