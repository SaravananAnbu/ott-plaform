'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-black text-white font-ubuntu">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Search</h1>
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for movies, TV shows, documentaries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-white focus:outline-none font-ubuntu"
          />
        </div>
        {query && (
          <div className="text-center text-gray-400">
            <p>Search results for "{query}" would appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}