'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Content } from '@/types';
import ContentCard from './ContentCard';

interface ContentRowProps {
  title: string;
  contents: Content[];
  onContentSelect?: (content: Content) => void;
  onPlay?: (content: Content) => void;
  onAddToList?: (content: Content) => void;
  isInList?: (contentId: string) => boolean;
}

export default function ContentRow({
  title,
  contents,
  onContentSelect,
  onPlay,
  onAddToList,
  isInList
}: ContentRowProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, [contents]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
    const newScrollLeft = direction === 'left' 
      ? scrollContainerRef.current.scrollLeft - scrollAmount
      : scrollContainerRef.current.scrollLeft + scrollAmount;
    
    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  if (!contents || contents.length === 0) {
    return null;
  }

  return (
    <div className="relative group px-4 md:px-16 mb-12 font-ubuntu">
      {/* Section Title */}
      <h2 className="text-white text-xl md:text-2xl font-ubuntu font-bold mb-6 px-2">
        {title}
      </h2>

      {/* Navigation Buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 md:left-12 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-12 h-12 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 md:right-12 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-12 h-12 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Content Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-24"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {contents.map((content, index) => (
          <div key={content.id} className="flex-shrink-0 w-48 md:w-64">
            <ContentCard
              content={content}
              onPlay={onPlay}
              onMoreInfo={onContentSelect}
              onAddToList={onAddToList}
              isInList={isInList ? isInList(content.id) : false}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
