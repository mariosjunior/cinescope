<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import { State } from "@/types/store";
import MovieList from './MovieList.vue';

const store = useStore<State>();

const data = computed(() => store.state.data);
const currentPage = computed(() => store.state.currentPage);

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

store.dispatch("fetchData");
</script>

<template>
  <div>
    <div v-if="data">
      <MovieList :movies="data.results" />
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