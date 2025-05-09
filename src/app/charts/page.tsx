// app/maps/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface AthleteFarthest {
  athlete: {
    id: number;
    firstname: string;
  };
  farthest_activity?: {
    distance_from_arona_km: number;
  };
}

interface AthleteWithActivities {
  id: number;
  firstname: string;
  lastname: string;
  last_activity: {
    average_speed: number;
  } | null;
  total_distance?: number;
}

interface BarChartData {
  name: string;
  value: number;
}

export default function LeaderboardPage() {
  const [farthest, setFarthest] = useState<AthleteFarthest[]>([]);
  const [allAthletes, setAllAthletes] = useState<AthleteWithActivities[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [farthestRes, allRes] = await Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/strava/farthest-activities`
        ).then((r) => r.json()),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/strava/athletes`).then(
          (r) => r.json()
        ),
      ]);
      setFarthest(farthestRes);
      setAllAthletes(allRes);
    };
    fetchData();
  }, []);

  const farthestSorted: BarChartData[] = farthest
    .filter((a) => a.farthest_activity)
    .map((a) => ({
      name: a.athlete.firstname,
      value: a.farthest_activity!.distance_from_arona_km,
    }))
    .sort((a, b) => b.value - a.value);

  const totalDistanceSorted: BarChartData[] = allAthletes
    .map((a) => ({
      name: a.firstname,
      value: a.total_distance || 0,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  const avgSpeedSorted: BarChartData[] = allAthletes
    .filter((a) => a.last_activity)
    .map((a) => ({
      name: a.firstname,
      value: +(a.last_activity!.average_speed * 3.6).toFixed(2),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  const renderBarChart = (title: string, data: BarChartData[]) => (
    <div className="mb-10">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6">
            <LabelList dataKey="value" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Classifiche RunPA</h1>
      {renderBarChart("Più lontano da Arona (km)", farthestSorted)}
      {renderBarChart("Più km totali (placeholder)", totalDistanceSorted)}
      {renderBarChart("Velocità media più alta (km/h)", avgSpeedSorted)}
    </div>
  );
}
