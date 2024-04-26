<script setup lang="ts">
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { State } from "@/types/store";
import MovieCard from "./MovieCard.vue";
import MovieModal from "./MovieModal.vue";
import { Movie } from '@/types/store';

const store = useStore<State>();

const data = computed(() => store.state.data);
const currentPage = computed(() => store.state.currentPage);
const selectedMovie = ref<Movie | null>(null);
const showModal = ref(false);

const prevPage = () => {
  if (currentPage.value > 1) {
    store.commit("setCurrentPage", currentPage.value - 1);
    store.dispatch("fetchData");
  }
};

const nextPage = () => {
  if (currentPage.value < (data.value?.total_pages || 0)) {
    store.commit("setCurrentPage", currentPage.value + 1);
    store.dispatch("fetchData");
  }
};

const showMovieDetails = async (id: number) => {
  await store.dispatch("fetchMovieDetails", id);
  selectedMovie.value = store.state.currentMovieDetails;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedMovie.value = null;
};

store.dispatch("fetchData");
</script>

<template>
  <div>
    <div v-if="data">
      <div class="movie-grid">
        <MovieCard v-for="movie in data.results" :key="movie.id" :title="movie.title" :overview="movie.overview"
          :poster="movie.poster_path" :popularity="movie.popularity" :voteAverage="movie.vote_average"
          :voteCount="movie.vote_count" :backCover="movie.backdrop_path" @click="showMovieDetails(movie.id)" />
      </div>
      <MovieModal :show="showModal" @close="closeModal" />
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">
          Anterior
        </button>
        <span>Página {{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage === data.total_pages">
          Próxima
        </button>
      </div>
    </div>
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

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  margin: 0 10px;
}
</style>