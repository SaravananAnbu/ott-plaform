'use client';

import { useState, useEffect } from 'react';
import EnhancedHeader from '@/components/EnhancedHeader';
import ContentRow from '@/components/ContentRow';
import Footer from '@/components/Footer';
import { Content } from '@/types';
import { fetchMultiplePages, categorizeContent } from '@/utils/movieApiMapper';

export default function TVShowsPage() {
  const [myList, setMyList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [tvContent, setTvContent] = useState<{
    popular: Content[];
    drama: Content[];
    comedy: Content[];
    thriller: Content[];
    highRated: Content[];
    newReleases: Content[];
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
    const loadTVShows = async () => {
      try {
        setLoading(true);

        // Fetch content from multiple pages
        const allContent = await fetchMultiplePages([1, 2, 3]);
        
        if (allContent.length === 0) {
          throw new Error('No content received from API');
        }

        // Filter only TV shows and categorize
        const tvShows = allContent.filter(content => content.type === 'series');
        const categories = categorizeContent(tvShows);
        
        setTvContent({
          popular: categories.popular,
          drama: categories.drama,
          comedy: categories.comedy,
          thriller: categories.thriller,
          highRated: categories.highRated,
          newReleases: categories.newReleases
        });

      } catch (error) {
        console.error('Error loading TV shows:', error);
        // Fallback to mock data
        loadFallbackTVShows();
      } finally {
        setLoading(false);
      }
    };

    loadTVShows();
  }, []);

  const loadFallbackTVShows = () => {
    const fallbackTVShow: Content = {
      id: '1',
      title: 'Drama Series',
      description: 'A compelling drama series with outstanding performances.',
      thumbnail: 'https://images.unsplash.com/photo-1489599735786-1ef58c2c7119?w=300&h=450&fit=crop',
      backdrop: 'https://images.unsplash.com/photo-1489599735786-1ef58c2c7119?w=1920&h=1080&fit=crop',
      duration: '45',
      rating: '8.5',
      year: '2023',
      genre: 'Drama',
      type: 'series',
      status: 'published',
      maturityRating: '16+',
      cast: [],
      trailerUrl: 'https://example.com/trailer1',
      videoUrl: 'https://example.com/video1'
    };

    setTvContent({
      popular: [fallbackTVShow],
      drama: [fallbackTVShow],
      comedy: [fallbackTVShow],
      thriller: [fallbackTVShow],
      highRated: [fallbackTVShow],
      newReleases: [fallbackTVShow]
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
        <div className="text-white text-xl">Loading TV shows...</div>
      </div>
    );
  }

  if (!tvContent) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Failed to load TV shows</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <EnhancedHeader profiles={profiles} currentProfile={currentProfile} />

      {/* TV Shows Hero Section */}
      <div className="pt-20 pb-8">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">TV Shows</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Binge-watch the best series, from critically acclaimed dramas to laugh-out-loud comedies.
          </p>
        </div>
      </div>

      {/* TV Shows Content Rows */}
      <div className="space-y-8 pb-16">
        {tvContent.popular.length > 0 && (
          <ContentRow
            title="📺 Popular TV Shows"
            contents={tvContent.popular}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {tvContent.newReleases.length > 0 && (
          <ContentRow
            title="🆕 New Episodes"
            contents={tvContent.newReleases}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {tvContent.drama.length > 0 && (
          <ContentRow
            title="🎭 Drama Series"
            contents={tvContent.drama}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {tvContent.comedy.length > 0 && (
          <ContentRow
            title="😂 Comedy Series"
            contents={tvContent.comedy}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {tvContent.thriller.length > 0 && (
          <ContentRow
            title="😱 Thriller Series"
            contents={tvContent.thriller}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {tvContent.highRated.length > 0 && (
          <ContentRow
            title="⭐ Award-Winning Series"
            contents={tvContent.highRated}
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