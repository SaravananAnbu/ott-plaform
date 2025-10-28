'use client';

import { useState, useEffect } from 'react';
import { Search, Bell, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Profile {
  id: number;
  name: string;
  avatar: string;
  isKidsProfile: boolean;
}

interface EnhancedHeaderProps {
  profiles: Profile[];
  currentProfile: Profile;
}

export default function EnhancedHeader({ profiles, currentProfile }: EnhancedHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', href: '/', active: true },
    { name: 'Movies', href: '/movies' },
    { name: 'TV Shows', href: '/tv-shows' },
    { name: 'Documentaries', href: '/documentaries' },
    { name: 'My List', href: '/my-list' },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-ubuntu",
        isScrolled ? "bg-black/95 backdrop-blur-md" : "bg-gradient-to-b from-black/80 to-transparent"
      )}
    >
      <nav className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2 group">
              <div className="text-netflix-red text-2xl lg:text-3xl font-ubuntu font-bold tracking-tight transition-transform group-hover:scale-105">
                StreamFlix
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 ml-12">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-ubuntu font-medium transition-colors duration-200 hover:text-gray-300",
                  item.active ? "text-white" : "text-gray-400"
                )}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 text-white hover:text-gray-300 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button className="p-2 text-white hover:text-gray-300 transition-colors">
              <Bell className="w-5 h-5" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
              >
                <img
                  src={currentProfile.avatar}
                  alt={currentProfile.name}
                  className="w-8 h-8 rounded object-cover"
                />
                <span className="hidden sm:block text-sm font-ubuntu font-medium">{currentProfile.name}</span>
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-black/95 backdrop-blur-md rounded-lg border border-gray-700 shadow-xl">
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-3">Switch Profile</h3>
                    <div className="space-y-2">
                      {profiles.map((profile) => (
                        <button
                          key={profile.id}
                          className="flex items-center w-full p-2 text-left text-white hover:bg-gray-800 rounded transition-colors"
                        >
                          <img
                            src={profile.avatar}
                            alt={profile.name}
                            className="w-8 h-8 rounded object-cover mr-3"
                          />
                          <span className="text-sm">{profile.name}</span>
                          {profile.isKidsProfile && (
                            <span className="ml-auto text-xs bg-yellow-600 text-black px-2 py-1 rounded">
                              KIDS
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-gray-700 mt-3 pt-3">
                      <button className="text-sm text-gray-300 hover:text-white transition-colors">
                        Manage Profiles
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 text-white hover:text-gray-300 transition-colors"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-gray-700">
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block text-lg font-medium transition-colors duration-200",
                    item.active ? "text-white" : "text-gray-400"
                  )}
                  onClick={() => setShowMobileMenu(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
