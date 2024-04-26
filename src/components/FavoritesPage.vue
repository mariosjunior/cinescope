<template>
    <div class="favorites-page">
        <h2>Meus Favoritos</h2>
        <button @click="clearFavorites" class="clear-button">Limpar Favoritos</button>
        <div v-if="favoriteMovies?.length === 0" class="empty-state">
            <p>Nenhum filme favoritado.</p>
        </div>
        <div v-else class="movie-grid">
            <MovieCard v-for="movie in favoriteMovies" :key="movie.id" :title="movie.title" :overview="movie.overview"
                :poster="movie.poster_path" :popularity="movie.popularity" :voteAverage="movie.vote_average"
                :voteCount="movie.vote_count" :backCover="movie.backdrop_path" @click="showMovieDetails(movie.id)" />
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { State } from '@/types/store';
import MovieCard from './MovieCard.vue';

const store = useStore<State>();

const favoriteMovies = computed(() => store.state.favoriteMovies);

const clearFavorites = () => {
    store.commit('clearFavorites');
};

const showMovieDetails = async (id: number) => {
    console.log(id)
};
</script>
  
<style scoped>
.favorites-page {
    padding: 20px;
}

.clear-button {
    margin-bottom: 20px;
}

.empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 18px;
    color: #888;
}

.movie-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
}
</style>