'use client';

import { useState, useEffect } from 'react';
import EnhancedHeader from '@/components/EnhancedHeader';
import ContentRow from '@/components/ContentRow';
import Footer from '@/components/Footer';
import { Content } from '@/types';

export default function MyListPage() {
  const [myList, setMyList] = useState<string[]>([]);
  const [myListContent, setMyListContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  
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
    const loadMyList = async () => {
      try {
        setLoading(true);

        // Get saved list from localStorage
        const savedList = localStorage.getItem('myList');
        if (savedList) {
          const listIds = JSON.parse(savedList);
          setMyList(listIds);
          
          // In a real app, you would fetch the content details for these IDs
          // For now, we'll use mock data
          const mockContent: Content[] = listIds.map((id: string, index: number) => ({
            id,
            title: `My Saved Content ${index + 1}`,
            description: 'Content saved to your list.',
            thumbnail: 'https://images.unsplash.com/photo-1489599735786-1ef58c2c7119?w=300&h=450&fit=crop',
            backdrop: 'https://images.unsplash.com/photo-1489599735786-1ef58c2c7119?w=1920&h=1080&fit=crop',
            duration: '120',
            rating: '8.0',
            year: '2023',
            genre: 'Drama',
            type: 'movie',
            status: 'published',
            maturityRating: '16+',
            cast: [],
            trailerUrl: 'https://example.com/trailer',
            videoUrl: 'https://example.com/video'
          }));
          
          setMyListContent(mockContent);
        }

      } catch (error) {
        console.error('Error loading my list:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMyList();
  }, []);

  const handlePlay = (content: Content) => {
    window.location.href = `/watch/${content.id}`;
  };

  const handleMoreInfo = (content: Content) => {
    window.location.href = `/content/${content.id}`;
  };

  const handleRemoveFromList = (content: Content) => {
    const updatedList = myList.filter(id => id !== content.id);
    const updatedContent = myListContent.filter(item => item.id !== content.id);
    
    setMyList(updatedList);
    setMyListContent(updatedContent);
    
    // Save to localStorage
    localStorage.setItem('myList', JSON.stringify(updatedList));
  };

  const isInList = (contentId: string) => myList.includes(contentId);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading your list...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <EnhancedHeader profiles={profiles} currentProfile={currentProfile} />

      {/* My List Hero Section */}
      <div className="pt-20 pb-8">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">My List</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            {myListContent.length > 0 
              ? `${myListContent.length} title${myListContent.length !== 1 ? 's' : ''} saved for later` 
              : 'Your personal collection of saved content'}
          </p>
        </div>
      </div>

      {/* My List Content */}
      <div className="space-y-8 pb-16">
        {myListContent.length > 0 ? (
          <ContentRow
            title="📌 Your Saved Content"
            contents={myListContent}
            onContentSelect={handleMoreInfo}
            onPlay={handlePlay}
            onAddToList={handleRemoveFromList}
            isInList={isInList}
          />
        ) : (
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <h2 className="text-2xl font-bold text-white mb-4">Your list is empty</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Browse our content and add movies, TV shows, and documentaries to your list to watch later.
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Browse Content
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}