export interface Content {
  id: string;
  contentId?: number; // Keep for backwards compatibility
  title: string;
  description: string;
  about?: string;
  category?: 'MOVIE' | 'TV_SHOW' | 'DOCUMENTARY' | 'SPORTS' | 'MUSIC';
  type: 'movie' | 'series' | 'documentary';
  releaseDate?: string;
  year?: string;
  duration?: string;
  durationMinutes?: number;
  language?: string;
  maturityRating?: 'G' | 'PG' | 'PG_13' | 'R' | 'NC_17' | 'U' | 'UA' | 'A' | '16+' | '18+' | '12+' | string;
  rating?: string;
  imdbRating?: number;
  genre?: string;
  poster?: string;
  posterUrl?: string;
  backdrop?: string;
  bannerUrl?: string;
  thumbnail?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  trailerUrl?: string;
  director?: string;
  producer?: string;
  writer?: string;
  studio?: string;
  countryOfOrigin?: string;
  tags?: string[];
  cast?: CastMember[];
  isPremium?: boolean;
  isFeatured?: boolean;
  viewCount?: number;
  likeCount?: number;
  dislikeCount?: number;
  ageRestriction?: number;
  subtitleLanguages?: string[];
  audioLanguages?: string[];
  videoQuality?: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'published';
  provider?: Provider;
  createdAt?: string;
  updatedAt?: string;
  // New fields from API
  popularity?: number;
  voteCount?: number;
  voteAverage?: number;
  isAdult?: boolean;
  originalLanguage?: string;
  originalTitle?: string;
}

export interface CastMember {
  id: string;
  name: string;
  character: string;
  profileImage: string;
}

export interface Provider {
  providerId: number;
  providerName: string;
  iconUrl: string;
  logoUrl: string;
  bannerUrl: string;
  providerType: 'STREAMING' | 'STUDIO' | 'DISTRIBUTOR' | 'NETWORK';
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  description: string;
  website: string;
  countryOfOrigin: string;
  establishedYear: number;
  subscriptionRequired: boolean;
  isPremium: boolean;
  isFeatured: boolean;
  contentCount: number;
  sortOrder: number;
  colorCode: string;
}

export interface Profile {
  profileId: number;
  profileName: string;
  avatarUrl?: string;
  ageRestriction: 'KIDS' | 'TEENS' | 'ADULTS' | 'ALL';
  isKidsProfile: boolean;
  language: string;
  autoplayEnabled: boolean;
  subtitlesEnabled: boolean;
  maturityRating: string;
  userId: number;
  createdAt: string;
}

export interface User {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  countryCode?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  subscriptionStatus: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'CANCELLED';
  createdAt: string;
  lastLoginAt?: string;
  profiles: Profile[];
}

export interface Genre {
  genreId: number;
  genreName: string;
  description: string;
  iconUrl?: string;
  colorCode: string;
  isActive: boolean;
  sortOrder: number;
}

export interface WatchHistory {
  watchHistoryId: number;
  contentId: number;
  profileId: number;
  watchedAt: string;
  progressMinutes: number;
  isCompleted: boolean;
  content: Content;
}

export interface MyList {
  myListId: number;
  contentId: number;
  profileId: number;
  addedAt: string;
  content: Content;
}
