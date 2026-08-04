'use client';

import { useState, useMemo } from 'react';
import { performers } from '@/data/performers';
import { PerformerCard } from '@/components/performers/PerformerCard';
import { SearchFilter } from '@/components/performers/SearchFilter';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

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
  }, [searchTerm, selectedCategory, selectedGenre]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Find Your Perfect
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {' '}Entertainer
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
          Discover and book DJs, musicians, bands, and more for your next event.
        </p>
      </div>

      <div className="mb-8">
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />
      </div>

      <p className="mb-6 text-sm text-gray-500">
        {filteredPerformers.length} performer{filteredPerformers.length !== 1 ? 's' : ''} found
      </p>

      {filteredPerformers.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPerformers.map((performer) => (
            <PerformerCard key={performer.id} performer={performer} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg text-gray-500">
            No performers found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
              setSelectedGenre('');
            }}
            className="mt-4 text-sm text-purple-400 hover:text-purple-300"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}