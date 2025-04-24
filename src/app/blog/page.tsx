// src/app/blog/page.tsx
import { Metadata } from "next";
import BlogList from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Blog | Podistica Arona",
  description: "Ultime notizie e aggiornamenti",
};

export default function BlogPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      <BlogList />
    </main>
  );
}
