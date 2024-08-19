import FavoriteRestaurantIdb from '../../data/favoriteresto-idb';
import { createRestoItemTemplate } from '../templates/template-creator';

const Favorite = {
    async render() {
        return `
        <section class="content">
            <h1 tabindex = "0" class="list-label">Daftar Favorite</h1>
            <div id="cards" class="cards"> </div>
        </section>
        `;
    },

    async afterRender() {
        const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
        const restaurantsContainer = document.querySelector('#cards');

        restaurants.forEach((restaurant) => {
            restaurantsContainer.innerHTML += createRestoItemTemplate(restaurant);
        });
    },
};

export default Favorite;