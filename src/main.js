import { searchImages } from './js/pixabay-api.js';
import { renderGalleryItems, showLoader, hideLoader, showLoadMoreBtn, hideLoadMoreBtn } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
const imagesPerPage = 15;

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.load-more');

const calculateTotalPages = (totalItems, itemsPerPage = 15) => {
  return Math.ceil(totalItems / itemsPerPage);
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  currentQuery = input.value.trim();

  if (!currentQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
    });
    return;
  }

  currentPage = 1;
  hideLoadMoreBtn();
  showLoader();

  try {
    const data = await searchImages(currentQuery, currentPage, imagesPerPage);
    totalHits = data.totalHits;
    renderGalleryItems(data.hits);

    const totalPages = calculateTotalPages(totalHits, imagesPerPage);

    if (totalPages > currentPage) {
      showLoadMoreBtn();
    } else {
      hideLoadMoreBtn();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const data = await searchImages(currentQuery, currentPage, imagesPerPage);
    renderGalleryItems(data.hits, true);

    // Прокрутка сторінки
    const cardHeight = document.querySelector('.gallery').firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const totalPages = calculateTotalPages(totalHits, imagesPerPage);

    if (currentPage >= totalPages || data.hits.length < imagesPerPage) {
      hideLoadMoreBtn();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
  }
});
