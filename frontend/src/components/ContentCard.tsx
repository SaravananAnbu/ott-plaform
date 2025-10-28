import { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown, Check } from 'lucide-react';
import { Content } from '@/types';

interface ContentCardProps {
  content: Content;
  onPlay?: (content: Content) => void;
  onMoreInfo?: (content: Content) => void;
  onAddToList?: (content: Content) => void;
  isInList: boolean;
  index: number;
}

export default function ContentCard({
  content,
  onPlay,
  onMoreInfo,
  onAddToList,
  isInList,
  index
}: ContentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getImageSrc = () => {
    if (imageError) {
      return `https://images.unsplash.com/photo-1489599735786-1ef58c2c7119?w=300&h=450&fit=crop&q=80`;
    }
    return content.poster || content.thumbnail || content.backdrop || 
           `https://images.unsplash.com/photo-1489599735786-1ef58c2c7119?w=300&h=450&fit=crop&q=80`;
  };

  const formatDuration = (duration?: string) => {
    if (!duration) return '2h 0m';
    const minutes = parseInt(duration);
    if (isNaN(minutes)) return duration;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div 
      className="group relative transition-all duration-300 ease-in-out font-ubuntu"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        transitionDelay: isHovered ? '0ms' : `${index * 50}ms`,
      }}
    >
      {/* Main Card */}
      <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-gray-900 cursor-pointer transform transition-transform duration-300 hover:scale-105">
        <img
          src={getImageSrc()}
          alt={content.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={handleImageError}
          onClick={() => onMoreInfo?.(content)}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-ubuntu font-medium">
          ⭐ {content.rating || 'N/A'}
        </div>

        {/* Genre Tag */}
        {content.genre && (
          <div className="absolute top-2 left-2 bg-netflix-red text-white text-xs px-2 py-1 rounded font-ubuntu font-medium">
            {content.genre}
          </div>
        )}
        
        {/* Hover Action Buttons - Only visible on hover */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlay?.(content);
              }}
              className="flex items-center justify-center w-10 h-10 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-ubuntu"
              title="Play"
            >
              <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToList?.(content);
              }}
              className="flex items-center justify-center w-10 h-10 border-2 border-gray-400 rounded-full hover:border-white transition-colors"
              title={isInList ? "Remove from My List" : "Add to My List"}
            >
              {isInList ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <Plus className="w-5 h-5 text-gray-400 group-hover:text-white" />
              )}
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Add like functionality here
              }}
              className="flex items-center justify-center w-10 h-10 border-2 border-gray-400 rounded-full hover:border-white transition-colors"
              title="Like"
            >
              <ThumbsUp className="w-5 h-5 text-gray-400 group-hover:text-white" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoreInfo?.(content);
              }}
              className="flex items-center justify-center w-10 h-10 border-2 border-gray-400 rounded-full hover:border-white transition-colors ml-auto"
              title="More Info"
            >
              <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-white" />
            </button>
          </div>
          
          {/* Content Info */}
          <div className="text-white">
            <h3 className="font-ubuntu font-bold text-sm mb-2 line-clamp-2">{content.title}</h3>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <span className="bg-green-600 px-1.5 py-0.5 rounded text-white font-ubuntu font-medium">
                {content.rating || 'N/A'}
              </span>
              <span className="font-ubuntu">{content.year}</span>
              <span className="font-ubuntu">{content.maturityRating}</span>
              <span className="font-ubuntu">{formatDuration(content.duration)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Hover Card - Positioned to avoid overlap */}
      {isHovered && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-80 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 z-100 scale-110 origin-top animate-scale-in">
          <div className="aspect-video relative rounded-t-lg overflow-hidden">
            <img
              src={getImageSrc()}
              alt={content.title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
          </div>
          
          <div className="p-4 font-ubuntu">
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => onPlay?.(content)}
                className="flex items-center justify-center w-10 h-10 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
              >
                <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
              </button>
              
              <button
                onClick={() => onAddToList?.(content)}
                className="flex items-center justify-center w-10 h-10 border-2 border-gray-400 rounded-full hover:border-white transition-colors"
              >
                {isInList ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-400 hover:text-white" />
                )}
              </button>
              
              <button className="flex items-center justify-center w-10 h-10 border-2 border-gray-400 rounded-full hover:border-white transition-colors">
                <ThumbsUp className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
            </div>

            <h3 className="text-white font-ubuntu font-bold text-base mb-2 line-clamp-2">{content.title}</h3>
            
            <div className="flex items-center gap-2 text-xs text-gray-300 mb-3">
              <span className="text-green-400 font-ubuntu font-medium">{content.rating}% Match</span>
              <span className="border border-gray-600 px-1 font-ubuntu">{content.maturityRating}</span>
              <span className="font-ubuntu">{formatDuration(content.duration)}</span>
              <span className="font-ubuntu">{content.year}</span>
            </div>

            <p className="text-gray-300 text-sm line-clamp-3 mb-3 font-ubuntu leading-relaxed">{content.description}</p>
            
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span className="font-ubuntu font-medium">Cast:</span>
              <span className="line-clamp-1 font-ubuntu">
                {content.cast?.slice(0, 3).map(c => c.name).join(', ') || 'Not available'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
