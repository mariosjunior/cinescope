import { shallowMount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import { State, MovieDetails } from '@/types/store';
import MovieDetailsComponent from '@/components/MovieDetails.vue';

const createVuexStore = (initialState: State): Store<State> => {
    const store = createStore({
        state: initialState,
        mutations: {
            toggleFavorite: jest.fn(),
        },
        actions: {
            toggleFavorite: jest.fn(),
        },
    });

    store.dispatch = jest.fn();

    return store;
};

describe('MovieDetails.vue', () => {
    let wrapper: VueWrapper;
    let store: Store<State>;
    let initialState: State;

    beforeEach(() => {
        initialState = {
            data: null,
            currentPage: 1,
            currentMovieDetails: {
                id: 1,
                title: 'Example Movie',
                release_date: '2023-01-01',
                revenue: 1000000,
                overview: 'This is an example movie.',
                genres: [{ id: 1, name: 'Action' }],
                backdrop_path: '/example.jpg',
            } as MovieDetails,
            favorites: [],
        };

        store = createVuexStore(initialState);
        wrapper = shallowMount(MovieDetailsComponent, {
            global: {
                plugins: [store],
            },
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });
    it('displays the movie details correctly', () => {
        expect(wrapper.find('[data-test="movie-title"]').text()).toBe('Example Movie');
        expect(wrapper.find('.genre-chip').text()).toBe('Action');
        expect(wrapper.find('[data-test="release-date"]').text()).toBe('2023-01-01');
        expect(wrapper.find('[data-test="revenue"]').text()).toBe('$1,000,000.00');
        expect(wrapper.find('[data-test="overview"]').text()).toBe('This is an example movie.');
    });

    it('toggles the favorite state when the favorite button is clicked', async () => {
        const favoriteButton = wrapper.find('[data-test="favorite-button"]');
        expect(favoriteButton.text()).toBe('Add to Favorites');

        await favoriteButton.trigger('click');
        expect(store.dispatch).toHaveBeenCalledWith('toggleFavorite', initialState.currentMovieDetails);

        store.state.favorites = [initialState.currentMovieDetails as MovieDetails];
        await wrapper.vm.$nextTick();
        expect(favoriteButton.text()).toBe('Remove from Favorites');
    });

    it('formats the revenue correctly', () => {
        const revenueValue = wrapper.find('[data-test="revenue"]');
        expect(revenueValue.text()).toBe('$1,000,000.00');
    });
});