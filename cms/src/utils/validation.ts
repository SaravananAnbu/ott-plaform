import type { Rule } from 'antd/es/form';

export const validationRules = {
  // User validation rules
  phoneNumber: [
    { min: 1, max: 20, message: 'Phone number must be 1-20 characters long' },
  ],
  email: [
    { type: 'email' as const, message: 'Please enter a valid email address' },
    { max: 255, message: 'Email must be no more than 255 characters' },
  ],
  country: [
    { len: 2, message: 'Country code must be exactly 2 characters' },
  ],

  // Profile validation rules
  profileName: [
    { required: true, message: 'Profile name is required' },
    { min: 1, max: 100, message: 'Profile name must be 1-100 characters long' },
  ],
  pinCode: [
    { required: true, message: 'PIN code is required' },
    { len: 6, message: 'PIN code must be exactly 6 characters' },
    { pattern: /^\d{6}$/, message: 'PIN code must contain only numbers' },
  ],
  avatarUrl: [
    { type: 'url' as const, message: 'Please enter a valid URL' },
  ],

  // Content validation rules
  title: [
    { required: true, message: 'Title is required' },
    { min: 1, max: 300, message: 'Title must be 1-300 characters long' },
  ],
  category: [
    { required: true, message: 'Category is required' },
  ],
  durationMinutes: [
    { type: 'number' as const, min: 1, message: 'Duration must be at least 1 minute' },
  ],
  language: [
    { min: 1, max: 40, message: 'Language must be 1-40 characters long' },
  ],
  imdbRating: [
    { type: 'number' as const, min: 0, max: 10, message: 'IMDB rating must be between 0 and 10' },
  ],
  posterUrl: [
    { type: 'url' as const, message: 'Please enter a valid URL' },
  ],
  bannerUrl: [
    { type: 'url' as const, message: 'Please enter a valid URL' },
  ],
  thumbnailUrl: [
    { type: 'url' as const, message: 'Please enter a valid URL' },
  ],
  adUrl: [
    { type: 'url' as const, message: 'Please enter a valid URL' },
  ],

  // Plan validation rules
  planName: [
    { required: true, message: 'Plan name is required' },
    { min: 1, max: 60, message: 'Plan name must be 1-60 characters long' },
  ],
  priceCents: [
    { required: true, message: 'Price is required' },
    { type: 'number' as const, min: 0, message: 'Price must be 0 or greater' },
  ],
  currency: [
    { len: 3, message: 'Currency code must be exactly 3 characters' },
  ],
  resolution: [
    { required: true, message: 'Resolution is required' },
    { min: 1, max: 10, message: 'Resolution must be 1-10 characters long' },
  ],
  screensAllowed: [
    { type: 'number' as const, min: 1, message: 'Screens allowed must be at least 1' },
  ],

  // Subscription validation rules
  userId: [
    { required: true, message: 'User ID is required' },
    { type: 'number' as const, message: 'User ID must be a number' },
  ],
  planId: [
    { required: true, message: 'Plan ID is required' },
    { type: 'number' as const, message: 'Plan ID must be a number' },
  ],
  startDate: [
    { required: true, message: 'Start date is required' },
  ],

  // Genre validation rules
  genreName: [
    { required: true, message: 'Genre name is required' },
    { min: 1, max: 80, message: 'Genre name must be 1-80 characters long' },
  ],
} as const;

export const getValidationRules = (fieldName: keyof typeof validationRules): Rule[] => {
  return [...(validationRules[fieldName] || [])];
};