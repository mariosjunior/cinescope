import { shallowMount, VueWrapper } from '@vue/test-utils';
import MovieCard from '@/components/MovieCard.vue';
import { Icon } from '@iconify/vue';

jest.mock('@iconify/vue', () => ({
    Icon: {
        template: '<span></span>'
    }
}));

describe('MovieCard.vue', () => {
    const props = {
        title: 'Lorem Ipsum',
        overview: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        poster: '/Lorem_Ipsum.jpg',
        backCover: '/Lorem_Ipsum_back.jpg',
        popularity: 92.5,
        voteAverage: 8.8,
        voteCount: 15000
    };

    let wrapper: VueWrapper;

    beforeEach(() => {
        wrapper = shallowMount(MovieCard, {
            props: props,
            global: {
                components: {
                    Icon
                }
            }
        });
    });

    it('should render the correct title', () => {
        expect(wrapper.find('.movie-title').text()).toBe(props.title);
    });

    it('should truncate the overview correctly', () => {
        const overviewText = wrapper.find('.movie-overview').text();
        expect(overviewText).toContain('...');
        expect(overviewText.length).toBeLessThanOrEqual(153);
    });

    it('should correctly format the popularity', () => {
        const infoItems = wrapper.findAll('.info-item');
        const popularity = infoItems[0].text();
        expect(popularity).toContain(Math.round(props.popularity).toLocaleString());
    });

    it('should correctly format the vote average', () => {
        const infoItems = wrapper.findAll('.info-item');
        const voteAverage = infoItems[1].text();
        expect(voteAverage).toContain(props.voteAverage.toFixed(1));
    });

    it('should display the correct vote count', () => {
        const infoItems = wrapper.findAll('.info-item');
        const voteCount = infoItems[2].text();
        expect(voteCount).toContain(props.voteCount.toString());
    });

    afterEach(() => {
        wrapper.unmount();
    });
});