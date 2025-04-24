"use client";

export default function PrivacyPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Privacy Policy & Security Notice
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          🔐 Privacy Policy for RunPA
        </h2>
        <p className="mb-2">
          \ RunPA is a non-commercial application developed for members of the
          Podistica Arona running group. This application uses the Strava API to
          allow authenticated users to view their own activity data.
        </p>
        <p className="mb-2 font-semibold">What data we access:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Basic profile information (name, location, profile picture)</li>
          <li>Activity data (name, distance, duration, time, pace)</li>
        </ul>
        <p className="mb-2 font-semibold">
          We do not access, store or display:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Data from other users</li>
          <li>
            Heart rate, power, cadence or location unless explicitly needed and
            consented
          </li>
        </ul>
        <p className="mb-2">
          \ All access tokens are stored securely and used only for
          authenticated API requests. No data is sold or shared with third
          parties. You can revoke access at any time via your Strava settings.
        </p>
        <p className="italic">
          \ This application uses the Strava API but is{" "}
          <strong>not endorsed or certified</strong> by Strava, Inc.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">🔐 Security Notice</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Never share your access token or client secret publicly</li>
          <li>All tokens are stored server-side in a secured database</li>
          <li>Frontend and backend communicate over HTTPS only</li>
        </ul>
        <p>
          If you find a security issue or have a privacy-related concern, please
          contact:
        </p>
        <p className="mt-2 font-medium">
          Alberto Dal Dosso – daldosso [at] gmail.com
        </p>
      </section>
    </main>
  );
}
