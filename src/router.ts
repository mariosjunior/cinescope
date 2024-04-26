import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from './components/HomePage.vue';
import FavoritesPage from './components/FavoritesPage.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: FavoritesPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;