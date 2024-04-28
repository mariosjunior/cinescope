export interface State {
    data: ApiResponse | null;
    currentPage: number;
    currentMovieDetails: MovieDetails | null;
    favorites: Movie[];
    isLoading: boolean
}

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    popularity: number;
    vote_average: number;
    vote_count: number;
    backdrop_path: string;
    release_date: string;
}

export interface MovieDetails extends Movie {
    revenue: number;
    genres: {
        id: number;
        name: string;
    }[]
}

export interface ApiResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}