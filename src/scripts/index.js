import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/responsive.css';
import App from './view/app';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#menu'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#main-content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

document.addEventListener('DOMContentLoaded', () => {
  const skipButton = document.querySelector('.skip-link');
  const mainElement = document.querySelector('#main-content');

  skipButton.addEventListener('click', (event) => {
    event.preventDefault();
    mainElement.focus();
  });
  skipButton.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      mainElement.focus();
    }
  });
});