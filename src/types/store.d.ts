export interface State {
    data: ApiResponse | null,
    currentPage: number
    ;
}

export interface Movie {
    id: number;
    title: string;
    overview: string;
}

export interface ApiResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}