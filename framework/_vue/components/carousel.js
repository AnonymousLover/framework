import vCarousel from '../_components/carousel/carousel.vue'
import vCarouselBanner from '../_components/carousel/carousel.banner.vue'

[
  vCarousel,
  vCarouselBanner
].forEach(component => {
  component.install = Vue => Vue.component(component.name, component);
});

export {
  vCarousel,
  vCarouselBanner
}
