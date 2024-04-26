<script setup lang="ts">
defineProps({
    title: String,
    overview: String,
    poster: String
})
</script>

<template>
    <div class="movie-card">
        <img :src="'https://image.tmdb.org/t/p/w500' + poster" :alt="title" class="movie-poster" />
        <div class="movie-details">
            <h2 class="movie-title">{{ title }}</h2>
            <p class="movie-overview">{{ overview }}</p>
        </div>
    </div>
</template>

<style scoped>
.movie-card {
    display: flex;
    flex-direction: column;
    width: 300px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 20px;
}

.movie-poster {
    width: 100%;
    height: auto;
}

.movie-details {
    padding: 16px;
}

.movie-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
}

.movie-overview {
    font-size: 14px;
    line-height: 1.4;
}
</style>