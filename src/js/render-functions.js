import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const renderGalleryItems = (images, append = false) => {
  const gallery = document.querySelector('.gallery');

  if (images.length === 0 && !append) {
    iziToast.error({
      title: 'Error',
      message: 'Sorry, there are no images matching your search query. Please try again!',
    });
    gallery.innerHTML = ''; 
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

  if (append) {
    gallery.insertAdjacentHTML('beforeend', markup); 
  } else {
    gallery.innerHTML = markup; 
  }

  new SimpleLightbox('.gallery a').refresh();
};

export const showLoader = () => {
  document.querySelector('.loader').classList.remove('hidden');
};

export const hideLoader = () => {
  document.querySelector('.loader').classList.add('hidden');
};

export const showLoadMoreBtn = () => {
  const loadMoreBtn = document.querySelector('.load-more');
  loadMoreBtn.classList.remove('hidden');
  loadMoreBtn.style.display = 'flex';
  loadMoreBtn.style.justifyContent = 'center';
  loadMoreBtn.style.marginTop = '20px'; 
};

export const hideLoadMoreBtn = () => {
  const loadMoreBtn = document.querySelector('.load-more');
  loadMoreBtn.classList.add('hidden');
};
