'use client';

import { useState, useMemo, useEffect } from 'react';
import { Performer } from '@/types';
import { PerformerCard } from '@/components/performers/PerformerCard';
import { SearchFilter } from '@/components/performers/SearchFilter';

export default function HomePage() {
  const [performers, setPerformers] = useState<Performer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    async function fetchPerformers() {
      try {
        const response = await fetch('/api/performers');
        const data = await response.json();
        setPerformers(data);
      } catch (error) {
        console.error('Failed to fetch performers:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPerformers();
  }, []);

  const filteredPerformers = useMemo(() => {
    return performers.filter((performer) => {
      const matchesSearch = performer.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === '' || performer.category === selectedCategory;

      const matchesGenre =
        selectedGenre === '' || performer.genre.includes(selectedGenre as any);

      return matchesSearch && matchesCategory && matchesGenre;
    });
  }, [performers, searchTerm, selectedCategory, selectedGenre]);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Book Live Entertainment for{' '}
            <span className="text-amber-600">
              Your Next Event
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">
            Discover and book DJs, musicians, bands, and more for your next event.
          </p>
        </div>

        <div className="mx-auto mb-10 max-w-4xl">
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
          />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500">
            {isLoading
              ? 'Loading performers…'
              : `Showing ${filteredPerformers.length} performer${filteredPerformers.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] animate-pulse rounded-2xl border border-slate-200/80 bg-slate-100"
              />
            ))}
          </div>
        ) : filteredPerformers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPerformers.map((performer) => (
              <PerformerCard key={performer.id} performer={performer} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <p className="text-lg font-medium text-slate-800">
              No performers found matching your criteria.
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try adjusting your search or clearing your filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedGenre('');
              }}
              className="mt-4 inline-flex items-center text-sm font-bold text-amber-600 hover:text-amber-700"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}