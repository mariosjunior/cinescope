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
            favorites: []
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
            favorites: []
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

    it('navigates to the next page when next button is clicked', async () => {
        const initialState: State = {
            data: {
                page: 1,
                results: [],
                total_pages: 3,
                total_results: 0
            },
            currentPage: 1,
            currentMovieDetails: null,
            favorites: []
        };
        const store = createVuexStore(initialState);
        const wrapper = shallowMount(HomePage, {
            global: {
                plugins: [store]
            }
        });

        await wrapper.find('button[aria-label="next"]').trigger('click');
        expect(store.commit).toHaveBeenCalledWith('setCurrentPage', 2);
    });


    it('fetches new data when a new page is selected', async () => {
        const initialState: State = {
            data: null,
            currentPage: 1,
            currentMovieDetails: null,
            favorites: []
        };
        const store = createVuexStore(initialState);
        const wrapper = shallowMount(HomePage, {
            global: {
                plugins: [store]
            }
        });

        await wrapper.vm.$emit('changePage', 2);
        expect(store.dispatch).toHaveBeenCalledWith('fetchData');
    });
});