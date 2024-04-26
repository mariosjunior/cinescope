import { createStore, StoreOptions, ActionContext } from 'vuex';
import { State, ApiResponse } from '@/types/store';
import axios from 'axios';

const storeOptions: StoreOptions<State> = {
    state: {
        data: null,
        currentPage: 1
    },
    mutations: {
        setData(state: State, payload: ApiResponse) {
            state.data = payload;
        },
        setCurrentPage(state: State, page: number) {
            state.currentPage = page;
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
        }
    }
};

export default createStore(storeOptions);