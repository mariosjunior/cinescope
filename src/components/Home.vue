<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';
import { State } from '@/types/store';
import MovieCard from './MovieCard.vue'

const store = useStore<State>();

const data = computed(() => store.state.data);
const currentPage = computed(() => store.state.currentPage);
console.log(data.value)

const prevPage = () => {
  if (currentPage.value > 1) {
    store.commit('setCurrentPage', currentPage.value - 1);
    store.dispatch('fetchData');
  }
};

const nextPage = () => {
  if (currentPage.value < (data.value?.total_pages || 0)) {
    store.commit('setCurrentPage', currentPage.value + 1);
    store.dispatch('fetchData');
  }
};

store.dispatch('fetchData');
</script>

<template>
  <div>
    <div v-if="data">
      <div v-for="movie in data.results" :key="movie.id">
        <MovieCard :title="movie.title" :overview="movie.overview" :poster="movie.poster_path" />
      </div>
      <div>
        <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
        <span>Página {{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage === data.total_pages">Próxima</button>
      </div>
    </div>
  </div>
</template>