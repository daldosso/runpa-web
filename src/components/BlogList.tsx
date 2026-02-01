"use client";

import { posts as staticPosts, Post } from "../content/blogPosts";

export default function BlogList() {
  const posts: Post[] = staticPosts;

  if (!posts || posts.length === 0) {
    // Used "text-muted" from our CSS variables
    return <p className="text-sm text-muted">Nessun articolo disponibile.</p>;
  }

  return (
    <ul className="mx-auto max-w-3xl px-5 py-12 space-y-16">
      {posts.map((post) => (
        <li key={post.id}>
          {/* Metadata */}
          <div className="mb-3 text-sm text-muted flex flex-wrap gap-x-3 gap-y-1">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString()}
            </time>

            {(post.tags || []).map((t) => (
              <span
                key={t}
                // Changed to be more adaptive: light background on dark, or muted colors
                className="rounded-full bg-accent/10 px-3 py-0.5 text-xs text-accent"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Title - Removed text-slate-900 to use global foreground color */}
          <h2 className="text-2xl font-bold tracking-tight">
            {post.title}
          </h2>

          {/* Excerpt - Removed text-gray-700 to inherit correctly */}
          <p className="mt-4 text-base opacity-80 leading-relaxed">
            {post.excerpt}
          </p>
        </li>
      ))}
    </ul>
  );
}