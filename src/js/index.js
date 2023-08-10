const catSelector = document.querySelector('.breed-select');
const catLoader = document.querySelector('.loader');
import { FetchBreeds } from './cat-api.js';

let cats = new FetchBreeds();
cats
  .then(kitty => {
    catSelector.innerHTML = kitty
      .map(cat => {
        return `<option value=${cat.id}>${cat.name}</option>`;
      })
      .join('');
  })
  .catch(error => console.log(error));

catSelector.addEventListener('click', () => {
  let options = catSelector.querySelectorAll('option');
  catLoader.innerHTML = `Cats found: ${options.length}`;
});
