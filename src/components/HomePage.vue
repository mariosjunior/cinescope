<script setup lang="ts">
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
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

watch(showModal, (newValue) => {
  if (newValue) {
    document.body.classList.add('modal-open');
    document.body.style.paddingRight = getScrollbarWidth() + 'px';
  } else {
    document.body.classList.remove('modal-open');
    document.body.style.paddingRight = '';
  }
});

const getScrollbarWidth = () => {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode?.removeChild(outer);

  return scrollbarWidth;
};

store.dispatch("fetchData");
</script>

<template>
  <div>
    <div v-if="data">
      <div class="movie-grid">
        <MovieCard v-for="movie in data.results" :key="movie.id" :title="movie.title" :overview="movie.overview"
          :poster="movie.poster_path" :popularity="movie.popularity" :voteAverage="movie.vote_average"
          :voteCount="movie.vote_count" @click="showMovieDetails(movie.id)" />
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

<style>
body.modal-open {
  overflow: hidden;
}
</style>