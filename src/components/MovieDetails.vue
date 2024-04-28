<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { State } from '@/types/store';

const store = useStore<State>();
const movie = computed(() => store.state.currentMovieDetails);
const isVisible = ref(false);
const isImageLoaded = ref(false);

const isFavorite = computed(() => {
    return store.state.favorites.some((fav) => fav.id === movie.value?.id);
});

const toggleFavorite = () => {
    if (movie.value) {
        store.dispatch('toggleFavorite', movie.value);
    }
};

const onImageLoad = () => {
    isImageLoaded.value = true;
};

const formatRevenue = (revenue: number | undefined) => {
    if (revenue === undefined) {
        return '';
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(revenue);
};
</script>

<template>
    <div class="movie-details" :class="{ 'show': isVisible }">
        <div class="movie-poster-container">
            <transition name="fade">
                <img :src="'https://image.tmdb.org/t/p/w500' + movie?.backdrop_path" :alt="movie?.title"
                    class="movie-poster" @load="onImageLoad" v-show="isImageLoaded" />
            </transition>
            <transition name="fade">
                <div class="movie-poster-placeholder" v-show="!isImageLoaded"></div>
            </transition>
        </div>
        <div class="movie-info">
            <h2 data-test="movie-title">{{ movie?.title }}</h2>
            <div class="movie-genres">
                <span class="genre-chip" v-for="genre in movie?.genres" :key="genre.id">{{ genre.name }}</span>
            </div>
            <div class="movie-meta">
                <p><span class="meta-label">Release Date:</span> <span class="meta-value" data-test="release-date">{{
                    movie?.release_date }}</span>
                </p>
                <p><span class="meta-label">Revenue:</span> <span class="meta-value" data-test="revenue">{{
                    formatRevenue(movie?.revenue)
                }}</span></p>
            </div>
            <div>
                <h3 class="meta-label">Overview:</h3>
                <p data-test="overview">{{ movie?.overview }}</p>
            </div>
            <div class="favorite-button-container">
                <button @click="toggleFavorite" class="favorite-button" :class="{ 'favorite': isFavorite }"
                    data-test="favorite-button">
                    {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.movie-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
}

.movie-genres {
    margin-bottom: 10px;
}

.movie-meta {
    margin-bottom: 10px;
}

.movie-meta p {
    margin: 5px 0;
}

.meta-label {
    color: #ff3162;
    font-weight: bold;
}

.meta-value {
    color: #fff;
}

.genre-chip {
    display: inline-block;
    color: #FF3162;
    padding: 5px 10px;
    margin-right: 5px;
    margin-bottom: 5px;
    background-color: #242424;
    border: 1px solid #FF3162;
    border-radius: 20px;
    font-size: 14px;
}

.movie-poster-container {
    width: 100%;
    height: 300px;
    position: relative;
}

.movie-poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
}

.movie-poster-placeholder {
    width: 100%;
    height: 100%;
    background-color: #242424;
    position: absolute;
    top: 0;
    left: 0;
}

.movie-info {
    position: relative;
    max-width: 600px;
    border-radius: 8px 8px 0 0;
    background-color: #242424;
    overflow-y: auto;
    padding: 0 20px 0 20px;
    margin-top: -24px;
}

.favorite-button-container {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
}

.favorite-button {
    display: inline-block;
    padding: 8px 16px;
    font-size: 14px;
    color: #fff;
    background-color: #242424;
    border: 1px solid #FF3162;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.favorite-button:hover {
    background-color: #FF3162;
}

.favorite-button.favorite {
    background-color: #FF3162;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

@media (max-width: 600px) {
    .movie-poster-container {
        height: 200px;
    }

    .movie-info {
        max-width: 100%;
        border-radius: 0;
        margin-top: 0;
    }

    .favorite-button {
        width: 100%;
    }
}
</style>