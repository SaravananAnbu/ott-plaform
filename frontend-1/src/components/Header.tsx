'use client';

import {useState, useEffect} from 'react';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {
    Search,
    Bell,
    User,
    Menu,
    X,
    Play,
    Info,
    Plus,
    ChevronDown
} from 'lucide-react';
import {cn} from '@/lib/utils';

interface Profile {
    id : number;
    name : string;
    avatar : string;
    isKidsProfile : boolean;
}

interface HeaderProps {
    profiles?: Profile[];
    currentProfile?: Profile;
    onProfileChange?: (profile : Profile) => void;
}

export default function Header({ profiles = [], currentProfile, onProfileChange }: HeaderProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigation = [
        {
            name: 'Home',
            href: '/'
        }, {
            name: 'Movies',
            href: '/movies'
        }, {
            name: 'TV Shows',
            href: '/tv-shows'
        }, {
            name: 'Documentaries',
            href: '/documentaries'
        }, {
            name: 'My List',
            href: '/my-list'
        }
    ];

    return (
        <header
            className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled
            ? "bg-black/95 backdrop-blur-md"
            : "bg-gradient-to-b from-black/80 to-transparent")}>
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="text-red-600 text-2xl font-bold">
                            StreamFlex
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn("text-sm font-medium transition-colors hover:text-white", pathname === item.href
                                ? "text-white"
                                : "text-gray-300")}>
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <div className="relative">
                            <button
                                onClick={() => router.push('/search')}
                                className="p-2 text-gray-300 hover:text-white transition-colors">
                                <Search className="w-5 h-5"/>
                            </button>
                        </div>

                        {/* Notifications */}
                        <button className="p-2 text-gray-300 hover:text-white transition-colors">
                            <Bell className="w-5 h-5"/>
                        </button>

                        {/* Profile Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                                {currentProfile
                                    ? (<img
                                        src={currentProfile.avatar}
                                        alt={currentProfile.name}
                                        className="w-8 h-8 rounded object-cover"/>)
                                    : (
                                        <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                                            <User className="w-5 h-5"/>
                                        </div>
                                    )}
                                <ChevronDown className="w-4 h-4"/>
                            </button>

                            {isProfileMenuOpen && (
                                <div
                                    className="absolute right-0 top-12 w-64 bg-black/95 backdrop-blur-md rounded-lg border border-gray-800 p-4 space-y-3">
                                    {profiles?.length > 0
                                        ? ( 
                                            <> 
                                            <div className="space-y-2">
                                                {profiles.map((profile) => (
                                                    <button
                                                        key={profile.id}
                                                        onClick={() => {
                                                        onProfileChange
                                                            ?.(profile);
                                                        setIsProfileMenuOpen(false);
                                                    }}
                                                        className="flex items-center space-x-3 w-full p-2 hover:bg-gray-800 rounded-lg transition-colors">
                                                        <img
                                                            src={profile.avatar}
                                                            alt={profile.name}
                                                            className="w-8 h-8 rounded object-cover"/>
                                                        <span className="text-white">{profile.name}</span>
                                                        {profile.isKidsProfile && (
                                                            <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded">
                                                                KIDS
                                                            </span>
                                                        )}
                                                    </button>
                                                )
                                            )}
                                        </div> < hr className = "border-gray-700" /> </>)
                                        : null}

                                    <Link
                                        href="/profiles"
                                        className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                                        onClick={() => setIsProfileMenuOpen(false)}>
                                        Manage Profiles
                                    </Link>
                                    <Link
                                        href="/account"
                                        className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                                        onClick={() => setIsProfileMenuOpen(false)}>
                                        Account Settings
                                    </Link>
                                    <button
                                        className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white transition-colors">
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen
                                ? <X className="w-5 h-5"/>
                                : <Menu className="w-5 h-5"/>}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div
                        className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
                        <nav className="px-4 py-4 space-y-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn("block px-3 py-2 text-base font-medium transition-colors hover:text-white", pathname === item.href
                                    ? "text-white bg-gray-800 rounded-lg"
                                    : "text-gray-300")}
                                    onClick={() => setIsMobileMenuOpen(false)}>
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
