<template>
  <div>
    <div v-if="data">{{ data }}</div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import { State } from '@/types/store';

const store = useStore<State>();

const data = computed(() => store.state.data);

onMounted(() => {
  store.dispatch('fetchData');
})
</script>