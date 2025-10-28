'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function WatchPage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <div className="min-h-screen bg-black text-white font-ubuntu">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Watch Content</h1>
        <p className="text-lg text-gray-300 mb-6">Playing content with ID: {id}</p>
        <div className="w-full aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
          <p className="text-xl">Video player would be here</p>
        </div>
      </div>
    </div>
  );
}
