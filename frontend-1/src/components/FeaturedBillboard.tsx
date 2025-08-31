'use client';

import { useState, useEffect } from 'react';
import { Play, Info, Plus, Check, Volume2, VolumeX, Star } from 'lucide-react';
import { Content } from '@/types';

interface FeaturedBillboardProps {
  content: Content;
  onPlay?: () => void;
  onAddToList?: () => void;
  onMoreInfo?: () => void;
  isInList?: boolean;
}

export default function FeaturedBillboard({ 
  content, 
  onPlay, 
  onAddToList, 
  onMoreInfo, 
  isInList = false 
}: FeaturedBillboardProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatDescription = (desc: string) => {
    if (desc.length > 200) {
      return desc.substring(0, 200) + '...';
    }
    return desc;
  };

  const getImageSrc = () => {
    return content.backdrop || content.bannerUrl || content.poster || content.thumbnail || 
           `https://images.unsplash.com/photo-1489599735786-1ef58c2c7119?w=1920&h=1080&fit=crop&q=80`;
  };

  return (
    <section className="relative h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={getImageSrc()}
          alt={content.title}
          className="w-full h-full object-cover scale-105"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Gradient Overlays - Enhanced for better readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32">
        <div className="max-w-2xl">
          {/* Category Badge */}
          {content.genre && (
            <div className="inline-flex items-center mb-4">
              <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                STREAMFLIX ORIGINAL
              </span>
              <span className="ml-3 text-gray-300 text-sm font-medium">
                {content.genre}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
            {content.title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-white mb-6">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-lg font-semibold">{content.rating || 'N/A'}</span>
            </div>
            <span className="text-gray-300">•</span>
            <span className="text-lg">{content.year}</span>
            <span className="text-gray-300">•</span>
            <span className="border border-gray-400 px-2 py-0.5 text-sm font-medium">
              {content.maturityRating}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-lg">{content.duration || '2h 0m'}</span>
          </div>

          {/* Description */}
          <p className="text-white text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
            {formatDescription(content.description)}
          </p>

          {/* Cast */}
          {content.cast && content.cast.length > 0 && (
            <div className="mb-8">
              <p className="text-gray-300 text-base">
                <span className="text-white font-semibold">Starring:</span>{' '}
                {content.cast.slice(0, 3).map(c => c.name).join(', ')}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={onPlay}
              className="flex items-center gap-3 bg-white text-black font-bold px-8 py-4 rounded-lg hover:bg-gray-200 transition-all duration-200 text-lg"
            >
              <Play className="w-6 h-6 fill-current" />
              Play
            </button>

            <button
              onClick={onMoreInfo}
              className="flex items-center gap-3 bg-gray-600/80 text-white font-bold px-8 py-4 rounded-lg hover:bg-gray-600 transition-all duration-200 text-lg"
            >
              <Info className="w-6 h-6" />
              More Info
            </button>

            <button
              onClick={onAddToList}
              className="flex items-center justify-center w-14 h-14 border-2 border-gray-400 text-white rounded-full hover:border-white hover:bg-white/10 transition-all duration-200"
              title={isInList ? "Remove from My List" : "Add to My List"}
            >
              {isInList ? (
                <Check className="w-7 h-7" />
              ) : (
                <Plus className="w-7 h-7" />
              )}
            </button>

            {/* Mute/Unmute Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center justify-center w-14 h-14 border-2 border-gray-400 text-white rounded-full hover:border-white hover:bg-white/10 transition-all duration-200 ml-auto"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6" />
              ) : (
                <Volume2 className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Additional Info Panel */}
        <div className="absolute bottom-8 right-8 max-w-sm hidden lg:block">
          <div className="bg-black/80 backdrop-blur-md rounded-lg p-6 border border-gray-700">
            <h3 className="text-white font-bold text-lg mb-3">More Like This</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div>
                <span className="text-white font-medium">Genre:</span> {content.genre}
              </div>
              <div>
                <span className="text-white font-medium">Language:</span> {content.language || 'English'}
              </div>
              {content.voteCount && (
                <div>
                  <span className="text-white font-medium">Votes:</span> {content.voteCount.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20" />
    </section>
  );
}
