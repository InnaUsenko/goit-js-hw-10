import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_CttqUDgsl3QpcnrJnabHDIavdhXusNOK6meoDtBuGton0oococU1QacoNfuXCiAb';

export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds').then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  const searchParams = new URLSearchParams({
    breed_ids: breedId,
  });
  return fetch(
    `https://api.thecatapi.com/v1/images/search?${searchParams}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
