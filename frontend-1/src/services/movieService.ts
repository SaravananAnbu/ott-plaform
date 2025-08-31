export interface MovieCast {
    id : string;
    movie_id : number;
    name : string;
    original_name : string;
    popularity : string;
    profile_path : string;
    character : string;
    created_at : string | null;
    updated_at : string | null;
}

export interface MovieData {
    id : string;
    movie_id : number;
    original_title : string;
    original_language : string;
    overview : string;
    popularity : number;
    poster_path : string;
    backdrop_path : string;
    release_date : string;
    vote_average : number;
    vote_count : number;
    adult : number;
    created_at : string | null;
    updated_at : string | null;
    casts : MovieCast[];
}

export interface MovieResponse {
    data : MovieData[];
    meta : {
        current_page: number;
        total_pages: number;
        total_count: number;
        per_page: number;
    };
}

// Transform API data to our Content interface
export function transformMovieToContent(movie : MovieData) : any {
    return {
        id: movie.id,
        title: movie.original_title,
        description: movie.overview,
        thumbnail: movie.poster_path,
        backdrop: movie.backdrop_path,
        duration: "120", // Default duration
        rating: movie.vote_average.toString(),
        year: new Date(movie.release_date).getFullYear().toString(),
        genre: "Drama", // Default genre
        type: "movie" as const,
        status: "published" as const,
            maturityRating: movie.adult
                ? "18+"
                : "13+",
            cast: movie.casts?.slice(0, 5)
                    .map(cast => ({id: cast.id, name: cast.name, character: cast.character, profileImage: cast.profile_path})) || [],
            trailerUrl: "",
            videoUrl: "",
            popularity: movie.popularity,
            voteCount: movie.vote_count
        };
    }

export async function fetchMovies(page : number = 1) : Promise < MovieResponse > {
    try {
        const response = await fetch(`https://jsonfakery.com/movies/paginated?page=${page}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        // Return mock data as fallback
        return {
            data: [],
            meta: {
                current_page: 1,
                total_pages: 1,
                total_count: 0,
                per_page: 10
            }
        };
    }
}

export async function fetchAllMovies() : Promise < MovieData[] > {
    try {
        const firstResponse = await fetchMovies(1);
        const allMovies : MovieData[] = [...firstResponse.data];

        // Fetch additional pages if available
        const totalPages = Math.min(firstResponse.meta.total_pages, 5); // Limit to 5 pages for demo

        for (let page = 2; page <= totalPages; page++) {
            const response = await fetchMovies(page);
            allMovies.push(...response.data);
        }

        return allMovies;
    } catch (error) {
        console.error('Error fetching all movies:', error);
        return [];
    }
}

export async function searchMovies(query : string, page : number = 1) : Promise < MovieData[] > {
    try {
        const response = await fetchMovies(page);
        const movies = response.data;

        // Simple client-side search
        const filteredMovies = movies.filter(movie => movie.original_title.toLowerCase().includes(query.toLowerCase()) || movie.overview.toLowerCase().includes(query.toLowerCase()) || movie.casts
            ?.some(cast => cast.name.toLowerCase().includes(query.toLowerCase())));

        return filteredMovies;
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
}
