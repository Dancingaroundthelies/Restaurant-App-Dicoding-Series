import restoSource from '../../data/resto-source';
import { createRestoItemTemplate } from '../templates/template-creator';
import '../component/hero';

const Home = {
  async render() {
    return `
    <hero-header> </hero-header>
      <section class="content">
        <div class="explore">
          <h1 class="explore__label">Explore Restaurants</h1>
          <hr style="width: 30%; border: 3px solid #24B2B4; margin: auto" />
        </div>
        <div class="cards" id="cards"></div>
      </section>
    `;
  },

  async afterRender() {
    const resto = await restoSource.restoLists();
    // console.log(resto);
    const restoContainer = document.querySelector('#cards');
    resto.forEach((restaurant) => {
        restoContainer.innerHTML += createRestoItemTemplate(restaurant);
    });
  },
};

export default Home;