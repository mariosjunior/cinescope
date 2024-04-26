<script setup lang="ts">
import { Icon } from '@iconify/vue'
defineProps({
    title: String,
    overview: String,
    poster: String,
    popularity: Number,
    voteAverage: Number,
    voteCount: Number
})

const truncateOverview = (overview: string | undefined, maxLength: number) => {
    if (!overview) {
        return '';
    }
    if (overview.length > maxLength) {
        return overview.slice(0, maxLength) + '...';
    }
    return overview;
}

const formatPopularity = (popularity: number | undefined) => {
    if (!popularity) {
        return '0';
    }
    return Math.round(popularity).toLocaleString();
};

const formatVoteAverage = (voteAverage: number | undefined) => {
    if (!voteAverage) {
        return '0';
    }
    return voteAverage.toFixed(1);
};
</script>

<template>
    <div class="movie-card">
        <div class="movie-poster">
            <img :src="'https://image.tmdb.org/t/p/w500' + poster" :alt="title" />
        </div>
        <div class="movie-details">

            <h2 class="movie-title">{{ title }}</h2>
            <p class="movie-overview">{{ truncateOverview(overview, 150) }}</p>
            <div class="movie-info">
                <span class="info-item">
                    <Icon class="icon" icon="noto:fire" /> {{ formatPopularity(popularity) }}
                </span>
                <span class="info-item">
                    <Icon class="icon" icon="noto:star" /> {{ formatVoteAverage(voteAverage) }}
                </span>
                <span class="info-item">
                    <Icon class="icon" icon="bxs:upvote" style="color: greenyellow" /> {{ voteCount }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.movie-card {
    display: flex;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
    position: relative;
    transition: transform 0.3s ease;
    cursor: pointer;
}

.movie-card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.movie-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    backdrop-filter: blur(10px);
    z-index: -1;
    transition: backdrop-filter 0.3s ease;
}

.movie-card:hover::before {
    backdrop-filter: blur(20px);
}

.movie-poster {
    flex: 0 0 150px;
}

.movie-poster img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.movie-card:hover .movie-poster img {
    transform: scale(1.1);
}

.movie-details {
    flex: 1;
    padding: 16px;
    display: flex;
    flex-direction: column;
}

.movie-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
}

.movie-overview {
    font-size: 14px;
    line-height: 1.4;
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.movie-info {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-top: auto;
}

.info-item {
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, rgba(171, 171, 171, 0.1), rgb(73, 73, 73));
    padding: 4px;
    border-radius: 8px;

}

.icon {
    padding-right: 2px;
}
</style>