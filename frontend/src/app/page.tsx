'use client';

import { useState, useEffect } from 'react';
import EnhancedHeader from '@/components/EnhancedHeader';
import FeaturedBillboard from '@/components/FeaturedBillboard';
import ContentRow from '@/components/ContentRow';
import Footer from '@/components/Footer';
import { Content } from '@/types';
import { fetchMultiplePages, categorizeContent } from '@/utils/movieApiMapper';

export default function HomePage() {
  const [featuredContent, setFeaturedContent] = useState<Content | null>(null);
  const [myList, setMyList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [contentCategories, setContentCategories] = useState<{
    trending: Content[];
    newReleases: Content[];
    popular: Content[];
    action: Content[];
    drama: Content[];
    comedy: Content[];
    thriller: Content[];
    international: Content[];
    highRated: Content[];
    recentlyAdded: Content[];
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
    const loadContent = async () => {
      try {
        setLoading(true);

        // Fetch movies from multiple pages for variety
        const allContent = await fetchMultiplePages([1, 2, 3, 4, 5]);
        
        if (allContent.length === 0) {
          throw new Error('No content received from API');
        }

        // Categorize content
        const categories = categorizeContent(allContent);
        setContentCategories(categories);

        // Set featured content (highest popularity + high rating)
        const featuredMovie = categories.trending.find(content => 
          content.rating && parseFloat(content.rating) > 7.0
        ) || categories.trending[0];
        
        setFeaturedContent(featuredMovie);

      } catch (error) {
        console.error('Error loading content:', error);
        // Fallback to mock data if API fails
        loadFallbackContent();
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const loadFallbackContent = () => {
    const fallbackContent: Content = {
      id: '1',
      title: 'Stranger Things',
      description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments.',
      thumbnail: 'https://images.unsplash.com/photo-1489599735786-1ef58c2c7119?w=300&h=450&fit=crop',
      backdrop: 'https://images.unsplash.com/photo-1489599735786-1ef58c2c7119?w=1920&h=1080&fit=crop',
      duration: '45',
      rating: '8.7',
      year: '2016',
      genre: 'Sci-Fi',
      type: 'series',
      status: 'published',
      maturityRating: '16+',
      cast: [],
      trailerUrl: 'https://example.com/trailer1',
      videoUrl: 'https://example.com/video1'
    };

    setFeaturedContent(fallbackContent);
    const mockCategories = {
      trending: [fallbackContent],
      newReleases: [fallbackContent],
      popular: [fallbackContent],
      action: [],
      drama: [fallbackContent],
      comedy: [],
      thriller: [],
      international: [],
      highRated: [fallbackContent],
      recentlyAdded: [fallbackContent]
    };
    setContentCategories(mockCategories);
  };

  const handlePlay = (content?: Content) => {
    if (content) {
      window.location.href = `/watch/${content.id}`;
    } else if (featuredContent) {
      window.location.href = `/watch/${featuredContent.id}`;
    }
  };

  const handleMoreInfo = (content?: Content) => {
    if (content) {
      window.location.href = `/content/${content.id}`;
    } else if (featuredContent) {
      window.location.href = `/content/${featuredContent.id}`;
    }
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
      <div className="min-h-screen bg-black flex items-center justify-center font-ubuntu">
        <div className="text-white text-xl">Loading amazing content...</div>
      </div>
    );
  }

  if (!featuredContent || !contentCategories) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-ubuntu">
        <div className="text-white text-xl">Failed to load content</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-ubuntu">
      <EnhancedHeader profiles={profiles} currentProfile={currentProfile} />

      <FeaturedBillboard
        content={featuredContent}
        onPlay={() => handlePlay()}
        onMoreInfo={() => handleMoreInfo()}
        onAddToList={() => handleAddToList(featuredContent)}
        isInList={isInList(featuredContent.id)}
      />

      {/* Enhanced Content Rows with Netflix-like organization */}
      <div className="space-y-8 pb-16">
        {/* Trending Section */}
        {contentCategories.trending.length > 0 && (
          <ContentRow
            title="🔥 Trending Now"
            contents={contentCategories.trending}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {/* New Releases */}
        {contentCategories.newReleases.length > 0 && (
          <ContentRow
            title="🆕 New Releases"
            contents={contentCategories.newReleases}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {/* Popular Movies */}
        {contentCategories.popular.length > 0 && (
          <ContentRow
            title="⭐ Popular on StreamFlix"
            contents={contentCategories.popular}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {/* High Rated Content */}
        {contentCategories.highRated.length > 0 && (
          <ContentRow
            title="🏆 Critically Acclaimed"
            contents={contentCategories.highRated}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {/* Action Movies */}
        {contentCategories.action.length > 0 && (
          <ContentRow
            title="💥 Action & Adventure"
            contents={contentCategories.action}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {/* Drama */}
        {contentCategories.drama.length > 0 && (
          <ContentRow
            title="🎭 Drama & Award Winners"
            contents={contentCategories.drama}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {/* International Content */}
        {contentCategories.international.length > 0 && (
          <ContentRow
            title="🌍 International Movies"
            contents={contentCategories.international}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {/* Thriller */}
        {contentCategories.thriller.length > 0 && (
          <ContentRow
            title="😱 Thriller & Suspense"
            contents={contentCategories.thriller}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {/* Comedy */}
        {contentCategories.comedy.length > 0 && (
          <ContentRow
            title="😂 Comedy & Feel Good"
            contents={contentCategories.comedy}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {/* Recently Added */}
        {contentCategories.recentlyAdded.length > 0 && (
          <ContentRow
            title="📅 Recently Added"
            contents={contentCategories.recentlyAdded}
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

