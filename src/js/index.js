const catSelector = document.querySelector('.breed-select');
const catLoader = document.querySelector('.loader');
const catError = document.querySelector('.error');
import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';

let cats = [];

let catsPromice = new fetchBreeds();
catsPromice
  .then(kitty => {
    catSelector.innerHTML = FillSelector(kitty);
    cats = kitty;
  })
  .catch(error => {
    console.log(error);
    catError.innerHTML = 'ERROR: ' + error;
  });

catSelector.addEventListener('change', event => {
  //let options = catSelector.querySelectorAll('option');
  const option = event.currentTarget.value;
  const catPromice = fetchCatByBreed(option);
  const catInfo = cats.find(cat => cat.id === option);
  console.log('cats: ' + cats.length);
  const pict = catPromice
    .then(kitty => {
      if (kitty.length > 0) {
        catLoader.insertAdjacentHTML('afterbegin', CreatePictures(kitty));
        console.log(kitty);
        if (catInfo) {
          catLoader.insertAdjacentHTML(
            'beforeend',
            `<h2>${catInfo.name}</h2><p>${catInfo.description}</p><p><b>Temperament:</b>${catInfo.temperament}</p>`
          );
        }
      }
    })
    .catch(error => {
      console.log(error);
      catError.innerHTML('ERROR: ' + error);
    });
});

function FillSelector(objList) {
  return objList
    .map(obj => {
      return `<option value=${obj.id}>${obj.name}</option>`;
    })
    .join('');
}

function CreatePictures(objList) {
  return objList
    .map(obj => {
      return `<img src=${obj.url} alt=${obj.id} width=320px/>`;
    })
    .join('');
}
