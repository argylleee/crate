'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface FavoriteButtonProps {
  performerId: string;
  initialFavorited: boolean;
  onToggle?: (performerId: string, isFavorited: boolean) => void;
}

export function FavoriteButton({ performerId, initialFavorited, onToggle }: FavoriteButtonProps) {
  const router = useRouter();
  const { status } = useSession();
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [isSaving, setIsSaving] = useState(false);
  const [prevInitial, setPrevInitial] = useState(initialFavorited);

  if (initialFavorited !== prevInitial) {
    setPrevInitial(initialFavorited);
    setIsFavorited(initialFavorited);
  }

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (status !== 'authenticated') {
      router.push('/auth/signin');
      return;
    }

    const nextValue = !isFavorited;
    setIsFavorited(nextValue);
    onToggle?.(performerId, nextValue);
    setIsSaving(true);

    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ performerId }),
      });

      if (!res.ok) throw new Error('Request failed');

      const data = await res.json();
      if (data.favorited !== nextValue) {
        setIsFavorited(data.favorited);
        onToggle?.(performerId, data.favorited);
      }
    } catch {
      setIsFavorited(!nextValue);
      onToggle?.(performerId, !nextValue);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={isSaving}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-all hover:bg-white active:scale-95 disabled:cursor-not-allowed"
      aria-label={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
      aria-pressed={isFavorited}
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-4.5 w-4.5 transition-transform ${isFavorited ? 'scale-110 fill-amber-500 text-amber-500' : 'fill-none text-slate-700'}`}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      >
        <path d="M5 3a2 2 0 0 0-2 2v16l9-5.5L21 21V5a2 2 0 0 0-2-2z" />
      </svg>
    </button>
  );
}
