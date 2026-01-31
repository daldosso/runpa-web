// src/components/BlogList.tsx
"use client";

import { posts as staticPosts, Post } from "../content/blogPosts";

export default function BlogList() {
  const posts: Post[] = staticPosts;

  if (!posts || posts.length === 0) return <p>🔍 Nessun articolo disponibile.</p>;

  return (
    <ul className="space-y-6">
      {posts.map((post) => (
        <li key={post.id} className="border-b pb-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">{post.title}</h2>
              <p className="mt-1 text-sm text-gray-700">{post.excerpt}</p>
            </div>

            <div className="text-xs text-gray-500 md:text-right whitespace-nowrap">
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
              <div className="mt-2 flex gap-2 justify-start md:justify-end">
                {(post.tags || []).map((t) => (
                  <span key={t} className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-700">{post.body}</p>
        </li>
      ))}
    </ul>
  );
}
