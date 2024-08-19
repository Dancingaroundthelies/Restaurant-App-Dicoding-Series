import UrlParser from '../../routes/url-parser';
import restoSource from '../../data/resto-source';
import { createRestoDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
    <div id="restoran" class="restaurant-detail"></div>
    <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await restoSource.restoDetail(url.id);

    const restaurantContainer = document.querySelector('#restoran');
    restaurantContainer.innerHTML = createRestoDetailTemplate(restaurant);

    LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          rating: restaurant.rating,
          pictureId: restaurant.pictureId,
          city: restaurant.city,
          description: restaurant.description,
        },
      });

      // const submitReview = document.getElementById('submit-review');
      // submitReview.addEventListener('click', (event) => {
      //   event.preventDefault();
      // });
  },
};

export default Detail;