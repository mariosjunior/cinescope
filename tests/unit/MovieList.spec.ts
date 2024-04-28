import { shallowMount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import { State, Movie } from '@/types/store';
import MovieList from '@/components/MovieList.vue';
import { ComponentPublicInstance } from 'vue';

interface MovieListInstance extends ComponentPublicInstance {
    selectedMovie: Movie | null;
    showModal: boolean;
}

const createVuexStore = (initialState: State): Store<State> => {
    const store = createStore({
        state: initialState,
        actions: {
            fetchMovieDetails: jest.fn(),
        },
    });

    return store;
};

describe('MovieList.vue', () => {
    let wrapper: VueWrapper;
    let store: Store<State>;
    let initialState: State;
    let fetchMovieDetailsMock: jest.Mock;

    beforeEach(() => {
        initialState = {
            data: null,
            currentPage: 1,
            currentMovieDetails: null,
            favorites: [],
        };

        fetchMovieDetailsMock = jest.fn();

        store = createVuexStore(initialState);
        store.dispatch = fetchMovieDetailsMock;
    });

    it('shows movie details when a movie card is clicked', async () => {
        const movie: Movie = {
            id: 1,
            title: 'Movie 1',
            overview: 'Overview 1',
            poster_path: '/poster1.jpg',
            popularity: 7.8,
            vote_average: 7.5,
            vote_count: 100,
            backdrop_path: '/backdrop1.jpg',
            release_date: '2012-12-12'
        };

        wrapper = shallowMount(MovieList, {
            global: {
                plugins: [store],
            },
            props: {
                movies: [movie],
            },
        });

        await wrapper.findComponent({ name: 'MovieCard' }).trigger('click');

        expect(fetchMovieDetailsMock).toHaveBeenCalledWith('fetchMovieDetails', movie.id);
        expect(wrapper.vm).toEqual(expect.objectContaining({
            selectedMovie: store.state.currentMovieDetails,
            showModal: true,
        }));
    });

    it('renders the correct number of movie cards', () => {
        const movies: Movie[] = [
            { id: 1, title: 'Movie 1', overview: 'Overview 1', poster_path: '/poster1.jpg', popularity: 7.8, vote_average: 7.5, vote_count: 100, backdrop_path: '/backdrop1.jpg', release_date: '2012-12-12' },
            { id: 2, title: 'Movie 2', overview: 'Overview 2', poster_path: '/poster2.jpg', popularity: 8.1, vote_average: 7.8, vote_count: 150, backdrop_path: '/backdrop2.jpg', release_date: '2013-03-15' },
            { id: 3, title: 'Movie 3', overview: 'Overview 3', poster_path: '/poster3.jpg', popularity: 6.9, vote_average: 6.7, vote_count: 80, backdrop_path: '/backdrop3.jpg', release_date: '2014-06-20' },
        ];

        wrapper = shallowMount(MovieList, {
            global: {
                plugins: [store],
            },
            props: {
                movies,
            },
        });

        const movieCards = wrapper.findAllComponents({ name: 'MovieCard' });
        expect(movieCards).toHaveLength(movies.length);
    });

    it('closes the modal when the close event is emitted', async () => {
        const movie: Movie = {
            id: 1,
            title: 'Movie 1',
            overview: 'Overview 1',
            poster_path: '/poster1.jpg',
            popularity: 7.8,
            vote_average: 7.5,
            vote_count: 100,
            backdrop_path: '/backdrop1.jpg',
            release_date: '2012-12-12',
        };

        wrapper = shallowMount(MovieList, {
            global: {
                plugins: [store],
            },
            props: {
                movies: [movie],
            },
        });

        await wrapper.findComponent({ name: 'MovieCard' }).trigger('click');
        expect((wrapper.vm as MovieListInstance).showModal).toBe(true);

        wrapper.findComponent({ name: 'MovieModal' }).vm.$emit('close');
        expect((wrapper.vm as MovieListInstance).showModal).toBe(false);
        expect((wrapper.vm as MovieListInstance).selectedMovie).toBeNull();
    });

    it('passes the correct props to the MovieModal component', async () => {
        const movie: Movie = {
            id: 1,
            title: 'Movie 1',
            overview: 'Overview 1',
            poster_path: '/poster1.jpg',
            popularity: 7.8,
            vote_average: 7.5,
            vote_count: 100,
            backdrop_path: '/backdrop1.jpg',
            release_date: '2012-12-12',
        };

        wrapper = shallowMount(MovieList, {
            global: {
                plugins: [store],
            },
            props: {
                movies: [movie],
            },
        });

        await wrapper.findComponent({ name: 'MovieCard' }).trigger('click');
        const movieModal = wrapper.findComponent({ name: 'MovieModal' });
        expect(movieModal.props('show')).toBe(true);
    });

    it('passes the correct props to the MovieModal component', async () => {
        const movie: Movie = {
            id: 1,
            title: 'Movie 1',
            overview: 'Overview 1',
            poster_path: '/poster1.jpg',
            popularity: 7.8,
            vote_average: 7.5,
            vote_count: 100,
            backdrop_path: '/backdrop1.jpg',
            release_date: '2012-12-12',
        };

        wrapper = shallowMount(MovieList, {
            global: {
                plugins: [store],
            },
            props: {
                movies: [movie],
            },
        });

        await wrapper.findComponent({ name: 'MovieCard' }).trigger('click');
        const movieModal = wrapper.findComponent({ name: 'MovieModal' });
        expect(movieModal.props('show')).toBe(true);
    });
});