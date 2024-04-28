import { shallowMount, VueWrapper } from '@vue/test-utils';
import MovieModal from '@/components/MovieModal.vue';
import { ComponentPublicInstance } from 'vue';

interface Modal extends ComponentPublicInstance {
    isMobile: boolean;
}

describe('MovieModal.vue', () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
        wrapper = shallowMount(MovieModal, {
            props: {
                show: true,
            },
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('renders the modal when show prop is true', () => {
        expect(wrapper.find('.modal').exists()).toBe(true);
    });

    it('emits the close event when the close icon is clicked', () => {
        wrapper.find('.close-icon').trigger('click');
        expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('emits the close event when the modal overlay is clicked', () => {
        wrapper.find('.modal-overlay').trigger('click');
        expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('adds the modal-mobile class when isMobile is true', async () => {
        (wrapper.vm as Modal).isMobile = true;
        await wrapper.vm.$nextTick();
        expect(wrapper.find('.modal').classes()).toContain('modal-mobile');
    });

    it('adds the modal-content-mobile class when isMobile is true', async () => {
        (wrapper.vm as Modal).isMobile = true;
        await wrapper.vm.$nextTick();
        expect(wrapper.find('.modal-content').classes()).toContain('modal-content-mobile');
    });

    it('renders the MovieDetails component', () => {
        expect(wrapper.findComponent({ name: 'MovieDetails' }).exists()).toBe(true);
    });
});