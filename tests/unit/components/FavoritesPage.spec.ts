import { shallowMount, VueWrapper } from '@vue/test-utils';
import FavoritesPage from '@/components/FavoritesPage.vue';
import { createStore, Store } from 'vuex';
import { State, MovieDetails } from '@/types/store';

const createVuexStore = (initialState: State): Store<State> => {
  const store = createStore({
    state: initialState,
    mutations: {
      clearFavorites: jest.fn()
    }
  });

  store.commit = jest.fn();

  return store;
};

describe('FavoritesPage.vue', () => {
  let wrapper: VueWrapper;
  let store: Store<State>;
  let initialState: State;

  beforeEach(() => {
    initialState = {
      data: null,
      currentPage: 1,
      currentMovieDetails: null,
      favorites: [{ id: 1, title: 'Example Movie', genres: [{ id: 1, name: 'Action' }] } as MovieDetails],
      isLoading: false
    };

    store = createVuexStore(initialState);
    wrapper = shallowMount(FavoritesPage, {
      global: {
        plugins: [store]
      }
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('displays the list of favorite movies when there are some', () => {
    expect(wrapper.findComponent({ name: 'MovieList' }).exists()).toBe(true);
    expect(wrapper.find('.empty-state').exists()).toBe(false);
  });

  it('shows an empty state message when there are no favorite movies', async () => {
    store.state.favorites = [];
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.empty-state').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'MovieList' }).exists()).toBe(false);
  });

  it('clears favorite movies when the clear button is clicked', async () => {
    await wrapper.find('.clear-button').trigger('click');
    expect(store.commit).toHaveBeenCalledWith('clearFavorites');

    store.state.favorites = [];
    await wrapper.vm.$nextTick();

    expect(store.state.favorites.length).toBe(0);
  });
});