'use client';

import { PerformerCategory, Genre } from '@/types';

const categories: PerformerCategory[] = ['DJ', 'Band', 'Singer', 'Musician', 'Ensemble'];
const genres: Genre[] = ['House', 'Hip Hop', 'R&B', 'Pop', 'Jazz', 'Rock', 'Classical', 'Electronic', 'Latin', 'Country', 'Reggae', 'Soul', 'Funk', 'Folk', 'Afrobeats'];

interface SearchFilterProps {
    searchTerm: string,
    onSearchChange: (value: string) => void;
    selectedCategory: string;
    onCategoryChange: (value: string) => void;
    selectedGenre: string;
    onGenreChange: (value: string) => void;
}

export function SearchFilter({
    searchTerm,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    selectedGenre,
    onGenreChange,
}: SearchFilterProps) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-md">
            <div className="relative flex-1">
                <input
                    type="text"
                    placeholder="Search performers..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full rounded-xl bg-transparent py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-amber-500/20"
                />
                <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <select
                value={selectedGenre}
                onChange={(e) => onGenreChange(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            >
                <option value="">All Genres</option>
                {genres.map((g) => (
                    <option key={g} value={g}>
                        {g}
                    </option>
                ))}
            </select>
        </div>
    );
}