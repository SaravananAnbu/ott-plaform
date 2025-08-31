'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Plus, Edit3, Trash2, Shield, Baby } from 'lucide-react';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';

interface Profile {
  id: number;
  name: string;
  avatar: string;
  isKidsProfile: boolean;
  ageRestriction: 'KIDS' | 'TEENS' | 'ADULTS' | 'ALL';
  language: string;
  autoplayEnabled: boolean;
  subtitlesEnabled: boolean;
  maturityRating: string;
  watchHistory: number;
  createdAt: string;
}

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isKidsProfile: false,
      ageRestriction: 'ADULTS',
      language: 'English',
      autoplayEnabled: true,
      subtitlesEnabled: false,
      maturityRating: 'R',
      watchHistory: 1250,
      createdAt: '2023-01-15T00:00:00Z'
    },
    {
      id: 2,
      name: 'Sarah',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332b737?w=150&h=150&fit=crop&crop=face',
      isKidsProfile: false,
      ageRestriction: 'ADULTS',
      language: 'English',
      autoplayEnabled: true,
      subtitlesEnabled: true,
      maturityRating: 'PG_13',
      watchHistory: 890,
      createdAt: '2023-02-20T00:00:00Z'
    },
    {
      id: 3,
      name: 'Kids',
      avatar: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop&crop=face',
      isKidsProfile: true,
      ageRestriction: 'KIDS',
      language: 'English',
      autoplayEnabled: false,
      subtitlesEnabled: true,
      maturityRating: 'G',
      watchHistory: 445,
      createdAt: '2023-03-10T00:00:00Z'
    }
  ]);

  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleProfileSelect = (profile: Profile) => {
    setSelectedProfile(profile);
    localStorage.setItem('selectedProfile', JSON.stringify(profile));
    // Navigate to home page with selected profile
  };

  const handleDeleteProfile = (profileId: number) => {
    if (confirm('Are you sure you want to delete this profile?')) {
      setProfiles(profiles.filter(p => p.id !== profileId));
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Main Content */}
      <main className="pt-20 pb-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Who's watching?
            </h1>
            <p className="text-gray-400 text-lg">
              Select a profile to continue watching
            </p>
          </div>

          {/* Profiles Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-12">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="group text-center cursor-pointer"
                onClick={() => handleProfileSelect(profile)}
              >
                <div className="relative mb-4">
                  {/* Avatar */}
                  <div className="relative w-32 h-32 mx-auto mb-3">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-full h-full rounded-lg object-cover group-hover:ring-4 group-hover:ring-white transition-all duration-200"
                    />
                    
                    {/* Kids Badge */}
                    {profile.isKidsProfile && (
                      <div className="absolute -top-2 -right-2 bg-yellow-500 text-black rounded-full p-2">
                        <Baby className="w-4 h-4" />
                      </div>
                    )}

                    {/* Edit Button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Navigate to edit profile
                        }}
                        className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <h3 className="text-white font-semibold text-lg group-hover:text-gray-300 transition-colors">
                    {profile.name}
                  </h3>
                  
                  <div className="text-gray-400 text-sm space-y-1">
                    <p className="flex items-center justify-center space-x-1">
                      <Shield className="w-3 h-3" />
                      <span>{profile.maturityRating}</span>
                    </p>
                    <p>{profile.watchHistory} watched</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Profile Button */}
            {profiles.length < 5 && (
              <div
                className="group text-center cursor-pointer"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <div className="relative mb-4">
                  <div className="w-32 h-32 mx-auto mb-3 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600 group-hover:border-white transition-colors">
                    <Plus className="w-12 h-12 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-gray-400 font-semibold text-lg group-hover:text-white transition-colors">
                    Add Profile
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Create new profile
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Profile Management */}
          <div className="text-center">
            <button className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold">
              Manage Profiles
            </button>
          </div>

          {/* Profile Details */}
          {profiles.length > 0 && (
            <div className="mt-16 bg-gray-900/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Profile Overview</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {profiles.map((profile) => (
                  <div key={profile.id} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={profile.avatar}
                          alt={profile.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div>
                          <h3 className="text-white font-semibold">{profile.name}</h3>
                          {profile.isKidsProfile && (
                            <span className="text-yellow-500 text-xs bg-yellow-500/20 px-2 py-1 rounded">
                              KIDS
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {/* Edit profile */}}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {profiles.length > 1 && (
                          <button
                            onClick={() => handleDeleteProfile(profile.id)}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-400">
                        <span>Age Rating:</span>
                        <span className="text-white">{profile.maturityRating}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Language:</span>
                        <span className="text-white">{profile.language}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Watch History:</span>
                        <span className="text-white">{profile.watchHistory} items</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Autoplay:</span>
                        <span className="text-white">{profile.autoplayEnabled ? 'On' : 'Off'}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Subtitles:</span>
                        <span className="text-white">{profile.subtitlesEnabled ? 'On' : 'Off'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
