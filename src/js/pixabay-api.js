import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '21553593-5dff095819739d8fe44d39f5a';

export function search(element, page) {
  const url = `${BASE_URL}?key=${KEY}&q=${element}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`;
  return axios.get(url);
}
