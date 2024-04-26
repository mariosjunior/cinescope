import { createStore, StoreOptions } from 'vuex';
import { State } from '@/types/store';
import axios from 'axios';

const storeOptions: StoreOptions<State> = {
    state: {
        data: null
    },
    mutations: {
        setData(state, payload: any) {
            state.data = payload;
        }
    },
    actions: {
        async fetchData({ commit }) {
            const apiKey = '6d19860faa63c559a3149ba8759f5ef0';
            const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;

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