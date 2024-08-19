import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import "../styles/responsive.css";

import dataResto from "../public/data/DATA.json";

const displayRestaurants = (data) => {
  const restaurantContainer = document.querySelector(".cards");

  data.restaurants.forEach((restaurant) => {
    const { pictureId, name, city, rating, description } = restaurant;

    const restaurantItem = `
    <article class="card-item">
    <div class="card-item_image">
      <img src="${pictureId}" alt="${name}">
      <div class="card-item_location">${city}</div>
      <p class="card-item_rating">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="18px" height="14px">
          <path fill="#FFD43B" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
        </svg>
        ${rating}
      </p>
      </div>
      <div class="card-item_content">
        <h1 class="card-item_title">${name}</h1>
        <p class="card-item_desc">${description}</p>
      </div>
    </article>
  `;

  restaurantContainer.innerHTML += restaurantItem;
  })
};

displayRestaurants(dataResto);

const burgerButtonElement = document.querySelector("#menu");
const drawerElement = document.querySelector("#drawer");
const mainElement = document.querySelector("main");

burgerButtonElement.addEventListener("click", (event) => {
  drawerElement.classList.toggle("open");
  event.stopPropagation();
});

mainElement.addEventListener("click", (event) => {
  drawerElement.classList.remove("open");
  event.stopPropagation();
});

console.log('Hello Coders! :)');
