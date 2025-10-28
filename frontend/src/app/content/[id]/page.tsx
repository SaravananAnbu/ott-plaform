'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Content } from '@/types';

export default function ContentPage() {
  const params = useParams();
  const id = params?.id as string;
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock content data for demonstration
    const mockContent: Content = {
      id: id || '1',
      title: 'Sample Movie',
      description: 'This is a sample movie description.',
      thumbnail: 'https://images.unsplash.com/photo-1489599735786-1ef58c2c7119?w=300&h=450&fit=crop',
      backdrop: 'https://images.unsplash.com/photo-1489599735786-1ef58c2c7119?w=1920&h=1080&fit=crop',
      duration: '120',
      rating: '8.5',
      year: '2023',
      genre: 'Drama',
      type: 'movie',
      status: 'published',
      maturityRating: 'PG-13',
      cast: [],
      trailerUrl: 'https://example.com/trailer',
      videoUrl: 'https://example.com/video'
    };

    setContent(mockContent);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-ubuntu">
        <div className="text-white text-xl">Loading content...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-ubuntu">
        <div className="text-white text-xl">Content not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-ubuntu">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
        <p className="text-lg text-gray-300 mb-6">{content.description}</p>
        <div className="flex items-center gap-4 text-sm">
          <span className="bg-green-600 px-2 py-1 rounded">{content.rating}</span>
          <span>{content.year}</span>
          <span>{content.genre}</span>
          <span>{content.maturityRating}</span>
        </div>
      </div>
    </div>
  );
}