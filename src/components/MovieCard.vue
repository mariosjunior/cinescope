<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, onMounted } from 'vue';

const props = defineProps({
    title: String,
    overview: String,
    poster: String,
    backCover: String,
    popularity: Number,
    voteAverage: Number,
    voteCount: Number
});

const isMobile = ref(false);

onMounted(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
});

const checkIsMobile = () => {
    isMobile.value = window.innerWidth < 768;
};

const getImageUrl = () => {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    const size = 'w500';
    const imageUrl = isMobile.value ? props.backCover : props.poster;
    return `${baseUrl}${size}${imageUrl}`;
};

const truncateOverview = (overview: string | undefined, maxLength: number) => {
    if (!overview) {
        return '';
    }
    if (overview.length > maxLength) {
        return overview.slice(0, maxLength) + '...';
    }
    return overview;
};

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
            <img :src="getImageUrl()" :alt="title" />
        </div>
        <div class="movie-details">
            <h2 class="movie-title">{{ title }}</h2>
            <p class="movie-overview">{{ truncateOverview(overview, 150) }}</p>
            <div class="movie-info">
                <span class="info-item">
                    <Icon class="icon" icon="mdi:fire" style="color: #ff3162" /> {{ formatPopularity(popularity) }}
                </span>
                <span class="info-item">
                    <Icon class="icon" icon="mdi:star" style="color: #ff3162" /> {{ formatVoteAverage(voteAverage) }}
                </span>
                <span class="info-item">
                    <Icon class="icon" icon="mdi:arrow-up-bold" style="color: #ff3162" /> {{ voteCount }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.movie-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
    position: relative;
    transition: transform 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}

.movie-card:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px #FF3162;
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
    flex: 0 0 auto;
    height: 200px;
}

.movie-poster img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 50%;
    transition: transform 0.3s ease;
}

.movie-card:hover .movie-poster img {
    transform: scale(1.05);
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
    margin-bottom: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.movie-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 14px;
    margin-top: auto;
}

.info-item {
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, rgba(171, 171, 171, 0.1), rgb(73, 73, 73));
    padding: 4px 8px 4px 8px;
    border-radius: 8px;
    margin-bottom: 8px;
}

.icon {
    padding-right: 2px;
    width: 22px;
    height: 22px;
}

@media screen and (min-width: 768px) {
    .movie-card {
        flex-direction: row;
    }

    .movie-poster {
        flex: 0 0 150px;
        height: auto;
    }
}
</style>