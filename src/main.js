//library 1
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

//library 2
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

//imports from folder JS
import { search } from './js/pixabay-api';
import { renderMarkup } from './js/render-functions';

//const from HTML
const galleryListEl = document.querySelector('.gallery-list');
const formEl = document.querySelector('form');
const loaderEl = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.load-more-btn-js');

let lightbox = new SimpleLightbox('.gallery-list a', {});

let page = 1;
let cardHeight = 0;
let foundValue = '';

//! first function
const elementForSearch = async event => {
  //todo
  try {
    //
    event.preventDefault();
    //
    foundValue = event.target.elements.choiceSearch.value.toLowerCase().trim();
    //
    page = 1;
	galleryListEl.innerHTML = '';
    //
    if (!foundValue) {
      iziToast.error({ message: 'Please enter a search word.' });
      return;
    }
    //
    loaderEl.style.display = 'block';
    //
    const response = await search(foundValue, page);
    //
    if (response.data.totalHits === 0) {
      loadMoreBtnEl.classList.add('is-hidden');
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      galleryListEl.innerHTML = '';
      return;
    }
    //
    renderMarkup(response.data.hits, galleryListEl);
    //
    const galleryCardEl = galleryListEl.querySelector('li');
    cardHeight = galleryCardEl.getBoundingClientRect().height;
    //
    if (response.data.totalHits > 15) {
      loadMoreBtnEl.classList.remove('is-hidden');
    }else{
		loadMoreBtnEl.classList.add('is-hidden');
	}
    //
    lightbox.refresh();
    //
    formEl.reset();

    //todo
  } catch (err) {
    iziToast.error({
      message: err.message,
      messageColor: '#fff',
      position: 'topRight',
      color: '#ef4040',
      maxWidth: '350px',
    });

    //todo
  } finally {
    loaderEl.style.display = 'none';
    formEl.reset();
  }
};

//! second function
const onLoadMoreClick = async () => {
  //todo
  try {
    page += 1;
    //
    loadMoreBtnEl.classList.add('is-hidden');
    //
    loaderEl.style.display = 'block';
    //
    const response = await search(foundValue, page);
    //

    renderMarkup(response.data.hits, galleryListEl);
    //
    lightbox.refresh();
    //
    scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    
    loadMoreBtnEl.classList.remove('is-hidden');
    //
    if (page === Math.ceil(response.data.totalHits / 15)) {
      loadMoreBtnEl.classList.add('is-hidden');
      iziToast.warning({
        title: 'Info',
        message: 'Were sorry, but you have reached the end of search results.',
        position: 'topRight',
      });
    }

    //todo
  } catch (err) {
    iziToast.error({
      message: err.message,
      messageColor: '#fff',
      position: 'topRight',
      color: '#ef4040',
      maxWidth: '350px',
    });

    //todo
  } finally {
    loaderEl.style.display = 'none';
  }
};

formEl.addEventListener('submit', elementForSearch);
loadMoreBtnEl.addEventListener('click', onLoadMoreClick);
