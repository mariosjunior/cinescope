<script setup lang="ts">
import { useStore } from "vuex";
import { computed, onMounted, onUnmounted } from "vue";
import { State } from "@/types/store";
import MovieList from './MovieList.vue';

const store = useStore<State>();

const data = computed(() => store.state.data);
const currentPage = computed(() => store.state.currentPage);
const isLoading = computed(() => store.state.isLoading);

const loadMore = () => {
  if (!isLoading.value && currentPage.value < (data.value?.total_pages || 0)) {
    store.commit("setCurrentPage", currentPage.value + 1);
    store.dispatch("fetchData", true);
  }
};

const handleScroll = () => {
  const scrollTrigger = document.querySelector('.scroll-trigger');
  if (scrollTrigger) {
    const triggerTop = scrollTrigger.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (triggerTop <= windowHeight) {
      loadMore();
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

store.dispatch("fetchData");
</script>

<template>
  <div>
    <div v-if="data">
      <MovieList :movies="data.results" />
      <div class="scroll-trigger"></div>
    </div>
  </div>
</template>

<style scoped>
.scroll-trigger {
  height: 100px;
}
</style>