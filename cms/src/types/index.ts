// Enums based on backend
export const ContentCategory = {
  MOVIE: 'MOVIE',
  SERIES: 'SERIES',
  DOCUMENTARY: 'DOCUMENTARY',
  SPORTS: 'SPORTS'
} as const;

export const MaturityRating = {
  G: 'G',
  PG: 'PG',
  PG13: 'PG13',
  R: 'R',
  NC17: 'NC17'
} as const;

export const ContentStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED'
} as const;

export const ProfileAgeRestriction = {
  KIDS: 'KIDS',
  TEENS: 'TEENS',
  ADULTS: 'ADULTS'
} as const;

export const SubscriptionStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED'
} as const;

export type ContentCategory = typeof ContentCategory[keyof typeof ContentCategory];
export type MaturityRating = typeof MaturityRating[keyof typeof MaturityRating];
export type ContentStatus = typeof ContentStatus[keyof typeof ContentStatus];
export type ProfileAgeRestriction = typeof ProfileAgeRestriction[keyof typeof ProfileAgeRestriction];
export type SubscriptionStatus = typeof SubscriptionStatus[keyof typeof SubscriptionStatus];

// DTOs based on backend
export interface CreateUserDto {
  phoneNumber?: string;
  email?: string;
  country?: string;
  isActive?: boolean;
}

export interface CreateProfileDto {
  userId: number;
  profileName: string;
  pinCode: string;
  ageRestriction?: ProfileAgeRestriction;
  avatarUrl?: string;
}

export interface CreateContentDto {
  title: string;
  description?: string;
  about?: string;
  category: ContentCategory;
  releaseDate?: string;
  durationMinutes?: number;
  language?: string;
  maturityRating?: MaturityRating;
  imdbRating?: number;
  posterUrl?: string;
  bannerUrl?: string;
  thumbnailUrl?: string;
  adUrl?: string;
  playerId?: number;
  status?: ContentStatus;
}

export interface CreatePlanDto {
  planName: string;
  priceCents: number;
  currency?: string;
  resolution: string;
  screensAllowed?: number;
  downloadsAllowed?: boolean;
}

export interface CreateSubscriptionDto {
  userId: number;
  planId: number;
  startDate: string;
  endDate?: string;
  status?: SubscriptionStatus;
  autoRenew?: boolean;
}

export interface CreateGenreDto {
  name: string;
}