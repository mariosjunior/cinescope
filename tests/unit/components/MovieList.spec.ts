import { shallowMount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import { State, Movie, MovieDetails } from '@/types/store';
import MovieList from '@/components/MovieList.vue';
import { ComponentPublicInstance } from 'vue';

interface MovieListInstance extends ComponentPublicInstance {
    selectedMovie: Movie | null;
    showModal: boolean;
    showMovieDetails: (movieId: number) => void;
    closeModal: () => void;
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

const createTestMovie = (): Movie => ({
    id: 1,
    title: 'Movie 1',
    overview: 'Overview 1',
    poster_path: '/poster1.jpg',
    popularity: 7.8,
    vote_average: 7.5,
    vote_count: 100,
    backdrop_path: '/backdrop1.jpg',
    release_date: '2012-12-12',
});

describe('MovieList.vue', () => {
    let store: Store<State>;
    let initialState: State;
    let fetchMovieDetailsMock: jest.Mock;

    beforeEach(() => {
        initialState = {
            data: null,
            currentPage: 1,
            currentMovieDetails: null,
            favorites: [],
            isLoading: false
        };

        fetchMovieDetailsMock = jest.fn();

        store = createVuexStore(initialState);
        store.dispatch = fetchMovieDetailsMock;
    });

    const mountMovieList = (movies: Movie[]): VueWrapper => {
        return shallowMount(MovieList, {
            global: {
                plugins: [store],
            },
            props: {
                movies,
            },
        });
    };

    describe('Movie card interactions', () => {
        it('shows movie details when a movie card is clicked', async () => {
            const movie = createTestMovie();
            const wrapper = mountMovieList([movie]);

            await wrapper.findComponent({ name: 'MovieCard' }).trigger('click');

            expect(fetchMovieDetailsMock).toHaveBeenCalledWith('fetchMovieDetails', movie.id);
            expect(wrapper.vm).toEqual(expect.objectContaining({
                selectedMovie: store.state.currentMovieDetails,
                showModal: true,
            }));
        });

        it('calls showMovieDetails with the correct movie id when a movie card is clicked', async () => {
            const movie = createTestMovie();
            const wrapper = mountMovieList([movie]);

            const showMovieDetailsSpy = jest.spyOn(wrapper.vm as MovieListInstance, 'showMovieDetails');
            await wrapper.findComponent({ name: 'MovieCard' }).trigger('click');
            expect(showMovieDetailsSpy).toHaveBeenCalledWith(movie.id);
        });

        it('emits the click event with the correct movie id when a movie card is clicked', async () => {
            const movie = createTestMovie();
            const wrapper = mountMovieList([movie]);

            const movieCard = wrapper.findComponent({ name: 'MovieCard' });
            movieCard.vm.$emit('click', movie.id);
            expect(movieCard.emitted('click')).toBeTruthy();
            expect(movieCard.emitted('click')![0]).toEqual([movie.id]);
        });
    });

    describe('Movie modal interactions', () => {
        it('closes the modal when the close event is emitted', async () => {
            const movie = createTestMovie();
            const wrapper = mountMovieList([movie]);

            await wrapper.findComponent({ name: 'MovieCard' }).trigger('click');
            expect((wrapper.vm as MovieListInstance).showModal).toBe(true);

            wrapper.findComponent({ name: 'MovieModal' }).vm.$emit('close');
            expect((wrapper.vm as MovieListInstance).showModal).toBe(false);
            expect((wrapper.vm as MovieListInstance).selectedMovie).toBeNull();
        });

        it('passes the correct props to the MovieModal component', async () => {
            const movie = createTestMovie();
            const wrapper = mountMovieList([movie]);

            await wrapper.findComponent({ name: 'MovieCard' }).trigger('click');
            const movieModal = wrapper.findComponent({ name: 'MovieModal' });
            expect(movieModal.props('show')).toBe(true);
        });

        it('resets currentMovieDetails to null when the modal is closed', async () => {
            const movie: MovieDetails = {
                id: 1,
                title: 'Movie 1',
                overview: 'Overview 1',
                poster_path: '/poster1.jpg',
                popularity: 7.8,
                vote_average: 7.5,
                vote_count: 100,
                backdrop_path: '/backdrop1.jpg',
                release_date: '2012-12-12',
                revenue: 3,
                genres: [
                    {
                        id: 1,
                        name: 'Action'
                    }
                ]
            };

            store.state.currentMovieDetails = movie;

            const wrapper = mountMovieList([movie]);

            await wrapper.findComponent({ name: 'MovieCard' }).trigger('click');
            expect(store.state.currentMovieDetails).not.toBeNull();

            wrapper.findComponent({ name: 'MovieModal' }).vm.$emit('close');
            expect(store.state.currentMovieDetails).toBeNull();
        });
    });

    describe('Movie list rendering', () => {
        it('renders the correct number of movie cards', () => {
            const movies: Movie[] = [
                createTestMovie(),
                { ...createTestMovie(), id: 2, title: 'Movie 2' },
                { ...createTestMovie(), id: 3, title: 'Movie 3' },
            ];

            const wrapper = mountMovieList(movies);

            const movieCards = wrapper.findAllComponents({ name: 'MovieCard' });
            expect(movieCards).toHaveLength(movies.length);
        });

        it('passes the correct movie props to MovieCard component', () => {
            const movie = createTestMovie();
            store.state.favorites = [movie];

            const wrapper = mountMovieList([movie]);

            const movieCard = wrapper.findComponent({ name: 'MovieCard' });
            expect(movieCard.props()).toEqual({
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                poster: movie.poster_path,
                popularity: movie.popularity,
                voteAverage: movie.vote_average,
                voteCount: movie.vote_count,
                backCover: movie.backdrop_path,
            });
        });
    });
});