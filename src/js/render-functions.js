import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const renderGalleryItems = (images) => {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = ''; // Clear previous results

  if (images.length === 0) {
    iziToast.error({
      title: 'Error',
      message: 'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  const markup = images.map(image => `
    <a href="${image.largeImageURL}" class="gallery-item">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </a>
  `).join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  new SimpleLightbox('.gallery a').refresh();
};

export const showLoader = () => {
  document.querySelector('.loader').classList.remove('hidden');
};

export const hideLoader = () => {
  document.querySelector('.loader').classList.add('hidden');
};

export const showLoadMoreBtn = () => {
  document.querySelector('.load-more').classList.remove('hidden');
};

export const hideLoadMoreBtn = () => {
  document.querySelector('.load-more').classList.add('hidden');
};
