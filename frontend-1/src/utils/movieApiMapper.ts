import { Content } from '@/types';

// API Response Types
export interface ApiMovie {
  id: string;
  movie_id: number;
  original_title: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  adult: number;
  created_at: string | null;
  updated_at: string | null;
  casts: ApiCast[];
}

export interface ApiCast {
  id: string;
  movie_id: number;
  name: string;
  original_name: string;
  popularity: string;
  profile_path: string;
  character: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface ApiResponse {
  current_page: number;
  data: ApiMovie[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Utility Functions
export const mapApiMovieToContent = (apiMovie: ApiMovie): Content => {
  const releaseYear = new Date(apiMovie.release_date).getFullYear().toString();
  const rating = apiMovie.vote_average ? apiMovie.vote_average.toFixed(1) : '0.0';
  
  // Map cast to our format
  const cast = apiMovie.casts?.slice(0, 5).map(castMember => ({
    id: castMember.id,
    name: castMember.name,
    character: castMember.character,
    profileImage: castMember.profile_path || ''
  })) || [];

  // Determine genre based on popularity and rating (since API doesn't provide genre)
  let genre = 'Drama';
  if (apiMovie.popularity > 50) genre = 'Action';
  else if (apiMovie.vote_average > 8) genre = 'Thriller';
  else if (apiMovie.vote_average < 6) genre = 'Comedy';
  else if (apiMovie.original_language === 'en') genre = 'Drama';

  // Determine maturity rating
  let maturityRating = '13+';
  if (apiMovie.adult === 1) maturityRating = '18+';
  else if (apiMovie.vote_average > 7.5) maturityRating = '16+';
  else if (apiMovie.vote_average < 6) maturityRating = 'PG';

  return {
    id: apiMovie.id,
    contentId: apiMovie.movie_id,
    title: apiMovie.original_title,
    description: apiMovie.overview,
    thumbnail: apiMovie.poster_path,
    backdrop: apiMovie.backdrop_path,
    poster: apiMovie.poster_path,
    duration: '120', // Default duration since not provided
    rating,
    year: releaseYear,
    genre,
    type: 'movie',
    status: 'published',
    maturityRating,
    cast,
    trailerUrl: `https://example.com/trailer/${apiMovie.id}`,
    videoUrl: `https://example.com/watch/${apiMovie.id}`,
    language: apiMovie.original_language,
    popularity: apiMovie.popularity,
    voteCount: apiMovie.vote_count,
    isAdult: apiMovie.adult === 1,
    releaseDate: apiMovie.release_date
  };
};

// Fetch movies from API
export const fetchMoviesFromApi = async (page: number = 1): Promise<ApiResponse> => {
  try {
    const response = await fetch(`https://jsonfakery.com/movies/paginated?page=${page}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching movies from API:', error);
    throw error;
  }
};

// Fetch multiple pages for better content variety
export const fetchMultiplePages = async (pages: number[] = [1, 2, 3, 4, 5]): Promise<Content[]> => {
  try {
    const promises = pages.map(page => fetchMoviesFromApi(page));
    const responses = await Promise.all(promises);
    
    const allMovies: ApiMovie[] = [];
    responses.forEach(response => {
      allMovies.push(...response.data);
    });

    return allMovies.map(mapApiMovieToContent);
  } catch (error) {
    console.error('Error fetching multiple pages:', error);
    return [];
  }
};

// Content categorization utilities
export const categorizeContent = (content: Content[]) => {
  return {
    trending: content
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 15),
    
    newReleases: content
      .sort((a, b) => new Date(b.releaseDate || '').getTime() - new Date(a.releaseDate || '').getTime())
      .slice(0, 12),
    
    popular: content
      .sort((a, b) => parseFloat(b.rating || '0') - parseFloat(a.rating || '0'))
      .slice(0, 10),
    
    action: content
      .filter(c => c.genre?.toLowerCase().includes('action') || c.popularity && c.popularity > 40)
      .slice(0, 8),
    
    drama: content
      .filter(c => c.genre?.toLowerCase().includes('drama') || (c.rating && parseFloat(c.rating) > 7))
      .slice(0, 8),
    
    comedy: content
      .filter(c => c.genre?.toLowerCase().includes('comedy') || (c.rating && parseFloat(c.rating) < 6))
      .slice(0, 8),
    
    thriller: content
      .filter(c => c.genre?.toLowerCase().includes('thriller') || (c.rating && parseFloat(c.rating) > 8))
      .slice(0, 8),
    
    international: content
      .filter(c => c.language !== 'en')
      .slice(0, 8),
    
    highRated: content
      .filter(c => c.rating && parseFloat(c.rating) > 7.5)
      .sort((a, b) => parseFloat(b.rating || '0') - parseFloat(a.rating || '0'))
      .slice(0, 10),
    
    recentlyAdded: content
      .sort((a, b) => new Date(b.releaseDate || '').getTime() - new Date(a.releaseDate || '').getTime())
      .slice(0, 12)
  };
};

// Genre detection based on movie characteristics
export const detectGenre = (movie: ApiMovie): string => {
  const title = movie.original_title.toLowerCase();
  const overview = movie.overview.toLowerCase();
  
  if (title.includes('war') || overview.includes('war') || overview.includes('battle')) return 'War';
  if (title.includes('love') || overview.includes('romance') || overview.includes('love')) return 'Romance';
  if (overview.includes('horror') || overview.includes('scary') || overview.includes('fear')) return 'Horror';
  if (overview.includes('funny') || overview.includes('comedy') || overview.includes('humor')) return 'Comedy';
  if (overview.includes('crime') || overview.includes('police') || overview.includes('detective')) return 'Crime';
  if (overview.includes('sci-fi') || overview.includes('space') || overview.includes('future')) return 'Sci-Fi';
  if (overview.includes('action') || overview.includes('fight') || overview.includes('chase')) return 'Action';
  if (overview.includes('mystery') || overview.includes('thriller') || overview.includes('suspense')) return 'Thriller';
  if (overview.includes('family') || overview.includes('children') || overview.includes('kids')) return 'Family';
  if (overview.includes('documentary') || overview.includes('real') || overview.includes('true story')) return 'Documentary';
  
  // Default based on rating and popularity
  if (movie.vote_average > 8) return 'Drama';
  if (movie.popularity > 50) return 'Action';
  if (movie.vote_average < 6) return 'Comedy';
  
  return 'Drama';
};
