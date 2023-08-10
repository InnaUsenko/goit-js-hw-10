import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_CttqUDgsl3QpcnrJnabHDIavdhXusNOK6meoDtBuGton0oococU1QacoNfuXCiAb';

export function FetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds').then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
