const catSelector = document.querySelector('.breed-select');
const catLoader = document.querySelector('.loader');
const catError = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

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
    catLoader.classList.add('hiden-selector');
    catInfo.classList.add('hiden-selector');
    catError.classList.toggle('hiden-selector');
  });

catSelector.addEventListener('change', event => {
  const option = event.currentTarget.value;
  catSelector.disabled = true;
  const catPromice = fetchCatByBreed(option);
  const theCat = cats.find(cat => cat.id === option);
  catInfo.classList.toggle('hiden-selector');
  catLoader.classList.toggle('hiden-selector');
  const pict = catPromice
    .then(kitty => {
      setTimeout(() => {
        if (kitty.length > 0 && theCat) {
          catInfo.innerHTML = CreatePictures(kitty) + ' ' + CreateInfo(theCat);
        }
        catSelector.disabled = false;
        catLoader.classList.toggle('hiden-selector');
        catInfo.classList.toggle('hiden-selector');
      }, 1000);
    })
    .catch(error => {
      console.log(error);
      catLoader.classList.add('hiden-selector');
      catInfo.classList.add('hiden-selector');
      catError.classList.toggle('hiden-selector');
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
      return `<img src=${obj.url} alt=${obj.id}/>`;
    })
    .join('');
}

function CreateInfo(theCat) {
  return `<div><h2>${theCat.name}</h2><p>${theCat.description}</p><p><b>Temperament: </b>${theCat.temperament}</p></div>`;
}
