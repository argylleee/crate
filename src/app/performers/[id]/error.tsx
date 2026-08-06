'use client'; 

import { useEffect } from 'react';

export default function PerformerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void; 
}) {
  useEffect(() => {
    console.error('Performer page error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
      <p className="mt-2 text-gray-400">We couldn&apos;t load this performer&apos;s profile.</p>
      <button
        onClick={reset}
        className="mt-6 rounded-xl bg-purple-600 px-6 py-2 text-sm font-medium text-white hover:bg-purple-500"
      >
        Try Again
      </button>
    </div>
  );
}
