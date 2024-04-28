import { createStore, Store } from 'vuex';
import { State, ApiResponse, MovieDetails } from '@/types/store';

describe('Vuex', () => {
    let store: Store<State>;

    beforeEach(() => {
        store = createStore({
            state: {
                data: null,
                currentPage: 1,
                currentMovieDetails: null,
                favorites: [],
            },
            mutations: {
                setData(state: State, payload: ApiResponse) {
                    state.data = payload;
                },
                setCurrentPage(state: State, page: number) {
                    state.currentPage = page;
                },
                setCurrentMovieDetails(state: State, details: MovieDetails) {
                    state.currentMovieDetails = details;
                },
                toggleFavorite(state: State, movie: MovieDetails) {
                    const index = state.favorites.findIndex((fav) => fav.id === movie.id);
                    if (index !== -1) {
                        state.favorites.splice(index, 1);
                    } else {
                        state.favorites.push(movie);
                    }
                },
                clearFavorites(state: State) {
                    state.favorites = [];
                },
            },
        });
    });

    it('setData should correctly mutate state', () => {
        const apiResponse = { results: [{ id: 1, name: 'Test Movie' }] };
        store.commit('setData', apiResponse);
        expect(store.state.data).toEqual(apiResponse);
    });

    it('setCurrentPage should correctly mutate current page', () => {
        store.commit('setCurrentPage', 2);
        expect(store.state.currentPage).toBe(2);
    });

    it('setCurrentMovieDetails should correctly mutate movie details', () => {
        const movieDetails = { id: 1, title: 'Test Movie' };
        store.commit('setCurrentMovieDetails', movieDetails);
        expect(store.state.currentMovieDetails).toEqual(movieDetails);
    });

    it('toggleFavorite should add movie to favorites if not present', () => {
        const movie = { id: 1, title: 'Test Movie' };
        store.commit('toggleFavorite', movie);
        expect(store.state.favorites).toContainEqual(movie);
    });

    it('toggleFavorite should remove movie from favorites if present', () => {
        const movie = { id: 1, title: 'Test Movie' };
        store.commit('toggleFavorite', movie);
        store.commit('toggleFavorite', movie);
        expect(store.state.favorites).not.toContainEqual(movie);
    });

    it('clearFavorites should remove all movies from favorites', () => {
        store.commit('toggleFavorite', { id: 1, title: 'Test Movie' });
        store.commit('toggleFavorite', { id: 2, title: 'Second Movie' });
        store.commit('clearFavorites');
        expect(store.state.favorites.length).toBe(0);
    });
});