<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { State } from '@/types/store';
import MovieList from './MovieList.vue';

const store = useStore<State>();

const favoriteMovies = computed(() => store.state.favorites);

const clearFavorites = () => {
    store.commit('clearFavorites');
};

</script>

<template>
    <div class="favorites-page">
        <button @click="clearFavorites" class="clear-button">Limpar Favoritos</button>
        <div v-if="favoriteMovies?.length === 0" class="empty-state">
            <p>No favorite movies.</p>
        </div>
        <div v-else>
            <MovieList :movies="favoriteMovies" />
        </div>
    </div>
</template>
  
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
</style>