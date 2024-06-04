import { createStore, StoreOptions, ActionContext } from 'vuex';
import { State, ApiResponse, MovieDetails } from '@/types/store';
import axios from 'axios';

const storeOptions: StoreOptions<State> = {
    state: {
        data: null,
        currentPage: 1,
        currentMovieDetails: null,
        favorites: [],
        isLoading: false
    },
    mutations: {
        setData(state: State, payload: ApiResponse) {
            state.data = payload
        },
        appendData(state, data) {
            if (state.data) {
                state.data.results = [...state.data.results, ...data.results];
                state.data.total_pages = data.total_pages;
            } else {
                state.data = data;
            }
        },
        setCurrentPage(state: State, page: number) {
            state.currentPage = page;
        },
        setLoading(state, isLoading) {
            state.isLoading = isLoading;
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
        }
    },
    actions: {
        async fetchData({ commit, state }, append = false) {
            const apiKey = import.meta.env.VITE_API_KEY;

            try {
                commit("setLoading", true);
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${state.currentPage}`
                );
                const data = await response.json();
                if (append) {
                    commit("appendData", data);
                } else {
                    commit("setData", data);
                }
                commit("setLoading", false);
            } catch (error) {
                console.error("Error fetching data:", error);
                commit("setLoading", false);
            }
        },
        async fetchMovieDetails({ commit }: ActionContext<State, State>, movieId: number) {
            const apiKey = import.meta.env.VITE_API_KEY;

            const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

            try {
                const response = await axios.get(url);
                commit('setCurrentMovieDetails', response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        },
        resetState({ commit }) {
            commit("setData", null);
            commit("setCurrentPage", 1);
            commit("setLoading", false);
        },
    }
};

export default createStore(storeOptions);