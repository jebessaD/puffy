// app/not-found.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen fixed w-full bg-white text-black flex items-center justify-center px-6">
      <div className="text-center max-w-md animate-fade-in mb-20">
        <h1 className="text-7xl font-bold mb-4 text-black">404</h1>
        <p className="text-2xl font-semibold mb-2 text-black">Page Not Found</p>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-2xl text-sm font-semibold transition hover:bg-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back home
        </Link>
      </div>
    </main>
  );
}
