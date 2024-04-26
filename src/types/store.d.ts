export interface State {
    data: {
        page: number
        results: any
        total_pages: number
        total_results: number
    } | null,
    currentPage: number
    ;
}