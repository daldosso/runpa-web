import { Suspense } from "react";
import HomePageContent from "./HomePageContent";

export default function Page() {
  return (
    <Suspense fallback={<p>Caricamento...</p>}>
      <HomePageContent />
    </Suspense>
  );
}
