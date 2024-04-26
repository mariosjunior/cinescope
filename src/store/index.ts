import { createStore, StoreOptions, ActionContext } from 'vuex';
import { State, ApiResponse, MovieDetails } from '@/types/store';
import axios from 'axios';

const storeOptions: StoreOptions<State> = {
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
            state.favorites = []
        }
    },
    actions: {
        async fetchData({ commit, state }: ActionContext<State, State>) {
            const apiKey = '6d19860faa63c559a3149ba8759f5ef0';
            const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${state.currentPage}`;

            try {
                const response = await axios.get(url);
                commit('setData', response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async fetchMovieDetails({ commit }: ActionContext<State, State>, movieId: number) {
            const apiKey = '6d19860faa63c559a3149ba8759f5ef0';
            const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

            try {
                const response = await axios.get(url);
                commit('setCurrentMovieDetails', response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        },
        toggleFavorite({ commit }: ActionContext<State, State>, movie: MovieDetails) {
            commit('toggleFavorite', movie);
        },
        clearFavorites({ commit }: ActionContext<State, State>) {
            commit('clearFavorites');
        },
    }
};

export default createStore(storeOptions);