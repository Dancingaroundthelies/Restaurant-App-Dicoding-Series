import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

function foodsRestaurant(restaurant) {
  return restaurant.menus.foods.map((food) => `
  <li>${food.name}</li>
  `)
  .join('');
}

function drinksRestaurant(restaurant) {
  return restaurant.menus.drinks.map((drink) => `
  <li>${drink.name}</li>
  `).join('');
}

function customerReviews(restaurant) {
  return restaurant.customerReviews.map((reviews) => `
  <li class="review">
      <div class="name-review">${reviews.name}</div>
      <div class="date-review">${reviews.date}</div>
      <div class="description-review">" ${reviews.review} "</div>
  </li>
  `).join('');
}

const createRestoDetailTemplate = (restaurant) => `
<div class="detail">
    <div class="resto-detail">
      <h1 class="resto-title-detail">${restaurant.name}</h1>
      <img class="resto-image-detail lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" crossorigin="anonymous"/>
    </div>

    <div class="resto-info">
        <h2 class="resto-label">Address</h2>
        <h3 class="resto-text">${restaurant.address}</h3>
        <h2 class="resto-label">Kota</h2>
        <h3 class="resto-text">${restaurant.city}</h3>
        <h2 class="resto-label">Rating</h2>
        <h3 class="resto-text">⭐️${restaurant.rating}</h3>
        <h2 class="resto-label">Description</h2>
        <p class="resto-description-detail">${restaurant.description}</p>
    </div>

    <div class="resto-menu">
      <h2 class="resto-label"> Menu</h2>
      <div class="menu">
          <ul>
              <li>Foods</li>
              <ul>${foodsRestaurant(restaurant)}</ul>
          </ul>
          <ul>
              <li>Drinks</li> 
              <ul>${drinksRestaurant(restaurant)}</ul>
          </ul>
      </div>
    </div>

    <div class="resto-review">
      <h2 class="resto-label">Customer Reviews</h2>
      <ul class="review-boxs"> ${customerReviews(restaurant)}</ul>
    </div>
</div>
`;

const createRestoItemTemplate = (restaurant) => `
  <div class="card-item">
    <div class="card-item_image">
      <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" crossorigin="anonymous"/>
      <div class="card-item_location">${restaurant.city}</div>
      <p class="card-item_rating">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="18px" height="14px">
          <path fill="#FFD43B" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
        </svg>
        ${restaurant.rating}
      </p>
    </div>
    <div class="card-item_content">
        <h1 class="card-item_title">
            <a href="/#/detail/${restaurant.id}">${restaurant.name}</a>
        </h1>
        <p class="card-item_desc">${restaurant.description}</p>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestoDetailTemplate,
  createRestoItemTemplate,
  createLikeButtonTemplate,
  createUnlikeButtonTemplate,
};