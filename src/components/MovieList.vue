<script setup lang="ts">
import { useStore } from "vuex";
import { ref } from "vue";
import { State } from "@/types/store";
import MovieCard from "./MovieCard.vue";
import MovieModal from "./MovieModal.vue";
import { Movie } from '@/types/store';

defineProps<{
    movies: Movie[];
}>();

const store = useStore<State>();

const selectedMovie = ref<Movie | null>(null);
const showModal = ref(false);

const showMovieDetails = async (id: number) => {
    await store.dispatch("fetchMovieDetails", id);
    selectedMovie.value = store.state.currentMovieDetails;
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    selectedMovie.value = null;
};
</script>
<template>
    <div>
        <div class="movie-grid">
            <MovieCard v-for="movie in movies" :key="movie.id" :title="movie.title" :overview="movie.overview"
                :poster="movie.poster_path" :popularity="movie.popularity" :voteAverage="movie.vote_average"
                :voteCount="movie.vote_count" :backCover="movie.backdrop_path" @click="showMovieDetails(movie.id)" />
        </div>
        <MovieModal :show="showModal" @close="closeModal" />
    </div>
</template>

<style scoped>
.movie-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
}

@media screen and (min-width: 768px) {
    .movie-grid {
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    }
}
</style>