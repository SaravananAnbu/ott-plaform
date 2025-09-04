'use client';

import { useState, useEffect } from 'react';
import EnhancedHeader from '@/components/EnhancedHeader';
import ContentRow from '@/components/ContentRow';
import Footer from '@/components/Footer';
import { Content } from '@/types';
import { fetchMultiplePages, categorizeContent } from '@/utils/movieApiMapper';

export default function MoviesPage() {
  const [myList, setMyList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [movieContent, setMovieContent] = useState<{
    popular: Content[];
    action: Content[];
    drama: Content[];
    comedy: Content[];
    thriller: Content[];
    highRated: Content[];
  } | null>(null);
  
  const [profiles] = useState([
    {
      id: 1,
      name: 'John',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isKidsProfile: false
    },
    {
      id: 2,
      name: 'Kids',
      avatar: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop&crop=face',
      isKidsProfile: true
    }
  ]);
  const [currentProfile] = useState(profiles[0]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);

        // Fetch movies from multiple pages
        const allContent = await fetchMultiplePages([1, 2, 3]);
        
        if (allContent.length === 0) {
          throw new Error('No content received from API');
        }

        // Filter only movies and categorize
        const movies = allContent.filter(content => content.type === 'movie');
        const categories = categorizeContent(movies);
        
        setMovieContent({
          popular: categories.popular,
          action: categories.action,
          drama: categories.drama,
          comedy: categories.comedy,
          thriller: categories.thriller,
          highRated: categories.highRated
        });

      } catch (error) {
        console.error('Error loading movies:', error);
        // Fallback to mock data
        loadFallbackMovies();
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const loadFallbackMovies = () => {
    const fallbackMovie: Content = {
      id: '1',
      title: 'Action Movie',
      description: 'An exciting action-packed adventure.',
      thumbnail: 'https://images.unsplash.com/photo-1489599735786-1ef58c2c7119?w=300&h=450&fit=crop',
      backdrop: 'https://images.unsplash.com/photo-1489599735786-1ef58c2c7119?w=1920&h=1080&fit=crop',
      duration: '120',
      rating: '7.5',
      year: '2023',
      genre: 'Action',
      type: 'movie',
      status: 'published',
      maturityRating: '16+',
      cast: [],
      trailerUrl: 'https://example.com/trailer1',
      videoUrl: 'https://example.com/video1'
    };

    setMovieContent({
      popular: [fallbackMovie],
      action: [fallbackMovie],
      drama: [fallbackMovie],
      comedy: [fallbackMovie],
      thriller: [fallbackMovie],
      highRated: [fallbackMovie]
    });
  };

  const handlePlay = (content: Content) => {
    window.location.href = `/watch/${content.id}`;
  };

  const handleMoreInfo = (content: Content) => {
    window.location.href = `/content/${content.id}`;
  };

  const handleAddToList = (content: Content) => {
    setMyList(prev => {
      if (prev.includes(content.id)) {
        return prev.filter(id => id !== content.id);
      } else {
        return [...prev, content.id];
      }
    });
  };

  const isInList = (contentId: string) => myList.includes(contentId);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading movies...</div>
      </div>
    );
  }

  if (!movieContent) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Failed to load movies</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <EnhancedHeader profiles={profiles} currentProfile={currentProfile} />

      {/* Movies Hero Section */}
      <div className="pt-20 pb-8">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Movies</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Discover blockbuster movies, indie films, and everything in between.
          </p>
        </div>
      </div>

      {/* Movies Content Rows */}
      <div className="space-y-8 pb-16">
        {movieContent.popular.length > 0 && (
          <ContentRow
            title="🍿 Popular Movies"
            contents={movieContent.popular}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {movieContent.action.length > 0 && (
          <ContentRow
            title="💥 Action Movies"
            contents={movieContent.action}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {movieContent.drama.length > 0 && (
          <ContentRow
            title="🎭 Drama Movies"
            contents={movieContent.drama}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {movieContent.comedy.length > 0 && (
          <ContentRow
            title="😂 Comedy Movies"
            contents={movieContent.comedy}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {movieContent.thriller.length > 0 && (
          <ContentRow
            title="😱 Thriller Movies"
            contents={movieContent.thriller}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {movieContent.highRated.length > 0 && (
          <ContentRow
            title="⭐ Highly Rated Movies"
            contents={movieContent.highRated}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}