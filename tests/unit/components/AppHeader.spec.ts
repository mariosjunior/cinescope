import AppHeader from '@/components/AppHeader.vue';
import { shallowMount, flushPromises, RouterLinkStub } from '@vue/test-utils';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    { path: '/', component: { template: '<div></div>' } },
    { path: '/favorites', component: { template: '<div></div>' } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

describe('AppHeader', () => {
    it('renders the component correctly', () => {
        const wrapper = shallowMount(AppHeader, {
            global: {
                plugins: [router],
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    it('displays the logo text', () => {
        const wrapper = shallowMount(AppHeader, {
            global: {
                plugins: [router],
            },
        });
        const logoText = wrapper.find('.logo h1');
        expect(logoText.text()).toBe('CineScope');
    });

    it('renders the navigation links', () => {
        const wrapper = shallowMount(AppHeader, {
            global: {
                plugins: [router],
                stubs: {
                    RouterLink: RouterLinkStub,
                },
            },
        });
        const navLinks = wrapper.findAll('nav ul li');
        expect(navLinks.length).toBe(2);

        expect(navLinks[0].text()).toContain('Home');
        expect(navLinks[1].text()).toContain('My Favorites');
    });

    it('applies the active class to the active route', async () => {
        const wrapper = shallowMount(AppHeader, {
            global: {
                plugins: [router],
                stubs: {
                    RouterLink: RouterLinkStub,
                },
            },
        });

        await router.push('/');
        await flushPromises();

        const routerLinks = wrapper.findAllComponents(RouterLinkStub);

        expect(routerLinks[0].props().to).toBe('/');
        expect(routerLinks[1].props().to).not.toBe('/');

        await router.push('/favorites');
        await flushPromises();

        expect(routerLinks[0].props().to).not.toBe('/favorites');
        expect(routerLinks[1].props().to).toBe('/favorites');
    });
});
