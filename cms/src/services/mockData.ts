import { User } from './userService';
import { Content, ContentCategory, ContentStatus, MaturityRating } from './contentService';
import { Plan } from './planService';
import { Subscription, SubscriptionStatus } from './subscriptionService';
import { Genre } from './genreService';
import { Profile, ProfileAgeRestriction } from './profileService';

// Mock data for demonstration
export const mockUsers: User[] = [
  {
    userId: 1,
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
    country: 'US',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    userId: 2,
    email: 'jane.smith@example.com',
    phoneNumber: '+1987654321',
    country: 'CA',
    isActive: true,
    createdAt: '2024-01-16T11:30:00Z',
    updatedAt: '2024-01-16T11:30:00Z',
  },
  {
    userId: 3,
    email: 'alice.johnson@example.com',
    country: 'UK',
    isActive: false,
    createdAt: '2024-01-17T09:15:00Z',
    updatedAt: '2024-01-20T14:22:00Z',
  },
];

export const mockContent: Content[] = [
  {
    contentId: 1,
    title: 'The Great Adventure',
    description: 'An epic adventure movie with stunning visuals and compelling story.',
    about: 'Follow the journey of a young hero discovering their destiny.',
    category: ContentCategory.MOVIE,
    releaseDate: '2024-02-15',
    durationMinutes: 125,
    language: 'English',
    maturityRating: MaturityRating.PG13,
    imdbRating: 8.5,
    posterUrl: 'https://example.com/poster1.jpg',
    bannerUrl: 'https://example.com/banner1.jpg',
    thumbnailUrl: 'https://example.com/thumb1.jpg',
    status: ContentStatus.PUBLISHED,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
  },
  {
    contentId: 2,
    title: 'Mystery Series',
    description: 'A thrilling mystery series that will keep you on the edge of your seat.',
    category: ContentCategory.SERIES,
    releaseDate: '2024-03-01',
    language: 'English',
    maturityRating: MaturityRating.R,
    imdbRating: 9.1,
    status: ContentStatus.PUBLISHED,
    createdAt: '2024-01-22T15:30:00Z',
    updatedAt: '2024-01-22T15:30:00Z',
  },
  {
    contentId: 3,
    title: 'Kids Fun Time',
    description: 'Educational and entertaining content for children.',
    category: ContentCategory.SHORT,
    durationMinutes: 30,
    language: 'English',
    maturityRating: MaturityRating.G,
    imdbRating: 7.8,
    status: ContentStatus.DRAFT,
    createdAt: '2024-01-25T12:00:00Z',
    updatedAt: '2024-01-25T12:00:00Z',
  },
];

export const mockPlans: Plan[] = [
  {
    planId: 1,
    planName: 'Basic Plan',
    priceCents: 999,
    currency: 'USD',
    resolution: '720p',
    screensAllowed: 1,
    downloadsAllowed: false,
    createdAt: '2024-01-10T08:00:00Z',
  },
  {
    planId: 2,
    planName: 'Standard Plan',
    priceCents: 1599,
    currency: 'USD',
    resolution: '1080p',
    screensAllowed: 2,
    downloadsAllowed: true,
    createdAt: '2024-01-10T08:15:00Z',
  },
  {
    planId: 3,
    planName: 'Premium Plan',
    priceCents: 2499,
    currency: 'USD',
    resolution: '4K',
    screensAllowed: 4,
    downloadsAllowed: true,
    createdAt: '2024-01-10T08:30:00Z',
  },
];

export const mockSubscriptions: Subscription[] = [
  {
    subscriptionId: 1,
    user: { userId: 1, email: 'john.doe@example.com' },
    plan: { planId: 2, planName: 'Standard Plan', priceCents: 1599 },
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    status: SubscriptionStatus.ACTIVE,
    autoRenew: true,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    subscriptionId: 2,
    user: { userId: 2, email: 'jane.smith@example.com' },
    plan: { planId: 3, planName: 'Premium Plan', priceCents: 2499 },
    startDate: '2024-01-16',
    endDate: '2024-02-16',
    status: SubscriptionStatus.ACTIVE,
    autoRenew: true,
    createdAt: '2024-01-16T11:30:00Z',
  },
  {
    subscriptionId: 3,
    user: { userId: 3, email: 'alice.johnson@example.com' },
    plan: { planId: 1, planName: 'Basic Plan', priceCents: 999 },
    startDate: '2024-01-17',
    endDate: '2024-01-20',
    status: SubscriptionStatus.EXPIRED,
    autoRenew: false,
    createdAt: '2024-01-17T09:15:00Z',
  },
];

export const mockGenres: Genre[] = [
  {
    genreId: 1,
    name: 'Action',
    description: 'High-energy movies and series with exciting sequences.',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    genreId: 2,
    name: 'Comedy',
    description: 'Light-hearted content designed to entertain and amuse.',
    createdAt: '2024-01-01T00:15:00Z',
  },
  {
    genreId: 3,
    name: 'Drama',
    description: 'Serious, plot-driven presentations of realistic characters.',
    createdAt: '2024-01-01T00:30:00Z',
  },
  {
    genreId: 4,
    name: 'Horror',
    description: 'Content intended to frighten, unsettle, and create suspense.',
    createdAt: '2024-01-01T00:45:00Z',
  },
];

export const mockProfiles: Profile[] = [
  {
    profileId: 1,
    user: { userId: 1, email: 'john.doe@example.com' },
    profileName: 'John',
    profileImage: 'https://example.com/avatar1.jpg',
    ageRestriction: ProfileAgeRestriction.ADULTS,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    profileId: 2,
    user: { userId: 1, email: 'john.doe@example.com' },
    profileName: 'Kids Profile',
    ageRestriction: ProfileAgeRestriction.KIDS,
    createdAt: '2024-01-15T10:45:00Z',
    updatedAt: '2024-01-15T10:45:00Z',
  },
  {
    profileId: 3,
    user: { userId: 2, email: 'jane.smith@example.com' },
    profileName: 'Jane',
    ageRestriction: ProfileAgeRestriction.ADULTS,
    createdAt: '2024-01-16T12:00:00Z',
    updatedAt: '2024-01-16T12:00:00Z',
  },
];