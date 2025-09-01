'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, Info, Plus, Check, ThumbsUp, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Content } from '@/types';
import { formatDuration, formatYear, getContentRating } from '@/lib/utils';

interface HeroSectionProps {
  content: Content;
  onPlay?: () => void;
  onAddToList?: () => void;
  onMoreInfo?: () => void;
  isInList?: boolean;
}

export default function HeroSection({ 
  content, 
  onPlay, 
  onAddToList, 
  onMoreInfo, 
  isInList = false 
}: HeroSectionProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content.backdrop || content.bannerUrl || content.poster || content.thumbnail || '/api/placeholder/1920/1080'}
          alt={content.title}
          fill
          className={cn(
            "object-cover transition-opacity duration-700",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          priority
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Badges */}
          <div className="flex items-center space-x-3 mb-4">
            {content.isFeatured && (
              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                FEATURED
              </span>
            )}
            {content.isPremium && (
              <span className="bg-yellow-600 text-white text-xs font-bold px-3 py-1 rounded">
                PREMIUM
              </span>
            )}
            <span className="bg-gray-600/80 text-white text-xs font-semibold px-3 py-1 rounded">
              {content.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight animate-fade-in">
            {content.title}
          </h1>

          {/* Meta Information */}
          <div className="flex items-center space-x-4 text-gray-300 text-sm mb-4">
            {content.imdbRating && (
              <div className="flex items-center space-x-1">
                <span className="text-yellow-500">★</span>
                <span>{content.imdbRating}</span>
              </div>
            )}
            <span>{formatYear(content.releaseDate)}</span>
            {content.durationMinutes && (
              <span>{formatDuration(content.durationMinutes)}</span>
            )}
            <span className="border border-gray-500 px-2 py-0.5 text-xs rounded">
              {getContentRating(content.maturityRating)}
            </span>
            <span className="text-gray-400">{content.language}</span>
          </div>

          {/* Description */}
          <p className="text-gray-200 text-lg leading-relaxed mb-8 max-w-xl line-clamp-3">
            {content.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
            {/* Play Button */}
            <button
              onClick={onPlay}
              className="flex items-center space-x-3 bg-white text-black px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>Play</span>
            </button>

            {/* More Info Button */}
            <button
              onClick={onMoreInfo}
              className="flex items-center space-x-3 bg-gray-600/70 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-600/90 transition-all duration-200 transform hover:scale-105 backdrop-blur-sm"
            >
              <Info className="w-6 h-6" />
              <span>More Info</span>
            </button>

            {/* Add to List Button */}
            <button
              onClick={onAddToList}
              className="flex items-center justify-center w-12 h-12 bg-gray-600/70 text-white rounded-full hover:bg-gray-600/90 transition-all duration-200 transform hover:scale-105 backdrop-blur-sm"
              title={isInList ? "Remove from My List" : "Add to My List"}
            >
              {isInList ? (
                <Check className="w-6 h-6" />
              ) : (
                <Plus className="w-6 h-6" />
              )}
            </button>

            {/* Like Button */}
            <button className="flex items-center justify-center w-12 h-12 bg-gray-600/70 text-white rounded-full hover:bg-gray-600/90 transition-all duration-200 transform hover:scale-105 backdrop-blur-sm">
              <ThumbsUp className="w-6 h-6" />
            </button>
          </div>

          {/* Additional Info */}
          {content.director && (
            <div className="text-gray-300 text-sm">
              <span className="text-gray-400">Director:</span> {content.director}
            </div>
          )}
          
          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {content.tags.slice(0, 5).map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Volume Control */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-20 right-8 flex items-center justify-center w-12 h-12 bg-gray-600/70 text-white rounded-full hover:bg-gray-600/90 transition-all duration-200 backdrop-blur-sm"
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <Volume2 className="w-6 h-6" />
        )}
      </button>
    </section>
  );
}
