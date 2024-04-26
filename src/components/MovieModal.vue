<script setup lang="ts">
import MovieDetails from './MovieDetails.vue';
import { Icon } from '@iconify/vue'

defineProps<{
    show: boolean;
}>();

const emit = defineEmits(['close']);

const closeModal = () => {
    emit('close');
};
</script>

<template>
    <transition name="modal-fade">
        <div v-if="show" class="modal">
            <div class="modal-overlay" @click="closeModal"></div>
            <div class="modal-content">
                <Icon class="close-icon" icon="ic:round-close" @click="closeModal" />
                <MovieDetails />
            </div>
        </div>
    </transition>
</template>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    z-index: 9999;
    overflow-y: auto;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    animation: blur-in 1s ease-in-out;
}

.modal-content {
    position: relative;
    z-index: 20;
    background-color: #242424;
    border-radius: 8px;
    max-width: 600px;
    width: 90%;
    max-height: 90%;
    padding-bottom: 20px;
    box-sizing: border-box;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease-in-out;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.close-icon {
    width: 32px;
    height: 32px;
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    color: #fff;
    cursor: pointer;
    z-index: 30;
}

.close-icon:hover {
    color: #FF3162;
}

@keyframes blur-in {
    0% {
        backdrop-filter: blur(0);
    }

    100% {
        backdrop-filter: blur(5px);
    }
}

@media (max-width: 600px) {
    .modal-content {
        width: 100%;
        max-height: 100%;
        border-radius: 0;
    }
}
</style>