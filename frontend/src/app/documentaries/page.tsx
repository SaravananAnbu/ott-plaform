'use client';

import { useState, useEffect } from 'react';
import EnhancedHeader from '@/components/EnhancedHeader';
import ContentRow from '@/components/ContentRow';
import Footer from '@/components/Footer';
import { Content } from '@/types';
import { fetchMultiplePages, categorizeContent } from '@/utils/movieApiMapper';

export default function DocumentariesPage() {
  const [myList, setMyList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [docContent, setDocContent] = useState<{
    popular: Content[];
    nature: Content[];
    history: Content[];
    science: Content[];
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
    const loadDocumentaries = async () => {
      try {
        setLoading(true);

        // Fetch content from multiple pages
        const allContent = await fetchMultiplePages([1, 2, 3]);
        
        if (allContent.length === 0) {
          throw new Error('No content received from API');
        }

        // Filter only documentaries and categorize
        const documentaries = allContent.filter(content => 
          content.genre?.toLowerCase().includes('documentary') || 
          content.type === 'documentary'
        );
        const categories = categorizeContent(documentaries);
        
        setDocContent({
          popular: categories.popular,
          nature: documentaries.filter(doc => doc.genre?.toLowerCase().includes('nature')),
          history: documentaries.filter(doc => doc.genre?.toLowerCase().includes('history')),
          science: documentaries.filter(doc => doc.genre?.toLowerCase().includes('science')),
          highRated: categories.highRated,
          newReleases: categories.newReleases
        });

      } catch (error) {
        console.error('Error loading documentaries:', error);
        // Fallback to mock data
        loadFallbackDocumentaries();
      } finally {
        setLoading(false);
      }
    };

    loadDocumentaries();
  }, []);

  const loadFallbackDocumentaries = () => {
    const fallbackDoc: Content = {
      id: '1',
      title: 'Nature Documentary',
      description: 'An extraordinary journey through the natural world.',
      thumbnail: 'https://images.unsplash.com/photo-1489599735786-1ef58c2c7119?w=300&h=450&fit=crop',
      backdrop: 'https://images.unsplash.com/photo-1489599735786-1ef58c2c7119?w=1920&h=1080&fit=crop',
      duration: '90',
      rating: '8.8',
      year: '2023',
      genre: 'Documentary',
      type: 'documentary',
      status: 'published',
      maturityRating: 'PG',
      cast: [],
      trailerUrl: 'https://example.com/trailer1',
      videoUrl: 'https://example.com/video1'
    };

    setDocContent({
      popular: [fallbackDoc],
      nature: [fallbackDoc],
      history: [fallbackDoc],
      science: [fallbackDoc],
      highRated: [fallbackDoc],
      newReleases: [fallbackDoc]
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
        <div className="text-white text-xl">Loading documentaries...</div>
      </div>
    );
  }

  if (!docContent) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Failed to load documentaries</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <EnhancedHeader profiles={profiles} currentProfile={currentProfile} />

      {/* Documentaries Hero Section */}
      <div className="pt-20 pb-8">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Documentaries</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Explore the world through powerful documentaries that inform, inspire, and entertain.
          </p>
        </div>
      </div>

      {/* Documentaries Content Rows */}
      <div className="space-y-8 pb-16">
        {docContent.popular.length > 0 && (
          <ContentRow
            title="🎬 Popular Documentaries"
            contents={docContent.popular}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {docContent.nature.length > 0 && (
          <ContentRow
            title="🌿 Nature & Wildlife"
            contents={docContent.nature}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {docContent.science.length > 0 && (
          <ContentRow
            title="🔬 Science & Technology"
            contents={docContent.science}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {docContent.history.length > 0 && (
          <ContentRow
            title="🏛️ History & Culture"
            contents={docContent.history}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {docContent.newReleases.length > 0 && (
          <ContentRow
            title="🆕 Recently Added"
            contents={docContent.newReleases}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
            isInList={isInList}
          />
        )}

        {docContent.highRated.length > 0 && (
          <ContentRow
            title="⭐ Award-Winning Documentaries"
            contents={docContent.highRated}
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