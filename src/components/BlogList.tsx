// src/components/BlogList.tsx
"use client";

import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore nel recupero dei post:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>⏳ Caricamento post...</p>;

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.id} className="border-b pb-2">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-600">{post.body}</p>
        </li>
      ))}
    </ul>
  );
}
