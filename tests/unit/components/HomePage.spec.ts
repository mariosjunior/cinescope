import { shallowMount } from '@vue/test-utils';
import HomePage from '@/components/HomePage.vue';
import { State, ApiResponse } from "@/types/store";
import { createStore } from 'vuex';

const createVuexStore = (initialState: State) => {
    const store = createStore({
        state: initialState,
        actions: {
            fetchData: jest.fn()
        },
        mutations: {
            setCurrentPage: jest.fn()
        }
    });

    store.dispatch = jest.fn();
    store.commit = jest.fn();

    return store;
};

describe('HomePage.vue', () => {
    it('fetches data when component is mounted', () => {
        const initialState: State = {
            data: null,
            currentPage: 1,
            currentMovieDetails: null,
            favorites: [],
            isLoading: false
        };
        const store = createVuexStore(initialState);
        shallowMount(HomePage, {
            global: {
                plugins: [store]
            }
        });

        expect(store.dispatch).toHaveBeenCalledWith('fetchData');
    });

    it('renders MovieList if data is available', () => {
        const movies: ApiResponse = {
            results: [{ id: 1, title: 'Test Movie', overview: 'Description', poster_path: '', backdrop_path: '', release_date: '12-12-12', popularity: 2, vote_average: 4, vote_count: 1 }],
            total_pages: 10,
            page: 0,
            total_results: 1
        };
        const initialState: State = {
            data: movies,
            currentPage: 1,
            currentMovieDetails: null,
            favorites: [],
            isLoading: false
        };
        const store = createVuexStore(initialState);
        const wrapper = shallowMount(HomePage, {
            global: {
                plugins: [store]
            }
        });

        const movieListComponent = wrapper.findComponent({ name: 'MovieList' });
        expect(movieListComponent.exists()).toBe(true);
        expect(movieListComponent.props('movies')).toEqual(movies.results);
    });

    it('fetches new data when loadMore is called', () => {
        const initialState: State = {
            data: {
                page: 1,
                results: [],
                total_pages: 3,
                total_results: 0
            },
            currentPage: 1,
            currentMovieDetails: null,
            favorites: [],
            isLoading: false
        };
        const store = createVuexStore(initialState);

        const loadMoreFactory = () => {
            const isLoading = { value: false };
            const currentPage = { value: 1 };
            const data = { value: initialState.data };

            return () => {
                if (!isLoading.value && currentPage.value < (data.value?.total_pages || 0)) {
                    store.commit("setCurrentPage", currentPage.value + 1);
                    store.dispatch("fetchData", true);
                }
            };
        };

        const loadMore = loadMoreFactory();
        loadMore();
        expect(store.commit).toHaveBeenCalledWith('setCurrentPage', 2);
        expect(store.dispatch).toHaveBeenCalledWith('fetchData', true);
    });
});